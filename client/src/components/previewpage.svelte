<section class="text-gray-600 relative">
  <!-- <div class="mt-5 text-2xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 font-bold">Document Preview</div> -->
  <div class="container py-10 mx-auto flex sm:flex-nowrap flex-wrap md:w-flex-col">
    <div class="lg:w-3/5 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10  flex w-full flex-col space-y-4 ml-10 lg:order-none lg:block ">
      <img class="w-full h-full rounded-md " src={imgurl} alt="" />
    </div>
    <div class="lg:w-2/5 md:w-1/2 bg-blue-300 flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0 p-5 rounded-md shadow-lg">
      <!-- <div class="h-2 w-full bg-gradient-to-r from-cyan-500 to-green-600"></div> -->
      <div class="flex mb-4">
        <img class="h-24 w-24 overflow-hidden rounded object-cover object-center border-2 border-white" src={qr} alt="qrcode" />
        <img class="h-24 w-24 ml-2 overflow-hidden rounded object-cover object-center border-2 border-white" src="/assets/logo.jpeg" alt="logo" />
      </div>
      <hr class="w-full mb-4" />

      <div class="relative mb-4">
        <div for="name" class="leading-7 text-md font-bold text-gray-600 uppercase">Issuer</div>
        <div type="text" id="name" name="name" class="w-full bg-white rounded border border-gray-300  text-sm text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">SIDBI (DEMO)</div>
        <!-- <div type="text" id="name" name="name" class="w-full bg-white rounded border border-gray-300  text-sm text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">Name</div> -->
      </div>
      <div class="relative mb-4">
        <div for="name" class="leading-7 text-md font-bold  text-gray-600">DATE PUBLISHED</div>
        <div type="text" id="name" name="name" class="w-full bg-white rounded border border-gray-300  text-sm text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">Wed Aug 17 2022 22:49:04 GMT+0530 (India Standard Time)</div>
        <!-- <div type="text" id="name" name="name" class="w-full bg-white rounded border border-gray-300  text-sm text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">Name</div> -->
      </div>
      <div class="relative mb-4">
        <!-- <div for="name" class="leading-7 text-md text-gray-600">ISSUER</div> -->
        <div for="name" class="leading-7 text-md font-bold  text-gray-600">DOCUMENT_ID</div>
        <div type="text" id="name" name="name" class="w-full bg-white rounded border border-gray-300  text-sm text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">{documentID}</div>
        <!-- <div type="text" id="name" name="name" class="w-full bg-white rounded border border-gray-300  text-sm text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">Name</div> -->
      </div>
      <div class="relative mb-4">
        <div for="name" class="leading-7 text-md font-bold  text-gray-600">FILEHASH</div>
        <div type="text" id="name" name="name" class="w-full bg-white rounded border border-gray-300  text-sm text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">{fileHash}</div>
        <!-- <div type="text" id="name" name="name" class="w-full bg-white rounded border border-gray-300  text-sm text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">Name</div> -->
      </div>
      <div class="relative mb-4">
        <div for="name" class="leading-7 text-md font-bold  text-gray-600 uppercase">datahash</div>
        <div type="text" id="name" name="name" class="w-full bg-white rounded border border-gray-300  text-sm text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">{dataHash}</div>
        <!-- <div type="text" id="name" name="name" class="w-full bg-white rounded border border-gray-300  text-sm text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">Name</div> -->
      </div>
      <div class="p-2 w-full">
        <button class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg uppercase">publish</button>
      </div>
    </div>
  </div>
</section>
