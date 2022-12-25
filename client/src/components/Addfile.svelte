<script>
  export let signedLink, signedPdf,pageNumber,id
  export let pageNumber
  import { createEventDispatcher } from "svelte"
  const dispatch = createEventDispatcher()
  import axios from "axios"
  import { navigate } from "svelte-routing"
  import { fade } from "svelte/transition"
  import { jsPDF } from "jspdf"
  import html2canvas from "html2canvas"
  import HeaderFileupload from "./header_fileupload.svelte"
  import ErrorInfo from "./ErrorInfo.svelte"
  let blobimage, blobPdf, pdfDoc, File, totalPages, displayPdf, errormsg
  let displayConfirm = false
  let displayerror = false
  let displayDropzone = true
  let displaypreview = false
  let nextbtn = true
  let prevbtn = true
  let currentpage = 1
  let btns = true
  /**
   * Submitting file for generating filehash
   */
  const onSubmitFile = async () => {
    //Runs only if the file exits
    if (File) {
      try {
        const { data } = await axios.post(
          "https://test.swagger.print2block.in/docs/add-file",
          {
            documentID: localStorage.getItem("documentID"),
            file: File,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "x-access-token": localStorage.getItem("token"),
            },
          }
        )
        console.log(data)
        localStorage.setItem("filehash", data.fileHash)

        if (data.fileHash) {
          // For local storage
          let localfile = JSON.parse(localStorage.getItem("docDetails"))
          console.log("localfile", localfile)
          localfile.find((localfile) => {
            if (localfile.documentID == id) {
              console.log(localfile)
              console.log("same id", localfile.documentID)
              console.log("filehash", localfile.filehash)
              localfile.filehash = true
              console.log(localfile)
            }
          })
          console.log(localfile, "local")
          localStorage.setItem("docDetails", JSON.stringify(localfile))

          //For navigating to next page
          navigate(`/add-data/${id}`)
        } else {
          // Runs if error throws while the error msg presents
          if (data.error) {
            displayConfirm = false
            displaypreview = false
            displayDropzone = true
            errormsg = data.errorCode
            errormsg = errormsg.replaceAll("P2BCODE::", "")
            displayerror = true
            setTimeout(() => {
              displayerror = false
            }, 3000)
          }
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  const loadingSVG =
    '<div class="flex mx-auto border items-center rounded-md w-full aspect-square items-center justify-center"><div style="width: 150px;"><svg version="1.1" id="L7" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"><path fill="#173f5f" d="M31.6,3.5C5.9,13.6-6.6,42.7,3.5,68.4c10.1,25.7,39.2,38.3,64.9,28.1l-3.1-7.9c-21.3,8.4-45.4-2-53.8-23.3c-8.4-21.3,2-45.4,23.3-53.8L31.6,3.5z" class="loader-ring-1"></path><path fill="#20639b" d="M42.3,39.6c5.7-4.3,13.9-3.1,18.1,2.7c4.3,5.7,3.1,13.9-2.7,18.1l4.1,5.5c8.8-6.5,10.6-19,4.1-27.7c-6.5-8.8-19-10.6-27.7-4.1L42.3,39.6z" class="loader-ring-2"></path><path fill="#3caea3" d="M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5L82,35.7z" class="loader-ring-3"></path></svg><h4 style="text-align: center; font-size: 1.25rem; margin-top: 30px; ">Loading Document, Please wait...</h4></div></div>'

  let rTime = 0,
    sTime = 0

  async function sleep(time) {
    return new Promise((resolve) => {
      setTimeout(function () {
        resolve()
      }, time)
    })
  }

  /**
   * Function for previewing image or pdf when uploaded
   */
  const ondisplay = async () => {
    console.log("displayed")
    const form = document.getElementById("form")
    const formData = new FormData(form)
    console.log([...formData]) //spread opearator
    let datum = [...formData][0]
    console.log(datum)
    File = datum[1]
    console.log(File)
    console.log(File.type)
    if (
      File.type == "image/png" ||
      File.type == "image/jpg" ||
      File.type == "image/jpeg"
    ) {
      displaypreview = true
      displayDropzone = false
      displayPdf = false
      //converting input image file to Base64 String using filereader
      let reader = new FileReader()
      reader.readAsDataURL(File)
      // await sleep(2500)
      reader.onload = async (evt) => {
        let base64 = evt.target.result
        let doc = new jsPDF({
          orientation: "l",
          unit: "px",
          compress: true,
        })
        let width = doc.internal.pageSize.getWidth()
        let height = doc.internal.pageSize.getHeight()
        let imgData = base64
        console.log("pdf initiated using jspdf")
        console.log(imgData)
        doc.addImage(imgData, "JPEG", 0, 0, width, height)
        doc.output("bloburl")
        // let url = doc.output("bloburl")
        localStorage.setItem("ImageToPdfBlob", doc.output("bloburl"))
        let PdfBlobFromImg = localStorage.getItem("ImageToPdfBlob")
        console.log(PdfBlobFromImg)
        const showPdf = async () => {
          try {
            pdfjsLib.GlobalWorkerOptions.workerSrc =
              "https://cdn.jsdelivr.net/npm/pdfjs-dist@2.9.359/build/pdf.worker.min.js"
            console.log("pdfjs library loaded")
            await sleep(1000)
            let loadingTask = pdfjsLib.getDocument(PdfBlobFromImg)
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

        const showPage = async (pageno) => {
          let page = await _PDFDOC.getPage(pageno)
          console.log("pdf loaded")
          let viewport = page.getViewport({ scale: 1.4 })

          // Prepare canvas using PDF page dimensions
          let canvas = document.getElementById("ImgToPdfBlob")
          let context = canvas.getContext("2d")
          canvas.height = viewport.height
          canvas.width = viewport.width

          // Render PDF page into canvas context
          let renderContext = {
            canvasContext: context,
            viewport: viewport,
          }
          await page.render(renderContext).promise
        }
        if (PdfBlobFromImg) {
          showPdf()
        }
      }
      return
    } else if (File.type == "application/pdf") {
      displayPdf = true
      await loadLibrary("pdfjs", "/lib/pdf.js")
      blobPdf = URL.createObjectURL(File)
      localStorage.setItem("blobpdf", blobPdf)
      console.log(blobPdf)
      try {
        await showPdf(blobPdf)
      } catch (error) {
        console.error(error)
      }
      displayDropzone = false
      displaypreview = true
      return
    } else {
      displaypreview = false
      displayPdf = false
      return
    }
  }

  /**
   * Function for loading the library
   * @param id {String} id for the newly creating script element
   * @param location {String} path for the library
   */
  const loadLibrary = async (id, location) => {
    return new Promise((resolve) => {
      let elem = document.createElement("script")
      elem.id = id
      elem.type = "application/javascript"
      elem.src = location
      document.body.appendChild(elem)
      elem.onload = async function () {
        resolve()
      }
    })
  }

  /**
   * Function for loading the pdf document using pdfjs library
   * @param blobPdf {String} blob url for the pdf to be previewed
   */
  const showPdf = async (blobPdf) => {
    console.log("pdfjsLib", pdfjsLib)
    pdfjsLib.GlobalWorkerOptions.workerSrc = "/lib/pdf.worker.js"
    let loadingTask = pdfjsLib.getDocument(blobPdf)
    loadingTask = loadingTask.promise
    pdfDoc = await loadingTask
    totalPages = pdfDoc.numPages
    dispatch("totalPage", totalPages)
    sTime = Date.now()
    await showPage(1)
    rTime = Date.now() - sTime
    console.log("Render Time: ", rTime)
    console.log("totalPages", totalPages)
    console.log(pdfDoc)
    showPage(currentpage)
  }

  /**
   * to display signed pdf in add file page
   */
  const displaySignedPdf = async () => {
    if (signedLink) {
      console.log(signedLink)
      displayDropzone = false
      try {
        let hideCanvas = document.getElementById("createdCanvas")
        hideCanvas.style.display = "none"
        let pdfPreview = document.getElementById("pdfPreviewSection")
        pdfPreview.textContent = ""
        console.log(pdfPreview)
        currentpage = pageNumber
        await showPdf(signedLink)
      } catch (error) {
        console.error(error)
      }
      displaypreview = true
      displayPdf = true
    }
  }

  /**
   * Function for rendering the particular page of the document
   * @param pageno {Number} Page Number of the pdf document
   */
  const showPage = async (pageno) => {
    let page = await pdfDoc.getPage(pageno)
    console.log("Page loaded")
    let viewport = page.getViewport({ scale: 1.03 })
    console.log("currentpage", currentpage)

    // Prepare canvas using PDF page dimensions
    let pdfPreview = document.getElementById("pdfPreviewSection")
    let canvas = document.createElement("canvas")
    canvas.className = "border-2 rounded-md w-full overflow-hidden"
    canvas.setAttribute("id", "mycanvas")
    console.log(canvas)
    let context = canvas.getContext("2d")
    canvas.height = viewport.height
    canvas.width = viewport.width

    // Render PDF page into canvas context
    let renderContext = {
      canvasContext: context,
      viewport: viewport,
    }
    await page.render(renderContext).promise
    pdfPreview.appendChild(canvas)
  }

  $: if (signedPdf) {
    console.log(signedPdf)
    File = signedPdf
    console.log(File)
  }

  $: if (signedLink) {
    displaySignedPdf()
  }

  $: if (pageNumber) {
    btns = false
    let pdfPreview = document.getElementById("pdfPreviewSection")
    pdfPreview.removeChild(pdfPreview.children[0])
    showPage(pageNumber)
  }

  $: nextbtn = currentpage < totalPages

  $: prevbtn = currentpage > 1

  /**
   * Function to move to the next page
   */
  const nextpage = () => {
    if (currentpage < totalPages) {
      console.log("nextbtn")
      let pdfPreview = document.getElementById("pdfPreviewSection")
      pdfPreview.removeChild(pdfPreview.children[0])
      currentpage++
      console.log("currentpage next btn", currentpage)
      showPage(currentpage)
    }
  }

  /**
   * Function to move to the previous page
   */
  const previouspage = () => {
    if (currentpage > 1) {
      let pdfPreview = document.getElementById("pdfPreviewSection")
      pdfPreview.removeChild(pdfPreview.children[0])
      currentpage--
      console.log("currentpage prev btn", currentpage)
      showPage(currentpage)
    }
  }

  /**
   * Function for hiding the display dropzone and show the displaypreview
   */
  const ondisplaydropzone = () => {
    let pdfPreview = document.getElementById("pdfPreviewSection")
    pdfPreview.textContent = ""
    displayDropzone = true
    displaypreview = false
  }

  /**
   * Function for dispatching the file to the sign page
   */
  const signDoc = () => {
    if (
      File.type == "image/png" ||
      File.type == "image/jpg" ||
      File.type == "image/jpeg" ||
      File.type == "application/pdf"
    ) {
      dispatch("File", File)
    }
    dispatch("steps")
  }
</script>

<div
  class="relative h-auto w-full flex flex-col items-center justify-center  p-4"
>
  <div
    class="w-full h-full bg-[#000000cc] absolute  flex items-end justify-center p-4"
    class:hidden={!displayConfirm}
  >
    <div
      class="z-10 flex flex-col lg:flex-row w-full lg:w-3/5  bg-white shadow-[0_0_8px_0_rgba(0,0,0,0.15)] p-5 rounded-md"
    >
      <div>
        <h1 class="text-lg text-blue-500 font-bold pb-3">Confirmation</h1>
        <p class="text-base text-slate-500 font-semibold">
          You are not able to choose different file if you click upload
        </p>
      </div>
      <div class="flex gap-4 ml-0 lg:ml-auto items-end pt-3 lg:pt-0">
        <div>
          <button
            on:click={() => (displayConfirm = false)}
            class="border-2 border-red-500 hover:bg-red-500 hover:text-white text-red-500 rounded-md px-3  py-1 text-base  font-bold tracking-wide"
          >
            Back
          </button>
        </div>
        <div>
          <button
            on:click={onSubmitFile}
            class="border-2 border-green-500 hover:bg-green-500 hover:text-white text-green-500 rounded-md px-2  py-1 text-base  font-bold tracking-wide"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  </div>

  <HeaderFileupload {id} />

  <form
    id="form"
    method="post"
    action="/docs/initiate"
    enctype="multipart/form-data"
    class="pt-3 w-full lg:w-[38.5rem]"
  >
    <div class="flex w-full flex-col">
      <!-- svelte-ignore missing-declaration -->
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      {#if displayDropzone}
        <div
          class="sm:col-span-6 cursor-pointer"
          id="dropzone"
          on:click={() => document.getElementById("file-upload").click()}
          in:fade={{ duration: 1500 }}
          out:fade={{ duration: 100 }}
        >
          <div
            class="flex justify-center items-center rounded-md border-1 border-dashed border-blue-600 bg-slate-200  py-14"
          >
            <div class="space-y-1 text-center">
              <div class="flex flex-col text-base text-gray-600">
                <label
                  for="file-upload"
                  class=" relative cursor-pointer rounded-md  font-semibold text-blue-800"
                  id="dropzone"
                >
                  <svg
                    class="mx-auto h-12 w-12 text-gray-900"
                    stroke="black"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span class="inline-flex">Choose a file</span>
                  <input
                    on:change|stopPropagation|preventDefault={ondisplay}
                    id="file-upload"
                    name="userimage"
                    type="file"
                    class="sr-only"
                    accept="image/*,.pdf"
                  />
                  <span class="pl-1">to preview and upload</span>
                  <p class="text-xs mt-2 text-gray-600">
                    Upload JPEG, PNG, JPG, PDF files
                  </p>
                </label>
              </div>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </form>
  {#if displayerror}
    <div class="mx-auto">
      <ErrorInfo {errormsg} on:click={() => (displayerror = false)} />
    </div>
  {/if}

  <!-- For pdf preview -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <button
    disabled
    id="disableBtn"
    on:click={() => dispatch("mShow")}
    class="{displaypreview && displayPdf
      ? 'flex'
      : 'hidden'}  w-full lg:w-[38.5rem] mx-auto flex-col rounded-md"
    in:fade={{ duration: 2000 }}
    out:fade={{ duration: 1000 }}
  >
    <div id="pdfPreviewSection" />
    <div class="flex justify-center mx-auto items-center gap-8 pt-3">
      <button on:click={previouspage} disabled={!prevbtn}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          class="w-6 h-6 {!prevbtn ? 'stroke-gray-600' : 'stroke-black'}"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <h1 class="text-lg text-black font-bold">
        {currentpage} / {totalPages}
      </h1>
      <button on:click={nextpage} disabled={!nextbtn}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          class="w-6 h-6 {!nextbtn ? 'stroke-gray-600' : 'stroke-black'}"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  </button>

  <!-- For image preview -->
  <div
    class="{displaypreview && !displayPdf
      ? 'flex'
      : 'hidden'} flex w-full lg:w-[38.5rem] flex-col items-center justify-center"
    in:fade={{ duration: 2000 }}
    out:fade={{ duration: 1000 }}
    id="img_prev"
  >
    <div
      class="max-w-full min-w-[22.5rem] min-h-[24.6rem] max-h-[40rem] justify-center items-center flex"
    >
      <div
        class="border-2 rounded-md shadow-[0_0_8px_0_rgba(0,0,0,0.15)] overflow-hidden"
        id="file"
      >
        <canvas
          class="max-w-full min-w-[22.5rem] min-h-[24.6rem] max-h-[40rem]"
          id="ImgToPdfBlob"
          alt="Preview"
          title="pdf"
        />
      </div>
    </div>
  </div>
  <div
    class="{displaypreview
      ? 'flex'
      : 'hidden'} items-center justify-center gap-3 pt-3 lg:w-[38.5rem] btn"
  >
    <div class="flex">
      <button
        on:click={ondisplaydropzone}
        class="border-2 border-red-500 hover:bg-red-500 hover:text-white text-red-500 rounded-md px-3 lg:px-3 py-1 text-sm lg:text-lg font-bold tracking-wide"
      >
        Choose Different file
      </button>
    </div>
    <div class="flex">
      <button
        id="autoClick1"
        on:click={signDoc}
        class="border-2 border-blue-500 hover:bg-blue-500 hover:text-white text-blue-500 rounded-md px-3 lg:px-3 py-1 text-sm lg:text-lg font-bold tracking-wide"
      >
        Sign Doc
      </button>
    </div>
    <div class="flex">
      <button
        on:click={() => (displayConfirm = true)}
        class="border-2 hover:text-white border-green-500 text-green-500 hover:bg-green-500 rounded-md px-3 lg:px-3 py-1 text-sm lg:text-lg font-bold tracking-wide"
      >
        Confirm and Continue
      </button>
    </div>
  </div>
</div>
