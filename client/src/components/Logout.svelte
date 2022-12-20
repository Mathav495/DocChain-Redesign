<script>
  import { createEventDispatcher } from "svelte"
  const dispatch = createEventDispatcher()
  let colors = true
  const showClrs = () => {
    if (colors == true) {
      colors = false
    } else {
      colors = true
    }
  }
  const changeTheme = (colour) => {
    console.log(colour)
    dispatch("theme", colour)
  }
</script>

<div class="flex flex-col gap-4">
  <button
    class="flex flex-row items-center gap-1 group justify-center relative"
    on:click={showClrs}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      class="h-8 w-8 flex-shrink-0 transition-all duration-500 ease-in-out group-hover:bg-white group-hover:text-black rounded-md text-white"
    >
      <path
        fill-rule="evenodd"
        d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z"
        clip-rule="evenodd"
      />
    </svg>
    <span
      class="text-base font-semibold text-center text-white w-full rounded-md px-3 py-1 transition-all duration-500 ease-in-out"
    >
      Theme
    </span>
    <div
      class:hidden={colors}
      class="absolute left-28 top-1 flex flex-row gap-2 lg:text-sm text-xs text-white font-semibold items-start justify-center"
    >
      <button
        class="bg-black px-2 rounded-md w-5 h-5 border-2 border-white"
        on:click={() => changeTheme("Black")}
      />
      <button
        class="bg-yellow-700 px-2 rounded-md w-5 h-5 border-2 border-white"
        on:click={() => changeTheme("Yellow")}
      />
      <button
        class="bg-red-700 px-2 rounded-md w-5 h-5 border-2 border-white"
        on:click={() => changeTheme("Red")}
      />
      <!-- <button class="bg-white px-2 rounded-md w-20 border-2 border-white" on:click={() => changeTheme('Gray')}>Gray</button> -->
    </div>
  </button>
  <a href="/" class="group flex flex-col items-center gap-1 group">
    <div class="flex flex-row items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="h-8 w-8 flex-shrink-0 transition-all duration-500 ease-in-out group-hover:bg-white group-hover:text-black rounded-md text-white"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
        />
      </svg>
      <span
        class="text-base font-semibold text-center text-white w-full  rounded-md px-3 py-1 transition-all duration-500 ease-in-out"
      >
        Logout
      </span>
    </div>
  </a>
</div>
