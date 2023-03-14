 /** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'Accent_light': '#839BFF',
        'Accent': '#7989CE',
        'WhiteThemeBackground': '#FFF',
        'WhiteThemeMainColor1': '#F4F4F3',
        'WhiteThemeMainColor2': '#D9D9D9',
        'WhiteThemeFontColor': '#3C3C3C'
      },

      boxShadow:{
        'btnBlack' : '0px 0px 10px rgba(0, 0, 0, 0.5)',
        'formShadow' : '0px 0px 9px 3px rgba(0, 0, 0, 0.2)'
      },
    },
  },
  plugins: [],
}
