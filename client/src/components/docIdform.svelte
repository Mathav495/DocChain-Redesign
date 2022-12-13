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

<div class="flex flex-col gap-5">
  <!-- 1st div table -->
  <div class="shadow-[0_0px_8px_0px_rgba(0,0,0,0.15)] rounded-lg relative text-center overflow-hidden">
    <div class="w-full flex font-bold text-sm lg:text-lg text-blue-900">
      <div class="hidden lg:block pl-2 py-3 w-2/5 tracking-wider">Document Id</div>
      <div class="block  lg:hidden py-3 w-2/5 tracking-wider">Doc Id</div>

      <div class="hidden lg:block py-3 lg:w-1/4 tracking-wider">Data Hash Generated</div>
      <div class="block lg:hidden py-3 w-1/5 tracking-wider">DataHash</div>

      <div class="hidden lg:block py-3 w-1/4 tracking-wider ">File Hash Generated</div>
      <div class="block lg:hidden py-3 w-1/5 tracking-wider">FileHash</div>

      <div class=" py-3 w-1/5 lg:w-2/5 tracking-wider">Actions</div>
    </div>

    <div class="overflow-y-auto max-h-80 border-2 border-slate-200">
      {#if newData}
        {#each newData as newData}
          <div class=" border-b-2 border-gray-200 flex font-semibold text-sm lg:text-base">
            <div class="py-3 w-2/5 tracking-wider pl-2 lg:text-lg text-xs font-mono text-slate-600">{newData.documentID}</div>
            <div class="py-3 w-1/5 tracking-wider flex justify-center items-center text-slate-900">
              {#if newData.datahash}
                <Tick />
              {:else}
                <Pending />
              {/if}
            </div>
            <div class="py-3 w-1/5 tracking-wider flex justify-center items-center text-slate-900 ">
              {#if newData.filehash}
                <Tick />
              {:else}
                <Pending />
              {/if}
            </div>
            <div class="py-3 w-1/5 lg:w-2/5 tracking-wider flex gap-2 justify-center text-slate-900">
              <div class="pl-0 lg:pl-10">
                <button class="hidden lg:block text-green-500 border-2 border-green-500  py-1 px-2 hover:text-white  justify-center items-center focus:outline-none hover:bg-green-600 rounded text-base">Continue</button>
              </div>
              <div class="has-tooltip">
                <span class="tooltip rounded text-xs p-1 bg-black text-white -mt-7 -ml-5">Continue</span>
                <button>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 cursor-pointer fill-green-500 h-5 block lg:hidden">
                    <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>

              <button class="hidden lg:block text-red-500 border-2 border-red-500 py-1 px-2  hover:text-white justify-center items-center focus:outline-none hover:bg-red-600 rounded text-base">Release</button>

              <div class="has-tooltip">
                <span class="tooltip rounded text-xs p-1 bg-black text-white ml-6">Release</span>
                <button>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 fill-red-500 h-5 block lg:hidden">
                    <path
                      fill-rule="evenodd"
                      d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        {/each}
      {:else}
        <div class="pt-20 w-1/2 mx-auto">
          <h1 class="text-lg font-bold tracking-wide p-2 flex justify-center items-center bg-teal-200 rounded-lg">No Pending ID's</h1>
        </div>
      {/if}
    </div>
  </div>
  <!-- 2st div form -->
  <div class="flex flex-col lg:flex-row gap-5">
    <!-- 1st -->

    <div class="shadow-[0_0px_8px_0px_rgba(0,0,0,0.15)]  w-full px-5 py-8 lg:w-1/2 rounded-md space-y-5">
      <h1 class="text-blue-900 text-xl font-bold tracking-wide">Continue with Existing Document ID</h1>
      <h1 class="text-slate-900 text-lg font-semibold tracking-wide">Please Make sure that you already have the document ID</h1>
      <form on:submit|preventDefault={Continue}>
        <div class="w-3/4 lg:w-96 group">
          <label for="DocumentId" class="text-lg relative block after:content-['*'] after:ml-1 after:text-red-500  text-gray-900 font-semibold tracking-wide">Document Id</label>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5  fill-gray-900 mt-2">
                <path fill-rule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625zM7.5 15a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 15zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H8.25z" clip-rule="evenodd" />
                <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
              </svg>
            </span>
            <input bind:value={ExistingId} type="text" id="DocumentId" placeholder="Enter Document Id" class="w-full text-lg font-bold mt-2 pl-9 placeholder:text-black placeholder:text-lg placeholder:font-medium  border-2 border-slate-500  rounded  focus:border-black focus:ring-1 focus:ring-black outline-none py-1 px-3 leading-8" />
          </div>
        </div>
      </form>
      <div>
        <button class="flex text-green-500 border-2 hover:text-white border-green-500  py-1 px-2 font-bold justify-center items-center focus:outline-none hover:bg-green-600 rounded text-lg">Continue</button>
      </div>
    </div>
    <!-- 2nd -->
    <div class="shadow-[0_0px_8px_0px_rgba(0,0,0,0.15)]  w-full lg:w-1/2 px-5 py-8 space-y-5 rounded-md">
      <h1 class="text-blue-900 text-xl font-bold tracking-wide">For new Document ID</h1>
      <h1 class="text-slate-800 text-lg font-semibold tracking-wide leading-relaxed">If you have any pending document Id's, then here will able to generate document Id for publish documents.</h1>
      <div>
        <button on:click={submitdocid} class="flex text-green-500 hover:text-white border-2 border-green-500  py-1 px-2  justify-center items-center focus:outline-none hover:bg-green-600 rounded text-lg font-bold">Generate Id</button>
      </div>
    </div>
  </div>
</div>

<style>
  .tooltip {
    visibility: hidden;
    position: absolute;
  }

  .has-tooltip:hover .tooltip {
    visibility: visible;
    z-index: 50;
  }
</style>
