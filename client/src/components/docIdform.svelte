<script>
  import axios from 'axios';
  import { navigate } from 'svelte-routing';
  let docValue, documentID, token, qr, proposedURL;
  token = localStorage.getItem('token');

  const submitdocid = async () => {
    console.log(docValue);
    if (docValue == 'no') {
      const { data } = await axios.post(
        'https://test.swagger.print2block.in/docs/initiate/?qrcode=true',
        {
          filename: 'sampledoc',
        },
        {
          headers: {
            'x-access-token': token,
          },
        },
      );
      console.log(data);
      localStorage.setItem('documentID', data.documentID);
      documentID = localStorage.getItem('documentID');
      console.log(documentID);
      localStorage.setItem('qrcode', data.qr);
      qr = localStorage.getItem('qrcode');
      console.log(qr);
      localStorage.setItem('docURL', data.proposedURL);
      proposedURL = localStorage.getItem('docURL');
      console.log(proposedURL);
      if (data) {
        navigate('/add-file');
      }
    }
  };
</script>

<h1 class="text-xl font-bold tracking-wide">Publish Documents</h1>
<div class="flex lg:flex-row flex-col gap-0 lg:gap-5">
  <div class="bg-blue-100 shadow-sm shadow-black mt-5 w-full lg:w-3/5 p-4 rounded-lg">
    <form on:submit|preventDefault={submitdocid}>
      <div class="flex flex-col">
        <label for="docid" class="text-lg  mt-4 font-semibold tracking-wide text-blue-600">Do you have Document ID</label>
        <div class="flex mt-5 gap-5">
          <select name="docid" class="w-1/2 pl-2 rounded-lg" bind:value={docValue}>
            <option class="pl-5">select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          <button class="flex text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg">Submit</button>
        </div>
      </div>
    </form>
  </div>

  <div class="bg-emerald-100 shadow-sm shadow-black mt-5 w-full lg:w-2/5 p-4 rounded-lg">
    <h1 class=" text-emerald-600 font-semibold tracking-wide">NOTE.</h1>
    <ul class="list-disc list-outside p-3">
      <li class="text-sm md:text-base text-emerald-600 font-semibold tracking-wide">If you don't have Document ID,Select 'NO' .It will generate Document ID.</li>

      <li class="text-sm md:text-base text-emerald-600 font-semibold tracking-wide mt-1">Otherwise select 'YES'</li>
    </ul>
  </div>
</div>
