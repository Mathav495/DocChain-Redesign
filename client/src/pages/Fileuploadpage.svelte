<script>
  import axios from "axios"
  import Logo from "../components/Logo.svelte"
  import Logout from "../components/Logout.svelte"
  import Nav from "../components/Nav.svelte"
  import SmallScreenNavbar from "../components/Small_screen_navbar.svelte"
  import Header from "../components/Header.svelte"
  import Addfile from "../components/Addfile.svelte"
  import Sign1 from "../components/sign1.svelte"

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
  console.log(id)
  const showNav = () => {
    if (hideNavbar == false) {
      hideNavbar = true
    } else {
      hideNavbar = false
    }
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

  let stepModal = false,
    overflowHidden = false
  $: console.log(stepModal)
  let addfile = false,
    data1,
    signerId =
      "819f82006a4c49263fcde49372eb58589194cc759fcc2c8758d804f97021cbe3"
  const Modal = async (signerId) => {
    overflowHidden = true
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
    overflowHidden = false
    pageNumber = e.detail
    console.log(pageNumber)
    stepModal = false
  }

  let modal = false
  const showModal = () => {
    stepModal = true
    console.log("click")
    modal = true
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
    class="lg:w-88 md:w-2/8 hidden p-8 md:flex flex-col items-start justify-between"
  >
    <Logo />
    <Nav />
    <Logout on:theme={changeClr} />
  </div>
  <div
    class:overflow-hidden={overflowHidden}
    class="lg:w-full md:w-6/8 w-full flex flex-col gap-4 bg-white text-gray-900
    rounded-md ml-2 md:ml-0 overflow-auto"
  >
    <div class="md:hidden block">
      <Header on:navShow={showNav} />
    </div>
    <div>
      <Addfile
        {id}
        on:File={getFile}
        {pageNumber}
        on:steps={() => Modal(signerId)}
        on:totalPage={pageNumbers}
        on:mShow={showModal}
      />
      {#if stepModal}
        <!-- <div class="h-screen w-auto bg-red-900/20 absolute inset-0" /> -->
        <div
          class="absolute inset-0 flex justify-center w-screen bg-[#000000cc] h-screen"
        >
          <!-- <div class="relative"> -->
          <div class="p-4 mx-auto">
            <Sign1 {data1} {file} {totalPages} on:PageNo={pageNum} {modal} />
            <!-- </div> -->
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
