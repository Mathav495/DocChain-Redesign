<script>
  let blob = localStorage.getItem('blobpdf');
  console.log(blob);
  let blobImg = localStorage.getItem('blobimage');
  console.log(blobImg);
</script>

<div class="flex">
  <div class="w-1/2">first section</div>
  <div class="w-1/2">
    <img src={blobImg} alt="img" class="w-full h-full" />
  </div>
</div>
