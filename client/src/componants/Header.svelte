<script>
let hidden = true
const showCard = () => {
  if (hidden == false) {
    hidden = true
  } else {
    hidden = false
  }
}
const hideCard = () => {
  hidden = true
}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="flex justify-between items-center" on:click|self={hideCard}>
  <h1 class="text-3xl font-bold">DocChain.io</h1>

  <div class="flex flex-row gap-5">
    <div class="relative flex-flex-col">
      <div class="flex flex-row items-center">
        <img
          src="assets\profile.png"
          alt="profile"
          class="h-16 w-16 ml-1 absolute cursor-pointer" />
        <h1
          class="flex flex-row h-10 px-3 items-center bg-indigo-50 rounded-full">
          <p class="text-lg font-semibold ml-12">Joji V.</p>
          <button on:click={showCard}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5 mt-1 ml-2">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        </h1>
      </div>
      <div
        class:hidden
        class="bg-black shadow-md shadow-gray-700 text-white absolute top-12 px-3 py-2 flex flex-col items-center justify-center rounded-2xl w-36 card-width">
        <p class="text-xs">Welcome,</p>
        <h1 class="text-md font-semibold">Mr.Joji Varghese</h1>
        <a
          href="https://mail.google.com/mail/"
          class="text-sm text-blue-400 underline">test@email.com</a>
      </div>
    </div>
  </div>
</div>

<style>
.card-width {
  width: 9.15rem /* 144px */;
}
</style>
