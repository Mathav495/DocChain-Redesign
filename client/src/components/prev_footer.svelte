<script>
  import axios from 'axios';
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  import { navigate } from 'svelte-routing';
  import ConfirmMsg from './confirm_msg.svelte';
  import SignidMsg from './signid_msg.svelte';
  import QueueMsg from './Queue_msg.svelte';
  const dispatch = createEventDispatcher();
  let load = false;
  export let confirnmsg;
  export let signmsg;
  export let Queue_msg;

  signmsg = false;
  Queue_msg = false;

  let issuerName;

  let token = localStorage.getItem('token');
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
  let documentID = localStorage.getItem('documentID');

  onMount(async () => {
    const { data } = await axios.get('https://test.swagger.print2block.in/account/user', {
      headers: {
        'x-access-token': token,
      },
    });
    issuerName = data.userData.name;
    console.log(data.userData.name);
  });

  // getting signature Id from the user
  const getsignature = async () => {
    load = true;
    signmsg = true;
    const { data } = await axios.get(`https://ecdsa.test.print2block.in/sign/5f52329ba0ae7d28650a9fe7${fileHash}${dataHash}`);
    console.log(data);
    dispatch('signature', data);
    setTimeout(() => {
      signmsg = false;
    }, 1500);
    console.log('sign created');
    // success = true;
    load = false;
    localStorage.setItem('signature', data);
    let signature = localStorage.getItem('signature');
    console.log(signature);
  };

  const publishdoc = async () => {
    load = true;
    Queue_msg = true;
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
    setTimeout(() => {
      Queue_msg = false;
    }, 1500);
    load = false;
    // window.location.assign(proposedURL, '_blank');
    navigate('/final');
    // }
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
      navigate('/publish');
    }
  };

  //disabling release button
  // let disabled = false;
  const disablerelease = () => {
    document.getElementById('release').disabled = true;
  };

  document.addEventListener('DOMContentLoaded', (e) => {
    const confirm = document.getElementById('confirm');
    const sign = document.getElementById('sign');
    const publish = document.getElementById('publish');
    // e.stopPropagation();

    // whenever the enter button is clicked
    window.onload = function () {
      confirm.addEventListener('click', (e) => {
        confirm.style.display = 'none';
        sign.style.display = 'inline-flex';
        console.log('sign-triggered');
      });
      sign.addEventListener('click', (e) => {
        sign.style.display = 'none';
        confirm.style.display = 'none';
        publish.style.display = 'inline-flex';
        console.log('publishing triggered');
      });
    };
  });

  const hideSignmsg = () => {
    signmsg = false;
  };
  const hideQueuemsg = () => {
    signmsg = false;
  };
</script>

{#if signmsg}
  <SignidMsg position="absolute bottom-20 right-2" on:click={hideSignmsg} />
{:else if Queue_msg}
  <QueueMsg position="absolute bottom-20 right-2" on:click={hideQueuemsg} />
{/if}
<div class="fixed bottom-0 right-0 lg:w-5/6 mr-4 mx-auto justify-center items-center bg-black px-4 sm:w-full md:w-full md:justify-center md:items-center sm:text-center md:text-center md:flex-col sm:flex-col md:ml-auto sm:ml-auto">
  <div class="mx-auto flex flex-col items-center px-3 py-3 md:flex-row sm:flex-col md:justify-center md:items-center sm:mx-auto">
    <div class=" flex w-full pr-0 text-center md:mb-0 md:w-auto md:pr-10 md:text-left">
      <h1 class="title-font text-2xl font-medium text-red-600 md:text-2xl">Please verify document details before proceed</h1>
    </div>
    <div class="mx-auto flex flex-shrink-0 items-center space-x-6 md:ml-auto md:mr-0">
      <button class=" inline-flex items-center rounded-lg border border-red-600 text-red-600 py-2 px-5 hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:bg-red-200" on:click={releaseDoc} id="release">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
        <span class="title-font ml-2 font-bold text-base">Release</span>
      </button>
      <button class="inline-flex items-center rounded-lg border border-green-600 text-green-600 py-2 px-5 hover:bg-green-600 hover:text-white focus:outline-none" id="confirm" on:load={getsignature}>
        {#if load}
          <svg role="status" class="mr-4 h-5 w-5 animate-spin rounded-full border-4 border-white border-r-green-600" viewBox="0 0 24 24" />
        {:else}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6 ">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
            />
          </svg>
        {/if}
        <span class="title-font ml-2 font-bold text-base">Confirm</span>
      </button>
      <button class="inline-flex items-center rounded-lg border border-green-600 text-green-600 py-2 px-5 hover:bg-green-600 hover:text-white focus:outline-none" style="display: none" on:click={getsignature} id="sign">
        {#if load}
          <svg role="status" class="mr-4 h-5 w-5 animate-spin rounded-full border-4 border-white border-r-green-600" viewBox="0 0 24 24" />
        {:else}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
          </svg>
        {/if}
        <span class="title-font ml-2 font-bold text-base">Sign_ID</span>
      </button>
      <button class="inline-flex items-center rounded-lg border border-green-600 text-green-600 py-2 px-5 hover:bg-green-600 hover:text-white focus:outline-none" style="display: none" id="publish" on:click|once={disablerelease} on:click={publishdoc}>
        {#if load}
          <svg role="status" class="mr-3 h-5 w-5 animate-spin rounded-full border-4 border-white border-r-green-600" viewBox="0 0 24 24" />
        {:else}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" />
          </svg>
        {/if}
        <span class="title-font ml-2 font-bold text-base">Submit</span>
      </button>
    </div>
  </div>
</div>
