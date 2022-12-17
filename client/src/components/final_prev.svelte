<script>
  // import BlobPreview from './blob-preview.svelte';
  import FinalBlobPreview from './final_blob_preview.svelte';
  import PreviewQrCard from './preview_qrCard.svelte';

  export let id;
  let bgpattern;
  let blob = localStorage.getItem('blobpdf');
  console.log(blob);
  let localfile = JSON.parse(localStorage.getItem('docDetails'));
  console.log('localfile', localfile);
  localfile.find((localfile) => {
    if (localfile.documentID == id) {
      console.log(localfile);
      console.log('same id', localfile.documentID);
      console.log('filehash', localfile.filehash);
      localfile.filehash = true;
      console.log(localfile);
    }
  });

  let load;
  let token = localStorage.getItem('token');
  let documentID = localStorage.getItem('documentID');
  let fileHash = localStorage.getItem('filehash');
  console.log('filehash', fileHash);
  let dataHash = localStorage.getItem('datahash');
  console.log('datahash', dataHash);
  let qr = localStorage.getItem('qrcode');
  console.log('qrcode', qr);
  let proposedURL = localStorage.getItem('docURL');
  console.log('qrcodocURL', proposedURL);
  let imgurl = localStorage.getItem('img');
  console.log('imgUrl', imgurl);
  let bgcolor = localStorage.getItem('bgGradient');
  let metadata = JSON.parse(localStorage.getItem('metadata'));
  let options = JSON.parse(localStorage.getItem('options'));
</script>

<div class=" mx-auto w-full h-auto flex flex-wrap xl:flex-nowrap">
  <div class="flex w-full rounded-lg xl:mr-4 xl:w-3/5 lg:w-3/5 mb-10">
    <FinalBlobPreview />
  </div>
  <div class="flex w-full flex-col xl:w-2/5 lg:w-2/5">
    <PreviewQrCard {id} {bgcolor} {bgpattern} />
    <div class="border-2 border-gray-200 shadow-lg rounded-lg mt-4">
      <div class="mt-5 ml-4">
        <div class="relative ">
          <div for="name" class="text-md font-bold  leading-7 text-gray-600">Receiver</div>
          <div class="flex-col">
            <div type="text" id="name" name="name" class="w-full rounded px-3 text-sm leading-8 text-gray-600 transition-colors duration-200 ease-in-out">Name</div>
            <div type="text" id="name" name="name" class="text-md w-full rounded py-0 px-6 leading-8 text-gray-600 transition-colors duration-200 font-bold ease-in-out">{metadata.receiver.name}</div>
          </div>
        </div>
        <div class="relative">
          <div for="name" class="text-md font-bold  leading-7 text-gray-600">Document</div>
          <div class="flex-col">
            <div type="text" id="name" name="name" class="w-full rounded px-3 text-sm leading-8 text-gray-600 transition-colors duration-200 ease-in-out">Document type</div>
            <div type="text" id="name" name="name" class="text-md w-full rounded py-0 px-6 leading-8 text-gray-600 transition-colors duration-200 ease-in-out font-bold">{metadata.document.type}</div>
          </div>
        </div>

        <div class="relative">
          <div for="name" class="text-md font-bold  leading-7 text-gray-600">Issuer</div>
          <div class="flex-col">
            <div type="text" id="name" name="name" class="w-full rounded px-3 text-sm leading-8 text-gray-600 transition-colors duration-200 ease-in-out">Signatory</div>
            <div type="text" id="name" name="name" class="text-md w-full rounded py-0 px-6 leading-8 text-gray-600 transition-colors duration-200 ease-in-out font-bold">{metadata.issuer.signatory}</div>
          </div>
        </div>
        <div class="relative mb-5">
          <div type="text" id="name" name="name" class="w-full rounded px-3 text-sm leading-8 text-gray-600 transition-colors duration-200 ease-in-out">Document Title</div>
          <div type="text" id="name" name="name" class="text-md w-full rounded py-0 px-6 leading-8 text-gray-600 transition-colors duration-200 ease-in-out font-bold">{options.title}</div>
        </div>
        <div class="relative">
          <div for="name" class="text-md font-bold  leading-7 text-gray-600">Data hash (SHA256)</div>
          <div class="flex-col">
            <div type="text" id="name" name="name" class="w-full rounded px-3 text-base leading-8 text-gray-600 transition-colors duration-200 ease-in-out break-words">{dataHash}</div>
          </div>
        </div>
        <div class="relative mb-4">
          <div for="name" class="text-md font-bold  leading-7 text-gray-600">File hash (SHA256)</div>
          <div class="flex-col">
            <div type="text" id="name" name="name" class="w-full rounded px-3 text-base  leading-8 text-gray-600 transition-colors duration-200 ease-in-out break-words">{fileHash}</div>
          </div>
        </div>
      </div>
    </div>
    <a class=" juustify-center inline-flex items-center rounded-lg border border-green-600 text-green-600 py-2 px-5 w-64 mt-4 shadow-lg text-center hover:bg-green-600 hover:text-white focus:outline-none" id="confirm" href={proposedURL} target="_blank" rel="noreferrer">
      {#if load}
        <svg role="status" class="mr-4 h-5 w-5 animate-spin rounded-full border-4 border-white border-r-green-600 text-center" viewBox="0 0 24 24" />
      {:else}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6 text-center">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
          />
        </svg>
      {/if}
      <span class="title-font ml-2 font-bold text-base text-center">Publish to Blockchain</span>
    </a>
  </div>
</div>
