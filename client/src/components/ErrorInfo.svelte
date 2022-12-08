<script>
  import { fade } from 'svelte/transition';
  export let errormsg;
</script>

<div in:fade={{ duration: 2000 }} out:fade={{ duration: 2000 }} class="flex bg-red-500 justify-center items-center mt-8 gap-4 p-3 rounded-md">
  <h1 class="text-xl text-white font-medium tracking-wide">
    {errormsg}
  </h1>
</div>
