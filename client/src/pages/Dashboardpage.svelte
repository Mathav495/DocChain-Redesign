<script>
  import Dashboard from '../components/Dashboard.svelte';
  // import Loader from '../components/Loader.svelte';
  import Logo from '../components/Logo.svelte';
  import Logout from '../components/Logout.svelte';
  import Nav from '../components/Nav.svelte';
  import SmallScreenNavbar from '../components/Small_screen_navbar.svelte';
  let hideNavbar = true;
  let animate = document.querySelector('#particles-js');
  console.log(animate);
  animate.style.display = 'none';
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

<div class="bg-black text-white h-screen w-screen flex flex-row py-2 pr-2">
  <div class="w-2/12 p-8 hidden md:flex flex-col items-start justify-between">
    <Logo />
    <Nav />
    <Logout />
  </div>
  <div class="w-10/12 bg-white text-gray-900 rounded-md p-8 ml-4 md:ml-0">
    <Dashboard />
  </div>
  <!--small screen navbar-->
  <button class:hidden={hideNavbar} on:click|self={hideNav} class="bg-white/50 block md:hidden absolute inset-0 p-12">
    <SmallScreenNavbar />
  </button>
</div>

<style global>
  .w-2\/12 {
    width: 18.1%;
  }
  .w-10\/12 {
    width: 81.9%;
  }
</style>
