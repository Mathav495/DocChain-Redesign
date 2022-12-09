<script>
  import { flush } from 'svelte/internal';
  import Dashboard from '../components/Dashboard.svelte';
  import Header from '../components/Header.svelte';
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
  let hide = false,
    show = true;
  const HideNav = () => {
    if (hide == false) {
      hide = true;
      show = false;
    } else {
      hide = false;
      show = true;
    }
  };
</script>

<!-- <div id="load1">
  <Loader />
</div> -->

<div class:bg-black={Black} class:bg-yellow-700={Yellow} class:bg-red-700={Red} class="relative text-white h-screen w-screen flex flex-row py-4 pr-4">
  <div class:hidden={hide} class:flex={show} class="lg:w-88 md:w-3/8 hidden p-8 flex-col items-start gap-4 justify-between overflow-auto">
    <Logo />
    <Nav />
    <Logout on:theme={changeClr} />
  </div>
  <div class=" relative lg:w-full md:w-5/8 w-full flex flex-col gap-4 bg-white text-gray-900 rounded-md p-8 ml-4 md:ml-0 overflow-auto">
    <div class="md:hidden block">
      <Header on:navShow={showNav} />
    </div>
    <Dashboard />
    <button on:click={HideNav} class="text-lg bg-indigo-400 hover:bg-indigo-500 rounded-md text-white px-2 py-1 absolute bottom-0 right-0 m-8">Hide</button>
  </div>
  <!--small screen navbar-->
  <button class:hidden={hideNavbar} on:click|self={hideNav} class="bg-white/50 flex items-start justify-start md:hidden absolute inset-0 p-8">
    <SmallScreenNavbar />
  </button>
</div>
