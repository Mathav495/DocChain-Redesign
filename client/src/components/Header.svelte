<script>
  import Logo from './logo.svelte';
  let hidden = false;
  const showCard = () => {
    console.log('clicked');
    if (hidden == false) {
      hidden = true;
    } else {
      hidden = false;
    }
  };
  const hideCard = () => {
    hidden = false;
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="flex justify-between items-center" on:click|self={hideCard}>
  <div class="text-3xl flex items-center font-boldness gap-2">
    <div class="bg-black md:hidden h-14 w-14 rounded-3xl flex items-center justify-center">
      <img src="assets\logo2.png" alt="logo" class="h-10 w-10 animate-pulse lg:animate-none" />
    </div>
    <h1>DocChain.io</h1>
  </div>

  <div class="flex flex-row gap-5">
    <div class="relative flex flex-row gap-5">
      <a href="/" class="flex md:hidden relative group items-center justify-center h-10 w-10 rounded-full text-black font-semibold bg-indigo-50">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
        </svg>
        <span class="text-black group-hover:opacity-100 transition-opacity duration-300 ease-in-out opacity-0 absolute inset-0 -top-7 -left-1">Logout</span>
      </a>
      <button class="flex md:hidden relative group items-center justify-center h-10 w-10 rounded-full text-black font-semibold bg-indigo-50">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
        </svg>
        <span class="text-black group-hover:opacity-100 transition-opacity duration-300 ease-in-out opacity-0 absolute inset-0 -top-7 -left-1">Navbar</span>
      </button>
      <div class="flex flex-row items-center">
        <img src="assets\profile.png" alt="profile" class="h-16 w-16 ml-1 absolute cursor-pointer" />
        <h1 class="flex flex-row  h-10 px-3 items-center bg-indigo-50 rounded-full">
          <p class="text-lg font-semibold ml-12">Joji V.</p>
          <button on:click={showCard}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mt-1 ml-2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        </h1>
      </div>
      <div class:show={hidden} class="transition-opacity duration-300 ease-in-out opacity-0 bg-black shadow-md shadow-gray-700 text-white absolute top-12 sm:left-28 md:left-0 px-3 py-2 flex flex-col items-center justify-center rounded-2xl w-36 card-width">
        <p class="text-xs">Welcome,</p>
        <h1 class="text-md font-semibold">Mr. Joji Varghese</h1>
        <a href="https://mail.google.com/mail/" class="text-sm text-blue-400 underline">test@email.com</a>
      </div>
    </div>
  </div>
</div>

<style>
  .card-width {
    width: 9.15rem /* 144px */;
  }
  .show {
    opacity: 100%;
  }
  .font-boldness {
    font-weight: 1000;
  }
</style>
