/** @type {import('tailwindcss').Config} */
const animateCss = require('animated-tailwindcss');
module.exports = animateCss({
  content: ['./src/**/*.svelte'],
  theme: {
    extend: {
      borderRadius: {
        2: '2rem',
      },
      fontSize: {
        md: '1.05rem',
      },
      width: {
        '2/7': '18%',
        '5/7': '82%',
        '3/8': '38.8%',
        '5/8': '69.8%',
        '3/10': '23%',
        '7/10': '77%',
        88: '22rem',
      },
    },
  },
  plugins: [],
});
