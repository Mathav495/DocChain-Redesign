let animate = document.querySelector('#particles-js');
console.log(animate);
animate.style.display = 'none';
const grads = [
  'linear-gradient(to right, rgb(234, 88, 12), rgb(249, 115, 22))',
  'radial-gradient(at center bottom, rgb(120, 53, 15), rgb(253, 224, 71))',
  'radial-gradient(at center top, rgb(209, 213, 219), rgb(192, 38, 211), rgb(234, 88, 12))',
  'linear-gradient(to right, rgb(239, 68, 68), rgb(153, 27, 27))',
  'linear-gradient(to right, rgb(16, 185, 129), rgb(101, 163, 13))',
  'linear-gradient(rgb(17, 24, 39), rgb(75, 85, 99))',
  'linear-gradient(to right, rgb(15, 23, 42), rgb(88, 28, 135), rgb(15, 23, 42))',
  'linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)',
  'linear-gradient( 63.1deg,  rgba(5,23,111,1) 16.4%, rgba(24,95,240,1) 64.5% )',
];

const changeGradient = () => {
  let random = Math.floor(Math.random() * grads.length);
  console.log(random);
  animate.style.background = grads[random];
};
