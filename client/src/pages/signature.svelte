<script>
  import Header from '../components/Header.svelte';
  import Logo from '../components/Logo.svelte';
  import Logout from '../components/Logout.svelte';
  import Nav from '../components/Nav.svelte';
  import axios from 'axios';
  import { createEventDispatcher } from 'svelte';
  import { navigate } from 'svelte-routing';
  const dispatch = createEventDispatcher();
  let animate = document.querySelector('#particles-js');
  console.log(animate);
  animate.style.display = 'none';
  let token = localStorage.getItem('token');

  let signature = localStorage.getItem('signature');
  console.log(signature);
  let documentID = localStorage.getItem('documentID');
  console.log('documentID', documentID);

  let error = '';
  let action = "Add to Queue"
  // publishing documents
  const publishdoc = async () => {
    let signature = localStorage.getItem('signature');
    console.log('signature', signature);
    let documentID = localStorage.getItem('documentID');
    console.log('documentID', documentID);
    const { data } = await axios.post(
      'https://test.swagger.print2block.in/docs/publish',
      {
        documentID: documentID,
        signature: signature,
      },
      {
        headers: {
          'x-access-token': token,
        },
      },
    );
    console.log(data);
    console.log(data.state);
    dispatch('push', data);
  if(data.state) {
    action = "Publish"
    // navigate("/block")
  }
  };

  //revoking route
  const revoke = async () => {
    let signature = localStorage.getItem('signature');
    console.log('signature', signature);
    let documentID = localStorage.getItem('documentID');
    console.log('documentID', documentID);
    const { data } = await axios.post(
      'https://test.swagger.print2block.in/docs/revoke',
      {
        documentID: documentID,
        signature: signature,
      },
      {
        headers: {
          'x-access-token': token,
        },
      },
    );
    console.log(data);
    dispatch('push', data);
    localStorage.setItem('revID', data.txidRevoked);
    let revID = localStorage.getItem('revID');
    console.log(revID);
  };
</script>

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
          <div class="mx-auto text-2xl text-teal-800 font-bold text-center mt-10 underline">Publish to BlockChain:</div>
          <form on:submit={publishdoc} class="lg:w-2/3 mx-auto flex-col justify-center md:w-full mt-10">
            <div class="mx-auto mt-1 flex-col items-center justify-center text-center ">
              <label for="signature" class="text-md block text-xl mt-5 font-bold text-gray-500 ">DocumentID:</label>
              <div class="mt-1 shadow-lg">
                <textarea
                  name="docID"
                  bind:value={documentID}
                  class=" mt-2 w-full flex rounded-md border-2 
         border-gray-300 px-4 py-2 bg-black text-white
           placeholder:text-lg placeholder:text-center text-center text-lg
             focus:border-indigo-500 focus:ring-indigo-500 sm:text-md"
                  placeholder="documentID"
                />
              </div>

              <label for="signature" class="text-xl mt-2 block font-bold text-gray-500 ">SignatureID:</label>
              <!-- <div class="w-full px-4 py-4 mt-1 ml-1 text-gray-900 font-bold text-xs  border-2 rounded-lg text-center flex-wrap flex-1" on:input={signature}>{value.signature}</div> -->
              <div class="mt-1 shadow-lg">
                <textarea
                  name="signature"
                  bind:value={signature}
                  class="mt-2  w-full rounded-md border-2 
         border-gray-300 px-4 py-1 bg-black text-white text-lg
           placeholder:text-lg text-center
             focus:border-indigo-500  focus:ring-indigo-500"
                  placeholder="ECDSA Signature obtained"
                />
              </div>
            </div>
            <h1 class="text-md font-semibold text-rose-500">{error}</h1>
            <div class="flex justify-between mx-auto mt-5">
              <a on:click|preventDefault={publishdoc} class="rounded-lg bg-black px-6 py-2  text-lg text-white disabled:cursor-not-allowed disabled:bg-teal-200 hover:bg-teal-900" href="/block"> {action} </a>
              <button on:click|preventDefault={revoke} class="rounded-lg bg-black px-6 py-2  text-lg text-white disabled:cursor-not-allowed disabled:bg-teal-200 hover:bg-teal-900"> Revoke </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
