<script>
  import Successmsg from './successmsg.svelte';
  import Loading from './Loading.svelte';
  import axios from 'axios';
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  import { navigate } from 'svelte-routing';
  import BlobPreview from './blob-preview.svelte';
  import HeaderFileupload from './header_fileupload.svelte';
  import PreviewQrCard from './preview_qrCard.svelte';
  import PrevFooter from './prev_footer.svelte';

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
  // /**
  //  * getting saved blob image from localstorage
  //  */
  // let blobimage = localStorage.getItem('blobimage');
  // console.log(blobimage);

  // /**
  //  * getting saved pdf blob and converting it as the base64 string
  //  */
  // let blob = localStorage.getItem('blobpdf');
  // console.log(blob);

  // let signature;
  let issuerName;
  let loading = false;

  // let action = 'Add to Queue';
  // let receiver, signatory, Document_title, Doc_Type;
  let success = false;

  let load = false;

  onMount(async () => {
    const { data } = await axios.get('https://test.swagger.print2block.in/account/user', {
      headers: {
        'x-access-token': token,
      },
    });
    issuerName = data.userData.name;
    console.log(data.userData.name);
  });

  /**
   * Submitting file for generating filehash
   */
  const onSubmitFile = async () => {
    console.log('hello');
    console.log(File);
    if (File.name != '') {
      const { data } = await axios.post(
        'https://test.swagger.print2block.in/docs/add-file',
        {
          documentID: documentID,
          file: File,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'x-access-token': token,
          },
        },
      );
      console.log(data);
      dispatch('filehash', data.fileHash);
      localStorage.setItem('filehash', data.fileHash);
      let fileHash = localStorage.getItem('filehash');
      console.log('filehash', fileHash);

      if (data.fileHash) {
        fileavailable = true;
        dispatch('fileavailable', fileavailable);
        status = 'Uploaded Sucessfully';
      }
    }
  };

  // getting signature Id from the user
  const getsignature = async () => {
    loading = true;
    const { data } = await axios.get(`https://ecdsa.test.print2block.in/sign/5f52329ba0ae7d28650a9fe7${fileHash}${dataHash}`);
    console.log(data);
    dispatch('signature', data);
    console.log('sign created');
    success = true;
    loading = false;
    localStorage.setItem('signature', data);
    let signature = localStorage.getItem('signature');
    console.log(signature);
  };

  const publishdoc = async () => {
    load = true;
    // loading = true;
    let signature = localStorage.getItem('signature');
    console.log('signature', signature);
    let documentID = localStorage.getItem('documentID');
    console.log('documentID', documentID);
    const { data } = await axios.post(
      'https://test.swagger.print2block.in/docs/publish',
      {
        documentID: documentID,
        signature: signature,
      },
      {
        headers: {
          'x-access-token': token,
        },
      },
    );
    console.log(data);

    console.log(data.state);
    dispatch('push', data);
    load = false;
    // loading = false;
    // success = true;
    // if ((action = 'publish')) {
    //   window.location.assign(proposedURL, '_blank');
    //   // navigate({proposedURL})
    // }
  };

  document.addEventListener('DOMContentLoaded', (e) => {
    const button2 = document.getElementById('button2');
    const button3 = document.getElementById('button3');
    const loaded = document.getElementById('loaded');

    // whenever the enter button is clicked
    button2.addEventListener('click', (e) => {
      button2.style.visibility = 'hidden';
      console.log('adding to queue');
      // loading = "visible"
      // success.style.visibility = 'hidden';
      loaded.style.visibility = 'visible';
      // alert("adding to queue")
      setTimeout(() => {
        // at least 5 seconds are gone => show the "publish" button
        console.log('5 seconds are gone...');
        button3.style.visibility = 'visible';
        loaded.style.visibility = 'hidden';
        // loading="hidden"
        console.log('hidden');
      }, 5000);
    });

    // when the publish button is clicked
    button3.addEventListener('click', (e) => {
      // button3.style.visibility = 'hidden';
      setTimeout(() => {
        navigate('/pre');
      }, 500);
      console.log('document published');
    });
  });

  const releaseDoc = async () => {
    // let documentID = localStorage.getItem('documentID');
    const { data } = await axios.get(`https://test.swagger.print2block.in/docs/release?documentID=${documentID}`, {
      headers: {
        'x-access-token': token,
      },
    });
    console.log(data);
    console.log(data.success);
    if (data) {
      navigate(`/add-file/${documentID}`);
    }
  };

  //disabling release button
  // let disabled = false;
  // const disablebutton1 = () => {
  //   document.getElementById('button1').disabled = true;
  // };
</script>

{#if loading}
  <Loading />
{:else}
  <!-- <div class=" flex w-full"> -->
    <div class=" mx-auto w-full h-auto flex flex-wrap pt-3 xl:flex-nowrap">
      <div class="flex w-fullrounded-lg xl:mr-10 xl:w-3/5 lg:w-3/5">
        <BlobPreview />
      </div>
      <div class="flex w-full flex-col xl:w-2/5 lg:w-2/5">
        <PreviewQrCard {id} {bgcolor} />
        <!-- <hr class="mt-4 mt-1 h-0.5 w-full bg-gray-300" /> -->
        <div class="border-2 border-gray-200 shadow-lg rounded-lg mt-5" style="background:{bgcolor}">
          <div class="mt-5 ml-2">
            <div class="relative ">
              <div for="name" class="text-md font-bold uppercase leading-7 text-white">Receiver</div>
              <div class="flex-col">
                <div type="text" id="name" name="name" class="w-full rounded px-3 text-sm leading-8 text-white transition-colors duration-200 ease-in-out">Name</div>
                <div type="text" id="name" name="name" class="text-md w-full rounded py-0 px-6 leading-8 text-white transition-colors duration-200 font-bold ease-in-out">john</div>
              </div>
            </div>
            <div class="relative">
              <div for="name" class="text-md font-bold uppercase leading-7 text-white">Document</div>
              <div class="flex-col">
                <div type="text" id="name" name="name" class="w-full rounded px-3 text-sm leading-8 text-white transition-colors duration-200 ease-in-out">Document type</div>
                <div type="text" id="name" name="name" class="text-md w-full rounded py-0 px-6 leading-8 text-white transition-colors duration-200 ease-in-out font-bold">pdf</div>
              </div>
            </div>

            <div class="relative">
              <div for="name" class="text-md font-bold uppercase leading-7 text-white">Issuer</div>
              <div class="flex-col">
                <div type="text" id="name" name="name" class="w-full rounded px-3 text-sm leading-8 text-white transition-colors duration-200 ease-in-out">Signatory</div>
                <div type="text" id="name" name="name" class="text-md w-full rounded py-0 px-6 leading-8 text-white transition-colors duration-200 ease-in-out font-bold">arun</div>
              </div>
            </div>
            <div class="relative mb-5">
              <div type="text" id="name" name="name" class="w-full rounded px-3 text-sm leading-8 text-white transition-colors duration-200 ease-in-out">Document Title</div>
              <div type="text" id="name" name="name" class="text-md w-full rounded py-0 px-6 leading-8 text-white transition-colors duration-200 ease-in-out font-bold">cerfificate</div>
            </div>
          </div>
        </div>

        <div id="loaded" style="visibility: hidden" class="mt-5 text-lg text-black bg-white justify-center mx-auto border border-blue-800 rounded-lg px-3 py-1">Please wait... while we're adding your document to queue.</div>
        {#if success}
          <Successmsg />
        {/if}
      </div>
    </div>
    <!-- <div class="flex absolute fixed bottom-0 right-0  w-full mx-auto rounded-lg border-2 border-gray-200">
      <div class="mx-auto relative justify-between flex flex-col  px-5 py-5 md:flex-row">
        <div class="mb-6 flex w-full pr-0 text-center md:mb-0 md:w-auto md:pr-10 md:text-left">
          <h1 class="title-font text-md font-bold text-red-600 md:text-3xl">Please verify document details before proceed</h1>
        </div>
        <div class="mx-auto flex flex-shrink-0 items-center space-x-4 md:ml-auto md:mr-0">
          <button class="inline-flex items-center rounded-lg border border-green-600 text-green-600 py-3 px-5 hover:bg-green-600 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z" />
            </svg>
            <span class="title-font ml-2 font-bold text-base">Release</span>
          </button>
          <button class="inline-flex items-center rounded-lg border border-green-600 text-green-600 py-3 px-5 hover:bg-green-600 hover:text-white focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6 ">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
              />
            </svg>
            <span class="title-font ml-2 font-bold text-base">Confirm</span>
          </button>
        </div>
      </div>
    </div> -->
  <!-- </div> -->
{/if}
