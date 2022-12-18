<script>
  import axios from 'axios';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  export let file;
  let otp = '';
  let SignFile;
  // let blobImg = URL.createObjectURL(img);
  // let blobPdf = URL.createObjectURL(pdf);
  let signreq;
  let docURL = localStorage.getItem('docURL');
  console.log(docURL);
  // imageUrl1 = imageUrl.split(';base64,').pop();
  let token = localStorage.getItem('token');
  console.log(token);

  let initvalues;
  let pdfPosition = {};
  pdfPosition.options = {};
  pdfPosition.init = function (options = {}) {
    if (!options.triggerButtons) throw console.error('No triggerButton class is provided');
    if (!options.imageTarget) throw console.error('No imageTarget id is provided');
    if (!options.positionTextbox) throw console.error('No positionTextbox id is provided');
    options.lockHorizontalCenter = false || options.lockHorizontalCenter;
    pdfPosition.options = options;
    let s = document.createElement('img');
    s.src = 'https://print2block.com/test/img/signSample.png';
    let a = 841 / 85;
    let b = 594.65 / 495;
    let c = document.createElement('canvas');
    let d = c.getContext('2d');
    let f = false;
    let [x, y] = [(c.width - c.width / b) / 2, (c.height - c.height / a) / 2];
    let w, h;
    let t = document.getElementById(options.imageTarget);
    pdfPosition.position = [];
    pdfPosition.position[0] = Math.floor((x * 594.65) / c.width);
    pdfPosition.position[1] = Math.floor(((c.height - y) * 841) / c.height - 85);
    pdfPosition.position[2] = Math.floor((x * 594.65) / c.width + 495);
    pdfPosition.position[3] = Math.floor(((c.height - y) * 841) / c.height);
    pdfPosition.lastposition = pdfPosition.position;

    let triggerButtons = document.querySelectorAll(options.triggerButtons);
    for (let i = 0; i < triggerButtons.length; i++) {
      triggerButtons[i].addEventListener('click', () => {
        c.width = t.width;
        c.height = t.height;
        d.fillStyle = '#0095ff5e';
        d.fillRect(0, 0, c.width, c.height);
        c.style.position = 'absolute';
        c.style.left = t.offsetLeft + 'px';
        c.style.top = t.offsetTop + 'px';
        t.parentElement.append(c);
        w = c.width / b;
        h = c.height / a;
        d.drawImage(s, x, y, w, h);
        f = true;
      });
    }

    c.onmousemove = function drawSignature(e) {
      if (f) {
        d.clearRect(0, 0, c.width, c.height);
        d.fillStyle = '#0095ff5e';
        d.fillRect(0, 0, c.width, c.height);
        if (pdfPosition.options.lockHorizontalCenter) x = (c.width - w) / 2;
        else x = (e.offsetX >= 0 ? Math.round(e.offsetX) : 0) - c.width / b / 2;
        y = (e.offsetY > -0 ? Math.round(e.offsetY) : 0) - c.height / a / 2;
        d.drawImage(s, x, y, w, h);
      }
    };

    c.onclick = function calculatePositions() {
      if (f) {
        f = false;
        d.clearRect(0, 0, c.width, c.height);
        d.drawImage(s, x, y, w, h);
        pdfPosition.lastposition = pdfPosition.position;
        pdfPosition.position[0] = Math.floor((x * 594.65) / c.width);
        pdfPosition.position[1] = Math.floor(((c.height - y) * 841) / c.height - 85);
        pdfPosition.position[2] = Math.floor((x * 594.65) / c.width + 495);
        pdfPosition.position[3] = Math.floor(((c.height - y) * 841) / c.height);
        if (options.positionTextbox) document.getElementById(options.positionTextbox).value = pdfPosition.position.toString();
      }
    };
  };

  const showPdf = async (url) => {
    console.log(url);
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.9.359/build/pdf.worker.min.js';
    let loadingTask = pdfjsLib.getDocument(url);
    loadingTask = loadingTask.promise;
    _PDFDOC = await loadingTask;
    _total_pages = _PDFDOC.numPages;
    currentpage = 1;
    showPage(1);
  };

  const showPage = async (pageno) => {
    let page = await _PDFDOC.getPage(pageno);
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
  let src;
  let base64, imageUrl, url, pdfUrl;
  base64 = localStorage.getItem('base64');
  console.log(base64);
  url = base64.split(';base64,');
  if (url[0] == 'data:image/png' || url[0] == 'data:image/jpg' || url[0] == 'data:image/jpeg') {
    console.log('image uplpaded');
    imageUrl = base64;
    console.log(imageUrl);
  } else if (url[0] == 'data:application/pdf') {
    console.log('pdf uplpaded');
    pdfUrl = base64;
    showPdf(pdfUrl);
    console.log(pdfUrl);
  } else {
    console.log('logged');
  }
  let currentpage = 0,
    _PDFDOC,
    _total_pages = 0;

  const trigger = () => {
    pdfPosition.init({
      triggerButtons: '.show-signature-overlay',
      imageTarget: 'mycanvas1',
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
      signBGColor: '#32a4a8',
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
      const { data } = await axios.get(`https://pdfsign.test.print2block.in/signature/download/${SignFile}`, { responseType: 'blob' });
      console.log(data);
      console.log(data.type);
      let blob = URL.createObjectURL(data);
      console.log(blob);
      modal = false;
      showPdf(blob);
    }
  };
  let nextbtn = true;
  let prevbtn = true;
  const nextpage = () => {
    if (currentpage < _total_pages) {
      console.log('initial', currentpage);
      showPage(currentpage + 1); //showPage(2)
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
  let position = false,
    bgclr = false,
    bold = false;
  const signaturePlacement = () => {
    if (pdfPosition.options.lockHorizontalCenter) pdfPosition.options.lockHorizontalCenter = false;
    else pdfPosition.options.lockHorizontalCenter = true;
    if (position == false) {
      position = true;
      bgclr = true;
      bold = true;
      // pdfPosition.options.lockHorizontalCenter = false;
    } else {
      position = false;
      bgclr = false;
      bold = false;
      // pdfPosition.options.lockHorizontalCenter = true;
    }
  };

  let clr = '#BEBEBE';
  const chooseClr = () => {
    console.log(clr);
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
        </div>
      </div>
    </div>
  {/if}
  <div class="w-8/12 flex flex-col gap-10">
    <div>
      <span class="text-base rounded-md font-bold bg-black text-white px-1 tracking-wider">STEP 1</span>
      <div class="flex items-center justify-start mt-2">
        <label for="pageNo" class="text-lg font-semibold w-1/2">Select Page No</label>
        <div class="flex items-center justify-start gap-5 px-4 w-1/2">
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
      <span class="text-base rounded-md font-bold bg-black text-white px-1 tracking-wider">STEP 2</span>
      <div class="flex items-center justify-start mt-2">
        <div class="w-1/2">
          <button on:click={trigger} class="show-signature-overlay text-base rounded-md bg-indigo-500 hover:bg-indigo-600 px-3 py-1 text-white border-2 border-indig0-700 font-semibold">Select Signature Placement</button>
        </div>
        <div class="flex items-center justify-start gap-5 w-1/2 px-4">
          <button on:click={signaturePlacement} id="posControls" class:justify-end={position} class:bg-indigo-300={bgclr} class="show-signature-overlay w-8 h-5 border-2 rounded-full flex items-center px-0.5"> <div class="w-3 h-3 bg-black rounded-full" /></button>
          <p class:font-semibold={bold} class="text-base">Lock Horizontal control</p>
        </div>
      </div>
    </div>
    <div>
      <span class="text-base rounded-md font-bold bg-black text-white px-1 tracking-wider">STEP 2</span>
      <div class="flex items-center justify-start mt-2">
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
      <div class="flex items-center justify-start">
        <div class="mb-2 w-1/2">
          <lable for="Identity" class="text-lg font-semibold">Position Textbox</lable>
        </div>
        <div class="flex items-center justify-start gap-5 w-1/2 px-4">
          <input id="positions" class="w-full border border-gray-500 bg-gray-100 px-2 py-1 rounded-md" type="text" name="positions" />
        </div>
      </div>
    </div>
  </div>
  <div class="w-4/12">
    <div class="show-signature-overlay overflow-hidden" />
    {#if (src = imageUrl)}
      <img id="mycanvas1" class="w-full h-full rounded-md mb-40" src={imageUrl} alt="document" />
    {:else}
      <canvas id="mycanvas1" class="border-2 rounded-md overflow-hidden w-full h-full aspect-auto" />
    {/if}
  </div>
  <button on:click={initiate} class="flex mx-auto mb-5 mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">initiate</button>
</div>
