<script>
  export let img;
  export let pdf;
  let src;
  console.log(img);
  console.log(pdf);
  // let blobImg = URL.createObjectURL(img);
  // let blobPdf = URL.createObjectURL(pdf);
  let blobPdf = localStorage.getItem('blobpdf');
  console.log('pdf', blobPdf);
  let blobImg = localStorage.getItem('blobimage');
  console.log('img', blobImg);
  let currentpage, _PDFDOC, _total_pages;

  const showPdf = async (blob) => {
    console.log('get blob');
    // await pageloader();
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.9.359/build/pdf.worker.min.js';
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
    let canvas = document.getElementById('mycanvas1');
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
  showPdf(blobPdf);

  // pdfPosition.init({
  //   triggerButtons: '.show-signature-overlay',
  //   imageTarget: '#mycanvas1',
  //   positionTextbox: 'positions',
  // });

  let nextbtn = true;
  let prevbtn = true;
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

<div class="flex">
  <div class="w-1/2">
    <div class="flex items-center justify-start">
      <label for="pageNo" class="text-lg font-semibold w-1/2">Select Page No</label>
      <div class="flex items-center justify-start gap-5 w-1/2">
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
    <!-- <button class="show-signature-overlay">Select Signature Placement</button> -->
  </div>
  <div class="w-1/2">
    {#if (src = blobImg)}
      <img class="w-full h-full rounded-md mb-10" src={blobImg} alt="document" />
    {:else}
      <canvas id="mycanvas1" class="border-2 rounded-md overflow-hidden w-full h-full aspect-auto" />
    {/if}
  </div>
</div>
