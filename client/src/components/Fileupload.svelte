<script>
  import axios from 'axios';
  import { onMount } from 'svelte';
  import AddData from './AddData.svelte';
  import Addfile from './Addfile.svelte';
  let token = localStorage.getItem('token');
  let issuerName;
  let fileavailable = false;
  let docTitle;

  let qr = localStorage.getItem('qrcode');
  onMount(async () => {
    const { data } = await axios.get('https://test.swagger.print2block.in/account/user', {
      headers: {
        'x-access-token': token,
      },
    });
    issuerName = data.userData.name;
    console.log(data.userData.name);
  });

  const onavailable = (e) => {
    fileavailable = e.detail;
  };
</script>

<div>
  <h1 class="text-xl font-bold tracking-wide">Choose Document</h1>

  <div class="mt-2 bg-blue-100 rounded-lg flex p-3">
    <div class="flex">
      <img src={qr} alt="qrcode" class="p-1  w-20 h-20" />
      <img src="/assets/sample.jpg" alt="qrcode" class="p-1 w-20 h-20" />
    </div>
    <div class="ml-auto p-3">
      <h1 class="text-lg font-semibold text-slate-500">Issuer Name : <span class="text-xl text-slate-900 capitalize">{issuerName}</span></h1>
      <h1 class="text-lg font-semibold text-slate-500">Document Title : <span class="text-xl text-slate-900">{docTitle}</span></h1>
    </div>
  </div>

  <div class="flex gap-5 pt-4">
    <Addfile on:fileavailable={onavailable} />
    <AddData on:datahash {fileavailable} />
  </div>
</div>
