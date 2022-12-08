<script>
  import Sharebtn from '../components/sharebtn.svelte';
  import Header from '../components/Header.svelte';
  import Logo from '../components/Logo.svelte';
  import Logout from '../components/Logout.svelte';
  import Nav from '../components/Nav.svelte';
  // import axios from 'axios';
  import SmallScreenNavbar from '../components/Small_screen_navbar.svelte';
  let qr = localStorage.getItem('qrcode');
  console.log('qrcode', qr);
  let proposedURL = localStorage.getItem('docURL');
  console.log('qrcodocURL', proposedURL);
  let imgurl = localStorage.getItem('img');
  console.log('imgUrl', imgurl);

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

<main>
  <div class:bg-black={Black} class:bg-yellow-700={Yellow} class:bg-red-700={Red} class="relative text-white h-screen w-screen flex flex-row py-2 pr-2">
    <div class="lg:w-88 md:w-3/8 hidden p-8 md:flex flex-col items-start justify-between">
      <Logo />
      <Nav />
      <Logout on:theme={changeClr} />
    </div>
    <div class="lg:w-full md:w-5/8 w-full flex flex-col gap-4 bg-white text-gray-900 rounded-md p-8 ml-2 md:ml-0">
      <div class="md:hidden block">
        <Header on:navShow={showNav} />
      </div>
      <!-- <section class="body-font text-gray-600"> -->
      <div class="mx-auto flex flex-wrap justify-center md:ml-0 md:justify-start py-5">
        <div class="-m-1 flex flex-wrap md:-m-2">
          <div class="flex w-full flex-wrap">
            <div class="w-full  md:p-2">
              <img alt="gallery" class="object-cover object-center h-[600px] md:justify-start w-5/6 mx-auto rounded-lg shadow-lg" src={imgurl} />
            </div>
            <div class="mt-10 flex shadow-lg w-5/6 mx-auto">
              <div class="w-3/7 p-1 md:p-2 ml-20  justify-center">
                <Sharebtn />
              </div>
              <div class="w-4/7 ml-5 flex-col p-1 md:p-2 mb-2 ">
                <div class="text-base text-gray-900 font-bold">Doucment Blockchain URL:</div>
                <div class="flex  break-words mt-3 text-base text-gray-900 mb-2  "><a href={proposedURL} target="_blank" rel="noreferrer" class="text-base text-green-600 break-words font-bold underline ">{proposedURL}</a></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- </section> -->
    </div>
    <!--small screen navbar-->
    <button class:hidden={hideNavbar} on:click|self={hideNav} class="bg-white/50 flex items-start justify-start md:hidden absolute inset-0 p-8">
      <SmallScreenNavbar />
    </button>
  </div>
</main>
