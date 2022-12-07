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
  let receiver, signatory, Document_title, Doc_Type;
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
    // if ((action = 'publish')) {
    //   window.location.assign(proposedURL, '_blank');
    //   // navigate({proposedURL})
    // }
  };

  window.addEventListener('DOMContentLoaded', (e) => {
    const button2 = document.getElementById('button2');
    const button3 = document.getElementById('button3');
    const scaryFace = document.getElementById('scaryFace');

    // whenever the enter button is clicked
    button2.addEventListener('click', (e) => {
      button2.style.visibility = 'hidden';
      console.log('Ahh, jumpscare!');
      scaryFace.style.visibility = 'visible';
      setTimeout(() => {
        // at least 3 seconds are gone => show the "continue" button
        console.log('3 seconds are gone...');
        button3.style.visibility = 'visible';
        scaryFace.style.visibility = 'hidden';
        console.log('hidden');
      }, 3000);
    });

    // when the continue button is clicked
    button3.addEventListener('click', (e) => {
      button3.style.visibility = 'hidden';
      navigate("/pre")
      console.log('Continue with whatever you want to do now');
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

  // let animate = document.querySelector('#particles-js');
  // console.log(animate);
  // animate.style.display = 'none';
  // const grads = [
  //   'linear-gradient(to right, rgb(234, 88, 12), rgb(249, 115, 22))',
  //   'radial-gradient(at center bottom, rgb(120, 53, 15), rgb(253, 224, 71))',
  //   'radial-gradient(at center top, rgb(209, 213, 219), rgb(192, 38, 211), rgb(234, 88, 12))',
  //   'linear-gradient(to right, rgb(239, 68, 68), rgb(153, 27, 27))',
  //   'linear-gradient(to right, rgb(16, 185, 129), rgb(101, 163, 13))',
  //   'linear-gradient(rgb(17, 24, 39), rgb(75, 85, 99))',
  //   'linear-gradient(to right, rgb(15, 23, 42), rgb(88, 28, 135), rgb(15, 23, 42))',
  //   'linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)',
  //   'linear-gradient( 63.1deg,  rgba(5,23,111,1) 16.4%, rgba(24,95,240,1) 64.5% )',
  // ];

  // const changeGradient = () => {
  //   let random = Math.floor(Math.random() * grads.length);
  //   console.log(random);
  //   animate.style.background = grads[random];
  // };
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
  <div class="md:w-flex-col container mx-auto flex flex-wrap pt-3 md:flex-nowrap">
    <div class="flex w-full h-full space-y-4 overflow-hidden rounded-lg md:mr-10 md:w-1/2 md:flex-row lg:w-3/5">
      <div class="flex w-full flex-col">
        <img class="h-[600px] w-full object-cover rounded-md border-2 border-gray-200" src={imgurl} alt="document" />
        <div class="mt-5">
          <div class="pointer-events-auto flex w-full divide-x divide-gray-200 rounded-lg border-2 border-gray-200 bg-white shadow-lg ring-1 ring-blue-500 ring-opacity-5">
            <div class="mt-1 flex w-0 flex-1 items-center p-4">
              <div class="w-full">
                <p class="text-2xl font-medium text-rose-500">Attention</p>
                <p class="mt-1 text-lg text-red-800">kindly verify the document details before proceed. You cannot release after publishing</p>
              </div>
            </div>
            <div class="flex">
              <div class="flex flex-col divide-y divide-gray-300">
                <div class="flex h-0 flex-1">
                  <button type="button" class="flex w-full items-center justify-center rounded-none rounded-tr-lg border border-transparent bg-slate-200 hover:bg-blue-500 hover:text-white px-8 py-2 text-base font-medium text-black focus:z-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 uppercase" on:click|preventDefault={onSubmitFile}>Upload</button>
                </div>
                <!-- {#if (success = false)} -->
                <div class="flex h-0 flex-1">
                  <button id="button1" type="button" class="flex w-full items-center justify-center rounded-none rounded-br-lg border border-transparent bg-slate-200 px-8 py-2 text-base font-medium text-black hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:bg-red-400 uppercase" on:click={releaseDoc}>Release</button>
                </div>
                <!-- {/if} -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class=" mt-8 flex w-full flex-col rounded-md p-5 shadow-lg md:ml-auto md:mt-0 md:w-1/2 md:py-8 lg:w-2/5 bg-blue-200">
      <div class="h-30 flex w-full flex-col gap-4 rounded-lg p-2">
        <div class="order-2 flex gap-3 lg:order-none">
          <img class="h-24 w-24 overflow-hidden rounded object-cover object-center border-2 border-gray-200" alt="qrcode" src={qr} />
          <img class="h-24 w-24 overflow-hidden rounded object-cover object-center border-2 border-gray-200" alt="logo" src="/assets/sample.jpg" />

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
      <hr class="mt-4 mt-1 h-0.5 w-full bg-gray-300" />

      <div class="relative">
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
      <!-- <div class="relative mb-4">
        <div type="text" id="name" name="name" class="w-full rounded px-3 text-sm leading-8 text-gray-700 transition-colors duration-200 ease-in-out">Signatory</div>
        <div type="text" id="name" name="name" class="text-md w-full rounded py-0 px-6 leading-8 text-gray-700 transition-colors duration-200 ease-in-out">{signatory}</div>
      </div> -->
      <div class="relative ">
        <div type="text" id="name" name="name" class="w-full rounded px-3 text-sm leading-8 text-gray-700 transition-colors duration-200 ease-in-out">Date Expired</div>
        <div type="text" id="name" name="name" class="text-md w-full rounded py-0 px-6 leading-8 text-gray-700 transition-colors duration-200 ease-in-out font-bold">Wed Dec 17 2022 22:49:04 GMT+0530 (India Standard Time)</div>
      </div>
      <div class="relative">
        <div type="text" id="name" name="name" class="w-full rounded px-3 text-sm leading-8 text-gray-700 transition-colors duration-200 ease-in-out">Document Title</div>
        <div type="text" id="name" name="name" class="text-md w-full rounded py-0 px-6 leading-8 text-gray-700 transition-colors duration-200 ease-in-out font-bold">cerfificate</div>
      </div>

      <div class="flex w-full justify-between p-2">
        <button class="mx-auto flex rounded-lg border-0 bg-blue-600 py-2 px-8 text-base uppercase text-white focus:outline-none " on:click|preventDefault={getsignature}> Sign</button>

        <!-- {#if (action = "add to queue")} -->
        <button id="button2" class="mx-auto flex rounded-lg border-0 bg-blue-600 py-2 px-8 text-base uppercase text-white focus:outline-none" on:click|once={disablebutton1} rel="noreferrer" on:click|preventDefault={publishdoc}>
          {#if load}
            <svg role="status" class="mr-3 h-5 w-5 animate-spin rounded-full border-4 border-white border-r-indigo-500" viewBox="0 0 24 24" />
          {/if}Queue</button
        >
        <button id="button3" class="mx-auto flex rounded-lg border-0 bg-blue-600 py-2 px-8 text-base uppercase text-white focus:outline-none " href={proposedURL} target="_blank" style="visibility: hidden" rel="noreferrer" on:click|preventDefault={publishdoc}>
          {#if load}
            <svg role="status" class="mr-3 h-5 w-5 animate-spin rounded-full border-4 border-white border-r-indigo-500" viewBox="0 0 24 24" />
          {/if}Publish</button
        >
        <!-- {/if} -->
      </div>
      <div id="scaryFace" style="visibility: hidden" class="mt-5 text-lg text-green-600 justify-center mx-auto" >loading please wait...</div>
      {#if success}
        <Successmsg />
      {/if}
    </div>
  </div>
</section>

<!-- <style>
  .hide {
    display: none;
  }
</style> -->
