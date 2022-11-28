<script>
  import axios from 'axios';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  let dateexpired, issuer, doctype, docTitle, signatory, fileName, token, documentID;
  token = localStorage.getItem('token');
  documentID = localStorage.getItem('documentID');

  const onSubmitFile = async () => {
    const form = document.getElementById('form');
    const formData = new FormData(form);
    console.log([...formData]);
    let datum = [...formData][0];
    let File = datum[1];
    console.log(File);
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
  };

  const onsubmitdata = async () => {
    console.log(dateexpired, issuer, signatory, docTitle, doctype);
    const date = new Date(dateexpired).toISOString();
    let sampleData = {
      receiver: {
        name: issuer,
      },
      document: {
        type: doctype,
      },
      issuer: {
        signatory: signatory,
      },
    };
    let options = {
      title: docTitle,
      expireOn: date,
    };
    console.log(documentID);
    const { data } = await axios.post(
      'https://test.swagger.print2block.in/docs/add-data',
      {
        documentID: documentID,
        metadata: sampleData,
        options: options,
      },
      {
        headers: {
          'x-access-token': token,
        },
      },
    );
    console.log(data);
    dispatch('datahash', data.dataHash);
  };
</script>

<div>
  <h1 class="text-xl font-bold ">Publish Documents</h1>

  <div class="flex flex-col mt-1">
    <div class="sm:col-span-6 mt-2">
      <div class="mt-1 flex justify-center rounded-md border-2 border-dashed border-violet-600 px-6 pt-5 pb-6 bg-violet-200">
        <form on:submit|preventDefault={onSubmitFile} id="form" method="post" action="/docs/initiate" enctype="multipart/form-data">
          <div class=" space-y-1 text-center">
            <div class="flex flex-col text-sm text-gray-600">
              <label for="file-upload" class="relative cursor-pointer rounded-md  font-medium text-indigo-600 ">
                <svg class="mx-auto h-12 w-12 text-gray-400" stroke="white" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <span class="inline-flex">Upload a file</span>
                <input id="file-upload" bind:value={fileName} name="userimage" type="file" class="sr-only" accept="image/*,.pdf" />
                <span class="pl-1">or drag and drop</span>
                <p class="text-xs mt-2 text-gray-500">Upload JPEG, PNG, JPG, PDF files</p>
              </label><br />
              <button class=" px-2 py-1 bg-violet-600 text-white rounded-md">Upload</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div class="flex flex-col mt-4 p-5 bg-green-100 rounded-lg w-full ">
    <div>
      <h1 class="text-lg text-slate-800 tracking-wide font-bold">Document Metadata</h1>
    </div>

    <form on:submit|preventDefault={onsubmitdata}>
      <div class="flex">
        <div class="flex flex-col mt-2 gap-2 w-1/2">
          <label for="docid" class="text-sm text-slate-800 tracking-wide font-bold">Date Expired</label>
          <input bind:value={dateexpired} type="date" class="input-dsn" name="docid" id="docid" />
        </div>
        <div class="flex flex-col mt-2 gap-2 w-1/2">
          <label for="issuer" class="text-sm text-slate-800 tracking-wide font-bold">Issued to</label>
          <input placeholder="Enter issuer name" name="issuer" id="issuer" bind:value={issuer} type="text" class="input-dsn" />
        </div>
      </div>

      <div class="flex">
        <div class="flex flex-col mt-2 gap-2 w-1/2">
          <label for="doctype" class="text-sm text-slate-800 tracking-wide font-bold">Document Type</label>
          <input placeholder="Enter document type" bind:value={doctype} type="text" class="input-dsn" name="doctype" id="doctype" />
        </div>
        <div class="flex flex-col mt-2 gap-2 w-1/2">
          <label for="signatory" class="text-sm text-slate-800 tracking-wide font-bold">Signatory</label>
          <input placeholder="Enter signatory name" name="signatory" id="signatory" bind:value={signatory} type="text" class="input-dsn" />
        </div>
      </div>

      <div class="flex">
        <div class="flex flex-col mt-2 gap-2 w-1/2">
          <label for="docTitle" class="text-sm text-slate-800 tracking-wide font-bold">Document Title</label>
          <input placeholder="Enter document title" bind:value={docTitle} type="text" class="input-dsn" name="docTitle" id="docTitle" />
        </div>
      </div>

      <div class="flex mt-4">
        <button class="px-4 py-1 rounded-full bg-emerald-500 font-bold text-base">Confirm and Preview</button>
      </div>
    </form>
  </div>
</div>

<style lang="postcss">
  .input-dsn {
    @apply w-3/5  rounded-lg border-2 border-green-500 bg-green-200 p-1 text-base font-bold placeholder:font-medium placeholder:text-slate-500 focus:outline-none;
  }
</style>
