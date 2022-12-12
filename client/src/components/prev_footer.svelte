<script>
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
</script>

<div class="fixed  bottom-0 right-0 w-5/6 mr-5 mx-auto justify-center items-center bg-black px-4 mb-4">
  <div class="mx-auto flex flex-col items-center px-3 py-3 md:flex-row">
    <div class=" flex w-full pr-0 text-center md:mb-0 md:w-auto md:pr-10 md:text-left">
      <h1 class="title-font text-lg font-medium text-red-600 md:text-3xl">Please verify document details before proceed</h1>
    </div>
    <div class="mx-auto flex flex-shrink-0 items-center space-x-4 md:ml-auto md:mr-0">
      <button class="inline-flex items-center rounded-lg border border-red-600 text-red-600 py-3 px-5 hover:bg-red-600 hover:text-white">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
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
      <button class="inline-flex items-center rounded-lg border border-green-600 text-green-600 py-3 px-5 hover:bg-green-600 hover:text-white focus:outline-none" id="sign">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6 ">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
          />
        </svg>
        <span class="title-font ml-2 font-bold text-base">sign</span>
      </button>
    </div>
  </div>
</div>
