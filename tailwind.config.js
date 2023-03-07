/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'xl': '1440px',
      'md': '1024px'
    },
    colors:{
      'primary' : '#D9D9D9',
      'accentBlue': '#462EDA',
      'darkGray': '#B2ACAC',
      'accentWhite': '#EFEFEF'
    },

    extend: {
      boxShadow:{
        'btnBlack' : '0px 0px 10px rgba(0, 0, 0, 0.5)',
        'formShadow' : '0px 0px 9px 3px rgba(0, 0, 0, 0.2)'
      },
    },
  },
  plugins: [],
}
