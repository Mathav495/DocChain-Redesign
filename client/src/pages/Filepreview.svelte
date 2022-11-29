<script>
  import Header from '../components/Header.svelte';
  import Logo from '../components/logo.svelte';
  import Logout from '../components/logout.svelte';
  import Nav from '../components/Nav.svelte';
  import axios from 'axios';
  import { createEventDispatcher, onMount } from 'svelte';
  import Modal from '../components/Modal.svelte';
  import { navigate } from 'svelte-routing';
  const dispatch = createEventDispatcher();
  let signature,
    error = '',
    value = '';

  let showModal = false;
  const toggleModal = () => {
    showModal = !showModal;
  };


  let token = localStorage.getItem('token');
  let documentID = localStorage.getItem('documentID');
  let fileHash = localStorage.getItem('filehash');
  console.log('filehash', fileHash);  
  let dataHash = localStorage.getItem('datahash');
  console.log('datahash', dataHash);

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
          'x-access-token': token,
        },
      },
    );
    console.log(data);
    if (documentID && Token) {
      navigate('/publish');
    }
  };

  // getting signature Id from the user
  const getsignature = async () => {
    let showModal = true;
    const sample = {
      fileHash: fileHash,
      dataHash: dataHash,
    };

    const { data } = await axios.get(`https://ecdsa.test.print2block.in/sign/${fileHash}+${dataHash}`, sample, {
      headers: {
        'x-access-token': token,
      },
    });
    console.log(data);
    dispatch('signature', data);
    showModal = false;
    localStorage.setItem('signature', data);
    let signature = localStorage.getItem('signature');
    console.log(signature);
    if(signature) {
      navigate("/sign")
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
                    <thead class="bg-transparent text-sm uppercase text-gray-500 ">
                      <tr>
                        <th scope="col" class="w-80 py-3 px-10 md:w-40"> Name </th>
                        <th scope="col" class="w-32 py-3 px-6"> : </th>
                        <th scope="col" class="w-80 py-3 px-10 md:w-40"> John </th>
                      </tr>
                    </thead>
                    <thead class="bg-transparent text-sm uppercase text-gray-500 ">
                      <tr>
                        <th scope="col" class="w-80 py-3 px-10"> Type </th>
                        <th scope="col" class="w-32 py-3 px-6"> : </th>

                        <th scope="col" class="w-80 py-3 px-10 "> Sample </th>
                      </tr>
                    </thead>
                  </table>
                  <div class="flex justify-center">
                    <img src="https://th.bing.com/th/id/OIP._jpRnHasO03ZqTHB-S77ewHaFC?pid=ImgDet&rs=1" alt="document" class="relative mx-auto mt-10 h-[200px] w-[300px] rounded-md " />
                    <img class="absolute ml-40 h-16 w-16  rounded-lg" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png" alt="qrcode" />
                  </div>
                 

                  <div class="mx-auto mt-10 flex justify-between">
                    <button class="rounded-lg bg-teal-500 px-6 py-2 text-lg text-white" on:click={getsignature}>get-sign</button>
                  

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
