<script>
  import axios from 'axios';
  export let file;
  let otp = '';
  let SignFile;
  // let blobImg = URL.createObjectURL(img);
  // let blobPdf = URL.createObjectURL(pdf);
  let signreq;
  let blobPdf = localStorage.getItem('blobpdf');
  console.log('pdf', blobPdf);
  let blobImg = localStorage.getItem('blobimage');
  console.log('img', blobImg);
  let currentpage, _PDFDOC, _total_pages;
  let docURL = localStorage.getItem('docURL');
  console.log(docURL);

  let imageUrl = localStorage.getItem('imageUrl');
  console.log(imageUrl);
  // imageUrl1 = imageUrl.split(';base64,').pop();

  let Pdfurl = localStorage.getItem('Pdfurl');

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
  showPdf(Pdfurl);

  const giveSign = () => {
    pdfPosition.init({
      triggerButtons: '.show-signature-overlay',
      imageTarget: '#mycanvas1',
      positionTextbox: 'positions',
    });
  };
  let modal = false;
  const initiate = async () => {
    console.log('initiate');
    // modal = true;

    initvalues = {
      signer: '819f82006a4c49263fcde49372eb58589194cc759fcc2c8758d804f97021cbe3',
      file: file,
      signPage: '0',
      signPosition: '50, 315, 545, 400',
      signField: 'signature',
      reason: 'testing purpose',
      signBGColor: '#1e10da',
      url: docURL,
    };
    const { data } = await axios.post('https://pdfsign.test.print2block.in/signature/initiate', initvalues, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(data);
    signreq = data.signRequest.id;
    console.log(signreq);
    modal = true;
  };
  const ConfirmRequest = async () => {
    //post method .to give the input field to call api
    const { data } = await axios.post('https://pdfsign.test.print2block.in/signature/confirm', {
      requestid: signreq,
      otp: otp,
    });
    console.log(data);
    SignFile = data.signRequest.signedFile;
    console.log(SignFile);
    if (SignFile) {
      console.log(SignFile);
      const { data } = await axios.get(`https://pdfsign.test.print2block.in/signature/download/${SignFile}`);
      console.log(data);
    }
  };
</script>

<div class="relative h-auto w-full flex flex-col items-center justify-center gap-3">
  {#if modal}
    <div class="w-full flex h-full bg-[#000000cc] absolute items-start justify-center p-4">
      <div class="w-full lg:w-3/5 bg-white shadow-[0_0_8px_0_rgba(0,0,0,0.15)] p-5 rounded-md">
        <h1 class="text-2xl text-slate-800 font-bold pb-3">Confirm Request</h1>
        <div class="flex gap-3">
          <h1 class="text-lg text-slate-800 font-semibold flex items-center">One Time Password</h1>
          <input bind:value={otp} type="text" placeholder="12345" class=" w-2/5 mt-2 pl-5 placeholder:text-base text-slate-800 rounded border focus:border-black focus:ring-1 focus:ring-black  text-lg outline-none py-1 px-3 leading-8" />
        </div>
        <div class="pt-5">
          <button on:click={ConfirmRequest} class=" text-white font-medium bg-blue-700 py-2 px-4 hover:bg-blue-800 tracking-wider rounded text-lg">Confirm Request</button>
          <!-- <button on:click={Confirmed} class=" text-white font-medium bg-blue-700 py-2 px-4 hover:bg-blue-800 tracking-wider rounded text-lg">Confirmed</button> -->
        </div>
      </div>
    </div>
  {/if}
  <div class="flex">
    <div class="w-1/2">
      <button on:click={giveSign} class="show-signature-overlay">Select Signature Placement</button>
    </div>
    <div class="w-1/2">
      {#if Pdfurl}
        <canvas id="mycanvas1" class="border-2 rounded-md overflow-hidden" />
      {/if}
      {#if blobImg}
        <img src={blobImg} alt="img" class="w-full h-full" />
      {/if}
    </div>
  </div>
  <button on:click={initiate} class="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">initiate</button>
</div>
