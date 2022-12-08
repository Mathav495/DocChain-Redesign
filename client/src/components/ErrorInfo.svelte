<script>
  import { fade } from 'svelte/transition';
  export let errormsg;
</script>

<div in:fade={{ duration: 2000 }} out:fade={{ duration: 2000 }} class="flex bg-red-500 justify-center items-center mt-8 gap-4 p-3 rounded-md">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class=" fill-white w-7 h-7">
    <path
      fill-rule="evenodd"
      d="M11.484 2.17a.75.75 0 011.032 0 11.209 11.209 0 007.877 3.08.75.75 0 01.722.515 12.74 12.74 0 01.635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 01-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 01.722-.516l.143.001c2.996 0 5.718-1.17 7.734-3.08zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zM12 15a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75v-.008a.75.75 0 00-.75-.75H12z"
      clip-rule="evenodd"
    />
  </svg>
  <h1 class="text-xl text-white font-medium tracking-wide">
    {errormsg}
  </h1>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5 cursor-pointer fill-slate-300">
    <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clip-rule="evenodd" />
  </svg>
</div>
