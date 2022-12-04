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
  let Black = true,
    Yellow = false,
    Red = false,
    Gray = false;
  const changeClr = (e) => {
    (Black = false), (Yellow = false), (Red = false), (Gray = false);
    if (e.detail == 'Black') {
      Black = true;
    }
    if (e.detail == 'Yellow') {
      Yellow = true;
    }
    if (e.detail == 'Red') {
      Red = true;
    }
    if (e.detail == 'Gray') {
      Gray = true;
    }
  };
</script>

<!-- <div id="load1">
  <Loader />
</div> -->

<div class:bg-black={Black} class:bg-yellow-700={Yellow} class:bg-red-700={Red} class="text-white h-screen w-screen flex flex-row py-2 pr-2">
  <div class="lg:w-88 w-96 p-8 flex flex-col items-start justify-between">
    <Logo />
    <Nav />
    <Logout on:theme={changeClr} />
  </div>
  <div class="w-full bg-white text-gray-900 rounded-md p-8 ml-4 md:ml-0">
    <Dashboard />
  </div>
  <!--small screen navbar-->
</div>
<button class:hidden={hideNavbar} on:click|self={hideNav} class="bg-white/50 block md:hidden absolute inset-0 p-12">
  <SmallScreenNavbar />
</button>
