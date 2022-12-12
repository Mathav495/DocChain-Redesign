<script>
    import PdfCanvas from "./pdfCanvas.svelte";
    let src;
  /**
   * getting saved blob image from localstorage
   */
   let blobimage = localStorage.getItem('blobimage');
  console.log(blobimage);

  /**
   * getting saved pdf blob and converting it as the base64 string
   */
  let blob = localStorage.getItem('blobpdf');
  console.log(blob);

</script>

<div class="flex w-full flex-col">
  {#if (src = blobimage)}
    <img class="w-full rounded-md " src={blobimage} alt="document" />
  {:else}
    <PdfCanvas />
  {/if}
</div>