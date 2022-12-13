<script>
  import DocIdform from '../components/docIdform.svelte';
  import Logo from '../components/Logo.svelte';
  import Logout from '../components/Logout.svelte';
  import Nav from '../components/Nav.svelte';
  import Header from '../components/Header.svelte';

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

<div class:bg-black={Black} class:bg-yellow-700={Yellow} class:bg-red-700={Red} class="relative text-white h-screen w-screen flex flex-row py-4 pr-4">
  <div class="lg:w-88 md:w-1/8  hidden p-8 md:flex flex-col items-start justify-between">
    <Logo />
    <Nav />
    <Logout on:theme={changeClr} />
  </div>
  <div class="lg:w-full overflow-auto md:w-6/8 w-full flex flex-col gap-4 bg-white text-gray-900 rounded-md p-4 ml-2 md:ml-0">
    <div class="md:hidden block">
      <Header on:navShow={showNav} />
    </div>
    <DocIdform />
  </div>
  <!--small screen navbar-->
  <button class:hidden={hideNavbar} on:click|self={hideNav} class="bg-white/50 flex items-start justify-start md:hidden absolute inset-0 p-8">
    <SmallScreenNavbar />
  </button>
</div>
