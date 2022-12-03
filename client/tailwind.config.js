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
    },
  },
  plugins: [],
});
