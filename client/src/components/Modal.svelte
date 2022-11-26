<script>
  export let showModal = false;
</script>

{#if showModal}
  <div class="relative max-w-md mx-auto mt-20">
    <div class="absolute z-10 inset-0 bg-gradient-to-r from-cyan-500 to-emerald-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-lg" />
    <div class="relative z-20 bg-gradient-to-r from-purple-500 to-cyan-500 md:flex justify-between p-12 shadow-lg rounded-lg w-full max-w-2xl">
      <div class="sm:flex flex-col justify-between space-y-6 py-6 md:pr-10 mx-auto">
        <!-- Modal header -->
        <div class="flex justify-between bg-slate-100 items-start p-4 rounded-t border-b w-full dark:border-gray-600">
          <h3 class="text-2xl font-semibold text-gray-600 dark:text-white">Sign Document:</h3>
          <!-- <button type="button" class="text-gray-900 bg-gray-200 hover:bg-red-600 hover:text-white rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
            <span class="sr-only">Close modal</span>
          </button> -->
        </div>
        <!-- Modal body -->
        <div class="p-6 space-y-6">
          <p class="text-base font-medium leading-relaxed text-white text-center dark:text-gray-400">Your SignatureID is:</p>
          <div class="w-full px-4 py-2 text-gray-900 font-bold text-lg  border-2 rounded-lg text-center " id="sign">SignatureID</div>
        </div>
      </div>
    </div>
  </div>
{/if}
