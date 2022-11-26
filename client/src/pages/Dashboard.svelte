<script>
import Header from "../componants/Header.svelte"
import Logo from "../componants/Logo.svelte"
import Logout from "../componants/Logout.svelte"
import Nav from "../componants/Nav.svelte"
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
      <div class="width-2 bg-white text-gray-700 content-bg-edge p-8 mr-3">
        <Header />
        <button
          class="transition-opacity duration-500 ease-in-out 
        bg-green-300 hover:opacity-100 opacity-0 transform 
        hover:-translate-y-1 hover:scale-110 
        rounded-lg p-4 border border-green-900">
          Hover me
        </button>
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
