<script>
  export let bloblink, MyFile
  export let pageNumber
  import { createEventDispatcher } from "svelte"
  const dispatch = createEventDispatcher()
  import axios from "axios"
  import { navigate } from "svelte-routing"
  import { fade } from "svelte/transition"

  import HeaderFileupload from "./header_fileupload.svelte"
  import ErrorInfo from "./ErrorInfo.svelte"
  export let id
  let currentpage, blobimage, _PDFDOC, File, _total_pages, showpdf, errormsg
  let displayConfirm = false
  let displayerror = false
  let displayDropzone = true
  let nextbtn = true
  let prevbtn = true
  let token = localStorage.getItem("token")
  let documentID = localStorage.getItem("documentID")
  let bgcolor = localStorage.getItem("bgGradient")
  let displaypreview = false
  let btnDisable = true
  /**
   * Submitting file for generating filehash
   */
  const onSubmitFile = async () => {
    // console.log(File)
    if (File) {
      const { data } = await axios.post(
        "https://test.swagger.print2block.in/docs/add-file",
        {
          documentID: documentID,
          file: File,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-access-token": token,
          },
        }
      )
      console.log(data)
      console.log(data.lastModifiedDate)
      // dispatch('filehash', data.fileHash);
      localStorage.setItem("filehash", data.fileHash)
      let fileHash = localStorage.getItem("filehash")
      console.log("filehash", fileHash)
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
    }
  }

  /**
   * Function for previewing image or pdf when uploaded
   */
  let Imageurl, Pdfurl
  const ondisplay = async () => {
    console.log("displayed")
    const form = document.getElementById("form")
    const formData = new FormData(form)
    console.log([...formData]) //spread opearator
    let datum = [...formData][0]
    console.log(datum)
    File = datum[1]
    if (
      File.type == "image/png" ||
      File.type == "image/jpg" ||
      File.type == "image/jpeg" ||
      File.type == "application/pdf"
    ) {
      dispatch("File", File)
    }
    console.log(File)
    console.log(File.type)
    if (
      File.type == "image/png" ||
      File.type == "image/jpg" ||
      File.type == "image/jpeg"
    ) {
      displaypreview = true
      displayDropzone = false
      showpdf = false
      blobimage = URL.createObjectURL(File)
      console.log(blobimage)
      localStorage.setItem("blobimage", blobimage)
      return
    } else if (File.type == "application/pdf") {
      showpdf = true
      await loadLibrary("pdfjs", "/lib/pdf.js")
      let blob = URL.createObjectURL(File)
      localStorage.setItem("blobpdf", blob)
      console.log(blob)
      await showPdf(blob)
      displayDropzone = false
      displaypreview = true
      return
    } else {
      displaypreview = false
      showpdf = false
      return
    }
  }

  async function loadLibrary(id, location) {
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

  const showPdf = async (blob) => {
    console.log(pdfjsLib)
    // await pageloader()
    pdfjsLib.GlobalWorkerOptions.workerSrc = "/lib/pdf.worker.js"
    let loadingTask = pdfjsLib.getDocument(blob)
    loadingTask = loadingTask.promise
    _PDFDOC = await loadingTask
    _total_pages = _PDFDOC.numPages
    dispatch("totalPage", _total_pages)
    console.log(_total_pages)
    console.log(_PDFDOC)
    currentpage = 1
    showPage(1)
  }

  /**
   * to display signed pdf in add file page
   */

  const displaySignedPdf = async () => {
    if (bloblink) {
      displayDropzone = false
      await showPdf(bloblink)
      displaypreview = true
      showpdf = true
    }
    if (MyFile) {
      File = MyFile
    }
  }
  displaySignedPdf()

  const showPage = async (pageno) => {
    let page = await _PDFDOC.getPage(pageno)
    console.log("Page loaded")
    let viewport = page.getViewport({ scale: 1.03 })

    // Prepare canvas using PDF page dimensions
    let canvas = document.getElementById("mycanvas")
    let context = canvas.getContext("2d")
    canvas.height = viewport.height
    canvas.width = viewport.width

    // Render PDF page into canvas context
    let renderContext = {
      canvasContext: context,
      viewport: viewport,
    }
    await page.render(renderContext).promise
    // document.getElementById('pdf-preview').src = canvas.toDataURL();
  }

  let btns = true
  $: if (pageNumber) {
    btns = false
    currentpage = pageNumber
    showPage(currentpage)
  }

  const toClickinput = () => {
    document.getElementById("file-upload").click()
  }

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

  $: nextbtn = currentpage < _total_pages

  $: prevbtn = currentpage > 1

  const ondisplaydropzone = () => {
    displayDropzone = true
    displaypreview = false
  }

  const hideConfirmation = () => {
    displayConfirm = false
    ondisplaydropzone()
  }

  const signDoc = () => {
    dispatch("steps")
  }

  let fieldName, date
  const showModal = async () => {
    await loadLibrary("pdfPosition", "/lib/signPosition.js")
    console.log(pdfPosition.position)
    localStorage.setItem("position", pdfPosition.position)
    date = new Date().toJSON()
    fieldName = `Signer ${date}`
    console.log(fieldName)
    localStorage.setItem("fieldName", fieldName)
    dispatch("mShow")
    console.log("clicked")
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
            on:click={hideConfirmation}
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

  <HeaderFileupload {id} {bgcolor} />

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
          on:click={toClickinput}
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
    on:click={showModal}
    class="{displaypreview && showpdf
      ? 'flex'
      : 'hidden'}  w-full lg:w-[38.5rem] mx-auto flex-col rounded-md"
    in:fade={{ duration: 2000 }}
    out:fade={{ duration: 1000 }}
  >
    <canvas id="mycanvas" class="border-2 rounded-md w-full overflow-hidden" />
    <!-- <img src="" alt="sampleimage" id="pdf-preview" class="w-full max-h-[34rem] lg:max-h-[37rem]" /> -->
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
        {currentpage} / {_total_pages}
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
    class="{displaypreview && !showpdf
      ? 'flex'
      : 'hidden'} flex w-full lg:w-[38.5rem] flex-col items-center justify-center"
    in:fade={{ duration: 2000 }}
    out:fade={{ duration: 1000 }}
  >
    <div
      class="max-w-full min-w-[22.5rem] min-h-[24.6rem] max-h-[40rem] justify-center items-center flex"
    >
      <div
        class="border-2 rounded-md shadow-[0_0_8px_0_rgba(0,0,0,0.15)] overflow-hidden"
      >
        <img
          src={Imageurl}
          class="max-w-full min-w-[22.5rem] min-h-[24.6rem] max-h-[40rem]"
          id="File"
          alt="Preview"
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
