<script>
  import BlobPreview from './blob-preview.svelte';
  import PreviewQrCard from './preview_qrCard.svelte';
  import PrevFooter from './prev_footer.svelte';

  export let id;

  let signmsg, Queue_msg;
  let localfile = JSON.parse(localStorage.getItem('docDetails'));
  console.log('localfile', localfile);
  localfile.find((localfile) => {
    if (localfile.documentID == id) {
      console.log(localfile);
      console.log('same id', localfile.documentID);
      console.log('filehash', localfile.filehash);
      localfile.filehash = true;
      console.log(localfile);
    }
  });
  let fileHash = localStorage.getItem('filehash');
  console.log('filehash', fileHash);
  let dataHash = localStorage.getItem('datahash');
  console.log('datahash', dataHash);
  let qr = localStorage.getItem('qrcode');
  console.log('qrcode', qr);
  let proposedURL = localStorage.getItem('docURL');
  console.log('qrcodocURL', proposedURL);
  let imgurl = localStorage.getItem('img');
  console.log('imgUrl', imgurl);
  let bgcolor = localStorage.getItem('bgGradient');
  let metadata = JSON.parse(localStorage.getItem('metadata'));
  console.log(metadata);
  let options = JSON.parse(localStorage.getItem('options'));
  console.log(options);
</script>

<!-- <div class="flex-col"> -->
<div class="relative mx-auto w-full h-auto flex flex-wrap xl:flex-nowrap">
  <PrevFooter {signmsg} {Queue_msg} />
  <div class="flex w-full rounded-lg xl:mr-4 xl:w-3/5 lg:w-3/5 mb-10">
    <BlobPreview />
  </div>
  <div class="flex w-full flex-col xl:w-2/5 lg:w-2/5">
    <PreviewQrCard {id} {bgcolor} />
    <div class="border-2 border-gray-200 shadow-lg rounded-lg mt-4">
      <div class="mt-5 ml-4">
        <div class="relative ">
          <div for="name" class="text-md font-bold uppercase leading-7 text-gray-600">Receiver</div>
          <div class="flex-col">
            <div type="text" class="w-full rounded px-3 text-sm leading-8 text-gray-600 transition-colors duration-200 ease-in-out">Name</div>
            <div type="text" class="text-md w-full rounded py-0 px-6 leading-8 text-gray-600 transition-colors duration-200 font-bold ease-in-out">john</div>
          </div>
        </div>
        <div class="relative">
          <div for="name" class="text-md font-bold uppercase leading-7 text-gray-600">Document</div>
          <div class="flex-col">
            <div type="text" class="w-full rounded px-3 text-sm leading-8 text-gray-600 transition-colors duration-200 ease-in-out">Document type</div>
            <div type="text" class="text-md w-full rounded py-0 px-6 leading-8 text-gray-600 transition-colors duration-200 ease-in-out font-bold">sample</div>
          </div>
        </div>

        <div class="relative">
          <div for="name" class="text-md font-bold uppercase leading-7 text-gray-600">Issuer</div>
          <div class="flex-col">
            <div type="text" class="w-full rounded px-3 text-sm leading-8 text-gray-600 transition-colors duration-200 ease-in-out">Signatory</div>
            <div type="text" class="text-md w-full rounded py-0 px-6 leading-8 text-gray-600 transition-colors duration-200 ease-in-out font-bold">Arun</div>
          </div>
        </div>
        <div class="relative mb-5">
          <div type="text" class="w-full rounded px-3 text-sm leading-8 text-gray-600 transition-colors duration-200 ease-in-out">Document Title</div>
          <div type="text" class="text-md w-full rounded py-0 px-6 leading-8 text-gray-600 transition-colors duration-200 ease-in-out font-bold">sampleData</div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- </div> -->
