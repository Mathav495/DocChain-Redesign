<script>
  import Dashboard from '../components/Dashboard.svelte';
  import Header from '../components/Header.svelte';
  import Logo from '../components/logo.svelte';
  import Logout from '../components/logout.svelte';
  import Nav from '../components/Nav.svelte';
</script>

<div class="h-screen w-screen p-1">
  <div class="bg-black dash-bg-edge text-white h-full w-full">
    <div class="flex flex-row h-full py-3">
      <div class="width-1 py-5 flex flex-col items-center">
        <Logo />
        <div class="py-14">
          <Nav />
        </div>
        <Logout />
      </div>
      <div class="width-2 bg-white text-gray-900 content-bg-edge p-8 mr-3">
        <Header />
        <div class="mt-3">
          <Dashboard />
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .dash-bg-edge {
    border-radius: 3rem;
  }
  .content-bg-edge {
    border-radius: 3rem;
  }
  .width-1 {
    width: 10%;
  }
  .width-2 {
    width: 90%;
  }
</style>
