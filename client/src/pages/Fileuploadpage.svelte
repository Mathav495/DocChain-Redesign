<script>
  import Logo from '../components/logo.svelte';
  import Nav from '../components/Nav.svelte';
  import Logout from '../components/logout.svelte';
  import Header from '../components/Header.svelte';
  import Addfile from '../components/Addfile.svelte';
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
          <Addfile on:datahash on:filehash />
        </div>
      </div>
    </div>
  </div>
</div>
