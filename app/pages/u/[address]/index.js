import { useRouter } from 'next/router'
 

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

  const generateCards = () => {
    return testimonials.map((item) => {
        return (
            <div class="break-inside-avoid h-min w-full p-6 rounded shadow-md dark:bg-gray-900">
                <p>{item.text}</p>
                <div class="flex items-center mt-4 space-x-4">
                    <img src={item.image} alt="" class="w-12 h-12 bg-center bg-cover rounded-full dark:bg-gray-500" />
                    <div>
                        <p class="text-lg font-semibold">{item.author}</p>
                        <p class="text-sm dark:text-gray-400">{item.community}</p>
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
  return (
    <div>


<section class="dark:bg-gray-800 dark:text-gray-100">
	<div class="container px-6 py-12 mx-auto">
			<div class="max-w-2xl mx-auto my-8 space-y-4 text-center xl:col-span-2 xl:text-left">
				<h2 class="text-4xl font-bold">{router.query.address}</h2>
				<p class="dark:text-gray-400">Pri ex magna scaevola moderatius. Nullam accommodare no vix, est ei diceret alienum, et sit cetero malorum. Et sea iudico consequat, est sanctus adipisci ex.</p>
			</div>
			<div class="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4 p-8">
                { generateCards() }
					</div>
                 
	</div>
</section>

</div>

    )
}