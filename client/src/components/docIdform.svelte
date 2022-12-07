<script>
  import axios from 'axios';
  import { navigate } from 'svelte-routing';
  import Tick from '../icons/Tick.svelte';
  import X from '../icons/X.svelte';
  import Emailicon from '../icons/Emailicon.svelte';
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
        localStorage.setItem('docDetails', docDetails);
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

<div class="flex flex-col">
  <!-- 1st div table -->
  <div class="shadow-lg rounded-lg relative text-center overflow-auto  max-h-96">
    <div class="bg-sky-100 w-full flex font-semibold text-base lg:text-lg">
      <div class="px-4 py-3 w-1/4  tracking-wider  text-slate-900">Document Id</div>
      <div class="px-4 py-3 w-1/5 tracking-wider  text-slate-900 ">Data Hash Generated</div>
      <div class="px-4 py-3 w-1/5 tracking-wider  text-slate-900 ">File Hash Generated</div>
      <div class="px-4 py-3 w-1/4 tracking-wider  text-slate-900 ">Actions</div>
      <div class=" py-3 tracking-wider w-1/5  text-slate-900">Status</div>
    </div>
    <div>
      <div class=" border-b-2 border-gray-200 flex w-full font-semibold text-base lg:text-lg">
        <div class="px-4 py-3 w-1/4 tracking-wider  text-slate-600">638d975742d47d79c84d57c1</div>
        <div class="px-4 py-3 w-1/5 tracking-wider flex justify-center items-center  text-slate-900 ">
          <Tick />
        </div>
        <div class="px-4 py-3 w-1/5 tracking-wider flex justify-center items-center  text-slate-900 ">
          <Tick />
        </div>
        <div class="px-4 py-3 w-1/4 tracking-wider flex gap-2 justify-center text-slate-900 ">
          <button class="bg-green-500 text-slate-700 rounded-md hover:bg-green-600 text-lg font-bold p-1 tracking-wide">Publish</button>
          <button class="bg-red-500 text-white rounded-md hover:bg-red-600 text-lg font-bold p-1 tracking-wide">Revoke</button>
        </div>
        <div class="px-4 py-3 w-1/5 tracking-wider flex gap-2 justify-center text-slate-900 ">
          <button class="bg-sky-200 text-slate-700 rounded-md hover:bg-sky-300 text-lg font-bold p-1 tracking-wide">Pending</button>
        </div>
      </div>

      <div class="border-b-2 border-gray-200  flex w-full font-semibold text-base lg:text-lg">
        <div class="px-4 py-3 w-1/4 tracking-wider  text-slate-600">638d975742d47d79c84d57c1</div>
        <div class="px-4 py-3 w-1/5 tracking-wider flex justify-center items-center  text-slate-900 ">
          <Tick />
        </div>
        <div class="px-4 py-3 w-1/5 tracking-wider flex justify-center items-center  text-slate-900 ">
          <Tick />
        </div>
        <div class="px-4 py-3 w-1/4 tracking-wider flex gap-2 justify-center text-slate-900 ">
          <button class="bg-green-500 text-slate-700 rounded-md hover:bg-green-600 text-lg font-bold p-1 tracking-wide">Publish</button>
          <button class="bg-red-500 text-white rounded-md hover:bg-red-600 text-lg font-bold p-1 tracking-wide">Revoke</button>
        </div>
        <div class="px-4 py-3 w-1/5 tracking-wider flex gap-2 justify-center text-slate-900 ">
          <button class="bg-sky-200 text-slate-700 rounded-md hover:bg-sky-300 text-lg font-bold p-1 tracking-wide">Pending</button>
        </div>
      </div>
      <div class="border-b-2 border-gray-200  flex w-full font-semibold text-base lg:text-lg">
        <div class="px-4 py-3 w-1/4 tracking-wider  text-slate-600">638d975742d47d79c84d57c1</div>
        <div class="px-4 py-3 w-1/5 tracking-wider flex justify-center items-center  text-slate-900 ">
          <Tick />
        </div>
        <div class="px-4 py-3 w-1/5 tracking-wider flex justify-center items-center  text-slate-900 ">
          <Tick />
        </div>
        <div class="px-4 py-3 w-1/4 tracking-wider flex gap-2 justify-center text-slate-900 ">
          <button class="bg-green-500 text-slate-700 rounded-md hover:bg-green-600 text-lg font-bold p-1 tracking-wide">Publish</button>
          <button class="bg-red-500 text-white rounded-md hover:bg-red-600 text-lg font-bold p-1 tracking-wide">Revoke</button>
        </div>
        <div class="px-4 py-3 w-1/5 tracking-wider flex gap-2 justify-center text-slate-900 ">
          <button class="bg-sky-200 text-slate-700 rounded-md hover:bg-sky-300 text-lg font-bold p-1 tracking-wide">Pending</button>
        </div>
      </div>
      <div class="border-b-2 border-gray-200  flex w-full font-semibold text-base lg:text-lg">
        <div class="px-4 py-3 w-1/4 tracking-wider  text-slate-600">638d975742d47d79c84d57c1</div>
        <div class="px-4 py-3 w-1/5 tracking-wider flex justify-center items-center  text-slate-900 ">
          <X />
        </div>
        <div class="px-4 py-3 w-1/5 tracking-wider flex justify-center items-center  text-slate-900 ">
          <X />
        </div>
        <div class="px-4 py-3 w-1/4 tracking-wider flex gap-2 justify-center text-slate-900 ">
          <button class="bg-green-500 text-slate-700 rounded-md hover:bg-green-600 text-lg font-bold p-1 tracking-wide">Publish</button>
          <button class="bg-red-500 text-white rounded-md hover:bg-red-600 text-lg font-bold p-1 tracking-wide">Revoke</button>
        </div>
        <div class="px-4 py-3 w-1/5 tracking-wider flex gap-2 justify-center text-slate-900 ">
          <button class="bg-sky-200 text-slate-700 rounded-md hover:bg-sky-300 text-lg font-bold p-1 tracking-wide">Pending</button>
        </div>
      </div>
      <div class=" flex w-full font-semibold text-base lg:text-lg">
        <div class="px-4 py-3 w-1/4 tracking-wider  text-slate-600">638d975742d47d79c84d57c1</div>
        <div class="px-4 py-3 w-1/5 tracking-wider flex justify-center items-center  text-slate-900 ">
          <X />
        </div>
        <div class="px-4 py-3 w-1/5 tracking-wider flex justify-center items-center  text-slate-900 ">
          <X />
        </div>
        <div class="px-4 py-3 w-1/4 tracking-wider flex gap-2 justify-center text-slate-900 ">
          <button class="bg-green-500 text-slate-700 rounded-md hover:bg-green-600 text-lg font-bold p-1 tracking-wide">Publish</button>
          <button class="bg-red-500 text-white rounded-md hover:bg-red-600 text-lg font-bold p-1 tracking-wide">Revoke</button>
        </div>
        <div class="px-4 py-3 w-1/5 tracking-wider flex gap-2 justify-center text-slate-900 ">
          <button class="bg-sky-200 text-slate-700 rounded-md hover:bg-sky-300 text-lg font-bold p-1 tracking-wide">Pending</button>
        </div>
      </div>
    </div>
  </div>

  <!-- 2st div form -->
  <div class="flex gap-3 mt-5 h-80 ">
    <!-- 1st -->
    <div class="bg-black w-1/2  p-2 text-white text-2xl rounded-md shadow-lg shadow-white">
      <h1 class="text-white text-xl px-3 font-bold tracking-wide mt-5">Continue with Excisting Document ID</h1>
      <h1 class="text-white text-lg px-3 font-medium tracking-wide mt-5">Please Make sure that you already have the Document ID</h1>
      <div class="w-96 mt-10 group mx-10">
        <label for="Email" class="text-xl relative block after:content-['*'] after:ml-1 after:text-red-500  text-gray-400 group-hover:text-white tracking-wide">Document Id</label>
        <div class="relative">
          <span class="absolute inset-y-0 left-0 flex items-center pl-2">
            <Emailicon />
          </span>
          <input type="email" id="Email" placeholder="Enter Document Id" class="w-full mt-2 pl-9 placeholder:text-blue-500 placeholder:text-base  bg-black focus:bg-black text-blue-500 rounded border focus:border-white focus:ring-1 focus:ring-white text-lg outline-none py-1 px-3 leading-8" />
        </div>
      </div>
    </div>

    <!-- 2nd -->
    <div class="bg-black  w-1/2 p-2 text-white text-2xl rounded-md shadow-lg shadow-white">Form</div>
  </div>
</div>
