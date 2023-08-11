/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "profile-bg": "url(https://i.pinimg.com/originals/39/b9/7b/39b97b1d11930d854f5668f3047e5105.png)"
      }
    },
  },
  plugins: [],
}