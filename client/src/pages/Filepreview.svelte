<script>
  import axios from 'axios';
  import { createEventDispatcher, onMount } from 'svelte';
  import Modal from '../components/Modal.svelte';
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

  /**
   * getting filedetails to publish
   * this route used to get the filehash which is used
   */
  onMount(async () => {
    const data = {
      documentID: documentID,
      signature: signature,
    };
    const { addfile } = await axios.post('https://test.swagger.print2block.in/docs/add-file', data);
    console.log(addfile);
    localStorage.setItem('filehash', addfile.fileHash);
    let fileHash = localStorage.getItem('filehash');
    console.log(fileHash);
  });

  // getting signature Id from the user
  const getsignature = async () => {
    const hash = {
      fileHash: fileHash,
      dataHash: dataHash,
    };
    const { sign } = await axios.post('https://localhost:8080/sign/<fileHash><dataHash>', hash);
    console.log(sign);
    localStorage.setItem('signature', sign.signature);
    let signature = localStorage.getItem('signature');
    console.log(signature);
  };

  // publishing documents
  const publishdoc = async () => {
    if (signature == null) {
      error = "signature can't be empty";
      console.log(error);
    } else {
      const sample = {
        documentID: documentID,
        signature: signature,
      };
      const { data } = await axios.post('https://test.swagger.print2block.in/docs/publish', sample);
      console.log(data);

      let getData = {
        docID: data.documentID,
        sign: data.signature,
        // filehash: data.filehash,
      };
      localStorage.setItem('dataKey', JSON.stringify(getData));
      let doc = localStorage.getItem('dataKey');
      console.log(doc);

      dispatch('push', data);
      // element.classList.add("hidden");
      // let element2 = document.getElementById("Preview");
      // element2.classList.remove("hidden");
      console.log(element);
    }
  };
</script>

<Modal {showModal} on:click={toggleModal} />
<main>
  <div class=" flex h-screen w-screen bg-transparent">
    <div class=" mx-auto flex items-center md:flex-row">
      <div class="overflow-x-auto">
        <table class="text-md w-full text-left text-gray-500">
          <thead class="bg-transparent text-base uppercase text-gray-300 ">
            <tr>
              <th scope="col" class="w-80 py-3 px-10 md:w-40"> Name </th>
              <th scope="col" class="w-32 py-3 px-6"> : </th>
              <th scope="col" class="w-80 py-3 px-10 md:w-40"> John </th>
            </tr>
          </thead>
          <thead class="bg-transparent text-base uppercase text-gray-300 ">
            <tr>
              <th scope="col" class="w-80 py-3 px-10"> Type </th>
              <th scope="col" class="w-32 py-3 px-6"> : </th>

              <th scope="col" class="w-80 py-3 px-10 "> Sample </th>
            </tr>
          </thead>
        </table>
        <div class="mt-5 flex justify-center">
          <img src={file} alt="document" class="relative mx-auto mt-10 h-[400px] w-[320px] rounded-md " />
          <img class="absolute ml-40 h-16 w-16  rounded-lg" src={qrcode} alt="qrcode" />
        </div>

        <div class="mx-auto mt-10 flex-col items-center justify-center text-center ">
          <label for="signature" class="text-md block font-medium text-gray-500 ">signature</label>
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
          <button class="rounded-lg bg-teal-500 px-6 py-2 text-lg text-white" on:submit={getsignature} on:click={toggleModal}>get-sign</button>
          <button
            href="/blockchain"
            on:click={publishdoc}
            class="rounded-lg bg-teal-500 px-6 py-2 text-lg 
                text-white disabled:cursor-not-allowed disabled:bg-teal-200"
          >
            publish to blockchain
          </button>

          <button class="rounded-lg bg-teal-500 px-6 py-2 text-lg text-white" href="/user/publish">revoke</button>
        </div>
      </div>
    </div>
  </div>
</main>
