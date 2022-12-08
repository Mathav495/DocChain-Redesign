<script>
  import axios from 'axios';
  import { onMount } from 'svelte';
  export let id;
  let token = localStorage.getItem('token');
  let issuerName;
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
</script>

<div class=" w-full bg-slate-200 shadow-xl rounded-md flex items-center px-2 py-6 gap-1">
  <div class="flex">
    <img src={qr} alt="qrcode" class="p-1 w-24 h-24" />
    <img src="/assets/sample.jpg" alt="qrcode" class="p-1 w-24 h-24" />
  </div>
  <div class="px-3 space-y-2">
    <h1 class="text-base font-semibold text-slate-500">Issuer Name : <span class="text-base text-slate-900 capitalize">{issuerName}</span></h1>
    <h1 class="text-base font-semibold text-slate-500">Document ID : <span class="text-base text-slate-900 capitalize">{id}</span></h1>
    <h1 class="text-base font-semibold text-slate-500 inline-flex items-center">Document Title : <slot name="title" /></h1>
  </div>
</div>
