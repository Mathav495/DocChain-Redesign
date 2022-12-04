<!-- <a href="/" class="flex relative group items-center justify-center h-10 w-10 rounded-md text-black font-semibold bg-white">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
  </svg>
  <span class="text-white group-hover:opacity-100 transition-opacity duration-300 ease-in-out opacity-0 absolute inset-0 -top-5">Logout</span>
</a> -->
<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  let color = true;
  const showClr = () => {
    if (color == true) {
      color = false;
    } else {
      color = true;
    }
  };
  const changeTheme = (colour) => {
    console.log(colour);
    dispatch('theme', colour);
  };
</script>

<div class="flex flex-col gap-4">
  <button class="flex flex-row items-center gap-1 group justify-center relative" on:click={showClr}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-8 w-8 flex-shrink-0 transition-all duration-500 ease-in-out group-hover:bg-white group-hover:text-black rounded-md text-white">
      <path fill-rule="evenodd" d="M3 6a3 3 0 013-3h2.25a3 3 0 013 3v2.25a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm9.75 0a3 3 0 013-3H18a3 3 0 013 3v2.25a3 3 0 01-3 3h-2.25a3 3 0 01-3-3V6zM3 15.75a3 3 0 013-3h2.25a3 3 0 013 3V18a3 3 0 01-3 3H6a3 3 0 01-3-3v-2.25zm9.75 0a3 3 0 013-3H18a3 3 0 013 3V18a3 3 0 01-3 3h-2.25a3 3 0 01-3-3v-2.25z" clip-rule="evenodd" />
    </svg>
    <span class="text-base font-semibold text-center text-white w-full rounded-md px-3 py-1 transition-all duration-500 ease-in-out">Theme</span>
    <div class:hidden={color} class="absolute left-28 top-1 flex flex-col gap-1 font-semibold text-sm text-black items-start justify-center">
      <button class="bg-white px-2 rounded-md w-20 shadow-sm shadow-white" on:click={() => changeTheme('Black')}>Black</button>
      <button class="bg-white px-2 rounded-md w-20 shadow-sm shadow-white" on:click={() => changeTheme('Yellow')}>Yellow</button>
      <button class="bg-white px-2 rounded-md w-20 shadow-sm shadow-white" on:click={() => changeTheme('Red')}>Red</button>
    </div>
  </button>
  <a href="/" class="group flex flex-col items-center gap-1 group">
    <div class="flex flex-row items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-8 w-8 flex-shrink-0 transition-all duration-500 ease-in-out group-hover:bg-white group-hover:text-black rounded-md text-white">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
      </svg>
      <span class="text-base font-semibold text-center text-white w-full  rounded-md px-3 py-1 transition-all duration-500 ease-in-out">Logout</span>
    </div>
  </a>
</div>
