let animate = document.querySelector('#particles-js');
console.log(animate);
animate.style.display = 'none';
const grads = ['linear-gradient(to right , rgba(2, 0, 36, 1) 0%, rgba(9, 9, 121, 1) 35%, rgba(0, 212, 255, 1) 100%)', 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)', 'linear-gradient(132deg, #F4D03F 0%, #16A085 100%)', 'linear-gradient( 83.2deg,  rgba(150,93,233,1) 10.8%, rgba(99,88,238,1) 94.3% )', 'linear-gradient( 68.3deg,  rgba(245,177,97,1) 0.4%, rgba(236,54,110,1) 100.2% )', 'linear-gradient( 63.1deg,  rgba(5,23,111,1) 16.4%, rgba(24,95,240,1) 64.5% )'];

const changeGradient = () => {
  let random = Math.floor(Math.random() * grads.length);
  console.log(random);
  animate.style.background = grads[random];
};
