<script>
  import axios from 'axios';
  import { navigate } from 'svelte-routing';
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
            Status: 'Not published',
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
      <div class="px-4 py-3 w-1/4 tracking-wider  text-slate-900 ">Status</div>
      <div class=" py-3 tracking-wider w-1/5  text-slate-900">Actions</div>
    </div>
    <div class="">
      <div class=" border-b-2 border-black flex w-full font-semibold text-base lg:text-lg">
        <div class="px-4 py-3 w-1/4 tracking-wider  text-slate-900">638d975742d47d79c84d57c1</div>
        <div class="px-4 py-3 w-1/5 tracking-wider flex justify-center items-center  text-slate-900 ">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div class="px-4 py-3 w-1/5 tracking-wider flex justify-center items-center  text-slate-900 ">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div class="px-4 py-3 w-1/4 tracking-wider flex gap-2 justify-center text-slate-900 ">
          <button class="bg-green-500 text-white rounded-md hover:bg-green-600 text-lg font-medium p-1 tracking-wide">Publish</button>
          <button class="bg-red-500 text-white rounded-md hover:bg-red-600 text-lg font-medium p-1 tracking-wide">Revoke</button>
        </div>
        <div class=" py-3 w-1/5 tracking-wider text-lg font-bold text-sky-500"><a href="/" class="text-lg font-bold text-sky-500 ">Continue</a></div>
      </div>
      <div class="border-b-2 border-black flex w-full font-semibold text-base lg:text-lg">
        <div class="px-4 py-3 w-1/4 tracking-wider  text-slate-900">638d975742d47d79c84d57c1</div>
        <div class="px-4 py-3 w-1/5 tracking-wider flex justify-center items-center  text-slate-900 ">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div class="px-4 py-3 w-1/5 tracking-wider flex justify-center items-center  text-slate-900 ">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div class="px-4 py-3 w-1/4 tracking-wider flex gap-2 justify-center text-slate-900 ">
          <button class="bg-green-500 text-white rounded-md hover:bg-green-600 text-lg font-medium p-1 tracking-wide">Publish</button>
          <button class="bg-red-500 text-white rounded-md hover:bg-red-600 text-lg font-medium p-1 tracking-wide">Revoke</button>
        </div>
        <div class=" py-3 w-1/5 tracking-wider text-lg font-bold text-sky-500"><a href="/" class="text-lg font-bold text-sky-500 ">Continue</a></div>
      </div>
      <div class="border-b-2 border-black flex w-full font-semibold text-base lg:text-lg">
        <div class="px-4 py-3 w-1/4 tracking-wider  text-slate-900">638d975742d47d79c84d57c1</div>
        <div class="px-4 py-3 w-1/5 tracking-wider flex justify-center items-center  text-slate-900 ">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div class="px-4 py-3 w-1/5 tracking-wider flex justify-center items-center  text-slate-900 ">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div class="px-4 py-3 w-1/4 tracking-wider flex gap-2 justify-center text-slate-900 ">
          <button class="bg-green-500 text-white rounded-md hover:bg-green-600 text-lg font-medium p-1 tracking-wide">Publish</button>
          <button class="bg-red-500 text-white rounded-md hover:bg-red-600 text-lg font-medium p-1 tracking-wide">Revoke</button>
        </div>
        <div class=" py-3 w-1/5 tracking-wider text-lg font-bold text-sky-500"><a href="/" class="text-lg font-bold text-sky-500 ">Continue</a></div>
      </div>
      <div class="border-b-2 border-black flex w-full font-semibold text-base lg:text-lg">
        <div class="px-4 py-3 w-1/4 tracking-wider  text-slate-900">638d975742d47d79c84d57c1</div>
        <div class="px-4 py-3 w-1/5 tracking-wider flex justify-center items-center  text-slate-900 ">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div class="px-4 py-3 w-1/5 tracking-wider flex justify-center items-center  text-slate-900 ">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div class="px-4 py-3 w-1/4 tracking-wider flex gap-2 justify-center text-slate-900 ">
          <button class="bg-green-500 text-white rounded-md hover:bg-green-600 text-lg font-medium p-1 tracking-wide">Publish</button>
          <button class="bg-red-500 text-white rounded-md hover:bg-red-600 text-lg font-medium p-1 tracking-wide">Revoke</button>
        </div>
        <div class=" py-3 w-1/5 tracking-wider text-lg font-bold text-sky-500"><a href="/" class="text-lg font-bold text-sky-500 ">Continue</a></div>
      </div>
      <div class=" flex w-full font-semibold text-base lg:text-lg">
        <div class="px-4 py-3 w-1/4 tracking-wider  text-slate-900">638d975742d47d79c84d57c1</div>
        <div class="px-4 py-3 w-1/5 tracking-wider flex justify-center items-center  text-slate-900 ">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div class="px-4 py-3 w-1/5 tracking-wider flex justify-center items-center  text-slate-900 ">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div class="px-4 py-3 w-1/4 tracking-wider flex gap-2 justify-center text-slate-900 ">
          <button class="bg-green-500 text-white rounded-md hover:bg-green-600 text-lg font-medium p-1 tracking-wide">Publish</button>
          <button class="bg-red-500 text-white rounded-md hover:bg-red-600 text-lg font-medium p-1 tracking-wide">Revoke</button>
        </div>
        <div class=" py-3 w-1/5 tracking-wider text-lg font-bold text-sky-500"><a href="/" class="text-lg font-bold text-sky-500 ">Continue</a></div>
      </div>
    </div>
  </div>

  <!-- 2st div form -->
  <div class="flex gap-3 mt-5">
    <!-- <div class="bg-black w-1/2 p-2 text-white text-2xl">Form</div>
    <div class="bg-black w-1/2 p-2 text-white text-2xl">Form</div> -->
  </div>
</div>
