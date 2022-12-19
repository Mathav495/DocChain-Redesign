<script>
  export let data1;
  console.log(data1);
  console.log('sign1');

  let details = true;
  const SignerDetails = () => {
    details = true;
  };
</script>

<nav aria-label="Progress">
  <ol class="flex flex-col gap-4 mx-auto px-5 py-5 bg-blue-300 w-full lg:w-10/12 rounded-md">
    <h1 class="mx-auto text-xl text-white font-bold">CHOOSE SIGN DETAILS</h1>
    <div class="flex items-center justify-center ">
      <button on:click={SignerDetails} class="relative pr-8 sm:pr-20">
        <!-- Completed Step -->
        <div class="absolute inset-0 flex items-center" aria-hidden="true">
          <div class="h-0.5 w-full bg-indigo-600" />
        </div>
        <a href="#c" class="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white" aria-current="step">
          <span class="h-2.5 w-2.5 rounded-full bg-indigo-600" aria-hidden="true" />
        </a>
        <a href="#a" class:hidden={true} class="relative flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-900">
          <!-- Heroicon name: mini/check -->
          <svg class="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
          </svg>
        </a>
      </button>

      <button class="relative pr-8 sm:pr-20">
        <!-- Completed Step -->
        <div class="absolute inset-0 flex items-center" aria-hidden="true">
          <div class="h-0.5 w-full bg-indigo-600" />
        </div>
        <a href="#c" class="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white" aria-current="step">
          <span class=" rounded-full bg-indigo-600" aria-hidden="true" />
        </a>
        <a href="#c" class:hidden={true} class="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white" aria-current="step">
          <span class="h-2.5 w-2.5 rounded-full bg-indigo-600" aria-hidden="true" />
        </a>
        <a href="#b" class:hidden={true} class="relative flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-900">
          <!-- Heroicon name: mini/check -->
          <svg class="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
          </svg>
          <span class="sr-only">Step 2</span>
        </a>
      </button>

      <button class="relative pr-8 sm:pr-20">
        <!-- Current Step -->
        <div class="absolute inset-0 flex items-center" aria-hidden="true">
          <div class="h-0.5 w-full bg-gray-200" />
        </div>
        <a href="#c" class="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white" aria-current="step">
          <span class=" rounded-full bg-indigo-600" aria-hidden="true" />
        </a>
        <a href="#c" class:hidden={true} class="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white" aria-current="step">
          <span class="h-2.5 w-2.5 rounded-full bg-indigo-600" aria-hidden="true" />
        </a>
        <a href="#b" class:hidden={true} class="relative flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-900">
          <!-- Heroicon name: mini/check -->
          <svg class="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
          </svg>
          <span class="sr-only">Step 2</span>
        </a>
      </button>

      <button class="relative pr-8 sm:pr-20">
        <!-- Upcoming Step -->
        <div class="absolute inset-0 flex items-center" aria-hidden="true">
          <div class="h-0.5 w-full bg-gray-200" />
        </div>
        <a href="#c" class="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white" aria-current="step">
          <span class=" rounded-full bg-indigo-600" aria-hidden="true" />
        </a>
        <a href="#c" class:hidden={true} class="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white" aria-current="step">
          <span class="h-2.5 w-2.5 rounded-full bg-indigo-600" aria-hidden="true" />
        </a>
        <a href="#b" class:hidden={true} class="relative flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-900">
          <!-- Heroicon name: mini/check -->
          <svg class="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
          </svg>
          <span class="sr-only">Step 2</span>
        </a>
      </button>

      <button class="relative">
        <!-- Upcoming Step -->
        <div class="absolute inset-0 flex items-center" aria-hidden="true">
          <div class="h-0.5 w-full bg-gray-200" />
        </div>
        <a href="#c" class="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white" aria-current="step">
          <span class=" rounded-full bg-indigo-600" aria-hidden="true" />
        </a>
        <a href="#c" class:hidden={true} class="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white" aria-current="step">
          <span class="h-2.5 w-2.5 rounded-full bg-indigo-600" aria-hidden="true" />
        </a>
        <a href="#b" class:hidden={true} class="relative flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-900">
          <!-- Heroicon name: mini/check -->
          <svg class="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
          </svg>
          <span class="sr-only">Step 2</span>
        </a>
      </button>
    </div>
    {#if details}
      <div class="flex flex-col gap-4">
        <h1 class="text-white text-lg tracking-wide font-semibold my-4">SIGNER DETAILS</h1>
        <div class="flex flex-row items-center">
          <p class="text-base text-gray-600 w-40">Name:</p>
          <div class="py-2 pl-4 bg-white rounded-md w-full text-base text-gray-600">{data1.signerDetails.name}</div>
        </div>
        <div class="flex flex-row items-center">
          <p class="text-base text-gray-600 w-40">Id:</p>
          <div class="py-2 pl-4 bg-white rounded-md w-full text-base text-gray-600 overflow-auto">{data1.signerDetails.id}</div>
        </div>
        <div class="flex flex-row items-center">
          <p class="text-base text-gray-600 w-40">Email:</p>
          <div class="py-2 pl-4 bg-white rounded-md w-full text-base text-gray-600">{data1.signerDetails.email}</div>
        </div>
        <div class="flex flex-row items-center">
          <p class="text-base text-gray-600 w-40">Contact:</p>
          <div class="py-2 pl-4 bg-white rounded-md w-full text-base text-gray-600">{data1.signerDetails.contact}</div>
        </div>
        <div class="flex flex-row items-center">
          <p class="text-base text-gray-600 w-40">Organisation:</p>
          <div class="py-2 pl-4 bg-white rounded-md w-full text-base text-gray-600">{data1.signerDetails.organisation}</div>
        </div>
      </div>
    {/if}
  </ol>
</nav>
