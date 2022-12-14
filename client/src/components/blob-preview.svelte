<script>
  import { onMount } from 'svelte';
  import Loading from './Loading.svelte';
  let src;
  let currentpage, _PDFDOC, _total_pages;

  let nextbtn = true;
  let prevbtn = true;
  /**
   * getting saved blob image from localstorage
   */
  let blobimage = localStorage.getItem('blobimage');
  console.log(blobimage);

  /**
   * getting saved pdf blob from local storage
   */
  let blob = localStorage.getItem('blobpdf');
  console.log(blob);

  onMount(async (e) => {
    try {
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.7.570/build/pdf.worker.min.js';
      let loadingTask = pdfjsLib.getDocument('/assets/Handbook on SHG.pdf');
      loadingTask = loadingTask.promise;
      _PDFDOC = await loadingTask;
      _total_pages = _PDFDOC.numPages;
      console.log(_total_pages);
      console.log(_PDFDOC);
      currentpage = 1;
      showPage(1);
      const reader = new FileReader(loadingTask);
    } catch (e) {
      console.log(e);
    }
  });
  // const reader = new FileReader();
  // const fileInfo = event.target.files[0];
  // if (fileInfo) {
  //   reader.readAsBinaryString(event.target.files[0]);
  //   reader.onloadend = () => {
  //     const count = reader.result.match(/\/Type[\s]*\/Page[^s]/g).length;
  //     console.log('Number of Pages:', count);
  //   };
  // }

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
</script>

<div class="flex w-full flex-col">
  {#if (src = blobimage)}
    <img class="w-full rounded-md " src={blobimage} alt="document" />
  {:else}
    <div class="flex max-w-full lg:w-full flex-col rounded-md">
      <canvas id="mycanvas" class="border-2 rounded-md overflow-hidden drop-shadow-lg" />
      <!-- <img src="" alt="sampleimage" id="pdf-preview" class="w-full max-h-[34rem] lg:max-h-[37rem]" /> -->
      <div class="flex justify-center items-center gap-4 pt-3">
        <button on:click={previouspage} disabled={!prevbtn}>
        
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6  {!prevbtn ? 'text-gray-300' : 'text-black'}">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z" />
          </svg> 
        </button>
        <h1 class="text-lg text-black font-bold"> {currentpage} / { _total_pages}</h1>
        <button on:click={nextpage} disabled={!nextbtn}>       
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 {!nextbtn ? 'text-gray-300' : 'text-black'}">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z" />
          </svg>
          
        </button>
      </div>
    </div>
  {/if}
</div>
