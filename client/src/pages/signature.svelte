<script>
  import axios from 'axios';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  let token = localStorage.getItem('token');

  let signature = localStorage.getItem('signature');
  console.log(signature);
  let documentID = localStorage.getItem('documentID');
  console.log('documentID', documentID);

  let error = '';
  // publishing documents
  const publishdoc = async () => {
    let signature = localStorage.getItem('signature');
  console.log('signature',signature);
  let documentID = localStorage.getItem('documentID');
  console.log('documentID', documentID);

    if (signature == null) {
      error = "signature can't be empty";
      console.log(error);
    } else {
    
      const { data } = await axios.post('https://test.swagger.print2block.in/docs/publish',
        {
        documentID: documentID,
        signature: signature,
      },
      {
        headers: {
          'x-access-token': token,
        },
      });
      console.log(data);
      dispatch('push', data);
    }
  };
</script>

<form on:submit={publishdoc}>
  <div class="mx-auto mt-1 flex-col items-center justify-center text-center ">
    <label for="signature" class="text-md block font-medium text-gray-500 ">DocumentID:</label>
    <div class="mt-1">
      <textarea
        name="docID"
        bind:value={documentID}
        class=" mt-5 w-full rounded-md border-2 
         border-gray-300 px-4 py-2
           placeholder:text-lg 
             focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        placeholder="documentID"
      />
    </div>

    <label for="signature" class="text-md block font-medium text-gray-500 ">signature:</label>
    <!-- <div class="w-full px-4 py-4 mt-1 ml-1 text-gray-900 font-bold text-xs  border-2 rounded-lg text-center flex-wrap flex-1" on:input={signature}>{value.signature}</div> -->
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
  <button
    on:click|preventDefault={publishdoc}
    class="rounded-lg bg-teal-500 px-6 py-2 text-lg 
    text-white disabled:cursor-not-allowed disabled:bg-teal-200"
  >
    publish to blockchain
  </button>
</form>
