<script>
  import Dashboard from '../components/Dashboard.svelte';
  import Header from '../components/Header.svelte';
  import Logo from '../components/logo.svelte';
  import Logout from '../components/logout.svelte';
  import Nav from '../components/Nav.svelte';
</script>

<div class="h-auto lg:h-screen w-screen p-1 hidden" id="homepage">
  <div class="bg-black dash-bg-edge text-white h-full w-full">
    <div class="flex flex-row h-full py-3">
      <div class="width-1 md:w-2/12 sm:hidden medium-width py-5 md:flex flex-col items-center justify-between">
        <Logo />
        <div class="py-14">
          <Nav />
        </div>
        <Logout />
      </div>
      <div class="md:width-2 sm:w-full bg-white text-gray-900 content-bg-edge p-8 sm:ml-3 md:ml-0 mr-3">
        <Header />
        <div class="mt-10">
          <Dashboard />
        </div>
      </div>
    </div>
  </div>
</div>

<style global>
  .dash-bg-edge {
    border-radius: 3rem;
  }
  .content-bg-edge {
    border-radius: 3rem;
  }
  .width-2 {
    width: 89%;
  }
  /* @media (min-width: 1024px) { */
  .width-1 {
    width: 11%;
  }
  /* } */
</style>
