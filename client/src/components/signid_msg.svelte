<script>
  import { fade } from "svelte/transition"
  export let position
</script>

<div
  in:fade={{ duration: 1000 }}
  out:fade={{ duration: 1000 }}
  class="flex bg-green-600 justify-center items-center  gap-4 p-3 rounded-md {position}"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="w-6 h-6 text-white"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
    />
  </svg>
  <h1 class="text-lg text-white font-semibold tracking-wide">
    Signature ID has been generated and submitted to publish server
  </h1>
  <!-- event forwarding -->
  <button on:click>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      class="w-5 h-5 fill-slate-300"
    >
      <path
        fill-rule="evenodd"
        d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
        clip-rule="evenodd"
      />
    </svg>
  </button>
</div>
