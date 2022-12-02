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
    const { data } = await axios.get(
      `https://test.swagger.print2block.in/docs/release?documentID=${documentID}`,
      {
        headers: {
          'x-access-token': token,
        },
      },
    );
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

    const { data } = await axios.get(`https://ecdsa.test.print2block.in/sign/5f52329ba0ae7d28650a9fe7${fileHash}${dataHash}`, );
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
          <div>
            <div class=" flex bg-transparent mx-auto ">
              <div class=" mx-auto flex items-center">
                <div>
                  <table class="text-md w-full text-white mt-10 bg-black  rounded-lg sm:w-auto sm:mx-auto">
                    <thead class="bg-transparent text-sm uppercase text-white bg-gray-200">
                      <tr>
                        <th scope="col" class="w-80 py-3 px-10 md:w-40 "> Name </th>
                        <th scope="col" class="w-32 py-3 px-6"> : </th>
                        <th scope="col" class="w-80 py-3 px-10 md:w-40"> John </th>
                      </tr>
                    </thead>
                    <thead class="bg-transparent text-sm uppercase text-white bg-gray-200">
                      <tr>
                        <th scope="col" class="w-80 py-3 px-10"> Type </th>
                        <th scope="col" class="w-32 py-3 px-6"> : </th>

                        <th scope="col" class="w-80 py-3 px-10 "> Sample </th>
                      </tr>
                    </thead>
                  </table>
                  <div class="flex justify-center mt-5">
                    {#if (image.src = imgurl)}
                      <img src={imgurl} alt="document" class="relative mx-auto mt-10 h-[300px] w-[350px] rounded-md shadow-2xl" />
                    {:else if (pdf1.src = pdfurl)}
                      <iframe title="pdf" class="relative mx-auto mt-10 h-[300px] w-[350px] rounded-md shadow-2xl" type="application/pdf" id="document" src={pdfurl} alt="Preview" />
                    {/if}
                    <img class="absolute ml-72 h-10 w-10 mt-12 border-2 border-blue-400  rounded-lg" src={qr} alt="qrcode" id="qrcode" />
                  </div>
                  <div class="flex mx-auto justify-center mt-5 text-lg font-bold text-indigo-800 underline items-center">Document ProposedURL :</div>
                  <div class="flex mx-auto text-lg justify-center mt-2 text-blue-800 items-center text-center sm:flex-wrap underline">{proposedURL}</div>

                  <div class="mx-auto mt-10 flex justify-between">
                    <button class="rounded-lg bg-black hover:bg-teal-900 px-6 py-2 text-lg text-white" on:click={getsignature}>get-sign</button>

                    <button class="rounded-lg bg-black px-6 py-2 text-lg  hover:bg-teal-900 text-white" on:click={releaseDoc}>release</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>
