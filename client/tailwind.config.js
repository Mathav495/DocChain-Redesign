/** @type {import('tailwindcss').Config} */
const animateCss = require('animated-tailwindcss');
module.exports = animateCss({
  content: ['./src/**/*.svelte'],
  theme: {
    extend: {},
  },
  plugins: [],
});
