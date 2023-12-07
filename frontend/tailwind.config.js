/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        xs: "0.5625rem",
        sm: "0.6875rem",
        md: "0.875rem",
        xl: "1.1875rem",
        h6: "1.375rem",
        h5: "1.6875rem",
        h4: "2.125rem",
        h3: "2.6875rem",
        h2: "3.3125rem",
        h1: "4.1875rem",
      },
      colors: {
        'mainBlueColor': '#0C023E',
        'paleRed': '#EC3C3C',
        'yellowCamp': '#FFD524',
      }
    },
    fontFamily: {
      'body': ['ui-serif', 'Georgia'],
    },
    backgroundImage: {
      'CampusCore': "url('./public/CAMPUSCORE.png')"
    },
  },
  plugins: [],
}