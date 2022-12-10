<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  const passValue = () => {
    console.log('value');
    dispatch('Hide');
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="flex items-center gap-3 justify-center">
  <div on:click={passValue} class="bg-white w-12 h-12 rounded-md cursor-pointer flex items-center justify-center">
    <img src="/assets/logo.png" alt="logo" class="h-10 w-10" />
  </div>
  <h1 class="text-2xl font-bold text-white">DocChain.io</h1>
</div>
