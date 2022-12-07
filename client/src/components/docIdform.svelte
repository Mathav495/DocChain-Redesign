<script>
  import axios from 'axios';
  import { navigate } from 'svelte-routing';
  let docValue,
    documentID,
    token,
    qr,
    proposedURL,
    docDetails = [];

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

      let getdata = localStorage.getItem('docDetails');

      console.log(getdata);
      if (!getdata) {
        docDetails = [
          {
            documentID: data.documentID,
            datahash: false,
            filehash: false,
            Status: 'Not published',
          },
        ];
        localStorage.setItem('docDetails', docDetails);
      }

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
        navigate(`/add-file/${documentID}`);
      }
    }
  };
</script>

<div class="flex flex-col">
  <!-- 1st div table -->
  <div class="shadow-lg rounded-lg relative text-center overflow-auto  max-h-96">
    <div class="bg-sky-100 w-full flex font-semibold text-base lg:text-lg">
      <div class="px-4 py-3 w-1/4  tracking-wider  text-slate-900">Document Id</div>
      <div class="px-4 py-3 w-1/5 tracking-wider  text-slate-900 ">Data Hash Generated</div>
      <div class="px-4 py-3 w-1/5 tracking-wider  text-slate-900 ">File Hash Generated</div>
      <div class="px-4 py-3 w-1/4 tracking-wider  text-slate-900 ">Status</div>
      <div class=" py-3 tracking-wider w-1/5  text-slate-900">Actions</div>
    </div>
  </div>

  <!-- 2st div form -->
  <div class="flex gap-3 mt-5">
    <!-- <div class="bg-black w-1/2 p-2 text-white text-2xl">Form</div>
    <div class="bg-black w-1/2 p-2 text-white text-2xl">Form</div> -->
  </div>
</div>
