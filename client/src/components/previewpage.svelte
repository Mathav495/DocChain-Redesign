<script>
  import { onMount } from 'svelte';
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

  let issuerName;
  let action = 'Add to Queue';
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

  // getting signature Id from the user
  const getsignature = async () => {
    let fileHash = localStorage.getItem('filehash');
    let dataHash = localStorage.getItem('datahash');
    const { data } = await axios.get(`https://ecdsa.test.print2block.in/sign/5f52329ba0ae7d28650a9fe7${fileHash}${dataHash}`);
    console.log(data);
    dispatch('signature', data);
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
    if ((action = 'confirm')) {
      success = true;
      // href = '{proposedURL}';
    } else if ((action = 'publish')) {
      success = false;
    }
  };
</script>

<section class="text-gray-600 relative">
  <!-- <div class="rounded-lg bg-blue-100 p-4"> -->
  <div class="container pt-2 mx-auto flex md:flex-nowrap flex-wrap md:w-flex-col">
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
          Sign</button
        >
        <a class="flex mx-auto text-white bg-blue-600 border-0 py-2 px-8 focus:outline-none  rounded-lg text-lg uppercase" href={proposedURL} on:click|preventDefault={publishdoc}>{action}</a>
      </div>
    </div>
  </div>
  <!-- </div> -->
</section>
