<script>
  import axios from "axios"
  import { onMount } from "svelte"
  import Pagination from "./pagination.svelte"

  let hidden = true
  let token = localStorage.getItem("token")
  let usage = {
    initiated: 0,
    published: 0,
    revoked: 0,
  }
  console.log(token)
  /**
   * onMount function to get a document usage details by calling api
   */
  onMount(async () => {
    const { data } = await axios.get(
      "https://test.swagger.print2block.in/account/usage?from=2022-01-01T00%3A00%3A00Z&to=2022-11-15T00%3A00%3A00Z",
      {
        headers: {
          "x-access-token": token,
        },
      }
    )
    usage = data
    console.log(usage)

    // let loader = document.getElementById('load2');
    // loader.classList.add('hidden');
    // let home = document.getElementById('homepage2');
    // home.classList.remove('hidden');
    // hidden = false;
  })
</script>

<div class="flex flex-col gap-4">
  <div class="flex flex-row w-full gap-4">
    <div
      class="border-b-4 border-x border-t border-red-500 rounded-md w-1/3 lg:w-full p-4 flex flex-col md:flex-row items-center justify-between gap-4"
    >
      <div
        class="lg:w-10 lg:h-10 w-8 h-8 bg-white rounded-xl hidden lg:flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="lg:w-8 lg:h-8 w-6 h-6"
        >
          <path
            fill-rule="evenodd"
            d="M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zm6.905 9.97a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.72-1.72V18a.75.75 0 001.5 0v-4.19l1.72 1.72a.75.75 0 101.06-1.06l-3-3z"
            clip-rule="evenodd"
          />
          <path
            d="M14.25 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0016.5 7.5h-1.875a.375.375 0 01-.375-.375V5.25z"
          />
        </svg>
      </div>
      <p class="text-base lg:text-lg font-bold">
        <span class="hidden xl:inline-flex">Document</span>
         Issued
      </p>
      <p class="text-xl md:text-2xl lg:text-4xl font-bold text-red-500">
        {usage.initiated}
      </p>
    </div>
    <div
      class="border-b-4 border-x border-t border-yellow-500 rounded-md w-1/3 lg:w-full p-4 flex flex-col md:flex-row items-center justify-between gap-4"
    >
      <div
        class="lg:w-10 lg:h-10 w-8 h-8 bg-white rounded-xl hidden lg:flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="lg:w-8 lg:h-8 w-6 h-6"
        >
          <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
          <path
            fill-rule="evenodd"
            d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <p class="text-base lg:text-lg font-bold">
        <span class="hidden xl:inline-flex">Document</span>
         Viewed
      </p>
      <p class="text-xl md:text-2xl lg:text-4xl font-bold text-yellow-500">
        {usage.published}
      </p>
    </div>
    <div
      class="border-b-4 border-x border-t border-green-500 rounded-md w-1/3 lg:w-full p-4 flex flex-col md:flex-row items-center justify-between gap-4"
    >
      <div
        class="lg:w-10 lg:h-10 w-8 h-8 bg-white rounded-xl hidden lg:flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="lg:w-8 lg:h-8 w-6 h-6"
        >
          <path
            fill-rule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <p class="text-base lg:text-lg font-bold">
        <span class="hidden xl:inline-flex">Document</span>
         Verified
      </p>
      <p class="text-xl md:text-2xl lg:text-4xl font-bold text-green-500">
        {usage.revoked}
      </p>
    </div>
  </div>
  <div
    class="w-full border border-blue-500 h-72 text-2xl p-4 rounded-md flex flex-col justify-end items-center font-bold text-blue-500"
  >
    <div><Pagination /></div>
  </div>
</div>
