<script>
  import axios from 'axios';
  import { createEventDispatcher } from 'svelte';
  import WebViewer from '@pdftron/pdfjs-express';
  const dispatch = createEventDispatcher();
  export let id;
  let token = localStorage.getItem('token');
  let documentID = localStorage.getItem('documentID');
  let image, showpdf, pdf, container, docDetails;
  let showImage = false;
  let fileavailable = false;
  let File,
    base64,
    instance = null;

  /**
   * Submitting file for generating filehash
   */
  const onSubmitFile = async () => {
    console.log('hello');
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
      console.log(data.lastModifiedDate);
      dispatch('filehash', data.fileHash);
      localStorage.setItem('filehash', data.fileHash);
      let fileHash = localStorage.getItem('filehash');
      console.log('filehash', fileHash);
      if (data.fileHash) {
        // For local storage
        let localfile = JSON.parse(localStorage.getItem('docDetails'));
        console.log('localfile', localfile);
        localfile.find((localfile) => {
          if (localfile.documentID == id) {
            console.log(localfile);
            console.log('same id', localfile.documentID);
            console.log('filehash', localfile.filehash);
            localfile.filehash = true;
            console.log(localfile);
          }
        });
        console.log(localfile, 'local');
        localStorage.setItem('docDetails', JSON.stringify(localfile));

        //For dispatching
        fileavailable = true;
        dispatch('fileavailable', fileavailable);
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
    File = datum[1];
    console.log(File.type);
    if (File.type == 'image/png' || File.type == 'image/jpg' || File.type == 'image/jpeg') {
      showImage = true;
      const reader = new FileReader();
      reader.readAsDataURL(File);

      reader.addEventListener('load', function () {
        image.setAttribute('src', reader.result);
        const url = reader.result;
        // console.log(url);
        const img = new Image();

        localStorage.setItem('img', url);
        let imgurl = localStorage.getItem('img');
        // console.log('imgUrl', imgurl);
        img.src = imgurl;
      });

      return;
    } else if (File.type == 'application/pdf') {
      instance = null;
      showImage = false;
      showpdf = true;
      const reader = new FileReader();
      reader.readAsDataURL(File);
      reader.addEventListener('load', function () {
        // pdf.setAttribute('src', reader.result);
        base64 = reader.result;
        console.log('base64', base64);
        const element = document.getElementById('view');
        WebViewer(
          {
            licenseKey: 'hezg49lLEY5VusvTCg1J',
            path: '/lib',
          },
          element,
        ).then((instance) => {
          instance.UI.loadDocument(File, { filename: File.name });
          instance.UI.setTheme('dark');
        });

        const onUpload = (files) => {
          if (files.length !== 1) return;
          const file = files[0];
          let reader = new FileReader();
          reader.onload = (e) => {
            const data = buffer.form(e.target.result.replace(/.*base64,/, ''));
            renderPDF(data);
            console.log(data);
          };

          reader.readAsDataURL(file);
        };

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

        // const pdf1 = new Image();
        // image.src = url;
        // document.body.appendChild(image);
        // localStorage.setItem('pdf', url1);
        // let pdfurl = localStorage.getItem('pdf');
        // console.log('pdfUrl', pdfurl);
        // pdf1.src = pdfurl;
      });

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

<div class="rounded-lg bg-[#393E46] h-auto w-full p-4">
  <h1 class="text-base font-bold text-white tracking-wide">Select File to preview</h1>

  <form id="form" method="post" action="/docs/initiate" enctype="multipart/form-data">
    <div class="pt-6">
      <div class="flex w-full flex-col">
        <div class="sm:col-span-6 ">
          <div class="flex justify-center items-center rounded-lg border-1 border-dashed border-blue-600 bg-slate-200 shadow-xl py-5">
            <div class="space-y-1 text-center">
              <div class="flex flex-col text-base text-gray-600" bind:this={container}>
                <label for="file-upload" class=" relative cursor-pointer rounded-md  font-semibold text-blue-800" id="dropzone">
                  <svg class="mx-auto h-12 w-12 text-gray-900" stroke="black" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <span class="inline-flex">Upload a file</span>
                  <input on:change={onChange} id="file-upload" onchange="onUpload(this.files)" name="userimage" type="file" class="sr-only" accept="image/*,.pdf" />
                  <span class="pl-1">or drag and drop</span>
                  <p class="text-xs mt-2 text-gray-600">Upload JPEG, PNG, JPG, PDF files</p>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>

  <div class="file-height w-full pt-5">
    {#if showImage}
      <img bind:this={image} class="h-full w-full" id="File" src="" alt="Preview" />
    {:else if showpdf}
      <!-- <embed bind:this={pdf} class="h-52 w-full" id="File" src="" alt="Preview" /> -->
      <div id="view" class="w-full h-full" />
    {:else}
      <div class="h-full w-full flex justify-center items-center">
        <h1 class="text-lg font-bold tracking-wide text-white">No image available</h1>
      </div>
      <!-- <img class="h-full w-full" id="File" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFG5-XTBYvoFjptCqHdiL_PXjkphJ3yGDxJ_tska9MH2XJWNQ5EIOO0maRAVRCqfXT4oI&usqp=CAU" alt="Preview" /> -->
    {/if}
  </div>
</div>

<style lang="postcss">
  .file-height {
    height: 27rem;
  }
</style>
