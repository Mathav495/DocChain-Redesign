<script>
  import Loginpage from './pages/Loginpage.svelte';
  import Dashboardpage from './pages/Dashboardpage.svelte';
  import { Route, Router } from 'svelte-routing';
  import Publishdoc from './pages/Publishdoc.svelte';
  export let url = '';
  let fileHash, dataHash;
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
    <Route path="/publish"><Publishdoc on:datahash={getDataHash} on:filehash={getFileHash} /></Route>
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
