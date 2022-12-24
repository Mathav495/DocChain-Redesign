<script>
  import axios from "axios"
  export let data1, file, modal, totalPages
  import { createEventDispatcher } from "svelte"
  import ErrorInfo from "./ErrorInfo.svelte"
  const dispatch = createEventDispatcher()
  let errormsg = ""
  let blob
  let conReq = false
  let download = false
  let init = true
  let borderBlue4 = false
  let empty4 = false
  let dot5 = true
  let tick5 = true
  let initvalues
  let signreq = ""
  let SignFile
  let oneTimePassword = ""
  let bgColor = ""
  let Reason = "for verification"
  let docURL = localStorage.getItem("docURL")
  console.log(docURL)
  let switchIdForm = true
  $: if (modal) {
    nextBtn2()
  }
  let switchAccount = false,
    steps = false,
    modelHeading = false
  const switchId = () => {
    steps = true
    modelHeading = true
    switchAccount = true
    details = false
  }
  const backBtn = () => {
    modelHeading = false
    steps = false
    switchAccount = false
    details = true
  }

  let details = true,
    dot1 = false,
    tick1 = true,
    empty = false,
    borderBlue1 = false,
    dot2 = true,
    SelectPageno = false,
    dot3 = true
  const nextBtn1 = () => {
    document.getElementById("disableBtn").disabled = false
    details = false
    dot1 = true
    tick1 = false
    empty = true
    dot2 = false
    SelectPageno = true
    borderBlue1 = true
  }
  let empty2 = false,
    borderBlue2 = false,
    tick2 = true,
    tick3 = true,
    signPage = false
  const backBtn1 = () => {
    empty2 = false
    dot3 = true
    borderBlue1 = false
    SelectPageno = false
    details = true
    dot2 = true
    tick2 = true
    empty = false
  }
  const nextBtn2 = () => {
    empty = true
    empty2 = true
    dot1 = true
    dot2 = true
    dot3 = false
    borderBlue1 = true
    borderBlue2 = true
    tick1 = false
    tick2 = false
    details = false
    SelectPageno = false
    signPage = true
  }
  const backBtn2 = () => {
    // console.log('back2')
    borderBlue2 = false
    empty2 = false
    tick3 = true
    dot3 = true
    signPage = false
    SelectPageno = true
  }
  let borderBlue3 = false,
    empty3 = false,
    tick4 = true,
    dot4 = true,
    otp = false
  const backBtn3 = () => {
    borderBlue3 = false
    dot4 = true
    empty3 = false
    signPage = true
    otp = false
  }
  const nextBtn4 = () => {
    console.log("next4")
  }
  let pageNo

  $: console.log(pageNo)
  let clr = "#FFFFFF"
  const chooseClr = () => {
    console.log(clr)
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
  let toggleBtn = true
  const trigger = async () => {
    document.getElementById("btnDisable").disabled = true
    toggleBtn = false
    await loadLibrary("pdfPosition", "/lib/signPosition.js")
    console.log(pdfPosition)
    pdfPosition.init({
      triggerButtons: ".show-signature-overlay",
      imageTarget: "mycanvas",
      positionTextbox: "positions",
    })
  }

  let position = false,
    ballwht = false,
    bgclr = false,
    ballblk = true,
    bold = false,
    signBtn = true
  const signaturePlacement = () => {
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
      // pdfPosition.options.lockHorizontalCenter = false;
    } else {
      position = false
      ballblk = true
      ballwht = false
      bgclr = false
      bold = false
      // pdfPosition.options.lockHorizontalCenter = true;
    }
  }
  /**
   * function for initiate signature process
   */
  const initiate = async () => {
    //get signer id
    document.getElementById("disableBtn").disabled = true
    console.log("initiate")
    init = false
    console.log(pdfPosition)
    let date = new Date().toJSON()
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
      console.log(signreq, "signer id")
    // modal = true
    //get signer id
    signPage = false
    otp = true
    console.log("next3")
    tick3 = false
    dot3 = true
    dot4 = false
    empty3 = true
    borderBlue3 = true
    } catch (error) {
      console.error(error)
      init = true
    }
  }
  /**
   * function for confirm the sign request
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
      }
      SignFile = data.signRequest.signedFile
      console.log(SignFile, "signed file")
      otp = false
      download = true
      tick4 = false
      borderBlue4 = true
      dot4 = true
      tick4 = false
      dot5 = false
      empty4 = true
    } catch (error) {
      conReq = false
      console.error(error)
    }
  }
  
  /**
   * function for downloading the signed pdf and preview
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
  let page
  const hideModal = () => {
    document.getElementsByClassName("btn")[0].classList.add("hidden")
    page = pageNo - 1
    localStorage.setItem("PageNo", page)
    dispatch("PageNo", pageNo)
  }
</script>

<!-- svelte-ignore non-top-level-reactive-declaration -->
<div class="w-full h-auto p-4">
  <nav aria-label="Progress">
    <ol
      class="flex flex-col gap-4 mx-auto w-full lg:w-9/12 xl:w-7/12 px-5 py-5 bg-blue-300 rounded-md"
    >
      <h1
        class:hidden={modelHeading}
        class="mx-auto text-xl text-white font-bold"
      >
        VERIFY SIGN DETAILS
      </h1>
      <div class:hidden={steps} class="flex items-center justify-center ">
        <button class="relative pr-8 sm:pr-20">
          <!-- Completed Step -->
          <div class="absolute inset-0 flex items-center">
            <div
              class:bg-indigo-600={borderBlue1}
              class="h-0.5 w-full bg-gray-200"
            />
          </div>
          <div
            class:hidden={dot1}
            class="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white"
          >
            <span
              class="h-2.5 w-2.5 rounded-full bg-indigo-600 hover:bg-indigo-800"
            />
          </div>
          <div
            class:hidden={tick1}
            class="relative flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-800"
          >
            <!-- Heroicon name: mini/check -->
            <svg
              class="h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
              />
            </svg>
          </div>
        </button>

        <button class="relative pr-8 sm:pr-20">
          <!-- Completed Step -->
          <div class="absolute inset-0 flex items-center">
            <div
              class:bg-indigo-600={borderBlue2}
              class="h-0.5 w-full bg-gray-200"
            />
          </div>
          <div
            class:hidden={empty}
            class="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white"
          >
            <span class=" rounded-full bg-indigo-600 hover:bg-indigo-800" />
          </div>
          <div
            class:hidden={dot2}
            class="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white"
          >
            <span
              class="h-2.5 w-2.5 rounded-full bg-indigo-600 hover:bg-indigo-800"
            />
          </div>
          <div
            class:hidden={tick2}
            class="relative flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-800"
          >
            <!-- Heroicon name: mini/check -->
            <svg
              class="h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
              />
            </svg>
            <span class="sr-only">Step 2</span>
          </div>
        </button>

        <button class="relative pr-8 sm:pr-20">
          <!-- Current Step -->
          <div class="absolute inset-0 flex items-center">
            <div
              class:bg-indigo-600={borderBlue3}
              class="h-0.5 w-full bg-gray-200"
            />
          </div>
          <div
            class:hidden={empty2}
            class="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white"
          >
            <span class=" rounded-full bg-indigo-600 hover:bg-indigo-800" />
          </div>
          <div
            class:hidden={dot3}
            class="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white"
          >
            <span
              class="h-2.5 w-2.5 rounded-full bg-indigo-600 hover:bg-indigo-800"
            />
          </div>
          <div
            class:hidden={tick3}
            class="relative flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-800"
          >
            <!-- Heroicon name: mini/check -->
            <svg
              class="h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
              />
            </svg>
            <span class="sr-only">Step 2</span>
          </div>
        </button>

        <button class="relative pr-8 sm:pr-20">
          <!-- Upcoming Step -->
          <div class="absolute inset-0 flex items-center">
            <div
              class:bg-indigo-600={borderBlue4}
              class="h-0.5 w-full bg-gray-200"
            />
          </div>
          <div
            class:hidden={empty3}
            class="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white"
          >
            <span class=" rounded-full bg-indigo-600 hover:bg-indigo-800" />
          </div>
          <div
            class:hidden={dot4}
            class="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white"
          >
            <span
              class="h-2.5 w-2.5 rounded-full bg-indigo-600 hover:bg-indigo-800"
            />
          </div>
          <div
            class:hidden={tick4}
            class="relative flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-800"
          >
            <!-- Heroicon name: mini/check -->
            <svg
              class="h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
              />
            </svg>
            <span class="sr-only">Step 2</span>
          </div>
        </button>
        <button class="relative">
          <!-- Upcoming Step -->
          <div class="absolute inset-0 flex items-center">
            <div class="h-0.5 w-full bg-gray-200" />
          </div>
          <div
            class:hidden={empty4}
            class="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white"
          >
            <span class=" rounded-full bg-indigo-600 hover:bg-indigo-800" />
          </div>
          <div
            class:hidden={dot5}
            class="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white"
          >
            <span
              class="h-2.5 w-2.5 rounded-full bg-indigo-600 hover:bg-indigo-800"
            />
          </div>
          <div
            class:hidden={tick5}
            class="relative flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-800"
          >
            <!-- Heroicon name: mini/check -->
            <svg
              class="h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
              />
            </svg>
            <span class="sr-only">Step 2</span>
          </div>
        </button>
      </div>
      {#if switchAccount}
        <div class="flex flex-col gap-4">
          <h1
            class="text-white text-center text-lg tracking-wide font-semibold border-b border-white pb-4"
          >
            SWITCH ACCOUNT
          </h1>
          <form class="flex flex-col items-center justify-center gap-2">
            <div class="flex gap-2 items-end">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                />
              </svg>
              <input
                placeholder="Enter ID"
                type="text"
                class="w-52 px-2 py-1 border-b-2 rounded-md border-black bg-white-300 outline-none"
              />
            </div>
            <button
              on:click={backBtn}
              class="bg-indigo-600 hover:bg-indigo-800 px-2 py-1 rounded-md border border-indigo-400 text-white text-sm"
            >
              Switch
            </button>
          </form>
          <div
            class="flex items-center justify-between border-t border-white pt-4"
          >
            <button
              on:click={backBtn}
              class="bg-indigo-600 hover:bg-indigo-800 px-2 py-1 rounded-md border border-indigo-400 text-white text-sm"
            >
              back
            </button>
          </div>
        </div>
      {/if}
      {#if details}
        <div class="flex flex-col gap-4">
          <h1
            class="text-white text-lg tracking-wide font-semibold border-b border-white"
          >
            SIGNER DETAILS
          </h1>
          <div class="flex flex-row items-center">
            <p class="text-base text-gray-600 w-40 font-semibold">Name</p>
            <div class="py-2 pl-4 w-full text-base text-gray-600">
              {data1.signerDetails.name}
            </div>
          </div>
          <div class="flex flex-row items-center">
            <p class="text-base text-gray-600 w-40 font-semibold">Id</p>
            <div class="py-2 ml-4 w-full text-base text-gray-600 overflow-auto">
              {data1.signerDetails.id}
            </div>
          </div>
          <div class="flex flex-row items-center">
            <p class="text-base text-gray-600 w-40 font-semibold">Email</p>
            <div class="py-2 pl-4 w-full text-base text-gray-600">
              {data1.signerDetails.email}
            </div>
          </div>
          <div class="flex flex-row items-center">
            <p class="text-base text-gray-600 w-40 font-semibold">Contact</p>
            <div class="py-2 pl-4 w-full text-base text-gray-600">
              {data1.signerDetails.contact}
            </div>
          </div>
          <div class="flex flex-row items-center">
            <p class="text-base text-gray-600 w-40 font-semibold">
              Organisation
            </p>
            <div class="py-2 pl-4 w-full text-base text-gray-600">
              {data1.signerDetails.organisation}
            </div>
          </div>
          <div
            class="flex items-center justify-between border-t border-white pt-4"
          >
            <button
              on:click={switchId}
              class="text-gray-100 hover:text-white text-base hover:underline"
            >
              Continue with another account
            </button>
            <button
              on:click={nextBtn1}
              class="bg-indigo-600 hover:bg-indigo-800 px-2 py-1 rounded-md border border-indigo-400 text-white text-base"
            >
              Next
            </button>
          </div>
        </div>
      {/if}
      {#if SelectPageno}
        <div class="flex flex-col gap-4">
          <h1
            class="text-white text-lg tracking-wide font-semibold border-b border-white"
          >
            SELECT PAGE NO
          </h1>
          <div>
            <div class="flex flex-row gap-2 justify-between items-start">
              <div class="w-auto flex gap-2 items-center">
                <p class="text-base text-gray-600 w-auto font-semibold">
                  Select Page No
                </p>
                <select
                  bind:value={pageNo}
                  name="1"
                  placeholder="Select Page No"
                  id="pageNo"
                  class="w-32 h-9 px-2 py-1 border-b-2 rounded-md border-black bg-white-300 outline-none"
                >
                  {#each totalPages as totalPage}
                    <option value={totalPage}>{totalPage}</option>
                  {/each}
                </select>
              </div>
              <div class="flex flex-col w-auto gap-2">
                <div>
                  <button
                    disabled={false}
                    on:click={trigger}
                    id="btnDisable"
                    class="show-signature-overlay bg-indigo-600 hover:bg-indigo-800 px-2 py-1 rounded-md border border-indigo-400 text-white text-base"
                  >
                    Select Signature Placement
                  </button>
                </div>
                <div
                  class:hidden={toggleBtn}
                  class="flex items-center justify-start gap-5"
                >
                  <button
                    on:click={signaturePlacement}
                    id="posControls"
                    class:justify-end={position}
                    class:bg-indigo-600={bgclr}
                    class="show-signature-overlay w-8 h-5 border-2 rounded-full flex items-center px-0.5"
                  >
                    <button
                      class:bg-white={ballwht}
                      class:bg-black={ballblk}
                      class="w-3 h-3  rounded-full"
                    />
                  </button>
                  <p class:font-semibold={bold} class="text-base">
                    Lock Horizontal control
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            class="flex items-center justify-between border-t border-white pt-4"
          >
            <button
              on:click={backBtn1}
              class="bg-indigo-600 hover:bg-indigo-800 px-2 py-1 rounded-md border border-indigo-400 text-white text-base"
            >
              Back
            </button>
            <button
              disabled={signBtn}
              on:click={hideModal}
              class="bg-indigo-600 disabled:cursor-not-allowed hover:bg-indigo-800 px-2 py-1 rounded-md border border-indigo-400 text-white text-base"
            >
              SIGN
            </button>
            <button id="autoClick3" on:click={nextBtn2} class="hidden">
              Next
            </button>
          </div>
        </div>
      {/if}
      {#if signPage}
        <div class="flex flex-col gap-4">
          <h1
            class="text-white text-lg tracking-wide font-semibold border-b border-white"
          >
            SIGN DETAILS
          </h1>
          <div class="flex flex-row items-center">
            <p class="text-base text-gray-600 w-96 font-semibold">
              Reason for Digital Signature
            </p>
            <input
              type="text"
              bind:value={Reason}
              class="w-full px-2 py-1 border-b-2 rounded-md border-black bg-white-300 outline-none"
            />
          </div>
          <div class="flex flex-row items-center">
            <p class="text-base text-gray-600 w-96 font-semibold">
              Signature Background color
            </p>
            <input
              bind:value={bgColor}
              class="w-full px-2 py-1 border-b-2 rounded-md border-black bg-white-300 outline-none"
              type="color"
              name="Identity"
              id="Identity"
            />
          </div>

          <div class="flex items-center justify-end border-t border-white pt-4">
            <button
              on:click={backBtn2}
              class="bg-indigo-600 hidden hover:bg-indigo-800 px-2 py-1 rounded-md border border-indigo-400 text-white text-base"
            >
              Back
            </button>
            {#if init}
              <button
                on:click={initiate}
                class="bg-indigo-600 hover:bg-indigo-800 px-2 py-1 rounded-md border border-indigo-400 text-white text-base"
              >
                Initiate
              </button>
            {/if}
          </div>
        </div>
      {/if}
      {#if otp}
        <div class="flex flex-col gap-4">
          <h1
            class="text-white text-lg tracking-wide font-semibold border-b border-white"
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

          <div class="flex items-center justify-end border-t border-white pt-4">
            <!-- <button
              on:click={backBtn3}
              class="bg-indigo-600 hover:bg-indigo-800 px-2 py-1 rounded-md border border-indigo-400 text-white text-base"
            >
              Back
            </button> -->

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
      {#if download}
        <div class="flex flex-col  gap-4">
          <h1
            class="text-white text-lg tracking-wide font-semibold border-b border-white"
          >
            SIGN DETAILS
          </h1>
          <div class="flex w-full flex-col p-5">
            <div class="cursor-pointer">
              <div
                class="flex items-center justify-center rounded-md border-blue-600 py-5"
              >
                <div class="space-y-1 text-center">
                  <div class="flex flex-col text-base">
                    <label
                      for="file-upload"
                      class="relative cursor-pointer rounded-md font-semibold text-blue-800"
                      id="dropzone"
                    >
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
                        Click here to preview and download
                      </button>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex items-center justify-between border-t border-white pt-4"
        />
      {/if}
    </ol>
  </nav>
</div>
