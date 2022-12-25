<script>
  import axios from "axios"
  import { fade } from "svelte/transition"
  import Logo from "../components/Logo.svelte"
  import Logout from "../components/Logout.svelte"
  import Nav from "../components/Nav.svelte"
  import SmallScreenNavbar from "../components/Small_screen_navbar.svelte"
  import Header from "../components/Header.svelte"
  import Addfile from "../components/Addfile.svelte"
  import Sign1 from "../components/sign1.svelte"
  import Headerlogo from "../components/Headerlogo.svelte"
  export let id
  let hideNavbar = true

  const hideNav = () => {
    hideNavbar = true
  }
  let file

  const getFile = (e) => {
    console.log("file", e.detail)
    file = e.detail
    console.log(file)
  }

  let Black = true,
    Yellow = false,
    Red = false,
    Gray = false
  const changeClr = (e) => {
    ;(Black = false), (Yellow = false), (Red = false), (Gray = false)
    if (e.detail == "Black") {
      Black = true
    }
    if (e.detail == "Yellow") {
      Yellow = true
    }
    if (e.detail == "Red") {
      Red = true
    }
    if (e.detail == "Gray") {
      Gray = true
    }
  }

  let stepModal = false
  $: console.log(stepModal)
  let addfile = false,
    data1,
    signerId =
      "819f82006a4c49263fcde49372eb58589194cc759fcc2c8758d804f97021cbe3"
  const Modal = async (signerId) => {
    const { data } = await axios.get(
      `https://pdfsign.test.print2block.in/blockchain/signer/get?signer=${signerId}`
    )
    console.log(data)
    data1 = data
    console.log(data1)
    console.log(data.signerDetails.email)
    stepModal = true
    addfile = true
  }
  let totalPages = []
  const pageNumbers = (e) => {
    for (let i = 1; i <= e.detail; i++) {
      totalPages.push(i)
    }
    console.log(totalPages)
  }

  let pageNumber = 0
  const pageNum = (e) => {
    stepModal = false
    pageNumber = e.detail
  }

  let modal = false
  /**
   * Function to show the hidden modal
   */
  const showModal = () => {
    stepModal = true
    console.log("click")
    modal = true
  }

  let signedPdf
  const signedFile = (e) => {
    signedPdf = e.detail
  }

  let signedLink
  const signedUrl = (e) => {
    signedLink = e.detail
    stepModal = false
  }
  let hide = false,
    show = true,
    headerHide = true
  const HideNavbar = () => {
    if (hide == false) {
      hide = true
      console.log("hide")
      headerHide = false
      show = false
      // document.getElementById('header').classList.remove('md:mb-0');
    } else {
      hide = false
      console.log("show")
      headerHide = true
      show = true
      // document.getElementById('header').classList.add('md:mb-0');
    }
  }

  /**
   * This is the function to show and hide a samll screen navbar
   */
  const showNav = () => {
    if (hideNavbar == false) {
      hideNavbar = true
    } else {
      hideNavbar = false
    }
  }

  /**
   * close modal
   */

  const closeModal = () => {
    stepModal = false
    document.getElementsByClassName("btn")[0].classList.remove("hidden")
  }
</script>

<svelte:head>
  <title>Add File</title>
</svelte:head>

<div
  class:bg-black={Black}
  class:bg-yellow-700={Yellow}
  class:bg-red-700={Red}
  class="relative text-white h-screen w-screen flex flex-row py-4 pr-4"
  id="file_upload"
>
  <div
    class="h-full hidden pl-2 py-4 lg:flex flex-col items-start justify-between"
  >
    <Logo on:Hide={HideNavbar} />
    <Nav />
    <Logout on:theme={changeClr} />
  </div>
  <div
    transition:fade={{ x: 100, duration: 500 }}
    class="w-full flex flex-col bg-white text-gray-900 rounded-md p-4 ml-4 overflow-auto"
  >
    <div class="lg:hidden block">
      <Header on:navShow={showNav} />
    </div>
    <div class:hidden={headerHide}>
      <Headerlogo on:navShow={showNav} on:Hide={HideNavbar} />
    </div>
    <div>
      <Addfile
        {pageNumber}
        {id}
        {signedPdf}
        {signedLink}
        on:File={getFile}
        on:steps={() => Modal(signerId)}
        on:totalPage={pageNumbers}
        on:mShow={showModal}
      />
      {#if stepModal}
        <div
          class="absolute inset-0 flex justify-center w-screen bg-[#000000cc] h-screen"
        >
          <div class="p-4 mx-auto">
            <Sign1
              on:clsModal={closeModal}
              {data1}
              {file}
              {totalPages}
              on:PageNo={pageNum}
              {modal}
              on:myFile={signedFile}
              on:blob={signedUrl}
            />
          </div>
        </div>
      {/if}
    </div>
  </div>
  <!--small screen navbar-->
  <button
    class:hidden={hideNavbar}
    on:click|self={hideNav}
    class="bg-white/50 flex items-start justify-start md:hidden absolute inset-0 p-8"
  >
    <SmallScreenNavbar />
  </button>
</div>
