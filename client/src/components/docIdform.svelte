<script>
  import axios from "axios"
  let docValue, documentID, token
  token = localStorage.getItem("token")

  const submitdocid = async () => {
    console.log(docValue)
    if (docValue == "no") {
      const { data } = await axios.post(
        "https://test.swagger.print2block.in/docs/initiate/?qrcode=true",
        {
          filename: "sampledoc",
        },
        {
          headers: {
            "x-access-token": token,
          },
        }
      )
      console.log(data)
      localStorage.setItem("documentID", data.documentID)
      documentID = localStorage.getItem("documentID")
      console.log(documentID)
    }
  }
</script>

<h1 class="text-xl font-bold tracking-wide">Publish Documents</h1>

<div
  class="bg-blue-100 shadow-sm shadow-black mt-3 w-full lg:w-3/5 p-5 rounded-lg"
>
  <form on:submit|preventDefault={submitdocid}>
    <div class="flex flex-col">
      <label
        for="docid"
        class="text-lg font-semibold tracking-wide text-blue-600"
        >Do you have Document ID</label
      >
      <div class="flex mt-3 gap-5">
        <select
          name="docid"
          class="w-1/2 pl-2 p-2 rounded-lg"
          bind:value={docValue}
        >
          <option class="pl-5">select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
    </div>
  </form>
</div>
