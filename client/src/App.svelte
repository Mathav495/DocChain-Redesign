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
  let pdf, img;
  let ImageUrl;
  const blobPdf = (e) => {
    console.log('pdf', e.detail);
    pdf = e.detail;
    console.log(pdf);
    console.log(URL.createObjectURL(pdf));
  };
  const blobImg = (e) => {
    console.log('img', e.detail);
    img = e.detail;
    console.log(img);
    console.log(URL.createObjectURL(img));
  };

  const imageurl = (e) => {
    ImageUrl = e.detail;
    console.log(ImageUrl);
  };
</script>

<Router {url}>
  <main>
    <Route path="/"><Loginpage /></Route>
    <Route path="/dash"><Dashboardpage /></Route>
    <Route path="/publish"><Publishdoc /></Route>
    <Route path="/dash2"><Dashboardpage2 /></Route>
    <Route path="/dash3"><Dashboardpage3 /></Route>
    <Route path="/sign"><Signpage {pdf} {img} {ImageUrl} /></Route>
    <Route path="/add-file/:id" let:params>
      <Fileuploadpage id={params.id} on:blob={blobPdf} on:blobimage={blobImg} on:Imageurl={imageurl} />
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
