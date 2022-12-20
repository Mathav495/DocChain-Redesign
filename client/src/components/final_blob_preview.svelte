<script>
  import { onMount } from 'svelte';
  import Loading from './Loading.svelte';
  let loading = false;
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
    loading = true;
    try {
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.7.570/build/pdf.worker.min.js';
      let loadingTask = pdfjsLib.getDocument('/assets/Rhymes1.pdf');
      // const response = await fetch(blob);
      // const blob = await response.blob();
      loadingTask = loadingTask.promise;
      _PDFDOC = await loadingTask;
      _total_pages = _PDFDOC.numPages;
      console.log(_total_pages);
      console.log(_PDFDOC);
      currentpage = 1;
      showPage(1);
      // const reader = new FileReader(loadingTask);
      loading = false;
    } catch (e) {
      console.log(e);
    }
  });

  const showPage = async (pageno) => {
    let page = await _PDFDOC.getPage(pageno);
    console.log('Page loaded');
    let viewport = page.getViewport({ scale: 1 });
    // Prepare canvas using PDF page dimensions
    let canvas = document.getElementById('canv');
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
    <img class="block shadow-[0_0_8px_0_rgba(0,0,0,0.15)] rounded-md w-full " src={blobimage} alt="document" />
  {:else if loading}
    <Loading />
  {:else}
    <div class="  flex max-w-full flex-col rounded-md">
      <canvas id="canv" class="border-2 block rounded-md overflow-hidden max-w-full  shadow-[0_0_8px_0_rgba(0,0,0,0.15)] aspect-auto" />
      <div class="flex justify-center items-center abolute bottom-0 inset-x-0 gap-3">
        <button on:click={previouspage} disabled={!prevbtn}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" class="w-6 h-6 {!prevbtn ? 'stroke-gray-200' : 'stroke-black'}">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <h1 class="text-lg text-black font-bold">{currentpage} / {_total_pages}</h1>
        <button on:click={nextpage} disabled={!nextbtn}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" class="w-6 h-6 {!nextbtn ? 'stroke-gray-200' : 'stroke-black'}">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  {/if}
</div>

<style>
  #blobcanv {
    height: 100vh;
    width: 100vw;
    display: block;
  }
</style>
