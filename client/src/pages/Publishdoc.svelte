<script>
  import axios from "axios"
  let fileName, docValue, documentID, dateissued

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
            "x-access-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZTU4MWUyYWFlYWNmZjYzOTlkYjYxZSIsImlhdCI6MTY2OTQ0Mzc0MywiZXhwIjoxNjY5NTMwMTQzfQ.SiCIvSaCqk1lcYXv1ebtjD-r1n7UwBNGnGZAi-Hbxko",
          },
        }
      )
      console.log(data)
      localStorage.setItem("documentID", data.documentID)
      documentID = localStorage.getItem("documentID")
      console.log(documentID)
    }
  }

  const onSubmitFile = async () => {
    console.log("Data submitted", dateissued)
    const form = document.getElementById("form")
    const formData = new FormData(form)
    console.log([...formData])
    let datum = [...formData][0]
    let File = datum[1]
    console.log(File)
    const { data } = await axios.post(
      "https://test.swagger.print2block.in/docs/add-file",
      {
        documentID: documentID,
        file: File,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-access-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZTU4MWUyYWFlYWNmZjYzOTlkYjYxZSIsImlhdCI6MTY2OTQ1MDUwNiwiZXhwIjoxNjY5NTM2OTA2fQ.f-jWsn2PjD7vjWX-cW_GCXuZnMUEtnJvRr51w0bZ2tw",
        },
      }
    )
    console.log(data)
  }
</script>

<h1 class="text-3xl font-bold p-3 underline text-blue-400">Publish Doc</h1>

<div class="bg-slate-200 w-3/5 mx-5 p-2 rounded-lg">
  <form on:submit|preventDefault={submitdocid}>
    <div class="flex flex-col">
      <label for="docid">Do you have Document ID</label>
      <div class="flex mt-3 gap-5">
        <select name="docid" class=" w-24 " bind:value={docValue}>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        <button class="bg-slate-400 px-2 py-1 rounded-lg">Submit</button>
      </div>
    </div>
  </form>
</div>

<div class="bg-slate-200 w-3/5 mx-5 mt-10 p-2 rounded-lg">
  <form
    on:submit|preventDefault={onSubmitFile}
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

<div class="bg-slate-200 w-3/5 mx-5 mt-5 p-2 rounded-lg">
  <form>
    <div class="flex flex-col">
      <label for="docid">Date issued</label>
      <input
        bind:value={dateissued}
        type="datetime-local"
        name="docid"
        id="docid"
      />
      <button>Submit</button>
    </div>
  </form>
</div>
