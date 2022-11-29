<script>
  import axios from 'axios';
  import { createEventDispatcher } from 'svelte';
  import AddData from './AddData.svelte';
  const dispatch = createEventDispatcher();
  let token = localStorage.getItem('token');
  let documentID = localStorage.getItem('documentID');

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
                <input id="file-upload" name="userimage" type="file" class="sr-only" accept="image/*,.pdf" />
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

  <AddData on:datahash />
</div>
