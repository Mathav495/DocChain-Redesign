<script>
  export let file;
  import { fade } from 'svelte/transition';
  import Header from '../components/Header.svelte';
  import Headerlogo from '../components/Headerlogo.svelte';
  // import Loader from '../components/Loader.svelte';
  import Logo from '../components/Logo.svelte';
  import Logout from '../components/Logout.svelte';
  import Nav from '../components/Nav.svelte';
  import Sign from '../components/Sign.svelte';
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
    show = true,
    headerHide = true;
  const HideNavbar = () => {
    if (hide == false) {
      hide = true;
      console.log('hide');
      headerHide = false;
      show = false;
      // document.getElementById('header').classList.remove('md:mb-0');
    } else {
      hide = false;
      console.log('show');
      headerHide = true;
      show = true;
      // document.getElementById('header').classList.add('md:mb-0');
    }
  };
</script>

<div class:bg-black={Black} class:bg-yellow-700={Yellow} class:bg-red-700={Red} class="relative text-white h-screen w-screen flex flex-row py-4 pr-4">
  <div class:hidden={hide} class:block={show} class="width1200px width1024px transform ease-in-out delay-1000 duration-1000 translate-x-6 overflow-auto">
    <div class="h-full hidden pl-2 py-4 lg:flex flex-col items-start justify-between">
      <Logo on:Hide={HideNavbar} />
      <Nav />
      <Logout on:theme={changeClr} />
    </div>
  </div>
  <div transition:fade={{ x: 100, duration: 500 }} class="w-full flex flex-col bg-white text-gray-900 rounded-md ml-4 overflow-auto">
    <div class="lg:hidden block">
      <Header on:navShow={showNav} />
    </div>
    <div class:hidden={headerHide}>
      <Headerlogo on:navShow={showNav} on:Hide={HideNavbar} />
    </div>
    <div>
      <Sign {file} />
    </div>
  </div>
  <!--small screen navbar-->
  <button class:hidden={hideNavbar} on:click|self={hideNav} class="bg-white/50 flex lg:hidden items-start justify-start absolute inset-0 p-8">
    <SmallScreenNavbar />
  </button>
</div>

<style global>
  /* @media screen and (min-width: 768px) {
    .width768px {
      width: 27rem;
    }
  } */
  @media screen and (min-width: 1024px) {
    .width1024px {
      width: 24rem;
    }
  }
  @media screen and (min-width: 1200px) {
    .width1200px {
      width: 22rem;
    }
  }
</style>
