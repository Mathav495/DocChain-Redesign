<script>
  import axios from "axios"
  let fileName,
    docValue,
    documentID,
    dateexpired,
    issuer,
    doctype,
    docTitle,
    signatory

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

  const onsubmitdata = async () => {
    console.log(dateexpired, issuer, signatory, docTitle, doctype)
    const date = new Date(dateexpired).toISOString()
    let sampleData = {
      receiver: {
        name: issuer,
      },
      document: {
        type: doctype,
      },
      issuer: {
        signatory: signatory,
      },
    }
    let options = {
      title: docTitle,
      expireOn: date,
    }
    console.log(documentID)
    const { data } = await axios.post(
      "https://test.swagger.print2block.in/docs/add-data",
      {
        documentID: documentID,
        metadata: sampleData,
        options: options,
      },
      {
        headers: {
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
  <form on:submit|preventDefault={onsubmitdata}>
    <div class="flex flex-col gap-4">
      <div class="flex gap-6">
        <label for="docid">Date Expired</label>
        <input
          bind:value={dateexpired}
          type="datetime-local"
          name="docid"
          id="docid"
        />
      </div>

      <div class="flex gap-6">
        <label for="issuer">Issued to</label>
        <input bind:value={issuer} type="text" name="issuer" id="issuer" />
      </div>

      <div class="flex gap-6">
        <label for="doctype">Document Type</label>
        <input bind:value={doctype} type="text" name="doctype" id="doctype" />
      </div>

      <div class="flex gap-6">
        <label for="signatory">Signatory</label>
        <input
          bind:value={signatory}
          type="text"
          name="signatory"
          id="signatory"
        />
      </div>

      <div class="flex gap-6">
        <label for="docTitle">Document Title</label>
        <input
          bind:value={docTitle}
          type="text"
          name="docTitle"
          id="docTitle"
        />
      </div>

      <button class="bg-slate-400 px-2 py-1 rounded-lg">Submit</button>
    </div>
  </form>
</div>
