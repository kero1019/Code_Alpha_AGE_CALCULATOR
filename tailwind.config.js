/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "background":"#FFF4E2",
        "white": "#FFFFFF",
        "red": "#FF3131",
        "green": "#12C80F",
        "gray":"#646464",
      }
    },
  },
  plugins: [],
}