<script>
  import Fileupload from '../components/Fileupload.svelte';
  import Logo from '../components/Logo.svelte';
  import Logout from '../components/Logout.svelte';
  import Nav from '../components/Nav.svelte';
  import SmallScreenNavbar from '../components/Small_screen_navbar.svelte';
  let hideNavbar = true;
  const hideNav = () => {
    hideNavbar = true;
  };

  const showNav = () => {
    if (hideNavbar == false) {
      hideNavbar = true;
    } else {
      hideNavbar = false;
    }
  };
</script>

<svelte:head>
  <title>Add File</title>
</svelte:head>

<div class="bg-black text-white h-screen w-screen flex flex-row py-2 pr-2">
  <div class="w-2/12 p-8 hidden md:flex flex-col items-start justify-between">
    <Logo />
    <Nav />
    <Logout />
  </div>
  <div class="w-10/12 bg-white text-gray-900 rounded-md p-8 ml-4 md:ml-0">
    <Fileupload on:datahash on:filehash />
  </div>
  <!--small screen navbar-->
  <button class:hidden={hideNavbar} on:click|self={hideNav} class="bg-white/50 block md:hidden absolute inset-0 p-12">
    <SmallScreenNavbar />
  </button>
</div>
