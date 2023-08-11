import axios from 'axios'

export const getAckNFTsForAddress = async (address='0x06bd1006C1ACd8f32ab9599B5608f789Cb22A4F7') => {
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
    const allowed = [
        "0x9bC45aA16C3c5A0A817b036F973d0742483492E8".toLowerCase(),
        "0xB15f216D52272e187e4CF6d122d088976c236A3f".toLowerCase(),
        "0xB15f216D52272e187e4CF6d122d088976c236A3f".toLowerCase()
    ]
    return results.map((result) => result?.data?.data?.items).flat().filter((item) => allowed.includes(item.contract_address))
}

export const resolveENS = async(domain) => {
    let data = JSON.stringify({
        "query": `{ domains(where: { labelName: "${domain.toLowerCase()}"}) { \n id name \n labelName \n labelhash \n owner { \n id \n } \n } }`,
        "variables": null
    })
    console.log(data)
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
    console.log(response)
    const ens = response?.data?.data?.domains?.find((item) => item.labelName !== null)?.owner?.id

    return ens
}

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