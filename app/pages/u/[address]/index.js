import { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Web3Button, useStorage } from "@thirdweb-dev/react"
import ChainContext from '../../../context/chain';
import { OptimismGoerli } from "@thirdweb-dev/chains";
import { ethers } from "ethers";
import { getAckNFTsForAddress, resolveAdddress, resolveENS } from '../../../api';
import constants from '../../../constants';

const {
    profile, abi, contract, nets, testimonials
} = constants

export default function Page() {
    const storage = useStorage();
    const router = useRouter()
    const { selectedChain, setSelectedChain } = useContext(ChainContext);
    const [open, setOpen] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [target, setTarget] = useState(router.query.address)
    // Metadata
    const [description, setDescription] = useState()
    const [name, setName] = useState()
    const [values, setValues] = useState()
    const [author, setAuthor] = useState()
    const [relation, setRelation] = useState()
    // Items
    const [listItems, setListItems] = useState([])
    // Profile
    const [profileAddress, setProfileAddress] = useState()
    const [profileENS, setProfileENS] = useState()

    const loadItems = async (address) => {
        const items = await getAckNFTsForAddress(address)
        setListItems(items)
    }

    const loadProfile = async () => {
        const uri = router?.query?.address

        if (!uri) return

        if (uri.includes('.eth')) {
            // ENS given
            const address = await resolveENS(uri)
            console.log(`Address for ${uri} is ${address}`)
            setProfileAddress(address)
            setProfileENS(uri)
        } else {
            // Its an address
            const ens = await resolveAdddress(uri)
            setProfileENS(ens)
            setProfileAddress(uri)
            console.log(`ENS for ${uri} is ${ens}`)
        }
    }

    useEffect(() => {
        setSelectedChain(OptimismGoerli)
    }, [])

    useEffect(() => {
        setTarget(router.query.address)
        loadProfile(router.query.address)
    }, [router])

    useEffect(() => {
        if (profileAddress) {
            loadItems(profileAddress)
        }
    }, [profileAddress])

    const generateCards = () => {
        // console.log(listItems)
    return listItems.map((item) => {
        const metadata = item.external_data
        const who = metadata?.attributes?.find((attr) => attr.trait_type === 'Author')?.value
        const rel = metadata?.attributes?.find((attr) => attr.trait_type === 'Relation')?.value
        const vals = metadata?.attributes?.find((attr) => attr.trait_type === 'Values')?.value?.split(',')
        console.log(metadata)
        console.log(who)
        return (
            <div class="bg-opacity-30 backdrop-blur-lg break-inside-avoid h-min w-full p-6 rounded shadow-md bg-white">
                <p class="text-gray-800">{metadata?.description}</p>
                <div class="flex items-center mt-4 space-x-4">
                    <img src={`https://effigy.im/a/${who}.png`} alt="" class="w-12 h-12 bg-center bg-cover rounded-full dark:bg-gray-500" />
                    <div>
                        <p class="text-lg font-semibold text-gray-900">{who}</p>
                        <p class="text-sm text-gray-700">{rel}</p>
                    </div>
                </div>
                <div class="block mt-4">
                    { vals?.map((attr) => {
                        return (
                            <div class="m-1 text-center center relative inline-block select-none whitespace-nowrap rounded-lg bg-blue-500 py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-white">
                                <div class="mt-px text-center">{attr}</div>
                            </div>
                        )
                    })}
                    </div>
            </div>
        )
    })
    }

    function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
    }

    const send = async (tcon) => {
    try {
        const image = 'https://bafybeid54bv7vocsui5lohkfdkswgxn4trf5slzlp6uhj73n2ret4ray44.ipfs.w3s.link/Untitled.png'
        const author = '0xasdlasdasdas'
        const name = `Acknowledged by ${author}`
        setLoading(true)
        // First generate metadata file
        const attributes = [
            { 
                trait_type: 'Author',
                value: author
            },
            { 
                trait_type: 'Relation',
                value: relation
            },
            { 
                trait_type: 'Values',
                value: values
            }
        ]
        const metadata = {
            description,
            image,
            name,
            attributes
        }
        const urlMetadata = await storage.upload(metadata)
        console.log(urlMetadata)
        console.log(profileAddress)
        // Mint NFT
        const sbt = new ethers.Contract(contract[tcon._chainId], abi, tcon.contractWrapper.provider);
        const tx = await sbt.connect(tcon.contractWrapper.signer).safeMint(profileAddress, urlMetadata)
        console.log(tx)
        setOpen(false)
    } catch (e) {
        console.log(e)
    } finally {
        setLoading(false)
    }
    }

    const networks = (
    <div class="flex flex-row my-2">
        {
            nets.map((item) => {
                // console.log(item)
                // console.log(selectedChain)
                const renderClasses = selectedChain.chainId === item.network.chainId ? 
                    'mx-1 basis-1/3 p-2 border-2 border-gray-200 rounded-lg cursor-pointer bg-blue-100' :
                    'mx-1 basis-1/3 p-2 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-blue-100'
                return (
                    <div class={renderClasses} onClick={() => {
                        setSelectedChain(item.network)
                    }}>
                        <div class="flex items-center space-x-4">
                            <img class="w-8 h-8 rounded-full" src={item.image} alt=""/>
                            <div class="font-medium dark:text-white">
                                <p class="text-xs font-bold text-gray-500">{item.id}</p>
                                <p class="mt-1 text-gray-400 text-xs">{item.text}</p>
                            </div>
                        </div>
                    </div>
                )
            })
        }
    </div>
    )

    const spinner = (
    <span class="h-6 w-6 block rounded-full border-4 border-t-blue-300 animate-spin text-white"></span>
    )

    const modal = (

<div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

    <div class="fixed inset-0 z-10 overflow-y-auto">
    <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
        <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
            {/* <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
            </div> */}
            <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">Celebrate Success 🥳</h3>
                <div class="mt-2">
                <p class="text-xs text-gray-400">Describe how this person went above and beyond to support you (max 250 characters)</p>

                <textarea rows="4" class="p-2 my-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    placeholder="Your dedication and commitment to our project have been nothing short of exceptional. Your innovative ideas and tireless efforts have significantly advanced our mission. We are truly grateful for the unparalleled value you've brought to the team. 👏"
    onChange={(e) => setDescription(e.target.value)}></textarea>

<p class="text-xs text-gray-400">Your relationship with the person</p>

<input rows="1" class="p-2 my-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
placeholder="Peer at @Community"
onChange={(e) => setRelation(e.target.value)}></input>

<p class="text-xs text-gray-400">Summarize in comma separated words the best attributes of this person</p>

<input rows="1" class="p-2 my-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
placeholder="Reliable,Caring"
onChange={(e) => setValues(e.target.value)}></input>

    
    <p class="text-xs text-gray-400">An acknowledgement lives forever in the network, select the ecosystem where the acknowledgement will be created as a digital collectible for this person. Is completely free!</p>


    { networks }





                </div>
            </div>
            </div>
        </div>
        <div class="bg-white px-4 pt-3 pb-8 sm:flex sm:flex-row-reverse sm:px-6">
            
            <Web3Button
                contractAddress={contract[selectedChain.chainId]} // Your smart contract address
                contractAbi={abi}
                action={send}
                    >
                <div class="flex items-center gap-2 text-white">
                { isLoading && spinner }
                Send Acknowledgement
                </div>
            </Web3Button>

            {/* <button onClick={send} disabled={isLoading} type="button" class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto">
            <div class="grid place-content-center">

                <div class="flex items-center gap-2 text-white">
                { isLoading && spinner }
                Send Acknowledgement
                </div>

                </div>
            </button> */}
            <button onClick={() => setOpen(false)} type="button" class="mr-2 align-center mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
        </div>
        </div>
    </div>
    </div>
</div>
    )

    const toggleModal = () => {
    setOpen(!open)
    }

    return (
    <div>


<section class="bg-profile-bg bg-cover">

    <div class="container px-6 py-12 mx-auto">


        <div class="max-w-3xl mx-auto my-8 space-y-4 text-center xl:col-span-2 xl:text-left">
        
            <div class="flex items-center space-x-4">
        <img class="w-36 h-36 rounded-full" src={`https://effigy.im/a/${profileENS || profileAddress}.png`} alt=""/>
        <div class="font-medium dark:text-white">
            <h2 class="text-4xl font-bold">{ profileENS || profileAddress }</h2>
            <p class="mt-1 text-gray-300 text-md">Pri ex magna scaevola moderatius.d askdjla kjdlasjdl ajsla jlasj kajslkasjdl ajsl asdkaslkdjklasjdlakdlkasjldjas asdjlas</p>

            <div class="block mt-4">
                    { profile.traits.map((trait) => {
                        return (
                            <div class="m-1 text-center center relative inline-block select-none whitespace-nowrap rounded-lg bg-blue-500 py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-white">
                                <div class="mt-px text-center">{trait}</div>
                            </div>
                        )
                    })}
                    </div>




        </div>
    </div>

                
                {/* <h2 class="text-4xl font-bold">{router.query.address}</h2>
        <p class="text-white">Pri ex magna scaevola moderatius. Nullam accommodare no vix, est ei diceret alienum, et sit cetero malorum. Et sea iudico consequat, est sanctus adipisci ex.</p> */}
        </div>



        <div class="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4 p-8">
                { generateCards() }
            </div>





                    <div className="flex justify-center items-center">
            <button onClick={toggleModal} class="center mx-auto bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded">
    Leave an Acknowledgement
</button>
</div>







        { open && modal }






                
    </div>
</section>

</div>

    )
}