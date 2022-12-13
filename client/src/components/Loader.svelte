<div class="div1 h-screen lg:w-screen w-auto flex gap-3 justify-center items-center bg-black">
  <div class="wave1" />
  <div class="wave1" />
  <div class="wave1" />
</div>

<style>
  .wave1 {
    background: linear-gradient(45deg, white);
    animation: wave1 1s linear infinite;
    border-radius: 0.375rem /* 6px */;
    --tw-bg-opacity: 1;
    background-color: white;
    height: 2.5rem /* 40px */;
    width: 1.25rem /* 20px */;
  }
  .wave1:nth-child(2) {
    animation-delay: 0.1s;
  }
  .wave1:nth-child(3) {
    animation-delay: 0.2s;
  }
  .wave1:nth-child(4) {
    animation-delay: 0.3s;
  }
  @keyframes wave1 {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
</style>
