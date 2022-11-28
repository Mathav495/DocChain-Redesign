<script>
  import Loginpage from './pages/Loginpage.svelte';
  import Dashboardpage from './pages/Dashboardpage.svelte';
  import { Route, Router } from 'svelte-routing';
  import Publishdoc from './pages/Publishdoc.svelte';
  import Fileuploadpage from './pages/Fileuploadpage.svelte';
  import Filepreview from './pages/Filepreview.svelte';
  let fileHash, dataHash;
  export let url = '';
  const getDataHash = (e) => {
    dataHash = e.detail;
    console.log(dataHash);
  };
  const getFileHash = (e) => {
    fileHash = e.detail;
    console.log(fileHash);
  };
</script>

<Router {url}>
  <main>
    <Route path="/"><Loginpage /></Route>
    <Route path="/dash"><Dashboardpage /></Route>
    <Route path="/publish"><Publishdoc /></Route>
    <Route path="/add-file"><Fileuploadpage on:datahash={getDataHash} on:filehash={getFileHash} /></Route>
    <Route path="/preview"><Filepreview /></Route>
  </main>
</Router>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
