<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  const passValue = () => {
    console.log('value');
    dispatch('Hide');
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="flex">
  <div on:click={passValue} class="bg-black w-12 h-12 rounded-md cursor-pointer flex items-center justify-center">
    <img src="/assets/logo2.png" alt="logo" class="h-10 w-10" />
  </div>
</div>
