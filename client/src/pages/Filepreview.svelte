<script>
  import Header from '../components/Header.svelte';
  import Logo from '../components/Logo.svelte';
  import Logout from '../components/Logout.svelte';
  import Nav from '../components/Nav.svelte';
  import axios from 'axios';
  import { navigate } from 'svelte-routing';
  import Previewpage from '../components/previewpage.svelte';

  let token = localStorage.getItem('token');
  let fileHash = localStorage.getItem('filehash');
  console.log('filehash', fileHash);
  let dataHash = localStorage.getItem('datahash');
  console.log('datahash', dataHash);
  let qr = localStorage.getItem('qrcode');
  console.log('qrcode', qr);
  let proposedURL = localStorage.getItem('docURL');
  console.log('qrcodocURL', proposedURL);
  let imgurl = localStorage.getItem('img');
  console.log('imgUrl', imgurl);

  const image = new Image();
  image.onload = function () {
    console.log(image.width);
  };
  image.src = qr;
  image.src = imgurl;

  const pdf1 = new Object();
  pdf1.onload = function () {
    console.log(pdf1);
  };
  //testing image loading with appendchild
  // document.body.appendChild(pdf1);
  let pdfurl = localStorage.getItem('pdf');
  console.log('pdfUrl', pdfurl);
  pdf1.src = pdfurl;

  /**
   * releasing document before publish
   */
  const releaseDoc = async () => {
    let documentID = localStorage.getItem('documentID');
    const { data } = await axios.get(`https://test.swagger.print2block.in/docs/release?documentID=${documentID}`, {
      headers: {
        'x-access-token': token,
      },
    });
    console.log(data);
    if (documentID && token) {
      navigate('/publish');
    }
  };
</script>

<main>
  <div class="h-auto lg:h-screen relative lg:w-screen w-auto p-1 ">
    <div class="bg-black dash-bg-edge text-white h-full w-full">
      <div class="flex flex-row h-full py-3">
        <div class="md:w-4/12 lg:w-3/12 hidden  md-width py-5 md:flex flex-col items-center justify-between">
          <Logo />
          <div class="py-14">
            <Nav />
          </div>
          <Logout />
        </div>
        <div class="md:w-8/12 lg:w-9/12 w-full bg-white text-gray-900 content-bg-edge p-8 ml-3 md:ml-0 mr-3">
          <div class="text-xl font-bold tracking-wide">Document Preview</div>
          <Previewpage />
        </div>
      </div>
    </div>
  </div>
</main>
