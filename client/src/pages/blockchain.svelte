<script>
  let token = localStorage.getItem('token')
  let documentID = localStorage.getItem('documentID')
  let fileHash = localStorage.getItem('filehash')
  console.log('filehash', fileHash)
  let dataHash = localStorage.getItem('datahash')
  console.log('datahash', dataHash)
  let qr = localStorage.getItem('qrcode')
  console.log('qrcode', qr)
  let proposedURL = localStorage.getItem('docURL')
  console.log('qrcodocURL', proposedURL)
  let imgurl = localStorage.getItem('img')
  console.log('imgUrl', imgurl)

  let animate = document.querySelector('#particles-js')
  console.log(animate)
  window.addEventListener('load', function () {
    animate.style.display = 'none'
  })
</script>

<div class="flex flex-col bg-white ">
  <div class="fixed top-0 left-0 flex w-full items-center gap-4 bg-gradient-to-r from-emerald-200 via-sky-300 to-indigo-600 p-5 shadow-lg">
    <img
      class=" object-cover object-center"
      alt="logo"
      src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNi4xNTQiIGhlaWdodD0iMjcuMzY5IiB2aWV3Qm94PSIwIDAgMTYuMTU0IDI3LjM2OSI+CiAgICA8ZGVmcz4KICAgICAgICA8c3R5bGU+CiAgICAgICAgICAgIC5jbHMtMXtmaWxsOiMwMDgzZTN9CiAgICAgICAgPC9zdHlsZT4KICAgIDwvZGVmcz4KICAgIDxwYXRoIGlkPSJMb2dvIiBkPSJNMTI2NjAgNjEyNi4wMjF2LTguNTdsNy45NzktNC4zNjUgOC4xNzYgNC4zNjV2OC41N2wtOC4xNzYgNC4zNDl6bTIuMjk0LTEyLjAyMmExIDEgMCAxIDEgMSAxIDEgMSAwIDAgMS0xLjAwMS0uOTk5em05LTEuNWEuNS41IDAgMSAxIC41LjUuNS41IDAgMCAxLS41MDItLjQ5OXptLTUtNGExLjUgMS41IDAgMSAxIDEuNSAxLjUgMS41IDEuNSAwIDAgMS0xLjQ5OS0xLjQ5OXptMy00YS41LjUgMCAxIDEgLjUuNS41LjUgMCAwIDEtLjQ5OS0uNDk5em0tNC0uNWExIDEgMCAxIDEgMSAxIDEgMSAwIDAgMS0xLjAwMS0uOTk5eiIgY2xhc3M9ImNscy0xIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTI2NjAgLTYxMDMuMDAxKSIvPgo8L3N2Zz4K"
    />

    <h1 class="text-base tracking-normal">
      <strong class="hidden font-semibold text-slate-900 lg:inline-flex text-lg">This Document is Issued on Blockchain by</strong>
      <strong class=" hidden font-semibold text-blue-800 lg:inline-flex text-lg">Print2Block</strong>
      <strong class="font-semibold text-slate-900 no-underline  text-lg">powered by: </strong>

      <strong class="font-semibold text-sky-600 no-underline hover:text-blue-800 hover:underline text-lg"><a href="https://print2block.com/" rel="noreferrer" target="_blank">DocChain.io</a></strong>
    </h1>
  </div>

  <div class="flex flex-col space-x-5 py-28 lg:flex-row">
    <div class="order-2 flex w-full flex-col space-y-4 ml-10 lg:order-none lg:block lg:w-1/2 ">
      <img class=" h-full w-full overflow-hidden rounded-lg object-cover object-center" src={imgurl} alt="document" />
      <!-- <img class="absolute justify-end mr-10 h-24 w-24 overflow-hidden rounded object-cover object-center" src={qr} alt="qrcode" /> -->

      <div class="mx-auto flex items-center gap-4">
        <div class="flex h-11 w-11 items-center rounded-full border-2 border-sky-500 px-2 hover:scale-110 hover:bg-blue-500 lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class=" h-6 w-6 fill-sky-800 hover:fill-white">
            <path fill-rule="evenodd" d="M15.75 4.5a3 3 0 11.825 2.066l-8.421 4.679a3.002 3.002 0 010 1.51l8.421 4.679a3 3 0 11-.729 1.31l-8.421-4.678a3 3 0 110-4.132l8.421-4.679a3 3 0 01-.096-.755z" clip-rule="evenodd" />
          </svg>
        </div>

        <button class="mx-auto flex rounded-full  border-2 border-sky-500 py-2 px-6 text-base font-normal text-sky-600 hover:scale-110  hover:bg-blue-500 hover:text-white">Download</button>
      </div>
    </div>

    <div class="order-1 flex w-full flex-col gap-4 px-6 lg:order-none lg:w-1/2">
      <div class="flex h-52 w-full flex-col gap-4 rounded-lg bg-black p-4">
        <div class="order-2 flex gap-3 mt-2 lg:order-none">
          <img class="h-24 w-24 overflow-hidden rounded object-cover object-center ml-1" src={qr} alt="qrcode" />
          <img class="h-24 w-24 ml-2 overflow-hidden rounded object-cover object-center border-2 border-white" src="/assets/logo.jpeg" alt="logo" />

          <div class="flex flex-col gap-10 lg:hidden">
            <button value="1" onclick="select(value)" class="flex  rounded-full border-2 border-white px-3 py-1 text-xs font-medium text-white">VIEW INFO</button>
            <button class="flex  rounded-full border-2 border-white px-6 py-1 text-xs font-medium uppercase text-white ">Verify</button>
          </div>
        </div>
        <div class="order-1 flex flex-col ml-1 lg:order-none">
          <h1 class=" mt-1 text-base font-normal text-white">SIDBI (DEMO)</h1>
          <h1 class="text-lg font-bold text-white mt-1">Fixed Deposit Report</h1>
        </div>
      </div>

      <div class=" hidden space-y-5 px-4 py-2 lg:block bg-black rounded-lg mt-8 shadow-lg">
        <div class="mt-8 ml-5">
          <div class="mt-5">
            <h1 class="text-base font-normal text-white underline">Issuer</h1>
            <h1 class="text-lg font-normal text-white">SIDBI (DEMO)</h1>
          </div>
          <div class="mt-5">
            <h1 class="text-base font-normal text-white underline">Date Published</h1>
            <h1 class="text-lg font-normal tracking-wide text-white">Wed Aug 17 2022 22:49:04 GMT+0530 (India Standard Time)</h1>
          </div>
          <div class="mt-5">
            <h1 class="text-base font-normal text-white underline">Published TXID</h1>
            <p class="break-all text-lg font-normal leading-relaxed tracking-normal text-white">TransactionID</p>
          </div>
          <div class="mt-5">
            <h1 class="text-base font-normal text-white underline">Data Hash (SHA256)</h1>
            <p class="break-all text-lg font-normal leading-relaxed tracking-normal text-white">
              {dataHash}
            </p>
          </div>
          <div class="mt-5">
            <h1 class="text-base font-normal text-white underline">File Hash (SHA256)</h1>
            <p class="break-all text-lg font-normal leading-relaxed tracking-normal text-white">
              {fileHash}
            </p>
          </div>
        </div>
        <div class="mb-5 mt-5">
          <button class="mx-auto  mb-5 hidden rounded-lg bg-white py-1 px-6 text-lg font-bold text-black lg:block">Verify</button>
        </div>
      </div>
    </div>
  </div>

  <footer class="flex-1 border-2 border-slate-200 text-center">
    <h1 class="pb-5  text-base font-normal text-slate-900">
      All rights reserved.<a class="font-semibold text-sky-600 no-underline hover:text-sky-900 hover:underline" href="https://print2block.com/"> Print2Block © 2018-2022 </a>
    </h1>
  </footer>
</div>
