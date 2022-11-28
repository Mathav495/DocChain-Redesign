<script>
  import axios from 'axios';
  let docValue, documentID, token;
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
    }
  };
</script>

<h1 class="text-xl font-bold ">Publish Documents</h1>

<div class="bg-slate-200 w-3/5 mx-5 p-2 rounded-lg">
  <form on:submit|preventDefault={submitdocid}>
    <div class="flex flex-col">
      <label for="docid">Do you have Document ID</label>
      <div class="flex mt-3 gap-5">
        <select name="docid" class=" w-32 " bind:value={docValue}>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        <button class="bg-slate-400 px-2 py-1 rounded-lg">Submit</button>
      </div>
    </div>
  </form>
</div>
