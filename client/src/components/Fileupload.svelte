<script>
  import HeaderFileupload from './header_fileupload.svelte';
  import axios from 'axios';
  import { createEventDispatcher } from 'svelte';
  import { navigate } from 'svelte-routing';
  import ErrorInfo from './ErrorInfo.svelte';
  const dispatch = createEventDispatcher();
  export let id;
  let dateexpired = '';
  let issuer = '';
  let doctype = '';
  let signatory = '';
  let docTitle = '';
  let valid, date, sampleData, options, errormsg;
  let receiver = [
    {
      label: 1,
      labelName: 'Fieldname',
      inputvalue: '',
    },
  ];
  let documentDetails = [
    {
      label: 1,
      labelName: 'Fieldname',
      inputvalue: '',
    },
  ];
  let signatoryDetails = [
    {
      label: 1,
      labelName: 'Fieldname',
      inputvalue: '',
    },
  ];
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
    if (dateexpired) {
      console.log(dateexpired);
      let currentDate = new Date().getTime();
      console.log(currentDate);
      let expireDate = new Date(dateexpired).getTime();
      console.log(expireDate);
      if (currentDate > expireDate) {
        document.querySelector('#docdate').type = 'text';
        dateexpired = '';
        error.dateexpired = 'Choose the valid date';
        setTimeout(() => {
          error.dateexpired = '';
        }, 3000);
        valid = false;
      } else {
        error.dateexpired = '';
        date = new Date(dateexpired).toISOString();
        console.log(date);
      }
    } else {
      error.dateexpired = '';
    }
    if (issuer == '') {
      error.issuer = 'Fill the Issuer name';
      setTimeout(() => {
        error.issuer = '';
      }, 3000);
      valid = false;
    } else {
      error.issuer = '';
    }
    if (doctype == '') {
      error.doctype = 'Fill the Document Type';
      setTimeout(() => {
        error.doctype = '';
      }, 3000);
      valid = false;
    } else {
      error.doctype = '';
    }
    if (signatory == '') {
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

      //receiver data
      receiver = receiver.filter((receiver) => receiver.labelName != 'Fieldname' && receiver.inputvalue != '');
      console.log(receiver);
      console.log(receiver.length);
      let rec_obj = new Object();
      rec_obj.name = issuer;
      for (let i = 0; i < receiver.length; i++) {
        rec_obj[receiver[i].labelName] = receiver[i].inputvalue;
      }
      console.log(rec_obj);

      sampleData = {
        receiver: rec_obj,
        document: {
          type: doctype,
        },
        issuer: {
          signatory: signatory,
        },
      };

      if (date) {
        if (docTitle) {
          options = {
            title: docTitle,
            expireOn: date,
          };
        } else {
          options = {
            expireOn: date,
          };
        }
      } else {
        if (docTitle) {
          options = {
            title: docTitle,
          };
        } else {
          options = {};
        }
      }

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
      // let metadata = data.metadata;
      window.localStorage.setItem('metadata', JSON.stringify(data.metadata));
      let metadata = JSON.parse(window.localStorage.getItem('metadata'));
      console.log(metadata);

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
        navigate(`/publish/${id}`);
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
  const updateLabel_receiver = (value) => {
    let initial_value = value;
    let increment_value = value + 1;
    console.log(value);
    console.log(receiver);
    let nextData = {
      label: increment_value,
      labelName: 'Fieldname',
    };
    receiver = [...receiver, nextData];
    console.log(receiver);
    let temp = document.getElementById(initial_value);
    console.log(temp);
    temp.classList.add('flex');
    temp.classList.remove('hidden');
    let temp2 = document.getElementById(`a${initial_value}`);
    console.log(temp2);
    temp2.classList.remove('flex');
    temp2.classList.add('hidden');
  };

  const hideLabel_receiver = (value) => {
    console.log(value);
    let temp = document.getElementById(value);
    console.log(temp);
    temp.classList.add('hidden');
    let temp2 = document.getElementById(`a${value}`);
    console.log(temp2);
    temp2.classList.add('flex');
    temp2.classList.remove('hidden');
  };

  const hideLabel_docDetails = (value) => {
    console.log(value);
    let temp = document.getElementById(`b${value}`);
    console.log(temp);
    temp.classList.add('hidden');
    let temp2 = document.getElementById(`c${value}`);
    console.log(temp2);
    temp2.classList.add('flex');
    temp2.classList.remove('hidden');
  };

  const updateLabel_docDetails = (value) => {
    let initial_value = value;
    let increment_value = value + 1;
    console.log(value);
    console.log(documentDetails);
    let nextData = {
      label: increment_value,
      labelName: 'Fieldname',
    };
    documentDetails = [...documentDetails, nextData];
    console.log(documentDetails);
    let temp = document.getElementById(`b${initial_value}`);
    console.log(temp);
    temp.classList.add('flex');
    temp.classList.remove('hidden');
    let temp2 = document.getElementById(`c${initial_value}`);
    console.log(temp2);
    temp2.classList.remove('flex');
    temp2.classList.add('hidden');
  };

  const hideLabel_signDetails = (value) => {
    console.log(value);
    let temp = document.getElementById(`d${value}`);
    console.log(temp);
    temp.classList.add('hidden');
    let temp2 = document.getElementById(`e${value}`);
    console.log(temp2);
    temp2.classList.add('flex');
    temp2.classList.remove('hidden');
  };

  const updateLabel_signDetails = (value) => {
    let initial_value = value;
    let increment_value = value + 1;
    console.log(value);
    console.log(signatoryDetails);
    let nextData = {
      label: increment_value,
      labelName: 'Fieldname',
    };
    signatoryDetails = [...signatoryDetails, nextData];
    console.log(signatoryDetails);
    let temp = document.getElementById(`d${initial_value}`);
    console.log(temp);
    temp.classList.add('flex');
    temp.classList.remove('hidden');
    let temp2 = document.getElementById(`e${initial_value}`);
    console.log(temp2);
    temp2.classList.remove('flex');
    temp2.classList.add('hidden');
  };
</script>

<div class="space-y-3 flex flex-col justify-center items-center">
  <div class="w-full lg:w-1/2">
    <HeaderFileupload {id} {bgcolor}>
      <h1 slot="title" class="text-base text-white">{docTitle ? docTitle : 'Untitled Document'}</h1>
    </HeaderFileupload>
  </div>

  <div class="shadow-[0_0_8px_0_rgba(0,0,0,0.15)] rounded-lg bg-white  h-auto w-full lg:w-1/2 p-4">
    <form on:submit|preventDefault={onsubmitdata}>
      <div class="flex flex-col  space-y-5">
        <div class="flex flex-col w-full pb-5 border-b-2 space-y-3">
          <div>
            <h1 class="text-base tracking-wide font-bold ">Receiver Details</h1>
          </div>
          <div class="flex flex-col w-full  space-y-2">
            <label for="issuer" class="after:content-['*'] after:ml-1 after:text-red-500 text-sm text-black tracking-wide font-bold">Issued to</label>
            <input placeholder={error.issuer ? error.issuer : 'Enter issuer name'} bind:value={issuer} name="issuer" id="issuer" type="text" class={error.issuer ? 'input-error' : 'input-normal'} />
          </div>

          {#each receiver as receiver}
            <div class="flex flex-col w-full  space-y-2">
              <div class="flex">
                <div class="flex" id={receiver.label}>
                  <label for="label{receiver.label}" class=" text-sm text-black tracking-wide font-bold inline-flex items-center gap-1"
                    >{receiver.labelName}

                    <svg on:click={() => hideLabel_receiver(receiver.label)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="cursor-pointer w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                  </label>
                </div>
                <div class="hidden items-center gap-2" id="a{receiver.label}">
                  <input placeholder="Enter Field name" bind:value={receiver.labelName} type="text" class="field-input" />
                  <svg on:click={() => updateLabel_receiver(receiver.label)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="cursor-pointer w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <input name="label{receiver.label}" bind:value={receiver.inputvalue} id="label{receiver.label}" type="text" class="input-normal" />
              </div>
            </div>
          {/each}
        </div>

        <div class="flex flex-col w-full pb-5 border-b-2 space-y-3">
          <div>
            <h1 class="text-base tracking-wide font-bold ">Document Details</h1>
          </div>

          <div class="flex flex-col w-full  space-y-2">
            <label for="doctype" class="after:content-['*'] after:ml-1 after:text-red-500 text-sm text-black tracking-wide font-bold">Document Type</label>
            <input placeholder={error.doctype ? error.doctype : 'Enter document type'} bind:value={doctype} type="text" class={error.doctype ? 'input-error' : 'input-normal'} name="doctype" id="doctype" />
          </div>

          {#each documentDetails as docDetails}
            <div class="flex flex-col w-full  space-y-2">
              <div class="flex">
                <div class="flex" id="b{docDetails.label}">
                  <label for="doclabel{docDetails.label}" class=" text-sm text-black tracking-wide font-bold inline-flex items-center gap-1"
                    >{docDetails.labelName}
                    <svg on:click={() => hideLabel_docDetails(docDetails.label)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="cursor-pointer w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                  </label>
                </div>
                <div class="hidden items-center gap-2" id="c{docDetails.label}">
                  <input placeholder="Enter Field name" bind:value={docDetails.labelName} type="text" class="field-input" />
                  <svg on:click={() => updateLabel_docDetails(docDetails.label)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="cursor-pointer w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <input name="doclabel{docDetails.label}" bind:value={docDetails.inputvalue} id="doclabel{docDetails.label}" type="text" class="input-normal" />
              </div>
            </div>
          {/each}
        </div>

        <div class="flex flex-col w-full pb-5 border-b-2 space-y-3">
          <div>
            <h1 class="text-base tracking-wide font-bold ">Signatory Details</h1>
          </div>
          <div class="flex flex-col w-full space-y-2">
            <label for="signatory" class="after:content-['*'] after:ml-1 after:text-red-500 text-sm text-black tracking-wide font-bold">Signatory</label>
            <input placeholder={error.signatory ? error.signatory : 'Enter signatory name'} name="signatory" bind:value={signatory} id="signatory" type="text" class={error.signatory ? 'input-error' : 'input-normal'} />
          </div>

          {#each signatoryDetails as signDetails}
            <div class="flex flex-col w-full  space-y-2">
              <div class="flex">
                <div class="flex" id="d{signDetails.label}">
                  <label for="signlabel{signDetails.label}" class=" text-sm text-black tracking-wide font-bold inline-flex items-center gap-1"
                    >{signDetails.labelName}

                    <svg on:click={() => hideLabel_signDetails(signDetails.label)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="cursor-pointer w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                  </label>
                </div>
                <div class="hidden items-center gap-2" id="e{signDetails.label}">
                  <input placeholder="Enter Field name" bind:value={signDetails.labelName} type="text" class="field-input" />
                  <svg on:click={() => updateLabel_signDetails(signDetails.label)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="cursor-pointer w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <input name="signlabel{signDetails.label}" id="signlabel{signDetails.label}" bind:value={signDetails.inputvalue} type="text" class="input-normal" />
              </div>
            </div>
          {/each}
        </div>

        <div class="flex flex-col w-full  space-y-3">
          <div>
            <h1 class="text-base tracking-wide font-bold ">Optional Details</h1>
          </div>
          <div class="flex flex-col w-full space-y-2">
            <label for="docid" class="text-sm text-black tracking-wide font-bold">Date Expired</label>
            <input bind:value={dateexpired} placeholder={error.dateexpired ? error.dateexpired : 'Enter expiry date'} type="text" onfocus="(this.type = 'date')" class={error.dateexpired ? 'input-error' : 'input-normal'} name="docdate" id="docdate" />
          </div>
          <div class="flex flex-col w-full space-y-2">
            <label for="docTitle" class="text-sm text-black tracking-wide font-bold">Document Title</label>
            <input placeholder="Enter document title" bind:value={docTitle} type="text" class="input-normal" name="docTitle" id="docTitle" />
          </div>
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
    @apply h-9 w-full rounded-md border-2 border-red-500 p-1 pl-2 text-base font-bold ring-1 ring-red-500 placeholder:font-semibold  placeholder:text-red-500  focus:outline-none;
  }
  .field-input {
    @apply h-6 w-full rounded-md border-2 border-slate-200  bg-white p-1 pl-2 text-base font-bold placeholder:font-semibold placeholder:text-slate-500  focus:outline-none focus:ring-2 focus:ring-slate-800;
  }
</style>
