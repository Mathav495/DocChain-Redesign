<script>
	import Loginpage from "./pages/Loginpage.svelte";
	import Dashboard from "./pages/Dashboard.svelte";
  import { Route, Router } from "svelte-routing"
  export let url = ""

</script>

<Router {url}>
  <main>
    <Route path="/"><Loginpage /></Route>
    <Route path="dash"><Dashboard /></Route>
  </main>
</Router>

<style global lang="postcss">
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>