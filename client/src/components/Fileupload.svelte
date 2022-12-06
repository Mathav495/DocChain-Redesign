<script>
  import Addfile from './Addfile.svelte';
  import HeaderFileupload from './header_fileupload.svelte';
  import axios from 'axios';
  import { createEventDispatcher } from 'svelte';
  import { navigate } from 'svelte-routing';
  const dispatch = createEventDispatcher();
  export let id;
  let dateexpired, issuer, doctype, signatory, token, docTitle, documentID, valid, date, sampleData, options, name;
  let error = {
    dateexpired: '',
    issuer: '',
    doctype: '',
    docTitle: '',
    signatory: '',
    msg: '',
  };

  console.log(id);

  token = localStorage.getItem('token');
  documentID = localStorage.getItem('documentID');

  let fileavailable = false;

  /**
   *dispatched data whether the file uploaded or not
   * @param e
   */
  const onavailable = (e) => {
    fileavailable = e.detail;
  };

  /**
   * Submitting document metadata and generating datahash
   */
  const onsubmitdata = async () => {
    console.log(dateexpired, issuer, signatory, docTitle, doctype);
    valid = true;
    if (dateexpired == undefined) {
      error.dateexpired = 'Fill the Expiry Date';
      valid = false;
    } else {
      date = new Date(dateexpired).toISOString();
      error.dateexpired = '';
    }
    if (issuer == undefined) {
      error.issuer = 'Fill the Issuer name';
      valid = false;
    } else {
      error.issuer = '';
    }
    if (doctype == undefined) {
      error.doctype = 'Fill the Document Type';
      valid = false;
    } else {
      error.doctype = '';
    }
    if (docTitle == undefined) {
      error.docTitle = 'Fill the Document Title';
      valid = false;
    } else {
      error.docTitle = '';
    }
    if (signatory == undefined) {
      error.signatory = 'Fill the Signatory name';
      valid = false;
    } else {
      error.signatory = '';
    }
    if (valid == true) {
      console.log('valid');
      sampleData = {
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
      options = {
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
      let metadata = data.metadata;
      console.log(metadata);

      // let name = data.metadata.receiver.name;
      // console.log(receiver);
      // let date = data.metadata.options.date;
      // console.log(date);
      dispatch('datahash', data.dataHash);
      localStorage.setItem('datahash', data.dataHash);
      let dataHash = localStorage.getItem('datahash');
      console.log('datahash', dataHash);
      if (fileavailable && data.dataHash) {
        error.msg = '';
        navigate('/preview');
      } else {
        error.msg = 'Check Whether the file is uploaded properly or not Otherwise give proper metadata';
      }
    }
  };
</script>

<div>
  <h1 class="text-xl font-bold tracking-wide">Choose Document</h1>

  <HeaderFileupload {id}>
    <h1 slot="title" class="pl-2 text-xl text-slate-900">{docTitle ? docTitle : 'No Title given'}</h1>
  </HeaderFileupload>

  <div class="flex gap-5 pt-4">
    <Addfile on:fileavailable={onavailable} {id} />

    <div class="rounded-lg bg-blue-100 h-auto w-1/2 p-4">
      <h1 class="text-base font-bold tracking-wide">Details about Document</h1>

      <form on:submit|preventDefault={onsubmitdata}>
        <div class="flex flex-col pt-5 space-y-3">
          <div class="flex flex-col w-full lg:w-4/5 space-y-1">
            <label for="issuer" class="text-sm text-slate-800 tracking-wide font-bold">Issued to</label>
            <input placeholder={error.issuer ? error.issuer : 'Enter issuer name'} bind:value={issuer} name="issuer" id="issuer" type="text" class={error.issuer ? 'input-error' : 'input-normal'} />
          </div>
          <div class="flex flex-col w-full lg:w-4/5 space-y-1">
            <label for="doctype" class="text-sm text-slate-800 tracking-wide font-bold">Document Type</label>
            <input placeholder={error.doctype ? error.doctype : 'Enter document type'} bind:value={doctype} type="text" class={error.doctype ? 'input-error' : 'input-normal'} name="doctype" id="doctype" />
          </div>
          <div class="flex flex-col w-full lg:w-4/5 space-y-1">
            <label for="signatory" class="text-sm text-slate-800 tracking-wide font-bold">Signatory</label>
            <input placeholder={error.signatory ? error.signatory : 'Enter signatory name'} name="signatory" bind:value={signatory} id="signatory" type="text" class={error.signatory ? 'input-error' : 'input-normal'} />
          </div>
          <div class="flex flex-col w-full lg:w-4/5 space-y-1">
            <label for="docid" class="text-sm text-slate-800 tracking-wide font-bold">Date Expired</label>
            <input bind:value={dateexpired} placeholder={error.dateexpired ? error.dateexpired : 'Enter expiry date'} type="text" onfocus="(this.type = 'date')" class={error.dateexpired ? 'input-error' : 'input-normal'} name="docid" id="docid" />
          </div>
          <div class="flex flex-col w-full lg:w-4/5 space-y-1">
            <label for="docTitle" class="text-sm text-slate-800 tracking-wide font-bold">Document Title</label>
            <input placeholder={error.docTitle ? error.docTitle : 'Enter document title'} bind:value={docTitle} type="text" class={error.docTitle ? 'input-error' : 'input-normal'} name="docTitle" id="docTitle" />
          </div>
        </div>
        <div class="w-full pt-6">
          <button class="w-4/5 lg:w-2/5 bg-blue-600 px-2 py-1 text-white font-semibold text-base tracking-wide rounded-full">Confirm and Preview</button>
        </div>
      </form>
    </div>
  </div>
</div>

<style lang="postcss">
  .input-normal {
    @apply w-full rounded-lg border-2 border-blue-500 bg-blue-200 p-1 pl-2 text-base font-bold placeholder:font-semibold  placeholder:text-slate-500  focus:outline-none;
  }
  .input-error {
    @apply w-full rounded-lg border-2 border-red-500 bg-blue-200 p-1 pl-2 text-base font-bold placeholder:font-semibold  placeholder:text-red-500  focus:outline-none;
  }
</style>
