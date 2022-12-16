<script>
  // import pdfjsLib from 'pdfjs-dist/build/pdf';
  // import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
  import axios from 'axios';
  import { navigate } from 'svelte-routing';
  import { fade } from 'svelte/transition';
  import HeaderFileupload from './header_fileupload.svelte';
  import ErrorInfo from './ErrorInfo.svelte';
  export let id;
  let currentpage, blobimage, _PDFDOC, File, _total_pages, showpdf, errormsg;
  let displayConfirm = false;
  let displayerror = false;
  let displayDropzone = true;
  let nextbtn = true;
  let prevbtn = true;
  let token = localStorage.getItem('token');
  let documentID = localStorage.getItem('documentID');
  let bgcolor = localStorage.getItem('bgGradient');
  let displaypreview = false;

  /**
   * Submitting file for generating filehash
   */
  const onSubmitFile = async () => {
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
      // dispatch('filehash', data.fileHash);
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

        //For navigating to next page
        navigate(`/add-data/${id}`);
      } else {
        if (data.error) {
          displayConfirm = false;
          displaypreview = false;
          displayDropzone = true;
          errormsg = data.errorCode;
          let arr = errormsg.split(':');
          errormsg = arr[2].replaceAll('_', ' ');
          displayerror = true;
          setTimeout(() => {
            displayerror = false;
          }, 3000);
        }
      }
    }
  };

  /**
   * Function for previewing image or pdf when uploaded
   */

  const ondisplay = async () => {
    console.log('displayed');
    const form = document.getElementById('form');
    const formData = new FormData(form);
    console.log([...formData]);
    let datum = [...formData][0];
    File = datum[1];
    console.log(File.type);
    if (File.type == 'image/png' || File.type == 'image/jpg' || File.type == 'image/jpeg') {
      displaypreview = true;
      displayDropzone = false;
      showpdf = false;
      blobimage = URL.createObjectURL(File);
      localStorage.setItem('blobimage', blobimage);
      return;
    } else if (File.type == 'application/pdf') {
      showpdf = true;
      let blob = URL.createObjectURL(File);
      localStorage.setItem('blobpdf', blob);
      console.log(blob);
      await showPdf(blob);
      displayDropzone = false;
      displaypreview = true;
      return;
    } else {
      displaypreview = false;
      showpdf = false;
      return;
    }
  };

  // onMount(async () => {
  //   import('pdfjs-dist/build/pdf')
  //     .then(({ pdfjsLib }) => {
  //       pdfjs = pdfjsLib;
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });

  //   import('pdfjs-dist/build/pdf.worker.entry')
  //     .then(({ pdfjsWorker }) => {
  //       jsWorker = pdfjsWorker;
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });

  //   // pdfjsLib = (await import('pdfjs-dist/build/pdf')).default;
  //   // pdfjsWorker = (await import('pdfjs-dist/build/pdf.worker.entry')).default;
  // });

  const showPdf = async (blob) => {
    // await pageloader();
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.7.570/build/pdf.worker.min.js';
    let loadingTask = pdfjsLib.getDocument(blob);
    loadingTask = loadingTask.promise;
    _PDFDOC = await loadingTask;
    _total_pages = _PDFDOC.numPages;
    console.log(_total_pages);
    console.log(_PDFDOC);
    currentpage = 1;
    showPage(1);
  };

  const showPage = async (pageno) => {
    let page = await _PDFDOC.getPage(pageno);
    console.log('Page loaded');
    let viewport = page.getViewport({ scale: 1 });

    // Prepare canvas using PDF page dimensions
    let canvas = document.getElementById('mycanvas');
    let context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    // Render PDF page into canvas context
    let renderContext = {
      canvasContext: context,
      viewport: viewport,
    };
    await page.render(renderContext).promise;
    // document.getElementById('pdf-preview').src = canvas.toDataURL();
  };

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

  $: if (currentpage < _total_pages) {
    nextbtn = true;
  } else {
    nextbtn = false;
  }
  $: if (currentpage > 1) {
    prevbtn = true;
  } else {
    prevbtn = false;
  }
  const previouspage = () => {
    if (currentpage > 1) {
      console.log('initial', currentpage);
      showPage(currentpage - 1);
      currentpage--;
      console.log('final', currentpage);
    }
  };

  const ondisplaydropzone = () => {
    displayDropzone = true;
    displaypreview = false;
  };

  const hideConfirmation = () => {
    displayConfirm = false;
    ondisplaydropzone();
  };
</script>

<div class="relative h-auto w-full flex flex-col items-center justify-center gap-3  p-4">
  <div class="w-full h-full bg-[#000000cc] absolute  flex items-end justify-center p-4" class:hidden={!displayConfirm}>
    <div class="z-10 flex flex-col lg:flex-row w-full lg:w-3/5  bg-white shadow-[0_0_8px_0_rgba(0,0,0,0.15)] p-5 rounded-md">
      <div>
        <h1 class="text-lg text-blue-500 font-bold pb-3">Confirmation</h1>
        <p class="text-base text-slate-500 font-semibold">You are not able to choose different file if you click upload</p>
      </div>
      <div class="flex gap-4 ml-0 lg:ml-auto items-end pt-3 lg:pt-0">
        <div>
          <button on:click={hideConfirmation} class="border-2 border-red-500 hover:bg-red-500 hover:text-white text-red-500 rounded-md px-3  py-1 text-base  font-bold tracking-wide">Back</button>
        </div>
        <div>
          <button on:click={onSubmitFile} class="border-2 border-green-500 hover:bg-green-500 hover:text-white text-green-500 rounded-md px-2  py-1 text-base  font-bold tracking-wide">Upload</button>
        </div>
      </div>
    </div>
  </div>

  <HeaderFileupload {id} {bgcolor} />

  <form id="form" method="post" action="/docs/initiate" enctype="multipart/form-data" class="w-full lg:w-[38.5rem]">
    <div class="flex w-full flex-col">
      <!-- svelte-ignore missing-declaration -->
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      {#if displayDropzone}
        <div class="sm:col-span-6 cursor-pointer" id="dropzone" on:click={toClickinput} in:fade={{ duration: 1500 }} out:fade={{ duration: 100 }}>
          <div class="flex justify-center items-center rounded-md border-1 border-dashed border-blue-600 bg-slate-200  py-14">
            <div class="space-y-1 text-center">
              <div class="flex flex-col text-base text-gray-600">
                <label for="file-upload" class=" relative cursor-pointer rounded-md  font-semibold text-blue-800" id="dropzone">
                  <svg class="mx-auto h-12 w-12 text-gray-900" stroke="black" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <span class="inline-flex">Choose a file</span>
                  <input on:change|stopPropagation|preventDefault={ondisplay} id="file-upload" name="userimage" type="file" class="sr-only" accept="image/*,.pdf" />
                  <span class="pl-1">to preview and upload</span>
                  <p class="text-xs mt-2 text-gray-600">Upload JPEG, PNG, JPG, PDF files</p>
                </label>
              </div>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </form>
  {#if displayerror}
    <div class="mx-auto">
      <ErrorInfo {errormsg} on:click={() => (displayerror = false)} />
    </div>
  {/if}

  <!-- For pdf preview -->
  <div class="{displaypreview && showpdf ? 'flex' : 'hidden'}  w-full lg:w-[38.5rem] flex-col rounded-md" in:fade={{ duration: 2000 }} out:fade={{ duration: 1000 }}>
    <canvas id="mycanvas" class="border-2 rounded-md overflow-hidden" />
    <!-- <img src="" alt="sampleimage" id="pdf-preview" class="w-full max-h-[34rem] lg:max-h-[37rem]" /> -->
    <div class="flex justify-center items-center gap-8 pt-3">
      <button on:click={previouspage} disabled={!prevbtn}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" class="w-6 h-6 {!prevbtn ? 'stroke-gray-600' : 'stroke-black'}">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <h1 class="text-lg text-black font-bold">{currentpage} / {_total_pages}</h1>
      <button on:click={nextpage} disabled={!nextbtn}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" class="w-6 h-6 {!nextbtn ? 'stroke-gray-600' : 'stroke-black'}">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  </div>

  <!-- For image preview -->
  <div class="{displaypreview && !showpdf ? 'flex' : 'hidden'} flex w-full lg:w-[38.5rem] flex-col items-center justify-center" in:fade={{ duration: 2000 }} out:fade={{ duration: 1000 }}>
    <div class="max-w-full min-w-[22.5rem] min-h-[24.35rem] max-h-[40rem] justify-center items-center flex">
      <div class="border-2 rounded-md shadow-[0_0_8px_0_rgba(0,0,0,0.15)] overflow-hidden">
        <img src={blobimage} class="max-w-full min-w-[22.5rem] min-h-[24.35rem] max-h-[40rem]" id="File" alt="Preview" />
      </div>
    </div>
  </div>

  <div class="{displaypreview ? 'flex' : 'hidden'} justify-between gap-4 pt-3 lg:w-[38.5rem]">
    <div class="flex">
      <button on:click={ondisplaydropzone} class="border-2 border-red-500 hover:bg-red-500 hover:text-white text-red-500 rounded-md px-3 lg:px-3 py-1 text-sm lg:text-lg font-bold tracking-wide">Choose Different file</button>
    </div>
    <div class="flex">
      <a href="/sign" class="border-2 border-blue-500 hover:bg-blue-500 hover:text-white text-blue-500 rounded-md px-3 lg:px-3 py-1 text-sm lg:text-lg font-bold tracking-wide">Sign Doc</a>
    </div>
    <div class="flex">
      <button on:click={() => (displayConfirm = true)} class="border-2 hover:text-white border-green-500 text-green-500 hover:bg-green-500 rounded-md px-3 lg:px-3 py-1 text-sm lg:text-lg font-bold tracking-wide">Confirm and Continue</button>
    </div>
  </div>
</div>
