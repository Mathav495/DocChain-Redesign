<script>
  import axios from 'axios';
  import pdfjsLib from 'pdfjs-dist/build/pdf';
  import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
  import { createEventDispatcher } from 'svelte';
  import HeaderFileupload from './header_fileupload.svelte';
  const dispatch = createEventDispatcher();
  export let id;
  let currentpage;
  let token = localStorage.getItem('token');
  let documentID = localStorage.getItem('documentID');
  let image, showpdf, pdf, container, docDetails;
  let showImage = false;
  let fileavailable = false;
  let _PDFDOC;
  let File,
    _total_pages,
    base64,
    instance = null;
  let bgcolor = localStorage.getItem('bggradient');
  console.log(bgcolor);

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

  const ondisplay = async () => {
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
        const img = new Image();
        localStorage.setItem('img', url);
        let imgurl = localStorage.getItem('img');
        img.src = imgurl;
      });
      return;
    } else if (File.type == 'application/pdf') {
      showImage = false;
      showpdf = true;
      let blob = URL.createObjectURL(File);
      console.log(blob);
      await showPdf(blob);
      return;
    } else {
      showImage = false;
      showpdf = false;
      return;
    }
  };

  const showPdf = async (blob) => {
    // let selectPage = document.getElementById('page-no');
    // console.log(selectPage);
    // while (selectPage.options.length > 0) {
    //   selectPage.remove(0);
    // }
    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
    let loadingTask = pdfjsLib.getDocument(blob);
    loadingTask = loadingTask.promise;
    _PDFDOC = await loadingTask;
    _total_pages = _PDFDOC.numPages;
    console.log(_total_pages);
    console.log(_PDFDOC);
    // for (let i = 0; i < _total_pages; i++) {
    //   selectPage.options[selectPage.options.length] = new Option(i + 1, i);
    // }
    // selectPage.value = '0';
    currentpage = 1;
    showPage(1);
  };

  const showPage = async (pageno) => {
    let page = await _PDFDOC.getPage(pageno);
    console.log('Page loaded');
    let viewport = page.getViewport({ scale: 1 });
    // Prepare canvas using PDF page dimensions
    let canvas = document.createElement('canvas');
    let context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    // Render PDF page into canvas context
    let renderContext = {
      canvasContext: context,
      viewport: viewport,
    };
    await page.render(renderContext).promise;
    document.getElementById('pdf-preview').src = canvas.toDataURL();
  };

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
        // WebViewer(
        //   {
        //     licenseKey: 'hezg49lLEY5VusvTCg1J',
        //     path: '/lib',
        //   },
        //   element,
        // ).then((instance) => {
        //   instance.UI.loadDocument(File, { filename: File.name });
        //   instance.UI.setTheme('dark');
        // });
        // const onUpload = (files) =>{
        //   if (files.length !== 1) return;
        //   const file = files[0];
        //   let reader = new FileReader();
        //   reader.onload = (e) => {
        //     const data = buffer.form(e.target.result.replace(/.*base64,/, ''));
        //     renderPDF(data);
        //     console.log(data);
        //   };

        //   reader.readAsDataURL(file);
        // }
        // async function renderPDF(data) {
        //   const pdf = await pdfjsLib.getDocument({ data }).promise;
        //   // console.log(pdf)

        //   for (let i = 1; i <= pdf.numPages; i++) {
        //     const image = document.createElement('img');
        //     document.body.appendChild(image);
        //     console.log(image);
        //     const page = await pdf.getPage(i);
        //     // console.log(page)
        //     const viewport = page.getViewport({ scale: 2 });
        //     const canvas = document.createElement('canvas');
        //     const canvasContext = canvas.getContext('2d');
        //     canvas.height = viewport.height;
        //     canvas.width = viewport.width;
        //     await page.render({ canvasContext, viewport }).promise;
        //     const data = canvas.toDataURL('image/png');
        //     console.log(data);
        //     image.src = data;
        //     image.style.width = '100%';
        //   }
        // }

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

  let dropzone = document.getElementById('dropzone');
  console.log(dropzone);

  const toClickinput = () => {
    document.getElementById('file-upload').click();
  };

  const nextpage = () => {
    if (currentpage < _total_pages) {
      console.log('initial', currentpage);
      showPage(currentpage + 1);
      currentpage++;
      console.log('final', currentpage);
    }
  };

  // const hideImage = () => {
  //   showImage = false;
  //   showpdf = false;
  // };
</script>

<div class="rounded-lg h-auto w-full flex space-x-4">
  <div class="w-1/2">
    <HeaderFileupload {id} {bgcolor} />

    <form id="form" method="post" action="/docs/initiate" enctype="multipart/form-data">
      <div class="pt-6">
        <div class="flex w-full flex-col">
          <!-- svelte-ignore missing-declaration -->
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div class="sm:col-span-6 cursor-pointer" id="dropzone" on:click={toClickinput}>
            <div class="flex justify-center items-center rounded-lg border-1 border-dashed border-blue-600 bg-slate-200 shadow-xl py-10">
              <div class="space-y-1 text-center">
                <div class="flex flex-col text-base text-gray-600" bind:this={container}>
                  <label for="file-upload" class=" relative cursor-pointer rounded-md  font-semibold text-blue-800" id="dropzone">
                    <svg class="mx-auto h-12 w-12 text-gray-900" stroke="black" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <span class="inline-flex">Upload a file</span>
                    <input on:change|stopPropagation|preventDefault={ondisplay} id="file-upload" name="userimage" type="file" class="sr-only" accept="image/*,.pdf" />
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
  </div>

  <div class=" w-1/2 rounded-md bg-slate-900">
    <div class="p-4">
      <img src="" alt="sampleimage" id="pdf-preview" class="w-full max-h-[40rem]" />
      <div class="flex justify-center items-center gap-8">
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <h1 class="text-lg text-white font-bold">{currentpage}</h1>
        <button on:click={nextpage}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
    <!-- {#if showImage} -->
    <!-- <img bind:this={image} class="h-full w-full" id="File" src="" alt="Preview" /> -->
    <!-- {:else if showpdf} -->
    <!-- <embed bind:this={pdf} class="h-52 w-full" id="File" src="" alt="Preview" /> -->
    <!-- <div id="view" class="w-full h-full" /> -->
    <!-- {:else} -->
    <!-- <div class="h-full w-full flex justify-center items-center"> -->
    <!-- <h1 class="text-lg font-bold tracking-wide text-white">No image available</h1> -->
    <!-- </div> -->
    <!-- {/if} -->
  </div>
</div>

<style lang="postcss">
</style>
