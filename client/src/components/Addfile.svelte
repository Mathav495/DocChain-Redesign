<script>
  import axios from 'axios';
  import { createEventDispatcher, onMount } from 'svelte';
  import AddData from './AddData.svelte';
  const dispatch = createEventDispatcher();
  let token = localStorage.getItem('token');
  let documentID = localStorage.getItem('documentID');
  let container, issuerName, image, showpdf, pdf;
  let showImage = false;
  let status = 'Upload';
  let fileavailable = false;
  let docTitle;

  let qr = localStorage.getItem('qrcode');
  onMount(async () => {
    const { data } = await axios.get('https://test.swagger.print2block.in/account/user', {
      headers: {
        'x-access-token': token,
      },
    });
    issuerName = data.userData.name;
    console.log(data.userData.name);
  });

  /**
   * Submitting file for generating filehash
   */
  const onSubmitFile = async () => {
    const form = document.getElementById('form');
    const formData = new FormData(form);
    console.log([...formData]);
    let datum = [...formData][0];
    let File = datum[1];
    console.log(File);
    if (File.name != '') {
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
      localStorage.setItem('filehash', data.fileHash);
      let fileHash = localStorage.getItem('filehash');
      console.log('filehash', fileHash);
      if (data.fileHash) {
        fileavailable = true;
        status = 'Uploaded Sucessfully';
      }
    }
  };

  /**
   * Function for previewing image or pdf when uploaded
   */
  const onChange = () => {
    const form = document.getElementById('form');
    const formData = new FormData(form);
    console.log([...formData]);
    let datum = [...formData][0];
    let File = datum[1];
    console.log(File.type);
    if (File.type == 'image/png' || File.type == 'image/jpg' || File.type == 'image/jpeg') {
      showImage = true;
      const reader = new FileReader();
      reader.readAsDataURL(File);

      reader.addEventListener('load', function () {
        image.setAttribute('src', reader.result);
        const url = reader.result;
        console.log(url);
        const img = new Image();

        localStorage.setItem('img', url);
        let imgurl = localStorage.getItem('img');
        console.log('imgUrl', imgurl);
        img.src = imgurl;
      });

      return;
    } else if (File.type == 'application/pdf') {
      showImage = false;
      showpdf = true;
      const reader = new FileReader();
      reader.readAsDataURL(File);
      reader.addEventListener('load', function () {
        pdf.setAttribute('src', reader.result);
        const url1 = reader.result;
        console.log(url1);
        const pdf1 = new Image();
        // image.src = url;
        // document.body.appendChild(image);
        localStorage.setItem('pdf', url1);
        let pdfurl = localStorage.getItem('pdf');
        console.log('pdfUrl', pdfurl);
        pdf1.src = pdfurl;
      });

      function onUpload(files) {
        if (files.length !== 1) return;
        const file = files[0];
        let reader = new FileReader();
        reader.onload = (e) => {
          const data = atob(e.target.result.replace(/.*base64,/, ''));
          renderPDF(data);
        };

        reader.readAsDataURL(file);
      }

      async function renderPDF(data) {
        const pdf = await pdfjsLib.getDocument({ data }).promise;
        // console.log(pdf)

        for (let i = 1; i <= pdf.numPages; i++) {
          const image = document.createElement('img');
          document.body.appendChild(image);
          console.log(image);
          const page = await pdf.getPage(i);
          // console.log(page)
          const viewport = page.getViewport({ scale: 2 });
          const canvas = document.createElement('canvas');
          const canvasContext = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          await page.render({ canvasContext, viewport }).promise;
          const data = canvas.toDataURL('image/png');
          console.log(data);
          image.src = data;
          image.style.width = '100%';
        }
      }
      return;
    } else {
      showImage = false;
      showpdf = false;
      return;
    }
  };

  const hideImage = () => {
    showImage = false;
    showpdf = false;
  };
</script>

<div>
  <h1 class="text-xl font-bold tracking-wide">Choose Document</h1>

  <div class="mt-2 bg-blue-100 rounded-lg flex p-3">
    <div class="flex">
      <img src={qr} alt="qrcode" class="p-1  w-20 h-20" />
      <img src="/assets/sample.jpg" alt="qrcode" class="p-1 w-20 h-20" />
    </div>
    <div class="ml-auto p-3">
      <h1 class="text-lg font-semibold text-slate-500">Issuer Name : <span class="text-xl text-slate-900 capitalize">{issuerName}</span></h1>
      <h1 class="text-lg font-semibold text-slate-500">Document Title : <span class="text-xl text-slate-900">{docTitle}</span></h1>
    </div>
  </div>

  <div class="flex gap-5 pt-4">
    <div class="rounded-lg bg-blue-100 h-auto w-1/2 p-4">
      <h1 class="text-base font-bold tracking-wide">Select File to upload</h1>
      <form on:submit|preventDefault={onSubmitFile} id="form" method="post" action="/docs/initiate" enctype="multipart/form-data">
        <div class="pt-6">
          <div class="flex w-full flex-col">
            <div class="sm:col-span-6 ">
              <div class="flex relative justify-center items-center rounded-lg border-1 border-dashed border-blue-600 bg-blue-200 shadow-xl file-height">
                {#if showImage || showpdf}
                  <div class="absolute top-4 right-4 border-2 rounded-lg px-2 bg-white cursor-pointer">
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <h1 class="text-sm font-semibold text-slate-800" on:click={hideImage}>Remove</h1>
                  </div>
                {/if}
                <div class="space-y-1 text-center">
                  <div class="flex flex-col text-base text-gray-600" bind:this={container}>
                    {#if showImage}
                      <img bind:this={image} class="file-height w-full" id="File" src="" alt="Preview" />
                    {:else if showpdf}
                      <embed bind:this={pdf} class="h-52 w-full" id="File" src="" alt="Preview" />
                    {:else}
                      <label for="file-upload" class=" relative cursor-pointer rounded-md  font-semibold text-blue-800" id="dropzone">
                        <svg class="mx-auto h-12 w-12 text-gray-400" stroke="white" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <span class="inline-flex">Upload a file</span>
                        <input on:change={onChange} id="file-upload" onchange="onUpload(this.files)" name="userimage" type="file" class="sr-only" accept="image/*,.pdf" />
                        <span class="pl-1">or drag and drop</span>
                        <p class="text-xs mt-2 text-gray-600">Upload JPEG, PNG, JPG, PDF files</p>
                      </label><br />
                    {/if}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full pt-5">
          <button class="w-full bg-blue-600 px-2 py-1 text-white font-semibold text-base tracking-wide rounded-lg">{status}</button>
        </div>
      </form>
    </div>
    <AddData on:datahash {fileavailable} />
  </div>
</div>

<style lang="postcss">
  .file-height {
    height: 22rem;
  }
  .input-dsn {
    @apply w-full rounded-lg border-2 border-blue-500 bg-blue-200 p-1 pl-2 text-base font-bold placeholder:font-medium placeholder:text-slate-500 focus:outline-none;
  }
</style>
