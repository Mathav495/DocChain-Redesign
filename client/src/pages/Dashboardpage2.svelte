<script>
  import Dashboard2 from '../components/Dashboard2.svelte';
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

  let Black = true,
    Yellow = false,
    Red = false;
  /**
   * Function for change theme colour
   * @param {string} e - selected theme colour
   */
  const changeClr = (e) => {
    (Black = false), (Yellow = false), (Red = false);
    if (e.detail == 'Black') {
      Black = true;
    }
    if (e.detail == 'Yellow') {
      Yellow = true;
    }
    if (e.detail == 'Red') {
      Red = true;
    }
  };
</script>

<!-- <div id="load1">
  <Loader />
</div> -->

<div class:bg-black={Black} class:bg-yellow-700={Yellow} class:bg-red-800={Red} class="text-white h-screen w-screen flex flex-row py-2 pr-2">
  <div class="w-2/12 p-8 hidden md:flex flex-col items-start justify-between">
    <Logo />
    <Nav />
    <Logout on:theme={changeClr} />
  </div>
  <div class="w-10/12 bg-white text-gray-900 rounded-md p-8 ml-4 md:ml-0">
    <Dashboard2 />
  </div>
  <!--small screen navbar-->
  <button class:hidden={hideNavbar} on:click|self={hideNav} class="bg-white/50 block md:hidden absolute inset-0 p-12">
    <SmallScreenNavbar />
  </button>
</div>

<style>
  .w-2\/12 {
    width: 18.1%;
  }
  .w-10\/12 {
    width: 81.9%;
  }
</style>
