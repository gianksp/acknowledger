import { useState } from 'react';
import { ConnectWallet } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import Image from "next/image";

export default function Home() {
  const [open,setOpen] = useState(false)
  const [target, setTarget] = useState()

  const handleOpen = () => {
    setOpen(!open)
  }

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
                  <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">Find someone to acknowledge 🥳</h3>
                  <div class="mt-2">
                  <p class="text-xs text-gray-400">You will be redirected to the personal wall of this user where you will be able to leave your comments</p>
  
                  <input class="p-2 my-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      placeholder="ENS or 0x address"
      onChange={(e) => setTarget(e.target.value)}></input>
  
  
  
  
  
  
                  </div>
              </div>
              </div>
          </div>
          <div class="bg-white px-4  pb-8 sm:flex sm:flex-row-reverse sm:px-6">
              <button onClick={() => {
                location.href = `u/${target}`;
              }} type="button" class="mr-2 align-center  inline-flex w-full justify-center rounded-md bg-white px-3 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Search</button>
              <button onClick={() => setOpen(false)} type="button" class="mr-2 align-center  inline-flex w-full justify-center rounded-md bg-white px-3 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
              
          </div>
          </div>
      </div>
      </div>
  </div>
      )

  return (
    <div id="iogx" class="bg-gray-100" data-new-gr-c-s-check-loaded="14.1119.0" data-gr-ext-installed="" cz-shortcut-listen="true">
    <div id="igvj" class="bg-gray-100">
       <nav id="iaol" class="py-4 w-full absolute">
          <div id="ii8j" class="container mx-auto px-4 flex justify-between items-center">
             <a href="#" class="font-bold text-gray-700"></a><a data-src="" title="" href="https://emojipedia.org/partying-face" id="i3cah" class="Emoji_emoji__P7Lkz __variable_344bdf EmojisList_emojis-list-item__Z9O9D">🥳</a>
             <ul id="irah" class="flex space-x-6 text-white">
                <li id="ijtl"><a href="#about" id="ih1ax">Why Acknowledger</a></li>
                <li id="ikuiz"><a href="#howitworks" id="iekht">How it works</a></li>
                <li id="i37hy"><a href="#benefits" id="ik9xl">Benefits</a></li>
             </ul>
          </div>
       </nav>
       <section id="iu4zj" class="flex flex-col justify-center items-center text-center bg-black py-80">
          <h1 class="font-bold text-white mb-6 sm:text-5xl text-2xl">Great Cultures Starts with Acknowledgement</h1>
          <p class="text-white mb-8 sm:text-2xl text-xl">Peer-to-peer recognition tied to your community values, culture, and performance. <br id="itrhwt"/>A project for SuperHack 2023 by Giancarlo.</p>
          <button onClick={handleOpen} class="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium py-3 text-center mr-2 mb-2 px-12 rounded-full text-lg sm:text-2xl">Acknowledge Someone!</button>
          { open && modal }
       </section>
       <section id="idmhj" class="py-20 bg-white">
          <div id="about" class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
             <div id="ihvfic" class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Cultural Impact</h1>
                <p class="mb-8 leading-relaxed text-xl text-gray-400">Imagine the cultural impact if more communities deployed a mechanism that encourages “watching for” and “recognizing” bar-raising behaviors – daily – and allowing for recognition without pain-staking process-reviews-approvals while creating a culture of continuous improvement</p>
                <div id="i34pij" class="flex justify-center"></div>
             </div>
             <div id="i7xv77" class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6"><img alt="hero" src="https://ipfs.moralis.io:2053/ipfs/Qma6zuX6JYCE23Bu23mmWtiL5cszp59zsqFavbVA4MWet4/76985dab02a91b60ef92cc529ec8dce5.jpg" class="object-center rounded" /></div>
          </div>
          <section id="irlq2" class="text-gray-600 body-font"></section>
          <div id="howitworks" class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
             <div id="it685k" class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0"><img alt="hero" src="https://ipfs.moralis.io:2053/ipfs/QmX2ZTF8qs34uYCFZPwZxSLKJHYCLWMm4wucAjh67FnsRH/Capture.PNG" class="object-center rounded" /></div>
             <div id="iednda" class="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">How it works</h1>
                <p class="mb-8 leading-relaxed text-xl text-gray-400">Any user can can either submit an ack (acknowledgement) for anyone else or see others that have received them. I can select a person (or group of people) and share free-form, in 500 characters or less “What they did well.” I then select the related Value or Principle demonstrated in their actions and hit “Submit.” Immediately, the person(s) receives a notification of the Ack as does their community. I can recognize on any community – and vice versa. Recognize members may participate in a prize pool or reward plan by the community. Acknowledgements are soulbound non-fungible tokens in Optimism, Zora and Base networks.</p>
                <div id="i7wvpk" class="flex justify-center"></div>
             </div>
          </div>
          <div id="i4tb8" class="container mx-auto px-4">
             <h2 class="text-4xl font-bold text-gray-800 mb-8 text-center">More than a Timeless Thank you Note</h2>
             <video allowfullscreen="allowfullscreen" id="i55llk" class="mx-auto w-full h-auto" src="https://www.shutterstock.com/shutterstock/videos/6606995/preview/stock-footage-earth-from-space-brazil-beautiful-view-of-the-earth-seen-from-space.webm" autoplay="autoplay" controls="controls"></video>
             <div class="text-2xl font-medium">
                <h2 id="ifvhi"><br id="ijc1vb" /></h2>
             </div>
             <section id="ipfft" class="text-gray-600 body-font"></section>
             <div id="i1v0b" class="flex flex-wrap -mx-4"></div>
          </div>
          <section id="i1q7a" class="text-gray-600 body-font"></section>
          <div id="i49spf" class="container mx-auto px-4">
             <div class="text-2xl font-medium"></div>
          </div>
          <div id="benefits" class="container mx-auto px-4">
             <h2 class="text-4xl font-bold text-gray-800 mb-8 text-center">The ROI of Recognition</h2>
             <div class="text-2xl font-medium">
                <h2 id="i7b5y6" class="text-gray-400">An acknowledgement-powered culture pays dividends by putting contribution recognition and community engagement first.</h2>
             </div>
             <div id="i539ap" class="flex flex-wrap -mx-4 my-6">
                <div id="i42yag" class="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
                   <div id="ioi9nc" class="rounded-lg shadow-lg py-8 px-6 h-full">
                      <img src="https://ipfs.moralis.io:2053/ipfs/Qma6zuX6JYCE23Bu23mmWtiL5cszp59zsqFavbVA4MWet4/76985dab02a91b60ef92cc529ec8dce5.jpg" alt="Service" class="mb-6 mx-auto rounded-full"/>
                      <h3 class="text-xl font-bold text-gray-800 mb-2">Engaged Community</h3>
                      <p class="text-base text-gray-700 mb-4">Community engagement leads to improved happiness, quality of contribution, and growth.</p>
                   </div>
                </div>
                <div id="irv6fl" class="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
                   <div id="ifh6ri" class="rounded-lg shadow-lg py-8 px-6 h-full">
                      <img src="https://ipfs.moralis.io:2053/ipfs/Qme3FvCAW4jBURUeivjeHQ93cknLSvWGiZBxFpGJ2WdFDq/BannerAckowledger.jpg" alt="Service" class="mb-6 mx-auto rounded-full"/>
                      <h3 class="text-xl font-bold text-gray-800 mb-2">Quality Contribution</h3>
                      <p class="text-base text-gray-700 mb-4">When communities feel engaged, appreciated and valued they are more likely to contribute at their highest level</p>
                   </div>
                </div>
                <div id="ivzzc3" class="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
                   <div id="iiuvol" class="rounded-lg shadow-lg py-8 px-6 h-full">
                      <img src="https://ipfs.moralis.io:2053/ipfs/Qme2ehb4PLZUAnrdzdFPH5WmFh7CDCgMJzxjf4aX792nPg/th (1).jfif" alt="Service" class="mb-6 mx-auto rounded-full"/>
                      <h3 class="text-xl font-bold text-gray-800 mb-2">Stronger Culture</h3>
                      <p class="text-base text-gray-700 mb-4">A culture of recognition founded in your values fosters belonging, engagement, and productivity.</p>
                   </div>
                </div>
             </div>
          </div>
       </section>
       <footer id="i70rl" class="py-4 bg-gray-900 text-white">
          <div id="il69l" class="container mx-auto px-4 flex justify-between items-center">
             <p id="irvyha">© 2023 Acknowledger. All Rights Reserved.</p>
          </div>
       </footer>
    </div>

 </div>
  );
}
