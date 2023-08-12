/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "profile-bg": "url(https://ostcm.wpenginepowered.com/wp-content/uploads/2019/04/testimonials.jpeg)",
        "img-bg": "url(https://ipfs.moralis.io:2053/ipfs/QmYiW2yBda962dEo3VPUBmBnM3cDQNUteUup7iUF67q7Gg/BannerAckowledger (3).jpg)"
      }
    },
  },
  plugins: [],
}