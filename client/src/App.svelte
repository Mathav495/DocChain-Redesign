<script>
  import Loginpage from './pages/Loginpage.svelte';
  import Dashboardpage from './pages/Dashboardpage.svelte';
  import Final from './pages/final.svelte';
  import { Route, Router } from 'svelte-routing';
  import Publishdoc from './pages/Publishdoc.svelte';
  import Filepreview from './pages/Filepreview.svelte';
  import Dashboardpage2 from './pages/Dashboardpage2.svelte';
  import Dashboardpage3 from './pages/Dashboardpage3.svelte';
  import Adddatapage from './pages/Adddatapage.svelte';
  import Fileuploadpage from './pages/Fileuploadpage.svelte';
  import Signpage from './pages/Signpage.svelte';
  export let url = '';
  let file, bloblink;
  const getFile = (e) => {
    console.log('file', e.detail);
    file = e.detail;
    console.log(file);
    console.log(URL.createObjectURL(file));
  };
  const blobUrl = (e) => {
    bloblink = e.detail;
    console.log(bloblink);
  };
</script>

<Router {url}>
  <main>
    <Route path="/"><Loginpage /></Route>
    <Route path="/dash"><Dashboardpage /></Route>
    <Route path="/publish"><Publishdoc /></Route>
    <Route path="/dash2"><Dashboardpage2 /></Route>
    <Route path="/dash3"><Dashboardpage3 /></Route>
    <Route path="/sign/:id" let:params>
      <Signpage {file} id={params.id} on:blob={blobUrl} />
    </Route>
    <Route path="/add-file/:id" let:params>
      <Fileuploadpage id={params.id} on:File={getFile} {bloblink} />
    </Route>
    <Route path="/add-data/:id" let:params>
      <Adddatapage id={params.id} />
    </Route>
    <Route path="/publish/:id" let:params>
      <Filepreview id={params.id} />
    </Route>
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
