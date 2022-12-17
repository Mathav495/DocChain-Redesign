<script>
  // import pdfPosition from '/public/lib/signPosition.js';
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
  let currentpage = 0,
    _PDFDOC,
    _total_pages = 0;

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
    let viewport = page.getViewport({ scale: 2 });

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
  let position = false;
  const signaturePlacement = () => {
    if (position == false) {
      position = true;
    } else {
      position = false;
    }
  };
  let clr = '#BEBEBE';
  const chooseClr = () => {
    console.log(clr);
  };
</script>

<div class="flex">
  <div class="w-8/12 flex flex-col gap-3">
    <div>
      <span class="text-base rounded-md font-bold bg-black text-white px-1 tracking-wider mb-1">STEP 1</span>
      <div class="flex items-center justify-start">
        <label for="pageNo" class="text-lg font-semibold w-1/2">Select Page No</label>
        <div class="flex items-center justify-start gap-5 w-1/2 px-4">
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
    </div>
    <div>
      <span class="text-base rounded-md font-bold bg-black text-white px-1 tracking-wider mb-1">STEP 2</span>
      <div class="flex items-center justify-start">
        <div class="w-1/2">
          <button class="show-signature-overlay text-lg rounded-md bg-indigo-500 hover:bg-indigo-600 px-3 py-1 text-white border-2 border-indig0-700 font-semibold">Select Signature Placement</button>
        </div>
        <div class="flex items-center justify-start gap-5 w-1/2 px-4">
          <button on:click={signaturePlacement} id="placement" class:justify-end={position} class="show-signature-overlay w-8 h-5 bg-sky-300 border rounded-full flex items-center px-0.5"> <div class="w-3 h-3 bg-black rounded-full" /></button>
          <p class="text-sm">Lock Horizontal control</p>
        </div>
      </div>
    </div>
    <div>
      <span class="text-base rounded-md font-bold bg-black text-white px-1 tracking-wider mb-1">STEP 2</span>
      <div class="flex items-center justify-start">
        <div class="mb-2 w-1/2">
          <lable for="Identity" class="text-lg font-semibold">Signer Identity</lable>
        </div>
        <div class="flex items-center justify-start gap-5 w-1/2 px-4">
          <input class="w-full border border-gray-500 bg-gray-100 px-2 py-1 rounded-md" type="text" name="Identity" id="Identity" value="819f82006a4c49263fcde49372eb58589194cc759fcc2c8758d804f97021cbe3" />
        </div>
      </div>
      <div class="flex items-center justify-start">
        <div class="mb-2 w-1/2">
          <lable for="Identity" class="text-lg font-semibold">Digital Signature fieldname</lable>
        </div>
        <div class="flex items-center justify-start gap-5 w-1/2 px-4">
          <input class="w-full border border-gray-500 bg-gray-100 px-2 py-1 rounded-md" type="text" name="Identity" id="Identity" placeholder="Field Name" />
        </div>
      </div>
      <div class="flex items-center justify-start">
        <div class="mb-2 w-1/2">
          <lable for="Identity" class="text-lg font-semibold">Reason for Digital Signature</lable>
        </div>
        <div class="flex items-center justify-start gap-5 w-1/2 px-4">
          <input class="w-full border border-gray-500 bg-gray-100 px-2 py-1 rounded-md" type="text" name="Identity" id="Identity" placeholder="Reason" />
        </div>
      </div>
      <div class="flex items-center justify-start">
        <div class="mb-2 w-1/2">
          <lable for="Identity" class="text-lg font-semibold">Signature Background color</lable>
        </div>
        <div class="flex items-center justify-start gap-5 w-1/2 px-4">
          <input on:input={chooseClr} bind:value={clr} class="w-full border border-gray-500 bg-gray-100 px-2 py-1 rounded-md" type="color" name="Identity" id="Identity" />
        </div>
      </div>
      <div class="flex items-center justify-start">
        <div class="mb-2 w-1/2">
          <lable for="Identity" class="text-lg font-semibold">QR Data (eg: Trust URL)</lable>
        </div>
        <div class="flex items-center justify-start gap-5 w-1/2 px-4">
          <input class="w-full border border-gray-500 bg-gray-100 px-2 py-1 rounded-md" type="text" name="Identity" id="Identity" value="www.google.com" />
        </div>
      </div>
    </div>
  </div>
  <div class="w-4/12">
    {#if (src = blobImg)}
      <img class="w-full h-full rounded-md mb-10" src={blobImg} alt="document" />
    {:else}
      <canvas id="mycanvas1" class="border-2 rounded-md overflow-hidden w-full h-full aspect-auto" />
    {/if}
  </div>
</div>
