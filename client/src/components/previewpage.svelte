<script>
  import Successmsg from './successmsg.svelte';
  import Loading from './Loading.svelte';
  import axios from 'axios';
  import { createEventDispatcher } from 'svelte';
  import { navigate } from 'svelte-routing';
  import BlobPreview from './blob-preview.svelte';
  import PreviewQrCard from './preview_qrCard.svelte';

  export let id;
  const dispatch = createEventDispatcher();
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


  // let signature;

  let loading = false;

  let success = false;

  let load = false; 
</script>


  <!-- <div class=" flex w-full"> -->
    <div class=" mx-auto w-full h-auto flex flex-wrap pt-3 xl:flex-nowrap ">
      <div class="flex w-full rounded-lg xl:mr-7 xl:w-3/5 lg:w-3/5">
        <BlobPreview />
      </div>
      <div class="flex w-full flex-col xl:w-2/5 lg:w-2/5">
        <PreviewQrCard {id} {bgcolor} />
        <div class="border-2 border-gray-200 shadow-lg rounded-lg mt-5">
          <div class="mt-5 ml-2">
            <div class="relative ">
              <div for="name" class="text-md font-bold uppercase leading-7 text-gray-600">Receiver</div>
              <div class="flex-col">
                <div type="text" id="name" name="name" class="w-full rounded px-3 text-sm leading-8 text-gray-600 transition-colors duration-200 ease-in-out">Name</div>
                <div type="text" id="name" name="name" class="text-md w-full rounded py-0 px-6 leading-8 text-gray-600 transition-colors duration-200 font-bold ease-in-out">john</div>
              </div>
            </div>
            <div class="relative">
              <div for="name" class="text-md font-bold uppercase leading-7 text-gray-600">Document</div>
              <div class="flex-col">
                <div type="text" id="name" name="name" class="w-full rounded px-3 text-sm leading-8 text-gray-600 transition-colors duration-200 ease-in-out">Document type</div>
                <div type="text" id="name" name="name" class="text-md w-full rounded py-0 px-6 leading-8 text-gray-600 transition-colors duration-200 ease-in-out font-bold">pdf</div>
              </div>
            </div>

            <div class="relative">
              <div for="name" class="text-md font-bold uppercase leading-7 text-gray-600">Issuer</div>
              <div class="flex-col">
                <div type="text" id="name" name="name" class="w-full rounded px-3 text-sm leading-8 text-gray-600 transition-colors duration-200 ease-in-out">Signatory</div>
                <div type="text" id="name" name="name" class="text-md w-full rounded py-0 px-6 leading-8 text-gray-600 transition-colors duration-200 ease-in-out font-bold">arun</div>
              </div>
            </div>
            <div class="relative mb-5">
              <div type="text" id="name" name="name" class="w-full rounded px-3 text-sm leading-8 text-gray-600 transition-colors duration-200 ease-in-out">Document Title</div>
              <div type="text" id="name" name="name" class="text-md w-full rounded py-0 px-6 leading-8 text-gray-600 transition-colors duration-200 ease-in-out font-bold">cerfificate</div>
            </div>
          </div>
        </div>

        <div id="loaded" style="visibility: hidden" class="mt-5 text-lg text-black bg-white justify-center mx-auto border border-blue-800 rounded-lg px-3 py-1">Please wait... while we're adding your document to queue.</div>
        {#if success}
          <Successmsg />
        {/if}
      </div>
    </div>
   

