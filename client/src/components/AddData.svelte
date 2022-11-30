<script>
  import axios from 'axios';
  import { createEventDispatcher } from 'svelte';
  import { navigate } from 'svelte-routing';
  const dispatch = createEventDispatcher();

  let dateexpired, issuer, doctype, docTitle, signatory, token, documentID;
  token = localStorage.getItem('token');
  documentID = localStorage.getItem('documentID');

  const onsubmitdata = async () => {
    console.log(dateexpired, issuer, signatory, docTitle, doctype);
    const date = new Date(dateexpired).toISOString();
    let sampleData = {
      receiver: {
        name: issuer,
      },
      document: {
        type: doctype,
      },
      issuer: {
        signatory: signatory,
      },
    };
    let options = {
      title: docTitle,
      expireOn: date,
    };
    console.log(documentID);
    const { data } = await axios.post(
      'https://test.swagger.print2block.in/docs/add-data',
      {
        documentID: documentID,
        metadata: sampleData,
        options: options,
      },
      {
        headers: {
          'x-access-token': token,
        },
      },
    );
    console.log(data);
    dispatch('datahash', data.dataHash);
    if (data.dataHash) {
      navigate('/preview');
    }
  };
</script>

<div class="flex flex-col mt-4 p-5 bg-green-100 rounded-lg w-full ">
  <div>
    <h1 class="text-lg text-slate-800 tracking-wide font-bold">Document Metadata</h1>
  </div>

  <form on:submit|preventDefault={onsubmitdata}>
    <div class="flex">
      <div class="flex flex-col mt-2 gap-2 w-1/2">
        <label for="docid" class="text-sm text-slate-800 tracking-wide font-bold">Date Expired</label>
        <input bind:value={dateexpired} type="date" class="input-dsn" name="docid" id="docid" />
      </div>
      <div class="flex flex-col mt-2 gap-2 w-1/2">
        <label for="issuer" class="text-sm text-slate-800 tracking-wide font-bold">Issued to</label>
        <input placeholder="Enter issuer name" name="issuer" id="issuer" bind:value={issuer} type="text" class="input-dsn" />
      </div>
    </div>

    <div class="flex">
      <div class="flex flex-col mt-2 gap-2 w-1/2">
        <label for="doctype" class="text-sm text-slate-800 tracking-wide font-bold">Document Type</label>
        <input placeholder="Enter document type" bind:value={doctype} type="text" class="input-dsn" name="doctype" id="doctype" />
      </div>
      <div class="flex flex-col mt-2 gap-2 w-1/2">
        <label for="signatory" class="text-sm text-slate-800 tracking-wide font-bold">Signatory</label>
        <input placeholder="Enter signatory name" name="signatory" id="signatory" bind:value={signatory} type="text" class="input-dsn" />
      </div>
    </div>

    <div class="flex">
      <div class="flex flex-col mt-2 gap-2 w-1/2">
        <label for="docTitle" class="text-sm text-slate-800 tracking-wide font-bold">Document Title</label>
        <input placeholder="Enter document title" bind:value={docTitle} type="text" class="input-dsn" name="docTitle" id="docTitle" />
      </div>
    </div>

    <div class="flex mt-4">
      <button class="px-4 py-1 rounded-full bg-emerald-500 font-bold text-base">Confirm and Preview</button>
    </div>
  </form>
</div>

<style lang="postcss">
  .input-dsn {
    @apply w-3/5  rounded-lg border-2 border-green-500 bg-green-200 p-1 text-base font-bold placeholder:font-medium placeholder:text-slate-500 focus:outline-none;
  }
</style>
