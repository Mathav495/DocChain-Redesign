<script>
  import Loginpage from './pages/Loginpage.svelte';
  import Dashboardpage from './pages/Dashboardpage.svelte';
  import Prepublish from './pages/prepublish.svelte';
  import { Route, Router } from 'svelte-routing';
  import Publishdoc from './pages/Publishdoc.svelte';
  import Fileuploadpage from './pages/Fileuploadpage.svelte';
  import Filepreview from './pages/Filepreview.svelte';
  import Signature from './pages/signature.svelte';
  import Blockchain from './pages/blockchain.svelte';
  import Dashboardpage2 from './pages/Dashboardpage2.svelte';
  let fileHash, dataHash, signature, documentID;
  export let url = '';

  /**
   * Function in which the datahash is dispatched from the add-data page
   * @param e {object} datahash
   */
  const getDataHash = (e) => {
    dataHash = e.detail;
    console.log(dataHash);
  };
  /**
   * Function in which the filehash is dispatched from the add-file page
   * @param e {object} filehash
   */
  const getFileHash = (e) => {
    fileHash = e.detail;
    console.log(fileHash);
  };
  const getSign = (e) => {
    signature = e.detail;
    console.log(signature);
  };
</script>

<Router {url}>
  <main>
    <Route path="/"><Loginpage /></Route>
    <Route path="/dash"><Dashboardpage /></Route>
    <Route path="/publish"><Publishdoc /></Route>
    <Route path="/dash2"><Dashboardpage2 /></Route>
    <Route path="/add-file/:id" let:params>
      <Fileuploadpage on:datahash={getDataHash} on:filehash={getFileHash} id={params.id} />
    </Route>
    <Route path="/preview"><Filepreview on:signature={getSign} /></Route>
    <!-- <Route path="/sign"><Signature /></Route> -->
    <!-- <Route path="/pre"><Prepublish /></Route> -->
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
