<script>
  import Loginpage from './pages/Loginpage.svelte';
  import Dashboardpage from './pages/Dashboardpage.svelte';
  import Final from './pages/final.svelte';
  import { Route, Router } from 'svelte-routing';
  import Publishdoc from './pages/Publishdoc.svelte';
  import Fileuploadpage from './pages/Fileuploadpage.svelte';
  import Filepreview from './pages/Filepreview.svelte';
  import Dashboardpage2 from './pages/Dashboardpage2.svelte';
  import Dashboardpage3 from './pages/Dashboardpage3.svelte';
  import Adddatapage from './pages/Adddatapage.svelte';
  export let url = '';

</script>

<Router {url}>
  <main>
    <Route path="/"><Loginpage /></Route>
    <Route path="/dash"><Dashboardpage /></Route>
    <Route path="/publish"><Publishdoc /></Route>
    <Route path="/dash2"><Dashboardpage2 /></Route>
    <Route path="/dash3"><Dashboardpage3 /></Route>
    <Route path="/add-file/:id" let:params>
      <Fileuploadpage id={params.id} />
    </Route>
    <Route path="/add-data/:id" let:params>
      <Adddatapage id={params.id} />
    </Route>
    <Route path="/preview"><Filepreview /></Route>
    <Route path="/final"><Final /></Route>
  </main>
</Router>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  main {
    font-family: 'Nunito', sans-serif;
  }
</style>
