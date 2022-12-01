<script>
  import Dashboard from '../components/Dashboard.svelte';
  import Header from '../components/Header.svelte';
  import Loader from '../components/Loader.svelte';
  import Logo from '../components/logo.svelte';
  import Logout from '../components/logout.svelte';
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

<div id="load">
  <Loader />
</div>

<div class="h-auto  relative lg:w-screen w-auto p-1 hidden" id="homepage">
  <div class="bg-black dash-bg-edge text-white h-full w-full">
    <div class="flex flex-row h-full w-full py-3">
      <div class="md:w-4/12 lg:w-3/12 hidden md-width py-5 md:flex flex-col items-center justify-between">
        <Logo />
        <div class="py-14">
          <Nav />
        </div>
        <Logout />
      </div>
      <div class="md:w-8/12 lg:w-9/12 w-full bg-white text-gray-900 content-bg-edge p-8 ml-3 md:ml-0 mr-3">
        <Header on:navShow={showNav} />
        <div class="mt-10">
          <Dashboard />
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

<style global>
  .dash-bg-edge {
    border-radius: 3rem;
  }
  .content-bg-edge {
    border-radius: 3rem;
  }
  @media (min-width: 768px) {
    .md\:w-4\/12 {
      width: 16%;
    }
  }

  @media (min-width: 768px) {
    .md\:w-8\/12 {
      width: 84%;
    }
  }

  @media (min-width: 1024px) {
    .lg\:w-3\/12 {
      width: 10%;
    }
  }
  @media (min-width: 1024px) {
    .lg\:w-9\/12 {
      width: 90%;
    }
  }
</style>
