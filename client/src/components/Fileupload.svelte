<script>
  import HeaderFileupload from './header_fileupload.svelte';
  import axios from 'axios';
  import { createEventDispatcher } from 'svelte';
  import { navigate } from 'svelte-routing';
  import ErrorInfo from './ErrorInfo.svelte';
  const dispatch = createEventDispatcher();
  export let id;
  export let dateexpired, issuer, doctype, signatory, docTitle, valid, date, sampleData, options, errormsg, name;
  let displayerror = false;
  let error = {
    dateexpired: '',
    issuer: '',
    doctype: '',
    docTitle: '',
    signatory: '',
  };
  let token = localStorage.getItem('token');
  let documentID = localStorage.getItem('documentID');
  let bgcolor = localStorage.getItem('bgGradient');
  console.log('id get from the params', id);

  /**
   * Submitting document metadata and generating datahash
   */
  const onsubmitdata = async () => {
    console.log(dateexpired, issuer, signatory, docTitle, doctype);
    valid = true;
    if (dateexpired == undefined) {
      error.dateexpired = 'Fill the Expiry Date';
      setTimeout(() => {
        error.dateexpired = '';
      }, 3000);
      valid = false;
    } else {
      date = new Date(dateexpired).toISOString();
      error.dateexpired = '';
    }
    if (issuer == undefined) {
      error.issuer = 'Fill the Issuer name';
      setTimeout(() => {
        error.issuer = '';
      }, 3000);
      valid = false;
    } else {
      error.issuer = '';
    }
    if (doctype == undefined) {
      error.doctype = 'Fill the Document Type';
      setTimeout(() => {
        error.doctype = '';
      }, 3000);
      valid = false;
    } else {
      error.doctype = '';
    }
    if (docTitle == undefined) {
      error.docTitle = 'Fill the Document Title';
      setTimeout(() => {
        error.docTitle = '';
      }, 3000);
      valid = false;
    } else {
      error.docTitle = '';
    }
    if (signatory == undefined) {
      error.signatory = 'Fill the Signatory name';
      setTimeout(() => {
        error.signatory = '';
      }, 3000);
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
      console.log(metadata.receiver)
      console.log(metadata);
      // localStorage.setItem("issuer",data.issuer)
      if (data.dataHash) {
        let localdata = JSON.parse(localStorage.getItem('docDetails'));
        console.log('localdata', localdata);
        localdata.find((localdata) => {
          if (localdata.documentID == id) {
            console.log(localdata);
            console.log('same id', localdata.documentID);
            console.log('datahash', localdata.datahash);
            localdata.datahash = true;
            console.log(localdata);
          }
        });
        console.log(localdata, 'local');
        localStorage.setItem('docDetails', JSON.stringify(localdata));
      }
      dispatch('datahash', data.dataHash);
      localStorage.setItem('datahash', data.dataHash);
      let dataHash = localStorage.getItem('datahash');
      console.log('datahash', dataHash);
      if (data.dataHash) {
        errormsg = '';
        navigate('/preview');
      } else {
        if (data.error) {
          errormsg = data.errorCode;
          let arr = errormsg.split(':');
          errormsg = arr[2].replaceAll('_', ' ');
          displayerror = true;
          setTimeout(() => {
            displayerror = false;
          }, 3000);
        }
      }
    }
  };
</script>

<div class="space-y-3 flex flex-col justify-center items-center">
  <div class="w-full lg:w-1/2">
    <HeaderFileupload {id} {bgcolor}>
      <h1 slot="title" class="text-base text-white">{docTitle ? docTitle : 'Untitled Document'}</h1>
    </HeaderFileupload>
  </div>

  <div class="shadow-[0_0_8px_0_rgba(0,0,0,0.15)] rounded-lg bg-white  h-auto w-full lg:w-1/2 px-4 py-4">
    <form on:submit|preventDefault={onsubmitdata}>
      <div class="flex flex-col  space-y-5">
        <div class="flex flex-col w-full  space-y-2">
          <label for="issuer" class="text-sm text-black tracking-wide font-bold">Issued to</label>
          <input placeholder={error.issuer ? error.issuer : 'Enter issuer name'} bind:value={issuer} name="issuer" id="issuer" type="text" class={error.issuer ? 'input-error' : 'input-normal'} />
        </div>
        <div class="flex flex-col w-full  space-y-2">
          <label for="doctype" class="text-sm text-black tracking-wide font-bold">Document Type</label>
          <input placeholder={error.doctype ? error.doctype : 'Enter document type'} bind:value={doctype} type="text" class={error.doctype ? 'input-error' : 'input-normal'} name="doctype" id="doctype" />
        </div>
        <div class="flex flex-col w-full space-y-2">
          <label for="signatory" class="text-sm text-black tracking-wide font-bold">Signatory</label>
          <input placeholder={error.signatory ? error.signatory : 'Enter signatory name'} name="signatory" bind:value={signatory} id="signatory" type="text" class={error.signatory ? 'input-error' : 'input-normal'} />
        </div>
        <div class="flex flex-col w-full space-y-2">
          <label for="docid" class="text-sm text-black tracking-wide font-bold">Date Expired</label>
          <input bind:value={dateexpired} placeholder={error.dateexpired ? error.dateexpired : 'Enter expiry date'} type="text" onfocus="(this.type = 'date')" class={error.dateexpired ? 'input-error' : 'input-normal'} name="docid" id="docid" />
        </div>
        <div class="flex flex-col w-full space-y-2">
          <label for="docTitle" class="text-sm text-black tracking-wide font-bold">Document Title</label>
          <input placeholder={error.docTitle ? error.docTitle : 'Enter document title'} bind:value={docTitle} type="text" class={error.docTitle ? 'input-error' : 'input-normal'} name="docTitle" id="docTitle" />
        </div>
      </div>
      <div class="flex pt-5">
        <button class="border-2 hover:text-white border-green-500 text-green-500 hover:bg-green-500 rounded-md px-3 py-1 text-lg font-bold tracking-wide">Confirm and Preview</button>
      </div>
    </form>
  </div>

  {#if displayerror}
    <div class="mx-auto">
      <ErrorInfo {errormsg} on:click={() => (displayerror = false)} />
    </div>
  {/if}
</div>

<style lang="postcss">
  .input-normal {
    @apply h-9 w-full rounded-md border-2 border-slate-200  bg-white p-1 pl-2 text-base font-bold placeholder:font-semibold placeholder:text-slate-500  focus:outline-none focus:ring-2 focus:ring-slate-800;
  }
  .input-error {
    @apply h-9 w-full rounded-lg border-2 border-red-500 p-1 pl-2 text-base font-bold ring-1 ring-red-500 placeholder:font-semibold  placeholder:text-red-500  focus:outline-none;
  }
</style>
