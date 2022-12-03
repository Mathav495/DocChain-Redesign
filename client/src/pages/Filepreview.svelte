<script>
  import Header from '../components/Header.svelte';
  import Logo from '../components/Logo.svelte';
  import Logout from '../components/Logout.svelte';
  import Nav from '../components/Nav.svelte';
  import axios from 'axios';
  import { createEventDispatcher, onMount } from 'svelte';
  import { navigate } from 'svelte-routing';
  const dispatch = createEventDispatcher();

  let token = localStorage.getItem('token');
  let documentID = localStorage.getItem('documentID');
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
  // image.src = pdfurl;

  const pdf1 = new Object();
  pdf1.onload = function () {
    console.log(pdf1);
  };
  //testing image loading with appending child
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

  // getting signature Id from the user
  const getsignature = async () => {
    // const sample = {
    //   fileHash: fileHash,
    //   dataHash: dataHash,
    // };

    const { data } = await axios.get(`https://ecdsa.test.print2block.in/sign/5f52329ba0ae7d28650a9fe7${fileHash}${dataHash}`);
    console.log(data);
    dispatch('signature', data);
    localStorage.setItem('signature', data);
    let signature = localStorage.getItem('signature');
    console.log(signature);

    if (signature) {
      navigate('/sign');
    }
  };
</script>

<!-- <Modal {showModal} on:click={toggleModal} /> -->
<main>
  <div class="h-auto lg:h-screen relative lg:w-screen w-auto p-1 ">
    <div class="bg-black dash-bg-edge text-white h-full w-full">
      <div class="flex flex-row h-full py-3">
        <div class="md:w-4/12 lg:w-3/12 hidden  md-width py-5 md:flex flex-col items-center justify-between">
          <Logo />
          <div class="md:w-4/12 lg:w-3/12 hidden md-width py-5 md:flex flex-col items-center justify-between">
            <Nav />
          </div>
          <Logout />
        </div>
        <div class="width-2 bg-white text-gray-900 content-bg-edge p-8 mr-3 w-full ml-10">
          <Header />
          <section class="text-gray-600 relative">
            <!-- <div class="mt-5 text-2xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 font-bold">Document Preview</div> -->
            <div class="container py-10 mx-auto flex sm:flex-nowrap flex-wrap md:w-flex-col">
              <div class="lg:w-3/5 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10  flex w-full flex-col space-y-4 ml-10 lg:order-none lg:block ">
                <img class="w-full h-full rounded-md " src={imgurl} alt="" />
              </div>
              <div class="lg:w-2/5 md:w-1/2 bg-blue-300 flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0 p-5 rounded-md shadow-lg">
                <!-- <div class="h-2 w-full bg-gradient-to-r from-cyan-500 to-green-600"></div> -->
                <div class="flex mb-4">
                  <img class="h-24 w-24 overflow-hidden rounded object-cover object-center border-2 border-white" src={qr} alt="qrcode" />
                  <img class="h-24 w-24 ml-2 overflow-hidden rounded object-cover object-center border-2 border-white" src="/assets/logo.jpeg" alt="logo" />
                </div>
                <hr class="w-full mb-4" />

                <div class="relative mb-4">
                  <div for="name" class="leading-7 text-md font-bold text-gray-600 uppercase">Issuer</div>
                  <div type="text" id="name" name="name" class="w-full bg-white rounded border border-gray-300  text-sm text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">SIDBI (DEMO)</div>
                  <!-- <div type="text" id="name" name="name" class="w-full bg-white rounded border border-gray-300  text-sm text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">Name</div> -->
                </div>
                <div class="relative mb-4">
                  <div for="name" class="leading-7 text-md font-bold  text-gray-600">DATE PUBLISHED</div>
                  <div type="text" id="name" name="name" class="w-full bg-white rounded border border-gray-300  text-sm text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">Wed Aug 17 2022 22:49:04 GMT+0530 (India Standard Time)</div>
                  <!-- <div type="text" id="name" name="name" class="w-full bg-white rounded border border-gray-300  text-sm text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">Name</div> -->
                </div>
                <div class="relative mb-4">
                  <!-- <div for="name" class="leading-7 text-md text-gray-600">ISSUER</div> -->
                  <div for="name" class="leading-7 text-md font-bold  text-gray-600">DOCUMENT_ID</div>
                  <div type="text" id="name" name="name" class="w-full bg-white rounded border border-gray-300  text-sm text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">{documentID}</div>
                  <!-- <div type="text" id="name" name="name" class="w-full bg-white rounded border border-gray-300  text-sm text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">Name</div> -->
                </div>
                <div class="relative mb-4">
                  <div for="name" class="leading-7 text-md font-bold  text-gray-600">FILEHASH</div>
                  <div type="text" id="name" name="name" class="w-full bg-white rounded border border-gray-300  text-sm text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">{fileHash}</div>
                  <!-- <div type="text" id="name" name="name" class="w-full bg-white rounded border border-gray-300  text-sm text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">Name</div> -->
                </div>
                <div class="relative mb-4">
                  <div for="name" class="leading-7 text-md font-bold  text-gray-600 uppercase">datahash</div>
                  <div type="text" id="name" name="name" class="w-full bg-white rounded border border-gray-300  text-sm text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">{dataHash}</div>
                  <!-- <div type="text" id="name" name="name" class="w-full bg-white rounded border border-gray-300  text-sm text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">Name</div> -->
                </div>
                <div class="p-2 w-full">
                  <button class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg uppercase">publish</button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</main>
