import { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Web3Button, useStorage } from "@thirdweb-dev/react"
import ChainContext from '../../../context/chain';
import { OptimismGoerli } from "@thirdweb-dev/chains";
import { ethers } from "ethers";
import { getAckNFTsForAddress, resolveAdddress, resolveENS } from '../../../api';
import constants from '../../../constants';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);
const {
    abi, contract, nets
} = constants

export default function Page() {
    const storage = useStorage();
    const router = useRouter()
    const { selectedChain, setSelectedChain } = useContext(ChainContext);
    const [open, setOpen] = useState(false)
    const [isLoading, setLoading] = useState(true)
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
    const [profileDescription, setProfileDescription] = useState()
    const [profileTraits, setProfileTraits] = useState([])

    const loadItems = async (address) => {
        setLoading(true)
        const items = await getAckNFTsForAddress(address)
        setListItems(items)
        setLoading(false)
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

    const generateProfile = async () => {
        const text = listItems.map((item) => item.external_data.description).flat()
        const keys = listItems.map((item) => item.external_data.attributes.map((attr) => attr.value)).flat()
        const prompt = `
          ${text}
          ${keys}
        `
        if (!prompt) return
        const r = await openai.createChatCompletion({
            model: "gpt-4",
            messages: [
                {
                    role: 'system',
                    content: `Generate a 1 liner personal, friendly third person summaryfor ${profileENS || profileAddress} based on the next 
                          text as a sumarized version of the feedback provided to the person.
                          write up to 3 words or 
                          adjectives that describe the best qualities comma separated prefixed by |`
                },
                {
                    role: 'user',
                    content: prompt
                }
            ]
        })
        const t = r.data.choices[0].message.content
        const items = t.split('|')
        setProfileDescription(items[0])
        setProfileTraits(items[1]?.split(','))
    }


    useEffect(() => {
        if (listItems && listItems?.length > 0) {
            generateProfile()
        } else {
            setProfileDescription("This user does not have an acknowledgement yet, leave one!")
            setProfileTraits([])
        }
    }, [listItems])

    const formatAddress = (addr) => {
        let fAdd = addr
        if (fAdd && fAdd.length > 20) {
            fAdd = addr.substring(0, 8) + '...' + addr.substring(addr.length-8, addr.length)
        }
        return fAdd
    }

    const generateCards = () => {
        return listItems.map((item, index) => {
            const metadata = item.external_data
            const who = metadata?.attributes?.find((attr) => attr.trait_type === 'Author')?.value
            const rel = metadata?.attributes?.find((attr) => attr.trait_type === 'Relation')?.value
            const vals = metadata?.attributes?.find((attr) => attr.trait_type === 'Values')?.value?.split(',')
            return (
                <div key={index} onClick={() => {
                    window.open(item.uri, '_blank').focus();
                }}
                    class="cursor-pointer bg-opacity-30 hover:bg-opacity-40 backdrop-blur-lg hover:backdrop-blur-5xl break-inside-avoid h-min w-full p-6 rounded shadow-md bg-white relative">

                    <p class="text-gray-100 break-words">{metadata?.description}</p>
                    <div class="flex items-center mt-4 space-x-4">
                        <img src={`https://effigy.im/a/${who}.png`} alt="" class="w-12 h-12 bg-center bg-cover rounded-full dark:bg-gray-100" />
                        <div>
                            <p class="text-lg font-semibold text-white">{formatAddress(who)}</p>
                            <p class="text-sm text-white">{rel}</p>
                        </div>
                    </div>
                    <div class="block mt-4">
                        {vals?.map((attr) => {
                            return (
                                <div key={attr} class="m-1 text-center center relative inline-block select-none whitespace-nowrap rounded-lg bg-blue-500 py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-white">
                                    <div class="mt-px text-center">{attr}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )
        })
    }

    const send = async (tcon) => {
        try {

            const authorENS = await resolveAdddress(tcon.contractWrapper.signer._address)
            const image = 'https://bafybeid54bv7vocsui5lohkfdkswgxn4trf5slzlp6uhj73n2ret4ray44.ipfs.w3s.link/Untitled.png'
            const author = authorENS || tcon.contractWrapper.signer._address
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
                attributes,
            }
            const urlMetadata = await storage.upload(metadata)
            // Mint NFT
            const sbt = new ethers.Contract(contract[tcon._chainId], abi, tcon.contractWrapper.provider);
            const tx = await sbt.connect(tcon.contractWrapper.signer).safeMint(profileAddress, urlMetadata)
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
                    const renderClasses = selectedChain.chainId === item.network.chainId ?
                        'mx-1 basis-1/3 p-2 border-2 border-gray-200 rounded-lg cursor-pointer bg-blue-100' :
                        'mx-1 basis-1/3 p-2 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-blue-100'
                    return (
                        <div class={renderClasses} key={item.network.chainId} onClick={() => {
                            setSelectedChain(item.network)
                        }}>
                            <div class="flex items-center space-x-4">
                                <img class="w-8 h-8 rounded-full" src={item.image} alt="" />
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
                                        {networks}
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
                                <div class="flex items-center gap-2 text-gray-800">
                                    {isLoading && spinner}
                                    Send Acknowledgement
                                </div>
                            </Web3Button>
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


    const loader = (
        <div class="align-middle inline-block">
            <div
                class="align-middle inline-block mt-3 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
            </div>
        </div>
    )

    return (
        <div>
            <section class="bg-profile-bg bg-cover min-h-screen">
                <div class="container px-6 py-12 mx-auto">
                    <div class="max-w-3xl mx-auto my-8 space-y-4 text-center xl:col-span-2 xl:text-left">
                        <div class="flex items-center space-x-4">
                            {(profileENS || profileAddress) && (
                                <img class="w-36 h-36 rounded-full" src={`https://effigy.im/a/${profileENS || profileAddress}.png`} alt="" />
                            )}
                            <div class="font-medium dark:text-white">
                                <h2 class="text-4xl font-bold">{profileENS || profileAddress}</h2>
                                {isLoading && loader}
                                <p class="mt-1 text-gray-300 text-md">{profileDescription}</p>

                                <div class="block mt-4">
                                    {profileTraits?.map((trait) => {
                                        return (
                                            <div key={trait} class="m-1 text-center center relative inline-block select-none whitespace-nowrap rounded-lg bg-blue-500 py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-white">
                                                <div class="mt-px text-center">{trait}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4 p-8">
                        {generateCards()}
                    </div>

                    {!isLoading && (
                        <div className="flex justify-center items-center">
                            <button onClick={toggleModal} class="center mx-auto bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded">
                                Leave an Acknowledgement
                            </button>
                        </div>
                    )}

                    {open && modal}

                </div>
            </section>

        </div>

    )
}