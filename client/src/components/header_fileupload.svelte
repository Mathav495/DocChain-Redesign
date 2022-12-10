<script>
  import axios from 'axios';
  import { onMount } from 'svelte';
  export let id, bgcolor;
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

<div class=" w-full shadow-xl rounded-md flex items-center p-2 gap-1" style="background:{bgcolor}">
  <div class="flex">
    <img src={qr} alt="qrcode" class="p-1 w-20 h-20 lg:w-24 lg:h-24" />
    <img src="/assets/sample.jpg" alt="qrcode" class="p-1 w-20 h-20 lg:w-24 lg:h-24" />
  </div>
  <div class="px-3 space-y-2 justify-center items-center flex flex-col">
    <h1 class="text-base font-semibold text-white capitalize self-start">{issuerName}</h1>
    <h1 class="text-base font-semibold font-mono text-white capitalize">{id}</h1>
    <h1 class="text-base font-semibold text-white  self-start"><slot name="title" /></h1>
  </div>
</div>
