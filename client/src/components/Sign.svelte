<script>
  import axios from 'axios';
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
  let qrcode = localStorage.getItem('qrcode');
  console.log(qrcode);
  let token = localStorage.getItem('token');
  console.log(token);
  let initvalues;
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
  const initiate = async () => {
    console.log('initiate');
    initvalues = {
      signer: '819f82006a4c49263fcde49372eb58589194cc759fcc2c8758d804f97021cbe3',
      file: blobPdf,
      signPage: '0',
      signPosition: '50, 315, 545, 400',
      signField: 'signature',
      reason: 'testing purpose',
      signBGColor: '#1e10da ',
      url: qrcode,
    };
    const { data } = await axios.post('https://pdfsign.test.print2block.in/signature/initiate', initvalues, {
      headers: {
        'x-access-token': token,
      },
    });
    console.log(data);
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
<button on:click={initiate} class="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">initiate</button>
