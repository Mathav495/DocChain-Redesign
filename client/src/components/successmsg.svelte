<script>
  let showsuccess = true
  const hidesuccess = () => {
    showsuccess = false
  }
</script>

{#if showsuccess}
  <div>
    <div
      class=" z-20 mx-auto mt-2 w-4/5 rounded-lg bg-white border-4 border-gray-400"
    >
      <div class="mx-5 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 15 15"
        >
          <path
            fill="green"
            fill-rule="evenodd"
            d="M0 7.5a7.5 7.5 0 1 1 15 0a7.5 7.5 0 0 1-15 0Zm7.072 3.21l4.318-5.398l-.78-.624l-3.682 4.601L4.32 7.116l-.64.768l3.392 2.827Z"
            clip-rule="evenodd"
          />
        </svg>
        <div>
          <h1 class="mx-5 p-2 text-sm font-semibold text-green-600 break-words">
            Your document signatureID has been created and added to publish
            route
          </h1>
        </div>

        <div>
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <svg
            on:click={hidesuccess}
            xmlns="http://www.w3.org/2000/svg"
            fill="red"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
{/if}
