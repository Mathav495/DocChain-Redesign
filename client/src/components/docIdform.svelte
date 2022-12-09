<script>
  import axios from 'axios';
  import { navigate } from 'svelte-routing';
  import Tick from '../icons/Tick.svelte';
  import Pending from '../icons/Pending.svelte';
  let documentID,
    ExistingId = '';
  let token,
    qr,
    seconddata,
    getdata = [],
    proposedURL,
    docDetails = [];
  let newData = [];
  token = localStorage.getItem('token');
  newData = JSON.parse(localStorage.getItem('docDetails'));
  console.log(newData);

  const submitdocid = async () => {
    const { data } = await axios.post(
      'https://test.swagger.print2block.in/docs/initiate/?qrcode=true',
      {
        filename: 'sampledoc',
      },
      {
        headers: {
          'x-access-token': token,
        },
      },
    );
    console.log(data);
    if (data.documentID) {
      getdata = JSON.parse(localStorage.getItem('docDetails'));
      console.log(getdata);
      if (!getdata) {
        docDetails = [
          {
            documentID: data.documentID,
            datahash: false,
            filehash: false,
            Status: 'Pending',
          },
        ];
        localStorage.setItem('docDetails', JSON.stringify(docDetails));
      } else {
        console.log(getdata);
        seconddata = {
          documentID: data.documentID,
          datahash: false,
          filehash: false,
          Status: 'Pending',
        };
        getdata = [seconddata, ...getdata];
        console.log(getdata);
        localStorage.setItem('docDetails', JSON.stringify(getdata));
      }
      navigate(`/add-file/${data.documentID}`);

      localStorage.setItem('documentID', data.documentID);
      documentID = localStorage.getItem('documentID');
      console.log(documentID);

      localStorage.setItem('qrcode', data.qr);
      qr = localStorage.getItem('qrcode');
      console.log(qr);
      localStorage.setItem('docURL', data.proposedURL);
      proposedURL = localStorage.getItem('docURL');
      console.log(proposedURL);
    }
  };

  const Continue = () => {
    navigate(`/add-file/${ExistingId}`);
  };
</script>

<div class="flex flex-col gap-10">
  <!-- 1st div table -->
  <div class="shadow-[0_5px_8px_7px_rgba(0,0,0,0.1)] rounded-lg relative  text-center  max-h-64 overflow-auto lg:overflow-hidden">
    <div class="w-full font-bold flex justify-around text-sm lg:text-lg">
      <div class=" py-3  bg-red-100  tracking-wider text-slate-900">Document Id</div>
      <div class=" py-3  bg-green-100 tracking-wider  text-slate-900 ">Data Hash Generated</div>
      <div class=" py-3  bg-yellow-100  text-slate-900 ">File Hash Generated</div>
      <div class=" py-3  bg-slate-100 tracking-wider  text-slate-900 ">Status</div>
      <div class=" py-3  bg-teal-100 tracking-wider  text-slate-900">Actions</div>
    </div>

    <div class="lg:overflow-auto max-h-64 mt-3 border-2 border-slate-200">
      {#if newData}
        {#each newData as newData}
          <div class=" border-b-2 border-gray-200 flex font-semibold text-sm lg:text-base">
            <div class=" py-3 w-1/4 bg-red-100 tracking-wider font-mono text-slate-600">{newData.documentID}</div>
            <div class=" py-3 w-1/5 bg-green-100 tracking-wider flex justify-center items-center  text-slate-900 ">
              {#if newData.datahash}
                <Tick />
              {:else}
                <Pending />
              {/if}
            </div>
            <div class=" py-3 w-1/5 bg-yellow-100 tracking-wider flex justify-center items-center  text-slate-900 ">
              {#if newData.filehash}
                <Tick />
              {:else}
                <Pending />
              {/if}
            </div>

            <div class=" py-3 w-1/5 bg-slate-100 tracking-wider flex gap-2 justify-center text-slate-900 ">
              <button class="flex text-slate-800 border-2 border-yellow-500 py-1 px-2 hover:text-white  justify-center items-center focus:outline-none hover:bg-yellow-600 rounded text-base">Pending</button>
            </div>
            <div class=" py-3  bg-teal-100 tracking-wider flex gap-2 justify-center text-slate-900">
              <button class="flex text-slate-800 border-2 border-indigo-500  py-1 px-2 hover:text-white  justify-center items-center focus:outline-none hover:bg-indigo-600 rounded text-base">Continue</button>
              <button class="flex text-slate-800 border-2 border-red-500 py-1 px-2  hover:text-white justify-center items-center focus:outline-none hover:bg-red-600 rounded text-base">Realese</button>
            </div>
          </div>
        {/each}
      {:else}
        <div class="mt-20 w-1/2 mx-auto">
          <h1 class="text-lg font-bold tracking-wide p-2 flex justify-center items-center bg-teal-200 rounded-lg">No Pending ID's</h1>
        </div>
      {/if}
    </div>
  </div>
  <!-- 2st div form -->
  <div class="flex flex-col lg:flex-row gap-5 mt-0 lg:mt-5">
    <!-- 1st -->
    <div class="shadow-[0_5px_8px_10px_rgba(0,0,0,0.1)] w-full lg:w-1/2 p-2 rounded-md">
      <h1 class="text-slate-900 text-xl mx-8 font-serif tracking-wide mt-5">Continue with Existing Document ID</h1>
      <h1 class="text-slate-900 text-lg mx-8 font-serif tracking-wide mt-5">Please Make sure that you already have the Document ID</h1>
      <form on:submit|preventDefault={Continue} class="mx-8">
        <div class="w-96 mt-8 group">
          <label for="Document Id" class="text-lg relative block after:content-['*'] after:ml-1 after:text-red-500  text-gray-900 group-hover:text-blue-600 font-semibold tracking-wide">Document Id</label>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5  fill-gray-900 mt-2">
                <path fill-rule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625zM7.5 15a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 15zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H8.25z" clip-rule="evenodd" />
                <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
              </svg>
            </span>
            <input bind:value={ExistingId} type="text" id="Document Id" placeholder="Enter Document Id" class="w-full text-lg font-bold mt-2 pl-9 placeholder:text-blue-500 placeholder:text-lg placeholder:font-medium text-black border-2 border-slate-500  rounded  focus:border-black focus:ring-1 focus:ring-black outline-none py-1 px-3 leading-8" />
          </div>
        </div>
        <div class="mt-8 mb-2">
          <button class="flex text-slate-800 border-2 hover:text-white border-indigo-500  py-1 px-2 font-bold justify-center items-center focus:outline-none hover:bg-indigo-600 rounded text-lg">Continue</button>
        </div>
      </form>
    </div>

    <!-- 2nd -->
    <div class="shadow-[0_5px_8px_10px_rgba(0,0,0,0.1)] w-full h-60 lg:h-80 lg:w-1/2 p-1 rounded-md">
      <h1 class="text-slate-800 text-xl mx-8 font-serif font-medium tracking-wide mt-5">For new Document ID</h1>
      <h1 class="text-slate-800 text-lg mx-8 font-serif tracking-wide leading-relaxed mt-5">If you have any pending Document ID's, Then here will able to Generate Document Id for Publish Documents.</h1>
      <div class="mt-8 mx-8">
        <button on:click={submitdocid} class="flex text-slate-800 hover:text-white border-2 border-indigo-500  py-1 px-2  justify-center items-center focus:outline-none hover:bg-indigo-600 rounded text-lg font-bold">Generate Id</button>
      </div>
    </div>
  </div>
</div>
