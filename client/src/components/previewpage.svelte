<script>
  import Successmsg from './successmsg.svelte';
  import axios from 'axios';
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  import { navigate } from 'svelte-routing';
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
  let signature;
  let issuerName;
  let action = 'Add to Queue';
  let Signatory, Document_title, Doc_Type;
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

    const { data } = await axios.get(`https://ecdsa.test.print2block.in/sign/5f52329ba0ae7d28650a9fe7${fileHash}${dataHash}`);
    console.log(data);
    dispatch('signature', data);
    success = true;
    localStorage.setItem('signature', data);
    let signature = localStorage.getItem('signature');
    console.log(signature);
  };

  const publishdoc = async () => {
    load = true;
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
    // success = true;
    if ((action = 'publish')) {
      window.location.assign(proposedURL, '_blank');
      // navigate({proposedURL})
    }
  };

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

  let animate = document.querySelector('#particles-js');
  console.log(animate);
  animate.style.display = 'none';
  const grads = [
    'linear-gradient(to right, rgb(234, 88, 12), rgb(249, 115, 22))',
    'radial-gradient(at center bottom, rgb(120, 53, 15), rgb(253, 224, 71))',
    'radial-gradient(at center top, rgb(209, 213, 219), rgb(192, 38, 211), rgb(234, 88, 12))',
    'linear-gradient(to right, rgb(239, 68, 68), rgb(153, 27, 27))',
    'linear-gradient(to right, rgb(16, 185, 129), rgb(101, 163, 13))',
    'linear-gradient(rgb(17, 24, 39), rgb(75, 85, 99))',
    'linear-gradient(to right, rgb(15, 23, 42), rgb(88, 28, 135), rgb(15, 23, 42))',
    'linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)',
    'linear-gradient( 63.1deg,  rgba(5,23,111,1) 16.4%, rgba(24,95,240,1) 64.5% )',
  ];

  const changeGradient = () => {
    let random = Math.floor(Math.random() * grads.length);
    console.log(random);
    animate.style.background = grads[random];
  };
</script>

<!-- <section class="text-gray-600 relative"> -->
<!-- <div class="rounded-lg bg-blue-100 p-4"> -->
<!-- <div class="container pt-2 mx-auto flex md:flex-nowrap flex-wrap md:w-flex-col">
    <div class="lg:w-3/5 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden md:mr-10 flex w-full md:flex-row space-y-4">
      <img class="w-full h-full rounded-md " src={imgurl} alt="" />
    </div>
    <div class="lg:w-2/5 md:w-1/2 bg-blue-300 flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0 p-5 rounded-md shadow-lg">
      <div class="flex mb-4">
        <img class="h-24 w-24 overflow-hidden rounded object-cover object-center border-2 border-white" src={qr} alt="qrcode" />
        <img class="h-24 w-24 ml-2 overflow-hidden rounded object-cover object-center border-2 border-white" src="/assets/sample.jpg" alt="logo" />
      </div>
      <hr class="w-full mb-4" />

      <div class="relative mb-4">
        <div for="name" class="leading-7 text-md font-bold text-gray-600 uppercase">Issuer</div>
        <div type="text" id="name" name="name" class="w-full bg-white rounded border border-gray-300  text-md text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">{issuerName}</div>
      </div>
      <div class="relative mb-4">
        <div for="name" class="leading-7 text-md font-bold  text-gray-600">DATE PUBLISHED</div>
        <div type="text" id="name" name="name" class="w-full bg-white rounded border border-gray-300  text-md break-words text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">Wed Aug 17 2022 22:49:04 GMT+0530 (India Standard Time)</div>
      </div>
      <div class="relative mb-4">
        <div for="name" class="leading-7 text-md font-bold  text-gray-600">DOCUMENT_ID</div>
        <div type="text" id="name" name="name" class="w-full bg-white rounded border border-gray-300  text-md break-words text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">{documentID}</div>
      </div>
      <div class="relative mb-4">
        <div for="name" class="leading-7 text-md font-bold  text-gray-600">FILEHASH</div>
        <div type="text" id="name" name="name" class="w-full bg-white rounded border border-gray-300  text-md break-words text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">{fileHash}</div>
      </div>
      <div class="relative mb-4">
        <div for="name" class="leading-7 text-md font-bold  text-gray-600 uppercase">datahash</div>
        <div type="text" id="name" name="name" class="w-full bg-white rounded border border-gray-300 break-words text-md text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">{dataHash}</div>
      </div>
      <div class="p-2 w-full flex justify-between">
        <button class="flex mx-auto text-white bg-blue-600 border-0 py-2 px-8 focus:outline-none  rounded-lg text-lg uppercase" on:click|preventDefault={getsignature}>
          {#if load}
            <svg role="status" class="mr-3 h-5 w-5 animate-spin rounded-full border-4 border-white border-r-indigo-500" viewBox="0 0 24 24" />
          {/if}
          Sign</button>
        <a  class="flex mx-auto text-white bg-blue-600 border-0 py-2 px-8 focus:outline-none  rounded-lg text-lg uppercase" href={proposedURL} on:click|preventDefault={publishdoc}> 
          {#if load}
          <svg role="status" class="mr-3 h-5 w-5 animate-spin rounded-full border-4 border-white border-r-indigo-500" viewBox="0 0 24 24" />
        {/if}
        {action}</a>
      </div>
    </div>
  </div> -->
<!-- </div> -->
<!-- </section> -->

<section class="relative text-gray-600">
  {#if success}
    <Successmsg />
  {/if}
  <div class="md:w-flex-col container mx-auto flex flex-wrap pt-3 md:flex-nowrap">
    <div class="flex w-full h-full space-y-4 overflow-hidden rounded-lg md:mr-10 md:w-1/2 md:flex-row lg:w-3/5">
      <div class="flex w-full flex-col">
        <img class="h-[600px] w-full object-cover rounded-md border-2 border-gray-200" src={imgurl} alt="document" />
        <div class="mt-5">
          <div class="pointer-events-auto flex w-full divide-x divide-gray-200 rounded-lg border-2 border-gray-200 bg-white shadow-lg ring-1 ring-blue-500 ring-opacity-5">
            <div class="mt-1 flex w-0 flex-1 items-center p-4">
              <div class="w-full">
                <p class="text-2xl font-medium text-rose-500">Attention</p>
                <p class="mt-1 text-lg text-red-800">kindly verify the document details before proceed. This precess cannot be reversed</p>
              </div>
            </div>
            <div class="flex">
              <div class="flex flex-col divide-y divide-gray-300">
                <div class="flex h-0 flex-1">
                  <button type="button" class="flex w-full items-center justify-center rounded-none rounded-tr-lg border border-transparent bg-slate-200 hover:bg-blue-500 hover:text-white px-8 py-2 text-lg font-medium text-black focus:z-10 focus:outline-none focus:ring-2 focus:ring-indigo-500" on:click|preventDefault={onSubmitFile}>Upload</button>
                </div>
                <div class="flex h-0 flex-1">
                  <button id="button1" type="button" class="flex w-full items-center justify-center rounded-none rounded-br-lg border border-transparent bg-slate-200 px-8 py-2 text-lg font-medium text-black hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:bg-red-400" on:click={releaseDoc}>Release</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style:background-color={changeGradient()} class=" mt-8 flex w-full flex-col rounded-md p-5 shadow-lg md:ml-auto md:mt-0 md:w-1/2 md:py-8 lg:w-2/5">
      <div class="h-30 flex w-full flex-col gap-4 rounded-lg p-2">
        <div class="order-2 flex gap-3 lg:order-none">
          <img class="h-24 w-24 overflow-hidden rounded object-cover object-center" alt="qrcode" src={qr} />
          <img
            class="h-24 w-24 overflow-hidden rounded object-cover object-center"
            alt="logo"
            src="data:image/jpeg;base64,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"
          />

          <div class="flex flex-col gap-10">
            <div id="docid" class="flex rounded-md px-3 py-1 text-xs font-medium text-black">ISSUER NAME: {issuerName}</div>
            <div class="flex rounded-md px-3 py-1 text-xs font-medium uppercase text-black">DOCUMENT_ID: {documentID}</div>
          </div>
        </div>
        <!-- <div class="flex flex-col order-1 lg:order-none">
            <h1 class="text-white text-base font-normal mt-2">SIDBI (DEMO)</h1>
            <h1 class="text-white text-lg font-bold">Fixed Deposit Report</h1>
          </div> -->
      </div>
      <hr class="mt-4 mb-4 h-0.5 w-full bg-gray-300" />

      <div class="relative mb-4">
        <div for="name" class="text-md font-bold uppercase leading-7 text-gray-600">Issuer</div>
        <div class="flex-col">
          <div type="text" id="name" name="name" class="w-full rounded px-3 text-sm leading-8 text-gray-700 transition-colors duration-200 ease-in-out">Name</div>
          <div type="text" id="name" name="name" class="text-md w-full rounded py-0 px-6 leading-8 text-gray-700 transition-colors duration-200 ease-in-out">{issuerName}</div>
        </div>
      </div>
      <div class="relative mb-4">
        <div for="name" class="text-md font-bold uppercase leading-7 text-gray-600">Document</div>
        <div class="flex-col">
          <div type="text" id="name" name="name" class="w-full rounded px-3 text-sm leading-8 text-gray-700 transition-colors duration-200 ease-in-out">Document type</div>
          <div type="text" id="name" name="name" class="text-md w-full rounded py-0 px-6 leading-8 text-gray-700 transition-colors duration-200 ease-in-out">{Doc_Type}</div>
        </div>
      </div>
      <div class="relative mb-4">
        <div type="text" id="name" name="name" class="w-full rounded px-3 text-sm leading-8 text-gray-700 transition-colors duration-200 ease-in-out">Signatory</div>
        <div type="text" id="name" name="name" class="text-md w-full rounded py-0 px-6 leading-8 text-gray-700 transition-colors duration-200 ease-in-out">{Signatory}</div>
      </div>
      <div class="relative mb-4">
        <div type="text" id="name" name="name" class="w-full rounded px-3 text-sm leading-8 text-gray-700 transition-colors duration-200 ease-in-out">Date Expired</div>
        <div type="text" id="name" name="name" class="text-md w-full rounded py-0 px-6 leading-8 text-gray-700 transition-colors duration-200 ease-in-out">Wed Aug 17 2022 22:49:04 GMT+0530 (India Standard Time)</div>
      </div>
      <div class="relative mb-4">
        <div type="text" id="name" name="name" class="w-full rounded px-3 text-sm leading-8 text-gray-700 transition-colors duration-200 ease-in-out">Document Title</div>
        <div type="text" id="name" name="name" class="text-md w-full rounded py-0 px-6 leading-8 text-gray-700 transition-colors duration-200 ease-in-out">{Document_title}</div>
      </div>

      <div class="flex w-full justify-between p-2">
        <button class="mx-auto flex rounded-lg border-0 bg-blue-600 py-2 px-8 text-base uppercase text-white focus:outline-none " on:click|preventDefault={getsignature}> Sign</button>

        <!-- {#if (action = "add to queue")} -->
        <button id="button2" class="mx-auto flex rounded-lg border-0 bg-blue-600 py-2 px-8 text-base uppercase text-white focus:outline-none" href={proposedURL} target="_blank" on:click|once={disablebutton1} rel="noreferrer" on:click|preventDefault={publishdoc}>
          {#if load}
            <svg role="status" class="mr-3 h-5 w-5 animate-spin rounded-full border-4 border-white border-r-indigo-500" viewBox="0 0 24 24" />
          {/if}{action}</button
        >
        <!-- {/if} -->
      </div>
    </div>
  </div>
</section>
