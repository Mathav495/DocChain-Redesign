<script>
  let fileName
  import axios from "axios"
  import { onMount } from "svelte"

  onMount(() => {})

  const submitdata = () => {
    console.log(fileName)
  }
</script>

<h1 class="text-3xl font-bold p-3 underline text-blue-400">Publish Doc</h1>
<div class="bg-slate-200 w-2/5 mx-5 p-2 rounded-lg">
  <form
    on:submit|preventDefault={submitdata}
    id="form"
    method="post"
    action="/docs/initiate"
    enctype="multipart/form-data"
  >
    <input
      bind:value={fileName}
      type="file"
      name="userimage"
      accept="image/*,.pdf"
    />
    <button class="bg-slate-400 px-2 py-1 rounded-lg">Upload</button>
  </form>
</div>
