<script>
  const loadingSVG =
    '<div class="flex mx-auto border items-center rounded-md w-full aspect-square items-center justify-center"><div style="width: 150px;"><svg version="1.1" id="L7" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"><path fill="#173f5f" d="M31.6,3.5C5.9,13.6-6.6,42.7,3.5,68.4c10.1,25.7,39.2,38.3,64.9,28.1l-3.1-7.9c-21.3,8.4-45.4-2-53.8-23.3c-8.4-21.3,2-45.4,23.3-53.8L31.6,3.5z" class="loader-ring-1"></path><path fill="#20639b" d="M42.3,39.6c5.7-4.3,13.9-3.1,18.1,2.7c4.3,5.7,3.1,13.9-2.7,18.1l4.1,5.5c8.8-6.5,10.6-19,4.1-27.7c-6.5-8.8-19-10.6-27.7-4.1L42.3,39.6z" class="loader-ring-2"></path><path fill="#3caea3" d="M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5L82,35.7z" class="loader-ring-3"></path></svg><h4 style="text-align: center; font-size: 1.25rem; margin-top: 30px; ">Loading Document, Please wait...</h4></div></div>'

  let blobimage = localStorage.getItem("blobimage")
  console.log(blobimage)
  let blobpdf = localStorage.getItem("blobpdf")
  console.log(blobpdf)

  let _total_pages = 0
  let currentpage = 0
  let _PDFDOC
  let src

  const nextpage = () => {
    if (currentpage < _total_pages) {
      currentpage++
      showPage(currentpage)
    }
  }
  const previouspage = () => {
    if (currentpage > 1) {
      currentpage--
      showPage(currentpage)
    }
  }
  let nextbtn = true
  let prevbtn = true

  // $: currentpage < _total_pages ? (nextbtn = true) : (nextbtn = false)
  // $: currentpage >= 1 ? (prevbtn = true) : (prevbtn = false)

  $: nextbtn = currentpage < _total_pages
  $: prevbtn = currentpage > 1

  // $: if (currentpage < _total_pages) {
  //   nextbtn = true
  // } else {
  //   nextbtn = false
  // }
  // $: if (currentpage >= 1) {
  //   prevbtn = true
  // } else {
  //   prevbtn = false
  // }

  let rTime = 0,
    sTime = 0
  // "/assets/Handbook on SHG.pdf"

  const showpdf = async () => {
    try {
      pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdn.jsdelivr.net/npm/pdfjs-dist@2.9.359/build/pdf.worker.min.js"
      let loadingTask = pdfjsLib.getDocument(blobpdf)
      loadingTask = loadingTask.promise
      _PDFDOC = await loadingTask
      _total_pages = _PDFDOC.numPages
      console.log(_total_pages)
      console.log(_PDFDOC)
      currentpage = 1
      sTime = Date.now()
      await showPage(1)
      rTime = Date.now() - sTime
      console.log("Render Time: ", rTime)
    } catch (e) {
      console.error(e)
    }
  }

  async function sleep(time) {
    return new Promise((resolve) => {
      setTimeout(function () {
        resolve()
      }, time)
    })
  }

  const showPage = async (pageno) => {
    const pdfprev = document.getElementById("pdf-preview")

    // await sleep(1000)
    if (rTime > 750) {
      pdfprev.removeChild(pdfprev.children[0])
      let svg = document.createElement("svg")
      pdfprev.appendChild(svg)
      svg.outerHTML = loadingSVG
    }
    let page = await _PDFDOC.getPage(pageno)
    console.log("Page loaded")
    let viewport = page.getViewport({ scale: 1 })

    // Prepare canvas using PDF page dimensions
    let canvas = document.createElement("canvas")
    canvas.className =
      "flex mx-auto border items-center rounded-md w-full items-center justify-center max-h-[60rem]"
    let context = canvas.getContext("2d")
    canvas.height = viewport.height
    canvas.width = viewport.width

    // Render PDF page into canvas context
    let renderContext = {
      canvasContext: context,
      viewport: viewport,
    }
    await page.render(renderContext).promise
    pdfprev.removeChild(pdfprev.children[0])
    pdfprev.appendChild(canvas)
  }
  if (blobpdf) {
    console.log("rendering pdf")
    showpdf()
  }
</script>

<div class="flex w-full flex-col pb-12">
  {#if blobimage}
    <img
      class="block shadow-[0_0_8px_0_rgba(0,0,0,0.15)] rounded-md mb-10 w-full "
      src={blobimage}
      alt="document"
    />
  {:else}
    <div class="  flex max-w-full flex-col rounded-md ">
      <div
        id="pdf-preview"
        class="max-h-[60rem] shadow-[0_0_8px_0_rgba(0,0,0,0.15)] "
      >
        <div
          class="flex  border rounded-md w-full aspect-square items-center justify-center mx-auto shadow-[0_0_8px_0_rgba(0,0,0,0.15)]"
        >
          <div style="width: 150px;">
            <svg
              version="1.1"
              id="L7"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 100 100"
              enable-background="new 0 0 100 100"
              xml:space="preserve"
            >
              <path
                fill="#173f5f"
                d="M31.6,3.5C5.9,13.6-6.6,42.7,3.5,68.4c10.1,25.7,39.2,38.3,64.9,28.1l-3.1-7.9c-21.3,8.4-45.4-2-53.8-23.3c-8.4-21.3,2-45.4,23.3-53.8L31.6,3.5z"
                class="loader-ring-1"
              />
              <path
                fill="#20639b"
                d="M42.3,39.6c5.7-4.3,13.9-3.1,18.1,2.7c4.3,5.7,3.1,13.9-2.7,18.1l4.1,5.5c8.8-6.5,10.6-19,4.1-27.7c-6.5-8.8-19-10.6-27.7-4.1L42.3,39.6z"
                class="loader-ring-2"
              />
              <path
                fill="#3caea3"
                d="M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5L82,35.7z"
                class="loader-ring-3"
              />
            </svg>
            <h4
              style="text-align: center; font-size: 1.25rem; margin-top: 30px; "
            >
              Loading Document, Please wait...
            </h4>
          </div>
        </div>
      </div>
    </div>
    {#if _total_pages != 0}
      <div class="flex justify-center items-center mx-auto  gap-3 mt-4 mb-8">
        <button on:click={previouspage} disabled={!prevbtn}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            class="w-6 h-6 {!prevbtn ? 'stroke-gray-200' : 'stroke-black'}"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <h1 class="text-lg text-black font-bold">
          {currentpage} / {_total_pages}
        </h1>
        <button on:click={nextpage} disabled={!nextbtn}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            class="w-6 h-6 {!nextbtn ? 'stroke-gray-200' : 'stroke-black'}"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    {/if}
  {/if}
</div>

<style global>
  /* h5 {
    background-color: aliceblue;
  } */
  .loader-ring-1 {
    animation: loadRotate linear 2s infinite;
    -moz-animation: 2s linear 0s none infinite loadRotate;
    -webkit-animation: loadRotate 2s linear 0s infinite;
  }

  .loader-ring-2 {
    animation: loadRotate linear 1s infinite;
    -moz-animation: 1s linear 0s none infinite loadRotate;
    -webkit-animation: loadRotate 1s linear 0s infinite;
  }

  .loader-ring-3 {
    animation: loadRotate linear 2s infinite;
    -moz-animation: 2s linear 0s none infinite loadRotate;
    -webkit-animation: loadRotate 2s linear 0s infinite;
  }

  @keyframes loadRotate {
    0% {
      transform: rotate(0deg);
      transform-origin: 50% 50%;
    }

    100% {
      transform: rotate(360deg);
      transform-origin: 50% 50%;
    }
  }

  @-moz-keyframes spin {
    0% {
      transform: rotate(0deg);
      transform-origin: 50% 50%;
    }

    100% {
      transform: rotate(360deg);
      transform-origin: 50% 50%;
    }
  }

  @-webkit-keyframes spin {
    0% {
      transform: rotate(0deg);
      transform-origin: 50% 50%;
    }

    100% {
      transform: rotate(360deg);
      transform-origin: 50% 50%;
    }
  }
</style>
