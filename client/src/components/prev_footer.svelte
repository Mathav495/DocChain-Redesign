<script>
  import axios from "axios"
  import { navigate } from "svelte-routing"
  import QueueMsg from "./Queue_msg.svelte"
  import SignidMsg from "./signid_msg.svelte"
  import { fade } from "svelte/transition"

  let load = false
  export let signmsg
  export let Queue_msg
  let errormsg
  // export let loader = false
  let loading = false

  signmsg = false
  Queue_msg = false
  // let display = false

  // let issuerName, src

  let token = localStorage.getItem("token")
  let fileHash = localStorage.getItem("filehash")
  console.log("filehash", fileHash)
  let dataHash = localStorage.getItem("datahash")
  console.log("datahash", dataHash)
  let qr = localStorage.getItem("qrcode")
  console.log("qrcode", qr)
  let proposedURL = localStorage.getItem("docURL")
  console.log("qrcodocURL", proposedURL)
  let imgurl = localStorage.getItem("img")
  console.log("imgUrl", imgurl)
  let documentID = localStorage.getItem("documentID")
  let PdfBlobFromImg = localStorage.getItem("ImageToPdfBlob")
  console.log(PdfBlobFromImg)

  /**
   * getting saved pdf blob from local storage
   */
  let blob = localStorage.getItem("blobpdf")
  console.log(blob)

  // onMount(async () => {
  //   const { data } = await axios.get(
  //     "https://test.swagger.print2block.in/account/user",
  //     {
  //       headers: {
  //         "x-access-token": token,
  //       },
  //     }
  //   )
  //   issuerName = data.userData.name
  //   console.log(data.userData.name)
  // })

  // getting signature Id from the user
  const getSignature = async () => {
    try {
      load = true
      signmsg = true
      const { data } = await axios.get(
        `https://ecdsa.test.print2block.in/sign/5f52329ba0ae7d28650a9fe7${fileHash}${dataHash}`
      )
      console.log(data)
      // dispatch("signature", data)
      setTimeout(() => {
        signmsg = false
      }, 1000)
      localStorage.setItem("signature", data)
      let signature = localStorage.getItem("signature")
      console.log(signature)
    } catch (error) {
      console.error(error)
    }
  }

  const publishDoc = async () => {
    try {
      // loading = true
      Queue_msg = true
      let signature = localStorage.getItem("signature")
      console.log("signature", signature)
      let documentID = localStorage.getItem("documentID")
      console.log("documentID", documentID)
      const { data } = await axios.post(
        "https://test.swagger.print2block.in/docs/publish",
        {
          documentID: documentID,
          signature: signature,
        },
        {
          headers: {
            "x-access-token": token,
          },
        }
      )

      setTimeout(() => {
        Queue_msg = false
      }, 1000)
      // setTimeout(() => {
      //   loading = false
      // }, 5000)
      // window.location.assign(proposedURL, "_blank")
      window.open(proposedURL, "_blank").focus()
    } catch (error) {
      console.error(error)
    }

    // navigate(proposedURL)
  }

  const releaseDoc = async () => {
    try {
      // let documentID = localStorage.getItem('documentID');
      const { data } = await axios.get(
        `https://test.swagger.print2block.in/docs/release?documentID=${documentID}`
      )
      console.log(data)
      console.log(data.success)
      if (data) {
        navigate("/publish")
      }
    } catch (error) {
      console.error(error)
    }
  }

  //disabling release button

  const disableRelease = () => {
    document.getElementById("release").disabled = true
  }

  const onConfirm = () => {
    document.getElementById("confirm").style.display = "none"
    document.getElementById("sign").style.display = "inline-flex"
    document.getElementById("Confirmation").style.display = "none"
    document.getElementById("Signature").style.display = "inline-flex"
  }

  const onSign = () => {
    document.getElementById("sign").style.display = "none"
    document.getElementById("publish").style.display = "inline-flex"
    document.getElementById("Signature").style.display = "none"
    document.getElementById("Publishdoc").style.display = "inline-flex"
  }

  const hideSignmsg = () => {
    signmsg = false
  }
  const hideQueuemsg = () => {
    Queue_msg = false
  }
</script>

<!-- {#if loading}
  <Loader />
{/if} -->
{#if signmsg}
  <SignidMsg
    position="absolute z-20 bottom-24 right-0"
    on:click={hideSignmsg}
  />
{/if}
{#if Queue_msg}
  <QueueMsg
    position="absolute z-20 bottom-24	 right-0"
    on:click={hideQueuemsg}
  />
{/if}

<div
  class="absolute w-5/6 mx-auto flex justify-center items-center z-10  inset-x-0  {PdfBlobFromImg
    ? '-bottom-24'
    : 'bottom-0'}"
  in:fade={{ duration: 4500 }}
>
  <div
    class="container mx-auto bg-white flex flex-col items-center px-4 py-2 md:flex-row md:right-0 rounded-lg shadow-[0_0_8px_0_rgba(0,0,0,0.15)]"
  >
    <div
      id="Confirmation"
      class="mb-6 flex w-full flex-col pr-0 text-center md:mb-0 md:w-auto md:pr-10 md:text-left  sm:text-left "
    >
      <h2
        class="title-font mb-1 text-md font-medium tracking-widest text-blue-500"
      >
        Confirmation
      </h2>
      <h1 class="title-font text-lg font-medium text-slate-500 md:text-xl">
        please verify document details,if needed to modify click <strong>
          Release
        </strong>
        to generate new document
      </h1>
    </div>
    <div
      id="Signature"
      class="mb-6 flex w-full flex-col pr-0 text-center md:mb-0 md:w-auto md:pr-10 md:text-left  sm:text-left "
      style="display: none"
    >
      <h2
        class="title-font mb-1 text-md font-medium tracking-widest text-blue-500"
      >
        Signature Generation
      </h2>
      <h1 class="title-font text-lg font-medium text-slate-500 md:text-xl">
        Clck <strong>Signature</strong>
        to generate your Signature.If needed to modify click
        <strong>Release</strong>
        to generate new document
      </h1>
    </div>
    <div
      id="Publishdoc"
      class="mb-6 flex w-full flex-col pr-0 text-center md:mb-0 md:w-auto md:pr-10 md:text-left  sm:text-left "
      style="display: none"
    >
      <h2
        class="title-font mb-1 text-md font-medium tracking-widest text-blue-500"
      >
        Publish to BlockChain
      </h2>
      <h1 class="title-font text-lg font-medium text-slate-500 md:text-xl">
        Clck <strong>Publish</strong>
        to publish your document to BlockChain. You cannot
        <strong>Release</strong>
        after publishing the document
      </h1>
    </div>
    <div
      class="mx-auto flex flex-shrink-0 items-center space-x-4 md:ml-auto md:mr-0"
    >
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <button
        class="inline-flex items-center rounded-lg border border-red-600 py-2 px-5 text-red-600 hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:bg-red-200"
        on:click|preventDefault={releaseDoc}
        id="release"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-6 w-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
          />
        </svg>
        <span class="title-font ml-2 text-base font-bold">Release</span>
      </button>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <button
        type="button"
        class=" confirm inline-flex items-center rounded-lg border border-green-500 py-2 px-5 text-green-500 hover:bg-green-500 hover:text-white focus:outline-none "
        id="confirm"
        on:click={onConfirm}
      >
        {#if load}
          <svg
            role="status"
            class="mr-4 h-5 w-5 animate-spin rounded-full border-4 border-white border-r-green-500"
            viewBox="0 0 24 24"
          />
        {:else}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
            />
          </svg>
        {/if}
        <span class="title-font ml-2 text-base font-bold">Confirm</span>
      </button>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <button
        class="sign inline-flex items-center rounded-lg border border-green-500 text-green-500 py-2 px-5 hover:bg-green-500 hover:text-white focus:outline-none"
        style="display: none"
        on:click|preventDefault|stopPropagation={getSignature}
        on:click={onSign}
        id="sign"
      >
        {#if load}
          <svg
            role="status"
            class="mr-4 h-5 w-5 animate-spin rounded-full border-4 border-white border-r-green-500"
            viewBox="0 0 24 24"
          />
        {:else}
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
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        {/if}
        <span class="title-font ml-2 font-bold text-base">Signature</span>
      </button>
      <a
        class="inline-flex items-center rounded-lg border border-green-500 text-green-500 py-2 px-5 hover:bg-green-500 hover:text-white focus:outline-none"
        href={proposedURL}
        target="_blank"
        rel="noreferrer"
        style="display: none"
        id="publish"
        on:click|once={disableRelease}
        on:click|preventDefault|stopPropagation={publishDoc}
      >
        {#if load}
          <svg
            role="status"
            class="mr-3 h-5 w-5 animate-spin rounded-full border-4 border-white border-r-green-500"
            viewBox="0 0 24 24"
          />
        {:else}
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
              d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12"
            />
          </svg>
        {/if}
        <span class="title-font ml-2 font-bold text-base">Publish</span>
      </a>
    </div>
  </div>
</div>
