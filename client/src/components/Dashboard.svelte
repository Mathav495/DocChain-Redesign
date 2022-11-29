<script>
  import axios from 'axios';
  import { onMount } from 'svelte';
  import Pagination from './pagination.svelte';

  let token = localStorage.getItem('token');
  console.log(token);
  let usage = [];
  onMount(async () => {
    const { data } = await axios.get('https://test.swagger.print2block.in/account/usage?from=2022-01-01T00%3A00%3A00Z&to=2022-11-15T00%3A00%3A00Z', {
      headers: {
        'x-access-token': token,
      },
    });
    usage = data;
    console.log(usage);
    let loader = document.getElementById('load');
    loader.classList.add('hidden');
    let home = document.getElementById('homepage');
    home.classList.remove('hidden');
    let dash = document.getElementById('dashboard');
    dash.classList.remove('hidden');
  });
</script>

<div class="flex flex-col gap-10 justify-center" id="dashboard">
  <div class="flex flex-col lg:flex-row">
    <div class="flex order-2 lg:order-1 flex-col w-full lg:w-6/12 lg:gap-3">
      <h1 class="text-2xl font-bold">Documents</h1>
      <div class="graph-width lg:w-5/6 md:w-full bg-blue-100 h-60 text-2xl rounded-3xl p-1 flex flex-col justify-end items-center font-bold text-blue-500">
        <div><Pagination /></div>
      </div>
    </div>
    <div class="lg:w-6/12 w-full order-1 lg:order-2 flex flex-col lg:gap-3">
      <h1 class="text-2xl font-bold">Documents Status</h1>
      <div class="flex flex-row gap-5">
        <div class="w-1/2 bg-red-100 h-60 rounded-3xl p-5 flex flex-col justify-between">
          <p class="text-xl font-bold text-center">Document <br /> Issued</p>

          <p class="text-xl font-bold text-center" />
          <div class="flex flex-row gap-2 items-center justify-between">
            <div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8">
                <path fill-rule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zm6.905 9.97a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.72-1.72V18a.75.75 0 001.5 0v-4.19l1.72 1.72a.75.75 0 101.06-1.06l-3-3z" clip-rule="evenodd" />
                <path d="M14.25 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0016.5 7.5h-1.875a.375.375 0 01-.375-.375V5.25z" />
              </svg>
            </div>
            <p class="text-4xl font-bold text-red-500">{usage.initiated}</p>
          </div>
        </div>
        <div class="w-1/2 bg-yellow-100 h-60 rounded-3xl p-5 flex flex-col justify-between">
          <p class="text-xl font-bold text-center">Document <br /> Viewed</p>

          <div class="flex flex-row gap-2 items-center justify-between">
            <div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8">
                <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                <path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clip-rule="evenodd" />
              </svg>
            </div>
            <p class="text-4xl font-bold text-yellow-500">{usage.published}</p>
          </div>
        </div>
        <div class="w-1/2 bg-green-100 h-60 rounded-3xl p-5 flex flex-col justify-between">
          <p class="text-xl font-bold text-center">Document <br />Verified</p>

          <div class="flex flex-row gap-2 items-center justify-between">
            <div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8">
                <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
              </svg>
            </div>
            <p class="text-4xl font-bold text-green-500">{usage.revoked}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="flex flex-row justify-between gap-5">
    <div class="w-full lg:w-8/12 flex flex-col gap-5">
      <div class="flex flex-row items-center justify-between">
        <h1 class="text-2xl font-bold">Document Access Log</h1>
        <div class="flex flex-row">
          <div class="flex h-8 w-8 items-center justify-center rounded-l-md border-y-2 border-l-2 border-black">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
              />
            </svg>
          </div>
          <input type="date" class="mb-2 h-8 rounded-r-md border-2 border-black bg-white px-2 outline-none md:mb-0 md:w-52" />
        </div>
      </div>
      <div class="flex flex-col gap-8">
        <div class="flex items-center font-bold gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path fill-rule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z" clip-rule="evenodd" />
            <path fill-rule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zm9.586 4.594a.75.75 0 00-1.172-.938l-2.476 3.096-.908-.907a.75.75 0 00-1.06 1.06l1.5 1.5a.75.75 0 001.116-.062l3-3.75z" clip-rule="evenodd" />
          </svg>
          <p class="hover:text-blue-500 hover:underline cursor-pointer">ISSUE (0)</p>
        </div>
        <div class="flex items-center font-bold gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
            <path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clip-rule="evenodd" />
          </svg>
          <p class="hover:text-blue-500 hover:underline cursor-pointer">VIEW (0)</p>
        </div>
        <div class="flex items-center font-bold gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
          </svg>
          <p class="hover:text-blue-500 hover:underline cursor-pointer">VERIFY (0)</p>
        </div>
        <div class="flex items-center font-bold gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path fill-rule="evenodd" d="M19.5 21a3 3 0 003-3V9a3 3 0 00-3-3h-5.379a.75.75 0 01-.53-.22L11.47 3.66A2.25 2.25 0 009.879 3H4.5a3 3 0 00-3 3v12a3 3 0 003 3h15zm-6.75-10.5a.75.75 0 00-1.5 0v4.19l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V10.5z" clip-rule="evenodd" />
          </svg>
          <p class="hover:text-blue-500 hover:underline cursor-pointer">DOWNLOAD (0)</p>
        </div>
      </div>
    </div>
    <div class="w-4/12 bg-black rounded-3xl text-white p-7 sm:hidden lg:flex flex-col gap-6">
      <span class="leading-10 text-2xl font-bold"
        >The <div class="transform -skew-y-6 inline-flex">
          <span class="text-lg font-bold border-2 bg-gray-300 text-black hover:bg-black hover:text-gray-300 border-gray-300 rounded-lg px-2">Print2Block</span>
        </div>
        Trust Infrastructure For Issuing Digital Document.</span
      >
      <p class="text-xs font-semibold -mt-1">Make any Document TRULY DIGITAL on a Private or Public BLOCKCHAIN.</p>
      <div>
        <a href="/publish" class="bg-blue-300 rounded-full px-3 py-1 text-black font-semibold">Publish Doc.</a>
      </div>
    </div>
  </div>
</div>

<style>
  @media (min-width: 1024px) {
    .graph-width {
      width: 93%;
    }
  }

  .h-60 {
    height: 14.8rem /* 240px */;
  }
</style>
