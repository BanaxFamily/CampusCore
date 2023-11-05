/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mainBlueColor': '#0C023E',
        'paleRed': '#EC3C3C',
      }
    },
    fontFamily: {
      'body': ['ui-serif', 'Georgia'],
    },
  },
  plugins: [],
}