<script>
  export let img;
  export let pdf;
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

  const giveSign = () => {
    pdfPosition.init({
      triggerButtons: '.show-signature-overlay',
      imageTarget: '#mycanvas1',
      positionTextbox: 'positions',
    });
  };
</script>

<div class="flex">
  <div class="w-1/2">
    <button on:click={giveSign} class="show-signature-overlay">Select Signature Placement</button>
  </div>
  <div class="w-1/2">
    {#if blobPdf}
      <canvas id="mycanvas1" class="border-2 rounded-md overflow-hidden" />
    {/if}
    {#if blobImg}
      <img src={blobImg} alt="img" class="w-full h-full" />
    {/if}
  </div>
</div>
