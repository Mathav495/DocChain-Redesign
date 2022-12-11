<script>
  import Successmsg from './successmsg.svelte';
  import Loading from './Loading.svelte';
  import axios from 'axios';
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  import { navigate } from 'svelte-routing';
  import PdfCanvas from './pdfCanvas.svelte';
  // import pdfjsLib from 'pdfjs-dist/build/pdf';
  // import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';

  // let currentpage, _PDFDOC, File, _total_pages;
  // let showpdf;
  let src

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
  let bgcolor = localStorage.getItem('bggradient');
  console.log(bgcolor);

  /**
   * getting saved blob image from localstorage
   */
  let blobimage = localStorage.getItem('blobimage');
  console.log(blobimage);

  /**
   * getting saved pdf blob and converting it as the base64 string
   */
  let blob = localStorage.getItem('blobpdf');
  console.log(blob);

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
    // let fileHash = localStorage.getItem('filehash');
    // let dataHash = localStorage.getItem('datahash');
    // load = true;
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
    // const success = document.getElementById('success');
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
  const disablebutton1 = () => {
    document.getElementById('button1').disabled = true;
  };
</script>

{#if loading}
  <Loading />
{:else}
  <section class="relative text-gray-600 ">
    <div class="xl:w-flex-col mx-auto w-full h-auto flex flex-wrap pt-3 xl:flex-nowrap">
      <div class="flex w-full h-full space-y-4 overflow-hidden rounded-lg xl:mr-10 xl:w-3/5 xl:flex-row lg:w-3/5">
        <div class="flex w-full h-full flex-col">
          {#if (src = blobimage)}
            <img class="h-full w-full object-cover rounded-md border-2 border-gray-200" src={blobimage} alt="document" />
          {:else}
           <PdfCanvas />
          {/if}

          <!-- <div class="mt-5">
            <div class="pointer-events-auto flex w-full divide-x divide-gray-200 rounded-lg border-2 border-gray-200 bg-white shadow-lg ring-1 ring-blue-500 ring-opacity-5">
              <div class="mt-1 flex w-0 flex-1 items-center p-4">
                <div class="w-full">
                  <p class="text-2xl font-bold text-rose-500">Attention !!!</p>
                  <p class="mt-1 text-lg text-red-800">kindly verify the document details before proceed. You cannot release after publishing</p>
                </div>
              </div>
              <div class="flex">
                <div class="flex flex-col divide-y divide-gray-300">
                  <div class="flex h-0 flex-1">
                    <button type="button" class="flex w-full items-center justify-center rounded-none rounded-tr-lg border border-transparent bg-blue-600 hover:bg-blue-500 hover:text-white px-8 py-2 text-base font-medium text-white focus:z-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 uppercase" on:click|preventDefault={onSubmitFile}>Upload</button>
                  </div>
                  <div class="flex h-0 flex-1">
                    <button id="button1" type="button" class="flex w-full items-center justify-center rounded-none rounded-br-lg border border-transparent bg-blue-600 px-8 py-2 text-base font-medium text-white hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:bg-blue-200 uppercase" on:click={releaseDoc}>Release</button>
                  </div>
                </div>
              </div>
            </div>
          </div> -->
          <!-- <input type="file" on:change={onUpload(this.files)} /> -->
        </div>
      </div>
      <div class=" mt-8 flex w-full flex-col rounded-md p-5 shadow-2xl xl:ml-auto xl:mt-0 xl:w-2/5 xl:py-8 lg:w-2/5">
        <div class="h-30 flex w-full flex-col gap-4 rounded-lg p-3 border-2 border-gray-200 shadow-lg bg-gradient-to-r from-indigo-200 via-purple-400 to-teal-500" >
          <div class="order-2 flex gap-3 lg:order-none">
            <img class="h-24 w-24 overflow-hidden rounded object-cover object-center border-2 border-gray-200" alt="qrcode" src={qr} />
            <img class="h-24 w-24 overflow-hidden rounded object-cover object-center border-2 border-gray-200" alt="logo" src="/assets/sample.jpg" />

            <div class="flex flex-col gap-10 ">
              <div class="flex rounded-md px-3 py-1 text-sm  text-black font-bold">{issuerName}</div>
              <div class="flex rounded-md px-3 py-1 text-sm text-black font-bold">{documentID}</div>
            </div>
          </div>
        </div>
        <!-- <hr class="mt-4 mt-1 h-0.5 w-full bg-gray-300" /> -->
        <div class="border-2 border-gray-200 shadow-lg rounded-lg mt-5 ">
          <div class="ml-4 mt-5">
            <div class="relative ">
              <div for="name" class="text-md font-bold uppercase leading-7 text-gray-600">Receiver</div>
              <div class="flex-col">
                <div type="text" id="name" name="name" class="w-full rounded px-3 text-sm leading-8 text-gray-700 transition-colors duration-200 ease-in-out">Name</div>
                <div type="text" id="name" name="name" class="text-md w-full rounded py-0 px-6 leading-8 text-gray-700 transition-colors duration-200 font-bold ease-in-out">john</div>
              </div>
            </div>
            <div class="relative">
              <div for="name" class="text-md font-bold uppercase leading-7 text-gray-600">Document</div>
              <div class="flex-col">
                <div type="text" id="name" name="name" class="w-full rounded px-3 text-sm leading-8 text-gray-700 transition-colors duration-200 ease-in-out">Document type</div>
                <div type="text" id="name" name="name" class="text-md w-full rounded py-0 px-6 leading-8 text-gray-700 transition-colors duration-200 ease-in-out font-bold">pdf</div>
              </div>
            </div>

            <div class="relative">
              <div for="name" class="text-md font-bold uppercase leading-7 text-gray-600">Issuer</div>
              <div class="flex-col">
                <div type="text" id="name" name="name" class="w-full rounded px-3 text-sm leading-8 text-gray-700 transition-colors duration-200 ease-in-out">Signatory</div>
                <div type="text" id="name" name="name" class="text-md w-full rounded py-0 px-6 leading-8 text-gray-700 transition-colors duration-200 ease-in-out font-bold">arun</div>
              </div>
            </div>
            <div class="relative ">
              <div type="text" id="name" name="name" class="w-full rounded px-3 text-sm leading-8 text-gray-700 transition-colors duration-200 ease-in-out">Date Expired</div>
              <div type="text" id="name" name="name" class="text-md w-full rounded py-0 px-6 leading-8 text-gray-700 transition-colors duration-200 ease-in-out font-bold">Wed Dec 17 2022 22:49:04 GMT+0530 (India Standard Time)</div>
            </div>
            <div class="relative mb-5">
              <div type="text" id="name" name="name" class="w-full rounded px-3 text-sm leading-8 text-gray-700 transition-colors duration-200 ease-in-out">Document Title</div>
              <div type="text" id="name" name="name" class="text-md w-full rounded py-0 px-6 leading-8 text-gray-700 transition-colors duration-200 ease-in-out font-bold">cerfificate</div>
            </div>
          </div>
        </div>

        <footer class="flex w-full justify-between  bottom-0 w-full  p-3 border-2 border-gray-200 rounded-lg mt-5 ">

          <!-- <button class="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 border border-indigo-600 bg-gray-50 group uppercase" style="visibility: hidden" id="sign" on:click|preventDefault={getsignature}>
            <span class="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 group-hover:h-full" />
            <span class="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
              <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </span>
            <span class="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
              <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </span>
            <span class="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">sign</span>
          </button> -->

          <button class="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 border border-indigo-600 bg-gray-50 group uppercase" id="sign" on:click|preventDefault={getsignature}>
            <span class="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 group-hover:h-full" />
            <span class="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
              <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </span>
            <span class="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
              <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </span>
            <span class="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">release</span>
          </button>
          <!-- <button class="mx-auto flex rounded-lg border-0 bg-blue-600 py-2 px-8 text-base uppercase text-white focus:outline-none " id="sign" on:click|preventDefault={getsignature}> release</button> -->

          <button id="button2" class="mx-auto flex rounded-lg border-0 bg-blue-600 py-2 px-8 text-base uppercase text-white focus:outline-none" style="visibility: hidden" rel="noreferrer" on:click|preventDefault={publishdoc}>
            {#if load}
              <svg role="status" class="mr-3 h-5 w-5 animate-spin rounded-full border-4 border-white border-r-indigo-500" viewBox="0 0 24 24" />
            {/if}

            Queue</button
          >

          <button class="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 border border-indigo-600 bg-gray-50 group uppercase" href={proposedURL} target="_blank" rel="noreferrer" on:click|once={disablebutton1} on:click|preventDefault={publishdoc}>
            <span class="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 group-hover:h-full" />
            <span class="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
              <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </span>
            <span class="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
              <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </span>
            <span class="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">confirm</span>
          </button>

          <!-- <button id="button3" class="mx-auto flex rounded-lg border-0 bg-blue-600 py-2 px-8 text-base uppercase text-white focus:outline-none " href={proposedURL} target="_blank" rel="noreferrer" on:click|once={disablebutton1} on:click|preventDefault={publishdoc}>
            {#if load}
              <svg role="status" class="mr-3 h-5 w-5 animate-spin rounded-full border-4 border-white border-r-indigo-500" viewBox="0 0 24 24" />
            {/if}

            confirm</button
          > -->
          <!-- {/if} -->
        </footer>
        <div id="loaded" style="visibility: hidden" class="mt-5 text-lg text-black bg-white justify-center mx-auto border border-blue-800 rounded-lg px-3 py-1">Please wait... while we're adding your document to queue.</div>
        {#if success}
          <!-- <div id="success"> -->
          <Successmsg />
          <!-- </div> -->
        {/if}
      </div>
    </div>
  </section>
{/if}

