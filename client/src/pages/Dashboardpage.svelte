<script>
  import Dashboard from '../components/Dashboard.svelte';
  import Header from '../components/Header.svelte';
  // import Loader from '../components/Loader.svelte';
  import Logo from '../components/Logo.svelte';
  import Logout from '../components/Logout.svelte';
  import Nav from '../components/Nav.svelte';
  import SmallScreenNavbar from '../components/Small_screen_navbar.svelte';
  let hideNavbar = true;

  /**
   * This is the function to hide a samll screen navbar
   */
  const hideNav = () => {
    hideNavbar = true;
  };

  /**
   * This is the function to show and hide a samll screen navbar
   */
  const showNav = () => {
    if (hideNavbar == false) {
      hideNavbar = true;
    } else {
      hideNavbar = false;
    }
  };
</script>

<!-- <div id="load1">
  <Loader />
</div> -->

<div class="h-screen relative lg:w-screen w-auto" id="homepage">
  <div class="bg-black text-white h-full w-full py-3">
    <div class="flex flex-row h-full w-full">
      <div class="w-auto p-8 hidden md:flex flex-col items-center justify-between">
        <Logo />
        <div>
          <Nav />
        </div>
        <Logout />
      </div>
      <div class="w-auto bg-white text-gray-900 rounded-md p-8 ml-3 md:ml-0 mr-3">
        <Dashboard />
      </div>
    </div>
  </div>
  <!--small screen navbar-->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class:hidden={hideNavbar} on:click|self={hideNav} class="bg-white/50 block md:hidden absolute inset-0 p-12">
    <SmallScreenNavbar />
  </div>
</div>
