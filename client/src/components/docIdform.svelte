<script>
  import axios from 'axios';
  import { navigate } from 'svelte-routing';
  import Tick from '../icons/Tick.svelte';
  import X from '../icons/X.svelte';
  let docValue,
    documentID,
    token,
    qr,
    proposedURL,
    docDetails = [];

  token = localStorage.getItem('token');

  const submitdocid = async () => {
    console.log(docValue);
    if (docValue == 'no') {
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

      let getdata = localStorage.getItem('docDetails');
      console.log(getdata);
      if (!getdata) {
        docDetails = [
          {
            documentID: data.documentID,
            datahash: false,
            filehash: false,
            Status: 'Not Pendinged',
          },
        ];
        localStorage.setItem('docDetails', JSON.stringify(docDetails));
      } else {
        let sampleData = JSON.parse(localStorage.getItem('docDetails'));
        console.log(sampleData);
        let seconddata = {
          documentID: data.documentID,
          datahash: false,
          filehash: false,
          Status: 'Not published',
        };
        sampleData = [...sampleData, seconddata];
        console.log(sampleData);
        localStorage.setItem('docDetails', JSON.stringify(sampleData));
      }

      localStorage.setItem('documentID', data.documentID);
      documentID = localStorage.getItem('documentID');
      console.log(documentID);

      localStorage.setItem('qrcode', data.qr);
      qr = localStorage.getItem('qrcode');
      console.log(qr);
      localStorage.setItem('docURL', data.proposedURL);
      proposedURL = localStorage.getItem('docURL');
      console.log(proposedURL);
      if (data) {
        navigate(`/add-file/${documentID}`);
      }
    }
  };
</script>

<div class="flex flex-col gap-10">
  <!-- 1st div table -->
  <div class="shadow-lg rounded-lg relative text-center overflow-auto">
    <div class="bg-sky-100 w-full flex font-semibold text-sm lg:text-base">
      <div class="px-4 py-3 w-1/4  tracking-wider  text-slate-900">Document Id</div>
      <div class="px-4 py-3 w-1/5 tracking-wider  text-slate-900 ">Data Hash Generated</div>
      <div class="px-4 py-3 w-1/5 tracking-wider  text-slate-900 ">File Hash Generated</div>
      <div class="px-4 py-3 w-1/4 tracking-wider  text-slate-900 ">Actions</div>
      <div class=" py-3 tracking-wider w-1/5  text-slate-900">Status</div>
    </div>
    <div class="overflow-auto  max-h-68">
      <div class=" border-b-2 border-gray-200 flex w-full font-semibold text-sm lg:text-base">
        <div class="px-4 py-3 w-1/4 tracking-wider  text-slate-600">638d975742d47d79c84d57c1</div>
        <div class="px-4 py-3 w-1/5 tracking-wider flex justify-center items-center  text-slate-900 ">
          <Tick />
        </div>
        <div class="px-4 py-3 w-1/5 tracking-wider flex justify-center items-center  text-slate-900 ">
          <Tick />
        </div>
        <div class="px-4 py-3 w-1/4 tracking-wider flex gap-2 justify-center text-slate-900 ">
          <button class="bg-green-500 text-slate-700 rounded-md hover:bg-green-600 text-base font-bold p-1 tracking-wide">Publish</button>
          <button class="bg-red-500 text-white rounded-md hover:bg-red-600 text-base font-bold p-1 tracking-wide">Revoke</button>
        </div>
        <div class="px-4 py-3 w-1/5 tracking-wider flex gap-2 justify-center text-slate-900 ">
          <button class="bg-sky-200 text-slate-700 rounded-md hover:bg-sky-300 text-base font-bold p-1 tracking-wide">Pending</button>
        </div>
      </div>

      <div class="border-b-2 border-gray-200  flex w-full font-semibold text-sm lg:text-base">
        <div class="px-4 py-3 w-1/4 tracking-wider  text-slate-600">638d975742d47d79c84d57c1</div>
        <div class="px-4 py-3 w-1/5 tracking-wider flex justify-center items-center  text-slate-900 ">
          <Tick />
        </div>
        <div class="px-4 py-3 w-1/5 tracking-wider flex justify-center items-center  text-slate-900 ">
          <Tick />
        </div>
        <div class="px-4 py-3 w-1/4 tracking-wider flex gap-2 justify-center text-slate-900 ">
          <button class="bg-green-500 text-slate-700 rounded-md hover:bg-green-600 text-base font-bold p-1 tracking-wide">Publish</button>
          <button class="bg-red-500 text-white rounded-md hover:bg-red-600 text-base font-bold p-1 tracking-wide">Revoke</button>
        </div>
        <div class="px-4 py-3 w-1/5 tracking-wider flex gap-2 justify-center text-slate-900 ">
          <button class="bg-sky-200 text-slate-700 rounded-md hover:bg-sky-300 text-base font-bold p-1 tracking-wide">Pending</button>
        </div>
      </div>
      <div class="border-b-2 border-gray-200  flex w-full font-semibold text-sm lg:text-base">
        <div class="px-4 py-3 w-1/4 tracking-wider  text-slate-600">638d975742d47d79c84d57c1</div>
        <div class="px-4 py-3 w-1/5 tracking-wider flex justify-center items-center  text-slate-900 ">
          <Tick />
        </div>
        <div class="px-4 py-3 w-1/5 tracking-wider flex justify-center items-center  text-slate-900 ">
          <Tick />
        </div>
        <div class="px-4 py-3 w-1/4 tracking-wider flex gap-2 justify-center text-slate-900 ">
          <button class="bg-green-500 text-slate-700 rounded-md hover:bg-green-600 text-base font-bold p-1 tracking-wide">Publish</button>
          <button class="bg-red-500 text-white rounded-md hover:bg-red-600 text-base font-bold p-1 tracking-wide">Revoke</button>
        </div>
        <div class="px-4 py-3 w-1/5 tracking-wider flex gap-2 justify-center text-slate-900 ">
          <button class="bg-sky-200 text-slate-700 rounded-md hover:bg-sky-300 text-base font-bold p-1 tracking-wide">Pending</button>
        </div>
      </div>
      <div class="border-b-2 border-gray-200  flex w-full font-semibold text-sm lg:text-base">
        <div class="px-4 py-3 w-1/4 tracking-wider  text-slate-600">638d975742d47d79c84d57c1</div>
        <div class="px-4 py-3 w-1/5 tracking-wider flex justify-center items-center  text-slate-900 ">
          <X />
        </div>
        <div class="px-4 py-3 w-1/5 tracking-wider flex justify-center items-center  text-slate-900 ">
          <X />
        </div>
        <div class="px-4 py-3 w-1/4 tracking-wider flex gap-2 justify-center text-slate-900 ">
          <button class="bg-green-500 text-slate-700 rounded-md hover:bg-green-600 text-base font-bold p-1 tracking-wide">Publish</button>
          <button class="bg-red-500 text-white rounded-md hover:bg-red-600 text-base font-bold p-1 tracking-wide">Revoke</button>
        </div>
        <div class="px-4 py-3 w-1/5 tracking-wider flex gap-2 justify-center text-slate-900 ">
          <button class="bg-sky-200 text-slate-700 rounded-md hover:bg-sky-300 text-base font-bold p-1 tracking-wide">Pending</button>
        </div>
      </div>
      <div class=" flex w-full font-semibold text-sm lg:text-base">
        <div class="px-4 py-3 w-1/4 tracking-wider  text-slate-600">638d975742d47d79c84d57c1</div>
        <div class="px-4 py-3 w-1/5 tracking-wider flex justify-center items-center  text-slate-900 ">
          <X />
        </div>
        <div class="px-4 py-3 w-1/5 tracking-wider flex justify-center items-center  text-slate-900 ">
          <X />
        </div>
        <div class="px-4 py-3 w-1/4 tracking-wider flex gap-2 justify-center text-slate-900 ">
          <button class="bg-green-500 text-slate-700 rounded-md hover:bg-green-600 text-base font-bold p-1 tracking-wide">Publish</button>
          <button class="bg-red-500 text-white rounded-md hover:bg-red-600 text-base font-bold p-1 tracking-wide">Revoke</button>
        </div>
        <div class="px-4 py-3 w-1/5 tracking-wider flex gap-2 justify-center text-slate-900 ">
          <button class="bg-sky-200 text-slate-700 rounded-md hover:bg-sky-300 text-base font-bold p-1 tracking-wide">Pending</button>
        </div>
      </div>
    </div>
  </div>

  <!-- 2st div form -->
  <div class="flex flex-col lg:flex-row gap-5">
    <!-- 1st -->
    <div class="bg-slate-200 w-full lg:w-1/2 p-2 rounded-md shadow-2xl">
      <h1 class="text-slate-800 text-xl mx-8 font-bold tracking-wide mt-5">Continue with Existing Document ID</h1>
      <h1 class="text-slate-800 text-lg mx-8 font-medium tracking-wide mt-5">Please Make sure that you already have the Document ID</h1>
      <form class="mx-8">
        <div class="w-96 mt-8 group">
          <label for="Document Id" class="text-lg relative block after:content-['*'] after:ml-1 after:text-red-500  text-gray-900 group-hover:text-blue-600 font-semibold tracking-wide">Document Id</label>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5  fill-gray-900 mt-2">
                <path fill-rule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625zM7.5 15a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 15zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H8.25z" clip-rule="evenodd" />
                <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
              </svg>
            </span>
            <input type="text" id="Document Id" placeholder="Enter Document Id" class="w-full text-lg font-bold mt-2 pl-9 placeholder:text-blue-500 placeholder:text-lg placeholder:font-medium text-black  rounded border focus:border-black focus:ring-1 focus:ring-black outline-none py-1 px-3 leading-8" />
          </div>
        </div>
        <div class="mt-8 mb-2">
          <button class="bg-blue-600 px-3 text-white rounded-md hover:bg-blue-700 text-lg font-bold p-1 tracking-wide">Continue</button>
        </div>
      </form>
    </div>

    <!-- 2nd -->
    <div class="bg-slate-200 w-1/2 p-1 rounded-md shadow-lg">
      <h1 class="text-slate-800 text-xl mx-8 font-bold tracking-wide mt-5">For new Document ID</h1>
      <h1 class="text-slate-800 text-lg mx-8 font-medium tracking-wide leading-relaxed mt-5">If you have any pending Document ID's, Then here will able to Generate Document Id for Publish Documents.</h1>
      <div class="mt-8 mx-8">
        <button class="bg-blue-600 px-3 text-white rounded-md hover:bg-blue-700 text-lg font-bold p-1 tracking-wide">Generate Id</button>
      </div>
    </div>
  </div>
</div>
