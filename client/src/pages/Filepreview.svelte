<script>
  import Header from '../components/Header.svelte';
  import Logo from '../components/logo.svelte';
  import Logout from '../components/logout.svelte';
  import Nav from '../components/Nav.svelte';
  import axios from 'axios';
  import { createEventDispatcher, onMount } from 'svelte';
  // import Modal from '../components/Modal.svelte';
  import { navigate } from 'svelte-routing';
  const dispatch = createEventDispatcher();
  let signature,
    error = '';

  let showModal = false;
  const toggleModal = () => {
    showModal = !showModal;
  };

  let Token = localStorage.getItem('token');
  console.log('token', Token);
  let dataHash = localStorage.getItem('datahash');
  console.log('datahash', dataHash);
  let documentID = localStorage.getItem('documentID');
  console.log('documentID', documentID);
  let fileHash = localStorage.getItem('filehash');
  console.log('filehash', fileHash);

  /**
   * getting filedetails to publish
   * this route used to get the filehash which is used
   */
  // onMount(async () => {
  //   const data = {
  //     documentID: documentID,
  //     signature: signature,
  //   };
  //   const { addfile } = await axios.post('https://test.swagger.print2block.in/docs/add-file', data);
  //   console.log(addfile);
  //   localStorage.setItem('filehash', addfile.fileHash);
  //   let fileHash = localStorage.getItem('filehash');
  //   console.log(fileHash);
  // });

  /**
   * releasing document before publish
   */
  const releaseDoc = async () => {
    console.log(documentID);
    const { data } = await axios.get(
      'https://test.swagger.print2block.in/docs/release?documentID=6384876242d47d79c84d36d3',
      {
        documentID: documentID,
      },
      {
        headers: {
          'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZTU4MWUyYWFlYWNmZjYzOTlkYjYxZSIsImlhdCI6MTY2OTYyNDI0NywiZXhwIjoxNjY5NzEwNjQ3fQ.VOxlCAFaTy7mGfjGIrZ62-u53Ycq7Y5GCFF1_xlJf2s',
        },
      },
    );
    console.log(data);
    if (documentID && Token) {
      navigate('/publish');
    }
  };

  // let port = "17100";
  // let localhost = '198.168.1.2';

  // getting signature Id from the user
  const getsignature = async () => {
    const sample = {
      fileHash: fileHash,
      dataHash: dataHash,
    };

    const { data } = await axios.get(`https://ecdsa.test.print2block.in/sign/${fileHash}+${dataHash}`, sample, {
      headers: {
        'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZTU4MWUyYWFlYWNmZjYzOTlkYjYxZSIsImlhdCI6MTY2OTYyNDI0NywiZXhwIjoxNjY5NzEwNjQ3fQ.VOxlCAFaTy7mGfjGIrZ62-u53Ycq7Y5GCFF1_xlJf2s',
      },
    });
    //   console.log(data);
    // localStorage.setItem("sign", data.signature)
    //     signature = localStorage.getItem("sign")
    //     console.log(signature)
    console.log(data);
    dispatch('signature', data);
    localStorage.setItem('signature', data);
    let signature = localStorage.getItem('signature');
    console.log(signature);
  };

  // publishing documents
  const publishdoc = async () => {
    let signature = localStorage.getItem('signature');
    console.log(signature);
    let documentID = localStorage.getItem('documentID');
    console.log('documentID', documentID);
    if (signature == null) {
      error = "signature can't be empty";
      console.log(error);
    } else {
      const sample = {
        documentID: documentID,
        signature: signature,
      };
      const { data } = await axios.post('https://test.swagger.print2block.in/docs/publish', sample, {
        headers: {
          'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZTU4MWUyYWFlYWNmZjYzOTlkYjYxZSIsImlhdCI6MTY2OTYyNDI0NywiZXhwIjoxNjY5NzEwNjQ3fQ.VOxlCAFaTy7mGfjGIrZ62-u53Ycq7Y5GCFF1_xlJf2s',
        },
      });
      console.log(data);
      dispatch('push', data);
      // element.classList.add("hidden");
      // let element2 = document.getElementById("Preview");
      // element2.classList.remove("hidden");
      // console.log(element);
    }
  };
</script>

<!-- <Modal {showModal} on:click={toggleModal} /> -->

<main>
  <div class="h-screen w-screen p-1">
    <div class="bg-black dash-bg-edge text-white h-full w-full">
      <div class="flex flex-row h-full py-3">
        <div class="width-1 py-5 flex flex-col items-center">
          <Logo />
          <div class="py-14">
            <Nav />
          </div>
          <Logout />
        </div>
        <div class="width-2 bg-white text-gray-900 content-bg-edge p-8 mr-3">
          <Header />
          <div>
            <div class=" flex w-full bg-transparent">
              <div class=" mx-auto flex items-center md:flex-row">
                <div class="overflow-x-auto">
                  <table class="text-md w-full text-left text-gray-500">
                    <thead class="bg-transparent text-sm uppercase text-gray-300 ">
                      <tr>
                        <th scope="col" class="w-80 py-3 px-10 md:w-40"> Name </th>
                        <th scope="col" class="w-32 py-3 px-6"> : </th>
                        <th scope="col" class="w-80 py-3 px-10 md:w-40"> John </th>
                      </tr>
                    </thead>
                    <thead class="bg-transparent text-md uppercase text-gray-300 ">
                      <tr>
                        <th scope="col" class="w-80 py-3 px-10"> Type </th>
                        <th scope="col" class="w-32 py-3 px-6"> : </th>

                        <th scope="col" class="w-80 py-3 px-10 "> Sample </th>
                      </tr>
                    </thead>
                  </table>
                  <div class="flex justify-center">
                    <img src="https://openclipart.org/image/2400px/svg_to_png/227926/Document-Icon.png" alt="document" class="relative mx-auto mt-10 h-[200px] w-[300px] rounded-md " />
                    <img class="absolute ml-40 h-16 w-16  rounded-lg" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png" alt="qrcode" />
                  </div>

                  <div class="mx-auto mt-1 flex-col items-center justify-center text-center ">
                    <label for="signature" class="text-md block font-medium text-gray-500 ">signature:</label>
                    <!-- <div  bind:value={signature}> </div> -->
                    <div class="mt-1">
                      <textarea
                        name="signature"
                        bind:value={signature}
                        class=" mt-5 w-full rounded-md border-2 
                         border-gray-300 px-4 py-2
                           placeholder:text-lg 
                             focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="ECDSA Signature obtained"
                      />
                    </div>
                  </div>
                  <h1 class="text-md font-semibold text-rose-500">{error}</h1>

                  <div class="mx-auto mt-10 flex justify-between">
                    <button class="rounded-lg bg-teal-500 px-6 py-2 text-lg text-white" on:click={getsignature}>get-sign</button>
                    <button
                      href="/blockchain"
                      on:click={publishdoc}
                      class="rounded-lg bg-teal-500 px-6 py-2 text-lg 
                          text-white disabled:cursor-not-allowed disabled:bg-teal-200"
                    >
                      publish to blockchain
                    </button>

                    <button class="rounded-lg bg-teal-500 px-6 py-2 text-lg text-white" on:click={releaseDoc}>release</button>
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
