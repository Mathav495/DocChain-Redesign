<script>
  import { onMount } from 'svelte';
  import Loading from './Loading.svelte';
  let loading = false;
  let src;
  let currentpage, _PDFDOC, _total_pages;
  let rTime = 0;

  const loadingSVG =
    '<div class="doc-loading w-100 mw-800 border rounded-5 d-flex mx-auto" style="aspect-ratio: 1/1; align-items: center!important; justify-content: center!important;"><div style="width: 150px;"><svg version="1.1" id="L7" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"><path fill="#173f5f" d="M31.6,3.5C5.9,13.6-6.6,42.7,3.5,68.4c10.1,25.7,39.2,38.3,64.9,28.1l-3.1-7.9c-21.3,8.4-45.4-2-53.8-23.3c-8.4-21.3,2-45.4,23.3-53.8L31.6,3.5z" id="ring-1"></path><path fill="#20639b" d="M42.3,39.6c5.7-4.3,13.9-3.1,18.1,2.7c4.3,5.7,3.1,13.9-2.7,18.1l4.1,5.5c8.8-6.5,10.6-19,4.1-27.7c-6.5-8.8-19-10.6-27.7-4.1L42.3,39.6z" id="ring-2"></path><path fill="#3caea3" d="M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5L82,35.7z" id="ring-3"></path></svg><h4 style="text-align: center; font-size: 1.25rem; margin-top: 30px; font-family: roboto;">Loading Document, Please wait...</h4></div></div>';
  let sTime = Date.now();
  console.log('Start Time: ', sTime);
  // await displayPage(currentPage);
  let eTime = Date.now();
  console.log('End Time: ', eTime);
  rTime = eTime - sTime;
  console.log('Render Time: ', rTime);

  // const displayPage = async (pageno) => {
  //   let docTargets = document.getElementById('blobcanv');
  //   for (let i = 0; i < docTargets.length; i++) {
  //     if (rTime > 500) {
  //       docTargets[i].childNodes[0].remove();
  //       let svg = document.createElement('svg');
  //       docTargets[i].append(svg);
  //       svg.outerHTML = loadingSVG;
  //     }
  //     let canvas = document.getElementById;
  //   }
  // };

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
    // let docTargets = document.querySelectorAll('.canvas');
    // for (let i = 0; i < docTargets.length; i++) {
    //   if (rTime > 100) {
    //     docTargets[i].childNodes[0].remove();
    //     let svg = document.createElement('svg');
    //     docTargets[i].append(svg);
    //     svg.outerHTML = loadingSVG;
    //   }
    //   // let canvas = document.getElementById('blobcanv');
    //   // // canvas.className = "w-100 border rounded-5 shadow"
    //   // await showPage(pageno, canvas);
    //   // if (canvas.width < canvas.height) canvas.classList.add('mw-800');
    //   // docTargets[i].replaceChild(canvas, docTargets[i].children[0]);
    // }
    let page = await _PDFDOC.getPage(pageno);
    console.log('Page loaded');
    let viewport = page.getViewport({ scale: 1 });
    // Prepare canvas using PDF page dimensions
    let canvas = document.getElementById('blobcanv');
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
    <img class="block shadow-[0_0_8px_0_rgba(0,0,0,0.15)] rounded-md mb-10 w-full " src={blobimage} alt="document" />
  {:else if loading}
    <Loading />
  {:else}
    <div class=" relative flex max-w-full flex-col rounded-md">
      <canvas id="blobcanv" class="border-2 block rounded-md overflow-hidden max-w-full  shadow-[0_0_8px_0_rgba(0,0,0,0.15)]  mb-28 aspect-auto canvas" />
      <div class="flex justify-center items-center absolute bottom-20 inset-x-0 gap-3">
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
