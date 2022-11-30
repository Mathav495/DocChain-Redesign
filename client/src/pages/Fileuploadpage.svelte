<script>
  import Addfile from '../components/Addfile.svelte';
  import Header from '../components/Header.svelte';
  import Logo from '../components/logo.svelte';
  import Logout from '../components/logout.svelte';
  import Nav from '../components/Nav.svelte';
  import SmallScreenNavbar from '../components/Small_screen_navbar.svelte';
  let animate = document.querySelector('#particles-js');
  console.log(animate);
  animate.style.display = 'none';
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

<div class="h-auto lg:h-screen relative lg:w-screen w-auto p-1 ">
  <div class="bg-black dash-bg-edge text-white h-full w-full">
    <div class="flex flex-row h-full py-3">
      <div class="md:w-4/12 lg:w-3/12 hidden  md-width py-5 md:flex flex-col items-center justify-between">
        <Logo />
        <div class="py-14">
          <Nav />
        </div>
        <Logout />
      </div>
      <div class="md:w-8/12 lg:w-9/12 w-full bg-white text-gray-900 content-bg-edge p-8 ml-3 md:ml-0 mr-3">
        <Header on:navShow={showNav} />
        <div class="mt-10">
          <Addfile on:datahash on:filehash />
        </div>
      </div>
    </div>
  </div>
  <!--small screen navbar-->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class:hidden={hideNavbar} on:click|self={hideNav} class="bg-white/50 block md:hidden absolute inset-0 p-12">
    <SmallScreenNavbar />
  </div>
</div>
