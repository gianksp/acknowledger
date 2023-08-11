import { useState } from 'react'
import { useRouter } from 'next/router'
 
const profile = {
    traits: ['DiveDeep', 'Insist on Highest Standards', 'Disagree and Commit']
} 

const nets = [
    {
        id: 'Optimism',
        text: 'Basic',
        image: 'https://tse1.mm.bing.net/th?id=OIP.avnBtfI0O34yYRGlMz3WRAHaHa&pid=Api&rs=1&c=1&qlt=95&w=48&h=48'
    },
    {
        id: 'Base',
        text: 'Coinbase',
        image: 'https://storage.googleapis.com/ethglobal-api-production/organizations%2Fh5ps8%2Flogo%2F1678294488367_W-9qsu1e_400x400.jpeg'
    },
    {
        id: 'Zora',
        text: 'Collectibles',
        image: 'https://storage.googleapis.com/ethglobal-api-production/organizations%2Ff2so0%2Flogo%2F1690573556900_Zorb%20Core%20SVG.svg'
    }
]

const testimonials = [
    {
        text: ' democritum intellegam ne. Propriae volutpat dissentiet ea sit, nec at lorem inani tritani, an ius populo pereum vocent sensibus reprehendunt.',
        author: 'Leroy Jenkins',
        community: 'CTO of Company Co.',
        image: 'https://source.unsplash.com/50x50/?portrait?1',
        traits: ['Respectful', 'Dilligent', 'Brave']
    },
    {
        text: 'An audire commodo habemus cum. Ne sed corrumpit rAn audire commodo habemus cum. Ne sed corrumpit repudiandae. Tota aliquip democritum pro in, nec democepudiandae. Tota aliquip democritum pro in, nec democritum intellegam ne. Propriae volutpat dissentiet ea sit, nec at lorem inani tritani, an ius populo perfecto vituperatoribus. Eu cum case modus salutandi, ut eum vocent sensibus reprehendunt.',
        author: 'Leroy Jenkins',
        community: 'CTO of Company Co.',
        image: 'https://source.unsplash.com/50x50/?portrait?1',
        traits: ['Tehnical', 'Brilliant']
    },
    {
        text: 'An audire commodo habemus cum. Ne sed corrumpit repudiandae. Tota aliquip democritum pro in, nec democritum intellegam ne. Propriae volutpat dissentiet ea sit, nec at lorem inani tritani, an ius populo perfecto vituperatoribus. Eu cum case modus salutandi, ut eum vocent sensibus reprehendunt.',
        author: 'Leroy Jenkins',
        community: 'CTO of Company Co.',
        image: 'https://source.unsplash.com/50x50/?portrait?1',
        traits: ['Barraiser', 'DeepDiver']
    },
    {
        text: 'An audire commodo habemus cum. Ne sed corrumpit repudiandae. Tota aliquip democritum pro in, nec democAn audire commodo habemus cum. Ne sed corrumpit repudiandae. Tota aliquip democritum pro in, nec democritum intellegam ne. Propriae volutpat dissentiet ea sit, nec at lorem inani tritani, an ius populo perfecto vituperatoribus. Eu cum case modus salutandi, ut eum vocent sensibus reprehendunt.',
        author: 'Leroy Jenkins',
        community: 'CTO of Company Co.',
        image: 'https://source.unsplash.com/50x50/?portrait?1',
        traits: ['Fearless', 'Entrepreneurial']
    },
    {
        text: 'An audire commodo habemus cum. Ne sed corrumpit repudiandae. Tota aliquip democritune. Propriae volutpat dissentiet ea sit, nec at lorem inani tritani, an ius populo perfecto vituperatoribus. Eu cum case modus salutandi, ut eum vocent sensibus reprehendunt.',
        author: 'Leroy Jenkins',
        community: 'CTO of Company Co.',
        image: 'https://source.unsplash.com/50x50/?portrait?1',
        traits: ['Friendly', 'Competent']
    },
    {
        text: ' democritum intellegam ne. Propriae volutpat dissentiet ea sit, nec at lorem inani tritani, an ius populo pereum vocent sensibus reprehendunt.',
        author: 'Leroy Jenkins',
        community: 'CTO of Company Co.',
        image: 'https://source.unsplash.com/50x50/?portrait?1',
        traits: ['Respectful', 'Dilligent', 'Brave']
    },
    {
        text: 'An audire commodo habemus cum. Ne sed corrumpit rAn audire commodo habemus cum. Ne sed corrumpit repudiandae. Tota aliquip democritum pro in, nec democepudiandae. Tota aliquip democritum pro in, nec democritum intellegam ne. Propriae volutpat dissentiet ea sit, nec at lorem inani tritani, an ius populo perfecto vituperatoribus. Eu cum case modus salutandi, ut eum vocent sensibus reprehendunt.',
        author: 'Leroy Jenkins',
        community: 'CTO of Company Co.',
        image: 'https://source.unsplash.com/50x50/?portrait?1',
        traits: ['Tehnical', 'Brilliant']
    },
    {
        text: 'An audire commodo habemus cum. Ne sed corrumpit repudiandae. Tota aliquip democritum pro in, nec democritum intellegam ne. Propriae volutpat dissentiet ea sit, nec at lorem inani tritani, an ius populo perfecto vituperatoribus. Eu cum case modus salutandi, ut eum vocent sensibus reprehendunt.',
        author: 'Leroy Jenkins',
        community: 'CTO of Company Co.',
        image: 'https://source.unsplash.com/50x50/?portrait?1',
        traits: ['Barraiser', 'DeepDiver']
    },
    {
        text: 'An audire commodo habemus cum. Ne sed corrumpit repudiandae. Tota aliquip democritum pro in, nec democAn audire commodo habemus cum. Ne sed corrumpit repudiandae. Tota aliquip democritum pro in, nec democritum intellegam ne. Propriae volutpat dissentiet ea sit, nec at lorem inani tritani, an ius populo perfecto vituperatoribus. Eu cum case modus salutandi, ut eum vocent sensibus reprehendunt.',
        author: 'Leroy Jenkins',
        community: 'CTO of Company Co.',
        image: 'https://source.unsplash.com/50x50/?portrait?1',
        traits: ['Fearless', 'Entrepreneurial']
    },
    {
        text: 'An audire commodo habemus cum. Ne sed corrumpit repudiandae. Tota aliquip democritune. Propriae volutpat dissentiet ea sit, nec at lorem inani tritani, an ius populo perfecto vituperatoribus. Eu cum case modus salutandi, ut eum vocent sensibus reprehendunt.',
        author: 'Leroy Jenkins',
        community: 'CTO of Company Co.',
        image: 'https://source.unsplash.com/50x50/?portrait?1',
        traits: ['Friendly', 'Competent']
    }
]

export default function Page() {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const generateCards = () => {
    return testimonials.map((item) => {
        return (
            <div class="bg-opacity-30 backdrop-blur-lg break-inside-avoid h-min w-full p-6 rounded shadow-md bg-white">
                <p class="text-gray-800">{item.text}</p>
                <div class="flex items-center mt-4 space-x-4">
                    <img src={item.image} alt="" class="w-12 h-12 bg-center bg-cover rounded-full dark:bg-gray-500" />
                    <div>
                        <p class="text-lg font-semibold text-gray-900">{item.author}</p>
                        <p class="text-sm text-gray-700">{item.community}</p>
                    </div>
                </div>
                <div class="block mt-4">
                    { item.traits.map((trait) => {
                        return (
                            <div class="m-1 text-center center relative inline-block select-none whitespace-nowrap rounded-lg bg-blue-500 py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-white">
                                <div class="mt-px text-center">{trait}</div>
                            </div>
                        )
                    })}
                    </div>
            </div>
        )
    })
  }

  const networks = (
    <div class="flex flex-row my-2">
        {
            nets.map((item) => {
                return (
                    <div class="mx-1 basis-1/3 p-2 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-blue-100">
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

                <textarea rows="4" class="px-2 my-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
     placeholder="Your dedication and commitment to our project have been nothing short of exceptional. Your innovative ideas and tireless efforts have significantly advanced our mission. We are truly grateful for the unparalleled value you've brought to the team. 👏"
    ></textarea>

<p class="text-xs text-gray-400">Your relationship with the person</p>

<input rows="1" class="px-2 my-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
placeholder="Peer at @Community"
></input>

<p class="text-xs text-gray-400">Summarize in comma separated words the best attributes of this person</p>

<input rows="1" class="px-2 my-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
placeholder="Reliable,Caring"
></input>

    
    <p class="text-xs text-gray-400">An acknowledgement lives forever in the network, select the ecosystem where the acknowledgement will be created as a digital collectible.</p>


    { networks }





              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 pt-3 pb-12 sm:flex sm:flex-row-reverse sm:px-6">
          <button type="button" class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto">Send Acknowledgement</button>
          <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
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
        <img class="w-36 h-36 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt=""/>
        <div class="font-medium dark:text-white">
            <h2 class="text-4xl font-bold">{router.query.address}</h2>
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







{/* 
<div class="bg-white p-24 bg-opacity-30 backdrop-blur-lg">





                    <form>
  <div class="space-y-12">
    <div class="border-b border-gray-900/10 pb-12">
      <h2 class="text-base font-semibold leading-7 text-gray-900">Profile</h2>
      <p class="mt-1 text-sm leading-6 text-gray-600">This information will be displayed publicly so be careful what you share.</p>

      <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div class="sm:col-span-4">
          <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Username</label>
          <div class="mt-2">
            <div class="bg-white flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <span class="flex select-none items-center pl-3 text-gray-500 sm:text-sm">workcation.com/</span>
              <input type="text" name="username" id="username" autocomplete="username" class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="janesmith" />
            </div>
          </div>
        </div>

        <div class="col-span-full">
          <label for="about" class="block text-sm font-medium leading-6 text-gray-900">About</label>
          <div class="mt-2">
            <textarea id="about" name="about" rows="3" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
          </div>
          <p class="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
        </div>

        <div class="col-span-full">
          <label for="photo" class="block text-sm font-medium leading-6 text-gray-900">Photo</label>
          <div class="mt-2 flex items-center gap-x-3">
            <svg class="h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd" />
            </svg>
            <button type="button" class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Change</button>
          </div>
        </div>

        <div class="col-span-full">
          <label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900">Cover photo</label>
          <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div class="text-center">
              <svg class="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
              </svg>
              <div class="mt-4 flex text-sm leading-6 text-gray-600">
                <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                  <span>Upload a file</span>
                  <input id="file-upload" name="file-upload" type="file" class="sr-only" />
                </label>
                <p class="pl-1">or drag and drop</p>
              </div>
              <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="border-b border-gray-900/10 pb-12">
      <h2 class="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
      <p class="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

      <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div class="sm:col-span-3">
          <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">First name</label>
          <div class="mt-2">
            <input type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>

        <div class="sm:col-span-3">
          <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Last name</label>
          <div class="mt-2">
            <input type="text" name="last-name" id="last-name" autocomplete="family-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>

        <div class="sm:col-span-4">
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div class="mt-2">
            <input id="email" name="email" type="email" autocomplete="email" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>

    

        <div class="col-span-full">
          <label for="street-address" class="block text-sm font-medium leading-6 text-gray-900">Street address</label>
          <div class="mt-2">
            <input type="text" name="street-address" id="street-address" autocomplete="street-address" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>

        <div class="sm:col-span-2 sm:col-start-1">
          <label for="city" class="block text-sm font-medium leading-6 text-gray-900">City</label>
          <div class="mt-2">
            <input type="text" name="city" id="city" autocomplete="address-level2" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>

        <div class="sm:col-span-2">
          <label for="region" class="block text-sm font-medium leading-6 text-gray-900">State / Province</label>
          <div class="mt-2">
            <input type="text" name="region" id="region" autocomplete="address-level1" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>

        <div class="sm:col-span-2">
          <label for="postal-code" class="block text-sm font-medium leading-6 text-gray-900">ZIP / Postal code</label>
          <div class="mt-2">
            <input type="text" name="postal-code" id="postal-code" autocomplete="postal-code" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>
      </div>
    </div>

    <div class="border-b border-gray-900/10 pb-12">
      <h2 class="text-base font-semibold leading-7 text-gray-900">Notifications</h2>
      <p class="mt-1 text-sm leading-6 text-gray-600">We'll always let you know about important changes, but you pick what else you want to hear about.</p>

      <div class="mt-10 space-y-10">
        <fieldset>
          <legend class="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
          <div class="mt-6 space-y-6">
            <div class="relative flex gap-x-3">
              <div class="flex h-6 items-center">
                <input id="comments" name="comments" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
              </div>
              <div class="text-sm leading-6">
                <label for="comments" class="font-medium text-gray-900">Comments</label>
                <p class="text-gray-500">Get notified when someones posts a comment on a posting.</p>
              </div>
            </div>
            <div class="relative flex gap-x-3">
              <div class="flex h-6 items-center">
                <input id="candidates" name="candidates" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
              </div>
              <div class="text-sm leading-6">
                <label for="candidates" class="font-medium text-gray-900">Candidates</label>
                <p class="text-gray-500">Get notified when a candidate applies for a job.</p>
              </div>
            </div>
            <div class="relative flex gap-x-3">
              <div class="flex h-6 items-center">
                <input id="offers" name="offers" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
              </div>
              <div class="text-sm leading-6">
                <label for="offers" class="font-medium text-gray-900">Offers</label>
                <p class="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
              </div>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend class="text-sm font-semibold leading-6 text-gray-900">Push Notifications</legend>
          <p class="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p>
          <div class="mt-6 space-y-6">
            <div class="flex items-center gap-x-3">
              <input id="push-everything" name="push-notifications" type="radio" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
              <label for="push-everything" class="block text-sm font-medium leading-6 text-gray-900">Everything</label>
            </div>
            <div class="flex items-center gap-x-3">
              <input id="push-email" name="push-notifications" type="radio" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
              <label for="push-email" class="block text-sm font-medium leading-6 text-gray-900">Same as email</label>
            </div>
            <div class="flex items-center gap-x-3">
              <input id="push-nothing" name="push-notifications" type="radio" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
              <label for="push-nothing" class="block text-sm font-medium leading-6 text-gray-900">No push notifications</label>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  </div>

  <div class="mt-6 flex items-center justify-end gap-x-6">
    <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
    <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
  </div>
</form>





</div>
 */}





                 
	</div>
</section>

</div>

    )
}