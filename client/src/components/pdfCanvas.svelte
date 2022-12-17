<script>
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import PDFPage from './PDFPage.svelte';
  import Image from './Image.svelte';
  // import Text from "./Text.svelte"
  import Drawing from './Drawing.svelte';
  import DrawingCanvas from './DrawingCanvas.svelte';
  import prepareAssets, { fetchFont } from '../utils/prepareAssets.js';
  import { readAsArrayBuffer, readAsImage, readAsPDF, readAsDataURL } from '../utils/asyncReader.js';
  import { ggID } from '../utils/helper.js';
  import { save } from '../utils/PDF.js';
  import Loading from './Loading.svelte';
  const genID = ggID();
  let pdfFile;
  let pdfName = '';
  let pages = [];
  let pagesScale = [];
  let allObjects = [];
  let currentFont = 'Times-Roman';
  let focusId = null;
  let selectedPageIndex = -1;
  let saving = false;
  let addingDrawing = false;
  let nextbtn = true;
  let prevbtn = true;
  let currentpage, _PDFDOC, _total_pages, showpdf;

  /**
   * getting saved blob image from localstorage
   */
  let blobimage = localStorage.getItem('blobimage');
  console.log(blobimage);

  /**
   * getting saved pdf blob and converting it as the base64 string
   */
  let blob = localStorage.getItem('blobpdf');
  console.log(blob);
  // for test purpose
  onMount(async () => {
    try {
      const res = await fetch(blob);
      const pdfBlob = await res.blob();
      await addPDF(pdfBlob);
      selectedPageIndex = 0;
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.9.359/build/pdf.worker.min.js';
      let loadingTask = pdfjsLib.getDocument(blob);
      loadingTask = loadingTask.promise;
      _PDFDOC = await loadingTask;
      _total_pages = _PDFDOC.numPages;
      console.log(_total_pages);
      console.log(_PDFDOC);
      currentpage = 1;
      showPage(1);
    } catch (e) {
      console.log(e);
    }
  });

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

  async function onUploadPDF(e) {
    const files = e.target.files || (e.dataTransfer && e.dataTransfer.files);
    const file = files[0];
    if (!file || file.type !== 'application/pdf') return;
    selectedPageIndex = -1;
    try {
      await addPDF(file);
      selectedPageIndex = 0;
    } catch (e) {
      console.log(e);
    }
  }

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
  async function addPDF(file) {
    try {
      const pdf = await readAsPDF(file);
      pdfName = file.name;
      pdfFile = file;
      const numPages = pdf.numPages;
      pages = Array(numPages)
        .fill()
        .map((_, i) => pdf.getPage(i + 1));
      allObjects = pages.map(() => []);
      pagesScale = Array(numPages).fill(1);
    } catch (e) {
      console.log('Failed to add pdf.');
      throw e;
    }
  }
  async function onUploadImage(e) {
    const file = e.target.files[0];
    if (file && selectedPageIndex >= 0) {
      addImage(file);
    }
    e.target.value = null;
  }
  async function addImage(file) {
    try {
      // get dataURL to prevent canvas from tainted
      const url = await readAsDataURL(file);
      const img = await readAsImage(url);
      const id = genID();
      const { width, height } = img;
      const object = {
        id,
        type: 'image',
        width,
        height,
        x: 0,
        y: 0,
        payload: img,
        file,
      };
      allObjects = allObjects.map((objects, pIndex) => (pIndex === selectedPageIndex ? [...objects, object] : objects));
    } catch (e) {
      console.log(`Fail to add image.`, e);
    }
  }
  function onAddTextField() {
    if (selectedPageIndex >= 0) {
      addTextField();
    }
  }
  function addTextField(text = 'New Text Field') {
    const id = genID();
    fetchFont(currentFont);
    const object = {
      id,
      text,
      type: 'text',
      size: 16,
      width: 0, // recalculate after editing
      lineHeight: 1.4,
      fontFamily: currentFont,
      x: 0,
      y: 0,
    };
    allObjects = allObjects.map((objects, pIndex) => (pIndex === selectedPageIndex ? [...objects, object] : objects));
  }
  function onAddDrawing() {
    if (selectedPageIndex >= 0) {
      addingDrawing = true;
    }
  }
  function addDrawing(originWidth, originHeight, path, scale = 1) {
    const id = genID();
    const object = {
      id,
      path,
      type: 'drawing',
      x: 0,
      y: 0,
      originWidth,
      originHeight,
      width: originWidth * scale,
      scale,
    };
    allObjects = allObjects.map((objects, pIndex) => (pIndex === selectedPageIndex ? [...objects, object] : objects));
  }
  function selectFontFamily(event) {
    const name = event.detail.name;
    fetchFont(name);
    currentFont = name;
  }
  function selectPage(index) {
    selectedPageIndex = index;
  }
  function updateObject(objectId, payload) {
    allObjects = allObjects.map((objects, pIndex) => (pIndex == selectedPageIndex ? objects.map((object) => (object.id === objectId ? { ...object, ...payload } : object)) : objects));
  }
  function deleteObject(objectId) {
    allObjects = allObjects.map((objects, pIndex) => (pIndex == selectedPageIndex ? objects.filter((object) => object.id !== objectId) : objects));
  }
  function onMeasure(scale, i) {
    pagesScale[i] = scale;
  }
  // FIXME: Should wait all objects finish their async work
  async function savePDF() {
    if (!pdfFile || saving || !pages.length) return;
    saving = true;
    try {
      await save(pdfFile, allObjects, pdfName, pagesScale);
    } catch (e) {
      console.log(e);
    } finally {
      saving = false;
    }
  }
</script>

<svelte:window on:dragenter|preventDefault on:dragover|preventDefault on:drop|preventDefault={onUploadPDF} />
<main class="flex flex-col rounded-md drop-shadow-lg items-center w-full bg-gray-100 h-full border border-gray-300 ">
  <div
    class="flex justify-center text-center items-center
     shadow-lg"
  >
    <canvas id="mycanvas" class="border-2 rounded-md overflow-hidden" />
    <!-- <img src="" alt="sampleimage" id="pdf-preview" class="w-full max-h-[34rem] lg:max-h-[37rem]" /> -->
    <div class="flex justify-center items-center gap-8 pt-3">
      <button on:click={previouspage} disabled={!prevbtn}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" class="w-6 h-6 {!prevbtn ? 'stroke-gray-600' : 'stroke-black'}">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <h1 class="text-lg text-black font-bold">{currentpage}</h1>
      <button on:click={nextpage} disabled={!nextbtn}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" class="w-6 h-6 {!nextbtn ? 'stroke-gray-600' : 'stroke-black'}">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
    <!-- <input type="file" name="pdf" id="pdf" on:change={onUploadPDF} class="hidden" />
    <input type="file" id="image" name="image" class="hidden" on:change={onUploadImage} /> -->
    <!-- <div class="relative fixed top-0 flex h-10 bg-gray-400 rounded-lg overflow-hidden
      md:mr-4">
      <label
        class="flex items-center justify-center h-full w-32 hover:bg-gray-500
        cursor-pointer"
        for="image"
        class:cursor-not-allowed={selectedPageIndex < 0}
        class:bg-gray-500={selectedPageIndex < 0}
      >
        <img src="/assets/image.svg" alt="An icon for adding images" />
        <span class="ml-3 text-gray-900 text-base font-bold">Add-Image</span>
      </label>
      svelte-ignore a11y-click-events-have-key-events -->
    <!-- <label
        class=" flex items-center justify-center h-full w-32 bg-teal-300 hover:bg-gray-500
        cursor-pointer"
        for="id"
        signature
        on:click={onAddDrawing}
        class:cursor-not-allowed={selectedPageIndex < 0}
        class:bg-gray-500={selectedPageIndex < 0}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg>
        <span class="ml-3 text-gray-900 text-base font-bold">Add-Sign</span>
      </label>
    </div> -->
    <!-- <button
    on:click={savePDF}
    class="w-20 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3
    md:px-4 mr-3 md:mr-4 rounded"
    class:cursor-not-allowed={pages.length === 0 || saving || !pdfFile}
    class:bg-blue-700={pages.length === 0 || saving || !pdfFile}
  >
    {saving ? "Saving" : "Save"}
  </button> -->
  </div>
  {#if addingDrawing}
    <div
      transition:fly={{ y: -200, duration: 500 }}
      class="fixed z-10 top-0 left-0 right-0 border-b border-gray-300 bg-white
      shadow-lg"
      style="height: 40%;"
    >
      <DrawingCanvas
        on:finish={(e) => {
          const { originWidth, originHeight, path } = e.detail;
          let scale = 0.5;
          if (originWidth > 500) {
            scale = 500 / originWidth;
          }
          addDrawing(originWidth, originHeight, path, scale);
          addingDrawing = false;
        }}
        on:cancel={() => (addingDrawing = false)}
      />
    </div>
  {/if}
  {#if pages.length}
    <!-- <div class="flex justify-center px-5 w-full md:hidden">
			<img src="/edit.svg" class="mr-2" alt="a pen, edit pdf name" />
			<input placeholder="Rename your PDF here" type="text" class="flex-grow bg-transparent" bind:value={pdfName} />
		</div> -->
    <div class="w-full">
      {#each pages as page, pIndex (page)}
        <div class="w-full flex flex-col items-center overflow-hidden" on:mousedown={() => selectPage(pIndex)} on:touchstart={() => selectPage(pIndex)}>
          <div class="relative shadow-lg" class:shadow-outline={pIndex === selectedPageIndex}>
            <PDFPage on:measure={(e) => onMeasure(e.detail.scale, pIndex)} {page} />
            <div class="absolute top-0 left-0 transform origin-top-left" style="transform: scale({pagesScale[pIndex]}); touch-action: none;">
              {#each allObjects[pIndex] as object (object.id)}
                {#if object.type === 'image'}
                  <Image on:update={(e) => updateObject(object.id, e.detail)} on:delete={() => deleteObject(object.id)} file={object.file} payload={object.payload} x={object.x} y={object.y} width={object.width} height={object.height} pageScale={pagesScale[pIndex]} />
                {:else if object.type === 'drawing'}
                  <Drawing on:update={(e) => updateObject(object.id, e.detail)} on:delete={() => deleteObject(object.id)} path={object.path} x={object.x} y={object.y} width={object.width} originWidth={object.originWidth} originHeight={object.originHeight} pageScale={pagesScale[pIndex]} />
                {/if}
              {/each}
            </div>
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <Loading />
  {/if}
</main>
