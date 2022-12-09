<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  const passValue = () => {
    console.log('value');
    dispatch('Hide');
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="hidden md:flex">
  <div on:click={passValue} class="bg-black w-10 h-10 rounded-md cursor-pointer flex items-center justify-center">
    <img src="/assets/logo2.png" alt="logo" class="h-8 w-8" />
  </div>
</div>
