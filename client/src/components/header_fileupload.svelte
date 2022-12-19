<script>
  import axios from 'axios';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  export let bgcolor, id;
  let token = localStorage.getItem('token');
  let issuerName, randomPattern;
  let qr = localStorage.getItem('qrcode');
  const patterns = [
    "url(\"data:image/svg+xml;charset=utf8,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='40' height='40' patternTransform='scale(SCALE) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='hsla(0,0%,0%,0)'/><path d='M0 0h10v20H0zM30 0v10H10V0zM10 10h10v20H10zM40 10v10H20V10zM20 20h10v20H20zM50 20v10H30V20zM30 30h10v20H30zM20 30v10H0V30zM10 20v10h-20V20zM30-10h10v20H30z'  stroke-width='1' stroke='hsla(0,0%,100%,.15)' fill='none'/></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(%23a)'/></svg>\")",
    "url(\"data:image/svg+xml;charset=utf8,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='20' height='20' patternTransform='scale(SCALE) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='hsla(0,0%,0%,0)'/><path d='M3.25 10h13.5M10 3.25v13.5'  stroke-linecap='square' stroke-width='1' stroke='hsla(0,0%,100%,.15)' fill='none'/></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(%23a)'/></svg>\")",
    "url(\"data:image/svg+xml;charset=utf8,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='40' height='40' patternTransform='scale(SCALE) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='hsla(0,0%,0%,0)'/><path d='M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5'  stroke-width='1' stroke='none' fill='hsla(0,0%,100%,.15)'/></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(%23a)'/></svg>\")",
    "url(\"data:image/svg+xml;charset=utf8,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='69.141' height='40' patternTransform='scale(SCALE) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='hsla(0,0%,0%,0)'/><path d='M69.212 40H46.118L34.57 20 46.118 0h23.094l11.547 20zM57.665 60H34.57L23.023 40 34.57 20h23.095l11.547 20zm0-40H34.57L23.023 0 34.57-20h23.095L69.212 0zM34.57 60H11.476L-.07 40l11.547-20h23.095l11.547 20zm0-40H11.476L-.07 0l11.547-20h23.095L46.118 0zM23.023 40H-.07l-11.547-20L-.07 0h23.094L34.57 20z'  stroke-width='1' stroke='hsla(0,0%,100%,.15)' fill='none'/></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(%23a)'/></svg>\")",
  ];
  randomPattern = Math.floor(Math.random() * patterns.length);
  let bgpattern = patterns[randomPattern];
  onMount(async () => {
    const { data } = await axios.get('https://test.swagger.print2block.in/account/user', {
      headers: {
        'x-access-token': token,
      },
    });
    issuerName = data.userData.name;
  });
</script>

<div class=" w-full lg:w-[38.5rem] rounded-md flex items-center  gap-1" style="background:{bgcolor}" in:fade={{ duration: 1000 }} out:fade={{ duration: 1000 }}>
  <div id="header_card" class="w-full flex flex-col px-4 py-4" style="background:{bgpattern}">
    <div class="flex gap-4">
      <img src={qr} alt="qrcode" class="w-20 h-20 rounded overflow-hidden lg:w-[100px] lg:h-[100px]" />
      <img src="/assets/sample.jpg" alt="qrcode" class="rounded overflow-hidden w-20 h-20 lg:w-[100px] lg:h-[100px]" />
    </div>
    <div class="pt-3">
      <h1 class="text-base font-medium tracking-wide text-white capitalize">{issuerName}</h1>
      <h1 class="text-xl font-bold font-mono text-white ">{id}</h1>
      <!-- <h1 class="text-base font-semibold text-white "><slot name="title" /></h1> -->
    </div>
  </div>
</div>
