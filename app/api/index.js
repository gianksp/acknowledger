import axios from 'axios'

/**
 * getAckNFTsForAddress
 * 
 * Get list of soulbound collectibles with the testimonial data.
 * For this we use Covalent API and query all 3 Testnets simultaneously
 * Optimism, Base and Zora and filter by our own contracts returning all the
 * tokens found to be listed and rendered.
 * 
 * @param {*} address 
 * @returns 
 */
export const getAckNFTsForAddress = async (address) => {
    const optimism = `https://api.covalenthq.com/v1/optimism-goerli/address/${address}/balances_nft/?with-uncached=true`
    const zora =  `https://api.covalenthq.com/v1/zora-testnet/address/${address}/balances_nft/?with-uncached=true`
    const base = `https://api.covalenthq.com/v1/base-testnet/address/${address}/balances_nft/?with-uncached=true`
    const headers = {
        headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_COVALENT_API_KEY}`
        }
    }
    const optPromise = axios.get(optimism, headers)
    const zoraPromise = axios.get(zora, headers)
    const basePromise = axios.get(base, headers)
    const results = await Promise.all([optPromise, zoraPromise, basePromise])
    enrichResults(results)
    // Filter only Ack
    const allowed = [
        "0x540a262220757Fc3AD74263F207B600249527723".toLowerCase(),
        "0x7c4adAFbf53436BbF41C70a28b0b5800aBc6597F".toLowerCase(),
        "0x9bC45aA16C3c5A0A817b036F973d0742483492E8".toLowerCase()
    ]
    const nfts = results.map((result) => result?.data?.data?.items).flat()
    const list = nfts.filter((item) => allowed.includes(item.contract_address))
    return list.map((item) => item.nft_data).flat()
}

/**
 * resolveENS
 * 
 * Given an ENS domain e.g gianksp.eth resolve to the 0x address
 * using the ENS subgraph from TheGraph
 * https://thegraph.com/hosted-service/subgraph/ensdomains/ens
 * 
 * @param {*} domain 
 * @returns 
 */
export const resolveENS = async(domain) => {
    let data = JSON.stringify({
        "query": `{ domains(where: { name: "${domain.toLowerCase()}"}) { \n id name \n labelName \n labelhash \n owner { \n id \n } \n } }`,
        "variables": null
    })
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.thegraph.com/subgraphs/name/ensdomains/ens',
        headers: { 
            'Content-Type': 'application/json', 
        },
        data : data
    }
      
    const response = await axios.request(config)
    const ens = response?.data?.data?.domains?.find((item) => item.labelName !== null)?.owner?.id

    return ens
}

/**
 * resolveAdddress
 * 
 * Given a 0x address check if they own an ENS domain
 * using the ENS subgraph from TheGraph
 * https://thegraph.com/hosted-service/subgraph/ensdomains/ens
 * 
 * @param {*} address 
 * @returns 
 */
export const resolveAdddress = async(address) => {
    let data = JSON.stringify({
        "query": `{ domains(where: { owner: \"${address.toLowerCase()}\"}) { \n id name \n labelName \n labelhash \n owner { \n id \n } \n } }`,
        "variables": null
    })
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.thegraph.com/subgraphs/name/ensdomains/ens',
        headers: { 
            'Content-Type': 'application/json', 
        },
        data : data
    }
    const response = await axios.request(config)
    const domain = response?.data?.data?.domains?.find((item) => item.labelName !== null)?.name
    return domain
}

const enrichResults = (results) => {
    // Inject contract address and external_url data to each individual child item
    results.forEach((result, index) => {
        const items = result.data.data.items
        const baseUri = index === 0 ? 'https://testnets.opensea.io/assets/optimism-goerli/0x540a262220757Fc3AD74263F207B600249527723/' :
                        index === 1 ? 'https://testnet.zora.co/collect/ogor:0x7c4adAFbf53436BbF41C70a28b0b5800aBc6597F/' :
                        'https://testnets.opensea.io/assets/base-goerli/0x9bC45aA16C3c5A0A817b036F973d0742483492E8/'
        items.forEach((item) => {
            const contractAddress = item.contract_address
            item.nft_data.forEach((nft) => {
                nft.contract_address = contractAddress
                nft.uri = `${baseUri}${nft.token_id}`
            })
        })
    })
}