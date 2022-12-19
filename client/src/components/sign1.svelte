<script>
  import { each } from 'svelte/internal';

  export let data1;
  export let totalPages;
  console.log(data1);
  console.log('sign1');

  let switchIdForm = true;
  const switchId = () => {
    if (switchIdForm == true) {
      switchIdForm = false;
    } else {
      switchIdForm = true;
    }
  };

  let details = true,
    dot1 = false,
    tick1 = true,
    empty = false;
  const back1 = () => {
    details = true;
    SelectPageno = false;
  };
  let dot2 = true,
    tick2 = true,
    SelectPageno = false;
  const nextBTNSelectPageno = () => {
    details = false;
    dot1 = true;
    tick1 = false;
    empty = true;
    dot2 = false;
    SelectPageno = true;
  };
</script>

<nav aria-label="Progress">
  <ol class="flex flex-col gap-4 mx-auto px-5 py-5 bg-blue-300 w-full lg:w-10/12 rounded-md">
    <h1 class="mx-auto text-xl text-white font-bold">VERIFY SIGN DETAILS</h1>
    <div class="flex items-center justify-center ">
      <button class="relative pr-8 sm:pr-20">
        <!-- Completed Step -->
        <div class="absolute inset-0 flex items-center">
          <div class="h-0.5 w-full bg-indigo-600 hover:bg-indigo-800" />
        </div>
        <div class:hidden={dot1} class="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white">
          <span class="h-2.5 w-2.5 rounded-full bg-indigo-600 hover:bg-indigo-800" />
        </div>
        <div class:hidden={tick1} class="relative flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-800">
          <!-- Heroicon name: mini/check -->
          <svg class="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" />
          </svg>
        </div>
      </button>

      <button class="relative pr-8 sm:pr-20">
        <!-- Completed Step -->
        <div class="absolute inset-0 flex items-center">
          <div class="h-0.5 w-full bg-indigo-600 hover:bg-indigo-800" />
        </div>
        <div class:hidden={empty} class="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white">
          <span class=" rounded-full bg-indigo-600 hover:bg-indigo-800" />
        </div>
        <div class:hidden={dot2} class="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white">
          <span class="h-2.5 w-2.5 rounded-full bg-indigo-600 hover:bg-indigo-800" />
        </div>
        <div class:hidden={tick2} class="relative flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-800">
          <!-- Heroicon name: mini/check -->
          <svg class="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" />
          </svg>
          <span class="sr-only">Step 2</span>
        </div>
      </button>

      <button class="relative pr-8 sm:pr-20">
        <!-- Current Step -->
        <div class="absolute inset-0 flex items-center">
          <div class="h-0.5 w-full bg-gray-200" />
        </div>
        <div href="#c" class="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white">
          <span class=" rounded-full bg-indigo-600 hover:bg-indigo-800" />
        </div>
        <div href="#c" class:hidden={true} class="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white">
          <span class="h-2.5 w-2.5 rounded-full bg-indigo-600 hover:bg-indigo-800" />
        </div>
        <div href="#b" class:hidden={true} class="relative flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-800">
          <!-- Heroicon name: mini/check -->
          <svg class="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" />
          </svg>
          <span class="sr-only">Step 2</span>
        </div>
      </button>

      <button class="relative pr-8 sm:pr-20">
        <!-- Upcoming Step -->
        <div class="absolute inset-0 flex items-center">
          <div class="h-0.5 w-full bg-gray-200" />
        </div>
        <div href="#c" class="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white">
          <span class=" rounded-full bg-indigo-600 hover:bg-indigo-800" />
        </div>
        <div href="#c" class:hidden={true} class="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white">
          <span class="h-2.5 w-2.5 rounded-full bg-indigo-600 hover:bg-indigo-800" />
        </div>
        <div href="#b" class:hidden={true} class="relative flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-800">
          <!-- Heroicon name: mini/check -->
          <svg class="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" />
          </svg>
          <span class="sr-only">Step 2</span>
        </div>
      </button>

      <button class="relative">
        <!-- Upcoming Step -->
        <div class="absolute inset-0 flex items-center">
          <div class="h-0.5 w-full bg-gray-200" />
        </div>
        <div href="#c" class="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white">
          <span class=" rounded-full bg-indigo-600 hover:bg-indigo-800" />
        </div>
        <div href="#c" class:hidden={true} class="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white">
          <span class="h-2.5 w-2.5 rounded-full bg-indigo-600 hover:bg-indigo-800" />
        </div>
        <div href="#b" class:hidden={true} class="relative flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-800">
          <!-- Heroicon name: mini/check -->
          <svg class="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" />
          </svg>
          <span class="sr-only">Step 2</span>
        </div>
      </button>
    </div>
    {#if details}
      <div class="flex flex-col gap-4">
        <h1 class="text-white text-lg tracking-wide font-semibold border-b border-white">SIGNER DETAILS</h1>
        <div class="flex flex-row items-center">
          <p class="text-base text-gray-600 w-40 font-semibold">Name:</p>
          <div class="py-2 pl-4 bg-white rounded-md w-full text-base text-gray-600">{data1.signerDetails.name}</div>
        </div>
        <div class="flex flex-row items-center">
          <p class="text-base text-gray-600 w-40 font-semibold">Id:</p>
          <div class="py-2 pl-4 bg-white rounded-md w-full text-base text-gray-600 overflow-auto">{data1.signerDetails.id}</div>
        </div>
        <div class="flex flex-row items-center">
          <p class="text-base text-gray-600 w-40 font-semibold">Email:</p>
          <div class="py-2 pl-4 bg-white rounded-md w-full text-base text-gray-600">{data1.signerDetails.email}</div>
        </div>
        <div class="flex flex-row items-center">
          <p class="text-base text-gray-600 w-40 font-semibold">Contact:</p>
          <div class="py-2 pl-4 bg-white rounded-md w-full text-base text-gray-600">{data1.signerDetails.contact}</div>
        </div>
        <div class="flex flex-row items-center">
          <p class="text-base text-gray-600 w-40 font-semibold">Organisation:</p>
          <div class="py-2 pl-4 bg-white rounded-md w-full text-base text-gray-600">{data1.signerDetails.organisation}</div>
        </div>
        <div class="flex items-center justify-between border-t border-white pt-4">
          <div class="space-y-2">
            <button on:click={switchId} class="bg-indigo-400 px-2 py-1 rounded-md border border-indigo-400 text-white text-base">Switch Account</button>
            <form class:hidden={switchIdForm}>
              <input type="text" class="w-52 px-2 py-1 bg-white border border-gray-500 rounded-md" />
              <button class="bg-indigo-600 hover:bg-indigo-800 px-2 py-1 rounded-md border border-indigo-400 text-white text-base">Switch</button>
            </form>
          </div>
          <button on:click={nextBTNSelectPageno} class="bg-indigo-600 hover:bg-indigo-800 px-2 py-1 rounded-md border border-indigo-400 text-white text-base">Next</button>
        </div>
      </div>
    {/if}
    {#if SelectPageno}
      <div class="flex flex-col gap-4">
        <h1 class="text-white text-lg tracking-wide font-semibold border-b border-white">SELECT PAGE NO</h1>
        <div>
          <div class="flex">
            <p class="text-base text-gray-600 w-40 font-semibold">Page No:</p>
            <select name="select page number" id="pageNo" class="py-2 pl-4 bg-white rounded-md w-full text-base text-gray-600">
              {#each totalPages as totalPage}
                <option value={totalPage}>{totalPage}</option>
              {/each}
            </select>
          </div>
        </div>
        <div class="flex items-center justify-between border-t border-white pt-4">
          <button on:click={back1} class="bg-indigo-600 hover:bg-indigo-800 px-2 py-1 rounded-md border border-indigo-400 text-white text-base">Back</button>
          <button on:click={nextBTNSelectPageno} class="bg-indigo-600 hover:bg-indigo-800 px-2 py-1 rounded-md border border-indigo-400 text-white text-base">Next</button>
        </div>
      </div>
    {/if}
  </ol>
</nav>
