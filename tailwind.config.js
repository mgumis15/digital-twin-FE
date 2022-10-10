/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode:'class',

  theme: {
    extend: {
      transitionProperty: {
        'height': 'height'
      }
    },
    screens:{
      'sm':'700px'
    }
  },
  plugins: [],
}
