/** @type {import('tailwindcss').Config} */
const AnimateCss = require('animated-tailwindcss');
module.exports = AnimateCss({
  content: ['./src/**/*.svelte'],
  theme: {
    // screens: {
    //   sm: '640px',
    //   // => @media (min-width: 640px) { ... }

    //   md: '768px',
    //   // => @media (min-width: 768px) { ... }

    //   lg: '1024px',
    //   // => @media (min-width: 1024px) { ... }

    //   xl: '1280px',
    //   // => @media (min-width: 1280px) { ... }

    //   '2xl': '1536px',
    //   // => @media (min-width: 1536px) { ... }
    // },
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
        '3/8': '56%',
        '5/8': '69.8%',
        '3/10': '23%',
        '7/10': '77%',
        88: '22rem',
      },
      borderWidth: {
        6: '6px',
      },
      boxShadow: {
        around: '0px 0px 8px 0px',
        slide: '0px 0px 2px 0px',
        bottom: 'rgba(0, 0, 0, 0.35) 0px -20px 30px -30px inset',
      },
    },
    cursor: {
      auto: 'auto',
      default: 'default',
      pointer: 'pointer',
      wait: 'wait',
      text: 'text',
      move: 'move',
      'not-allowed': 'not-allowed',
      'ns-resize': 'ns-resize',
      'ew-resize': 'ew-resize',
      'nesw-resize': 'nesw-resize',
      'nwse-resize': 'nwse-resize',
      grab: 'grab',
      grabbing: 'grabbing',
    },
    scale: {
      0: '0',
      25: '.25',
      50: '.5',
      75: '.75',
      90: '.9',
      100: '1',
      125: '1.25',
      150: '1.5',
    },
  },
  plugins: [],
});
