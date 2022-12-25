<script>
  import axios from "axios"
  import Loading from "./Loading.svelte"
  export let data1, file, modal, totalPages
  import { createEventDispatcher } from "svelte"
  import Step1 from "./Step1.svelte"
  import Step2 from "./Step2.svelte"
  import Step3 from "./Step3.svelte"
  import Step4 from "./Step4.svelte"
  import Step5 from "./Step5.svelte"
  const dispatch = createEventDispatcher()
  console.log(data1)
  let errormsg = ""
  let blob
  let page
  let conReq = false
  let download = false
  let init = true
  let initvalues
  let signreq = ""
  let SignFile
  let oneTimePassword = ""
  let bgColor = "#FFFFFF"
  let Reason = "for verification"
  let docURL = localStorage.getItem("docURL")
  let pageNo = 1
  let signPage = false
  let otp = false
  let switchAccount = false,
    modelHeading = false

  let details = true,
    SelectPageno = false
  /**
   * close modal
   */
  const closeModal = () => {
    dispatch("clsModal")
  }

  /**
   * change a modal to switch user account
   */
  const switchId = () => {
    modelHeading = true
    switchAccount = true
    details = false
  }

  /**
   * close switch id modal back to user card details
   */
  const backBtn = () => {
    modelHeading = false
    switchAccount = false
    details = true
  }
  /**
   * change a modal to page no selection and sign alignment selection modal
   */
  const nextBtn1 = async () => {
    document.getElementById("disableBtn").disabled = false
    details = false
    SelectPageno = true
    triggerPdfPositionLib()
  }

  /**
   * load library
   */
  const triggerPdfPositionLib = async () => {
    await loadLibrary("pdfPosition", "/lib/signPosition.js")
    console.log(pdfPosition)
    pdfPosition.init({
      triggerButtons: ".show-signature-overlay",
      imageTarget: "mycanvas",
    })
    console.log(document.querySelector(".show-signature-overlay"))
  }

  /**
   * back to user detail modal
   */
  const backBtn1 = () => {
    SelectPageno = false
    details = true
  }

  /**
   * change a modal to "sign reason" and "sign color" get modal
   */
  const nextBtn2 = () => {
    details = false
    SelectPageno = false
    signPage = true
  }
  //after select the placement of sign
  let NextBtn2 = true
  $: if (modal) {
    NextBtn2 = false
    nextBtn1()
  }

  /**
   * back to page no selection and sign alignment selection modal
   */
  const backBtn2 = () => {
    signPage = false
    SelectPageno = true
  }
  $: console.log(pageNo)
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
   * function for initiate signature process
   */
  const initiate = async () => {
    //get signer id
    document.getElementById("disableBtn").disabled = true
    console.log("initiate")
    init = true
    console.log(pdfPosition)
    console.log(file)
    let date = new Date().toJSON()
    // to give the input filed for initiate process
    initvalues = {
      signer:
        "819f82006a4c49263fcde49372eb58589194cc759fcc2c8758d804f97021cbe3",
      file: file,
      signPage: localStorage.getItem("PageNo"),
      signPosition: pdfPosition.lastposition.toString(),
      signField: `Signer ${date}`,
      reason: Reason,
      signBGColor: bgColor,
      url: docURL,
    }
    console.log(initvalues)
    try {
      const { data } = await axios.post(
        "https://pdfsign.test.print2block.in/signature/initiate",
        initvalues,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      console.log(data)
      signreq = data.signRequest.id
      if (!signreq) {
        init = false
      }
      console.log(signreq, "signer id")
      signPage = false
      otp = true
    } catch (error) {
      console.error(error)
      init = false
    }
  }

  /**
   * horizontal lock toggle button
   */
  let position = false,
    ballwht = false,
    bgclr = false,
    ballblk = true,
    bold = false,
    signBtn = true
  const signaturePlacement = async () => {
    signBtn = false
    if (pdfPosition.options.lockHorizontalCenter)
      pdfPosition.options.lockHorizontalCenter = false
    else pdfPosition.options.lockHorizontalCenter = true
    if (position == false) {
      position = true
      bgclr = true
      ballblk = false
      ballwht = true
      bold = true
    } else {
      position = false
      ballblk = true
      ballwht = false
      bgclr = false
      bold = false
    }
  }

  /**
   *modal hide for sign placement
   */
  const hideModal = () => {
    document.getElementsByClassName("btn")[0].classList.add("hidden")
    page = pageNo - 1
    localStorage.setItem("PageNo", page)
    dispatch("PageNo", pageNo)
  }

  /**
   * Function for confirming the sign request using otp
   */

  const confirmRequest = async () => {
    console.log("confirmRequest")
    conReq = true
    //get file name
    try {
      const { data } = await axios.post(
        "https://pdfsign.test.print2block.in/signature/confirm",
        {
          requestid: signreq,
          otp: oneTimePassword,
        }
      )
      console.log(data)
      if (data.message) {
        errormsg = data.message
        setTimeout(() => {
          errormsg = ""
        }, 2000)
      }
      SignFile = data.signRequest.signedFile
      if (!SignFile) {
        conReq = false
      }
      console.log(SignFile, "signed file")
    } catch (error) {
      conReq = false
      console.error(error)
    }
  }

  /**
   * function for signed pdf and preview
   */

  const pdfPreview = async () => {
    console.log(SignFile)
    // tryCatch used for error handling
    try {
      const { data } = await axios.get(
        `https://pdfsign.test.print2block.in/signature/download/${SignFile}`,
        { responseType: "blob" }
      )
      console.log(data)
      const myFile = new File([data], SignFile, {
        type: data.type,
      })
      console.log(myFile)
      blob = URL.createObjectURL(data)
      console.log(blob)
      dispatch("blob", blob)
      dispatch("myFile", myFile)
      document.getElementsByClassName("btn")[0].classList.remove("hidden")
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * function for downloading the signedpdf.
   */
  const dwndPdf = async () => {
    try {
      const { data } = await axios.get(
        `https://pdfsign.test.print2block.in/signature/download/${SignFile}`,
        { responseType: "blob" }
      )
      console.log(data)
      blob = URL.createObjectURL(data)
      console.log(blob)
      console.log(SignFile)
      let spdf = document.createElement("a")
      spdf.href = blob
      spdf.style.display = "none"
      spdf.target = "_blank"
      spdf.download = SignFile
      spdf.click()
    } catch (error) {
      console.error(error)
    }
  }
</script>

<div
  class="relative flex flex-col gap-4 mx-auto px-5 py-5 bg-white w-96 sm:w-94 lg:w-98 rounded-md"
>
  <button on:click={closeModal} class="absolute top-5 right-5">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      class="w-6 h-6"
    >
      <path
        fill-rule="evenodd"
        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
        clip-rule="evenodd"
      />
    </svg>
  </button>
  <h1 class:hidden={modelHeading} class="mx-auto text-xl  font-bold">
    Add Digital Signature
  </h1>
  {#if switchAccount}
    <div class="flex flex-col gap-4">
      <h1 class="text-lg tracking-wide font-semibold pb-2">SWITCH ACCOUNT</h1>
      <form class="w-full flex flex-col mx-auto">
        <label class="font-bold text-lg text-start">ID</label>
        <input placeholder="Enter ID" type="text" class="input-normal w-full" />
      </form>
      <div class="flex items-center justify-between">
        <button on:click={backBtn} class="redBtn">back</button>
        <button on:click={backBtn} class="blueBtn">Switch</button>
      </div>
    </div>
  {/if}
  {#if details}
    <div class="flex items-center justify-center mb-4">
      <Step1 />
    </div>
    <div class="flex flex-col gap-4">
      <div class="flex flex-row items-center gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-6 h-6 text-black"
        >
          <path
            fill-rule="evenodd"
            d="M4.5 3.75a3 3 0 00-3 3v10.5a3 3 0 003 3h15a3 3 0 003-3V6.75a3 3 0 00-3-3h-15zm4.125 3a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zm-3.873 8.703a4.126 4.126 0 017.746 0 .75.75 0 01-.351.92 7.47 7.47 0 01-3.522.877 7.47 7.47 0 01-3.522-.877.75.75 0 01-.351-.92zM15 8.25a.75.75 0 000 1.5h3.75a.75.75 0 000-1.5H15zM14.25 12a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H15a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3.75a.75.75 0 000-1.5H15z"
            clip-rule="evenodd"
          />
        </svg>
        <div class="w-full text-base text-gray-800 break-all">
          {data1.signerDetails.id}
        </div>
      </div>
      <div class="flex items-start gap-5">
        <div class="w-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-36 h-36"
          >
            <path
              fill-rule="evenodd"
              d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="w-auto">
          <h2 class="text-3xl font-extrabold text-gray-800">
            {data1.signerDetails.name}
          </h2>
          <h4 class="text-xl fond-semibold text-gray-800">
            {data1.signerDetails.location}
          </h4>
          <div class="text-base font-thin text-gray-800">
            <div class="w-full text-sm text-gray-800">
              {data1.signerDetails.organisation}
            </div>
          </div>
          <div class="flex flex-row items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-6 h-6"
            >
              <path
                fill-rule="evenodd"
                d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                clip-rule="evenodd"
              />
            </svg>
            <div class="pl-4 w-full text-base text-gray-800">
              {data1.signerDetails.contact}
            </div>
          </div>
          <div class="flex flex-row items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-6 h-6"
            >
              <path
                d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"
              />
              <path
                d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"
              />
            </svg>
            <div class="ml-4 w-full text-base text-gray-800 overflow-auto">
              {data1.signerDetails.email}
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-between pt-4">
        <button
          on:click={switchId}
          class="text-blue-700 text-base hover:underline"
        >
          Continue with another account
        </button>
        <button on:click={nextBtn1} class="blueBtn">Next</button>
      </div>
    </div>
  {/if}
  {#if SelectPageno}
    <div class="flex items-center justify-center mb-4">
      <Step2 />
    </div>
    <div class="flex flex-col gap-4">
      <div>
        <div class="flex flex-col gap-2 items-start pt-2">
          {#if totalPages.length > 1}
            <div class="w-auto flex flex-row gap-4 items-center">
              <p class="text-base text-gray-800 w-36 font-semibold">
                Select Page No
              </p>
              <select bind:value={pageNo} id="pageNo" class="input-normal w-16">
                {#each totalPages as totalPage}
                  <option value={totalPage}>{totalPage}</option>
                {/each}
              </select>
            </div>
          {/if}
          <div class="relative flex flex-row w-full gap-4">
            <div class="flex gap-1 w-36">
              <p class="text-base text-gray-800 font-semibold">Align middle</p>
              <div class="w-auto group flex flex-row gap-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 01-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clip-rule="evenodd"
                  />
                </svg>
                <p
                  class="w-auto absolute left-52 text-base hidden group-hover:block p-2 shadow-slide rounded-md bg-gray-200 text-black"
                >
                  <strong>Click:</strong>
                  Horizontally lock your sign.
                  <br />
                  <strong>Undo:</strong>
                  Anywhere to put you sign.
                </p>
              </div>
            </div>
            <div class="flex items-center justify-start gap-2">
              <button
                on:click={signaturePlacement}
                id="posControls"
                class:justify-end={position}
                class:bg-blue-500={bgclr}
                class="w-8 h-5 border-2 rounded-full flex items-center px-0.5"
              >
                <button
                  class:bg-white={ballwht}
                  class:bg-black={ballblk}
                  class="w-3 h-3 rounded-full"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="flex gap-3 justify-between">
        <button on:click={backBtn1} class="redBtn float-left">Back</button>
        <div class="flex gap-2">
          <button
            on:click={hideModal}
            class="show-signature-overlay greenBtn disabled:cursor-not-allowed"
          >
            SIGN
          </button>
          <button class:hidden={NextBtn2} on:click={nextBtn2} class="blueBtn">
            Next
          </button>
        </div>
      </div>
    </div>
  {/if}
  {#if signPage}
    {#if init}
      <Loading />
    {:else}
      <div class="flex items-center justify-center mb-4">
        <Step3 />
      </div>
      <div class="flex flex-col gap-4">
        <div class="flex flex-row items-start gap-4">
          <p class="w-52 text-base text-gray-800 font-semibold">
            Reason for Digital Signature
          </p>
          <textarea type="text" bind:value={Reason} class="input-normal" />
        </div>
        <div class="flex flex-row items-center gap-4">
          <p class="w-52 text-base text-gray-800 font-semibold">
            Signature Background color
          </p>
          <input
            bind:value={bgColor}
            class="h-6 w-8"
            type="color"
            name="Identity"
            id="Identity"
          />
        </div>

        <div class="flex items-center justify-between pt-4">
          <button on:click={backBtn2} class="redBtn float-left">Back</button>
          <button
            disabled={init}
            on:click={initiate}
            class=" disabled:cursor-not-allowed blueBtn"
          >
            Initiate
          </button>
        </div>
      </div>
    {/if}
  {/if}
  {#if otp}
    {#if conReq}
      <Loading />
    {:else}
      <div class="flex items-center justify-center mb-4">
        <Step4 />
      </div>
      <div class="flex flex-col gap-4">
        <h1
          class="text-black text-lg tracking-wide font-semibold border-b border-gray-500"
        >
          SIGN DETAILS
        </h1>
        <div class="flex gap-3">
          <h1 class="text-lg text-slate-800 font-semibold flex items-center">
            One Time Password
          </h1>
          <input
            bind:value={oneTimePassword}
            type="text"
            placeholder="12345"
            class=" w-2/5 mt-2 pl-5 placeholder:text-base text-slate-800 rounded border focus:border-black focus:ring-1 focus:ring-black  text-lg outline-none py-1 px-3 leading-8"
          />
        </div>

        <div
          class="flex items-center justify-end border-t border-gray-500 pt-4"
        >
          <button
            disabled={conReq}
            on:click={confirmRequest(signreq)}
            class="bg-indigo-600 hover:bg-indigo-800 px-2 py-1 disabled:cursor-not-allowed rounded-md border border-indigo-400 text-white text-base"
          >
            confirmRequest
          </button>
        </div>
      </div>
    {/if}
  {/if}
  {#if download}
    <div class="flex items-center justify-center mb-4">
      <Step5 />
    </div>
    <div class="flex flex-col gap-4">
      <h1
        class="text-black text-lg tracking-wide font-semibold border-b border-gray-500"
      >
        SIGN DETAILS
      </h1>

      <div class="flex flex-col text-base">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <svg
          on:click={pdfPreview}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="mx-auto h-14 w-14"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 13.5l3 3m0 0l3-3m-3 3v-6m1.06-4.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
          />
        </svg>
        <button on:click={pdfPreview} class="hover:underline">
          Click here to preview
        </button>
      </div>
      <div
        class="flex items-center justify-between p-2 border-t border-gray-500 pt-4"
      >
        <button
          on:click={pdfPreview}
          class="flex text-red-500 hover:text-white border-2 border-red-500  py-1 px-2  justify-center items-center focus:outline-none hover:bg-red-600 rounded text-lg font-bold"
        >
          close
        </button>
        <button
          on:click={dwndPdf}
          class="flex text-green-500 hover:text-white border-2 border-green-500  py-1 px-2  justify-center items-center focus:outline-none hover:bg-green-600 rounded text-lg font-bold"
        >
          Download
        </button>
      </div>
    </div>
  {/if}
</div>
{#if errormsg}
  <div class="mt-5">
    <ErrorInfo {errormsg} />
  </div>
{/if}

<style lang="postcss">
  .blueBtn {
    @apply w-20 rounded-md border-2 border-blue-600 px-2 py-1 text-sm font-semibold text-blue-700 hover:bg-blue-700 hover:text-white;
  }
  .redBtn {
    @apply w-20 rounded-md border-2 border-red-600 px-2 py-1 text-sm font-semibold text-red-700 hover:bg-red-700 hover:text-white;
  }
  .greenBtn {
    @apply w-20 rounded-md border-2 border-green-600 px-2 py-1 text-sm font-semibold text-green-700 hover:bg-green-700 hover:text-white;
  }
  .input-normal {
    @apply h-9 rounded-md border-2 border-slate-200  bg-white px-2 py-1 text-base font-bold placeholder:font-semibold placeholder:text-slate-500  focus:outline-none focus:ring-2 focus:ring-slate-800;
  }
</style>
