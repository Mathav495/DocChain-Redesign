<script>
  import axios from "axios"
  import { createEventDispatcher } from "svelte"
  import { navigate } from "svelte-routing"
  import HeaderFileupload from "./header_fileupload.svelte"
  import ErrorInfo from "./ErrorInfo.svelte"
  export let id
  const dispatch = createEventDispatcher()
  let dateexpired = "",
    issuer = "",
    doctype = "",
    signatory = "",
    docTitle = ""
  let error = {
    dateexpired: "",
    issuer: "",
    doctype: "",
    docTitle: "",
    signatory: "",
  }
  let valid,
    date,
    metaData,
    errormsg,
    options,
    receiver,
    documentDetails,
    signatoryDetails

  let displayerror = false
  let initialMetadata = JSON.parse(localStorage.getItem("formDataDetails"))

  let formDataDetails = {
    receiver: [
      {
        label: 0,
        labelName: "Fieldname",
        inputvalue: "",
      },
    ],
    documentDetails: [
      {
        label: 0,
        labelName: "Fieldname",
        inputvalue: "",
      },
    ],
    signatoryDetails: [
      {
        label: 0,
        labelName: "Fieldname",
        inputvalue: "",
      },
    ],
  }
  if (!initialMetadata) {
    localStorage.setItem("formDataDetails", JSON.stringify(formDataDetails))
    initialMetadata = JSON.parse(localStorage.getItem("formDataDetails"))
  } else {
    receiver = initialMetadata.receiver
    receiver.find((receiver) => {
      receiver.inputvalue = ""
    })
    initialMetadata.receiver = receiver

    documentDetails = initialMetadata.documentDetails
    documentDetails.find((documentDetails) => {
      documentDetails.inputvalue = ""
    })
    initialMetadata.documentDetails = documentDetails

    signatoryDetails = initialMetadata.signatoryDetails
    signatoryDetails.find((signatoryDetails) => {
      signatoryDetails.inputvalue = ""
    })
    initialMetadata.signatoryDetails = signatoryDetails

    localStorage.setItem("formDataDetails", JSON.stringify(initialMetadata))
    initialMetadata = JSON.parse(localStorage.getItem("formDataDetails"))
  }

  console.log(initialMetadata)

  /**
   * Submitting document metadata and generating datahash
   */
  const onsubmitdata = async () => {
    console.log(dateexpired, issuer, signatory, docTitle, doctype)
    valid = true
    if (dateexpired) {
      console.log(dateexpired)
      let currentDate = new Date().getTime()
      console.log(currentDate)
      let expireDate = new Date(dateexpired).getTime()
      console.log(expireDate)
      if (currentDate > expireDate) {
        document.querySelector("#docdate").type = "text"
        dateexpired = ""
        error.dateexpired = "Choose the valid date"
        setTimeout(() => {
          error.dateexpired = ""
        }, 3000)
        valid = false
      } else {
        error.dateexpired = ""
        date = new Date(dateexpired).toISOString()
        console.log(date)
      }
    } else {
      error.dateexpired = ""
    }
    if (!issuer) {
      error.issuer = "Fill the Issuer name"
      setTimeout(() => {
        error.issuer = ""
      }, 3000)
      valid = false
    } else {
      error.issuer = ""
    }
    if (!doctype) {
      error.doctype = "Fill the Document Type"
      setTimeout(() => {
        error.doctype = ""
      }, 3000)
      valid = false
    } else {
      error.doctype = ""
    }
    if (!signatory) {
      error.signatory = "Fill the Signatory name"
      setTimeout(() => {
        error.signatory = ""
      }, 3000)
      valid = false
    } else {
      error.signatory = ""
    }
    if (valid) {
      console.log("valid")
      metaData = {
        receiver: updatedObject(initialMetadata.receiver, "name", issuer),
        document: updatedObject(
          initialMetadata.documentDetails,
          "type",
          doctype
        ),
        issuer: updatedObject(
          initialMetadata.signatoryDetails,
          "signatory",
          signatory
        ),
      }

      if (date) {
        docTitle
          ? (options = {
              title: docTitle,
              expireOn: date,
            })
          : (options = {
              expireOn: date,
            })
      } else {
        docTitle
          ? (options = {
              title: docTitle,
            })
          : (options = {})
      }

      try {
        const { data } = await axios.post(
          "https://test.swagger.print2block.in/docs/add-data",
          {
            documentID: localStorage.getItem("documentID"),
            metadata: metaData,
            options: options,
          },
          {
            headers: {
              "x-access-token": localStorage.getItem("token"),
            },
          }
        )
        console.log(data)
        localStorage.setItem("metadata", data.metadata)
        localStorage.setItem("options", data.options)

        if (data.dataHash) {
          let localdata = JSON.parse(localStorage.getItem("docDetails"))
          console.log("localdata", localdata)
          localdata.find((localdata) => {
            if (localdata.documentID == id) {
              console.log(localdata)
              console.log("same id", localdata.documentID)
              console.log("datahash", localdata.datahash)
              localdata.datahash = true
              console.log(localdata)
            }
          })
          console.log(localdata, "local")
          localStorage.setItem("docDetails", JSON.stringify(localdata))
        }
        dispatch("datahash", data.dataHash)
        localStorage.setItem("datahash", data.dataHash)
        let dataHash = localStorage.getItem("datahash")
        console.log("datahash", dataHash)
        if (data.dataHash) {
          errormsg = ""
          navigate(`/preview/${id}`)
        } else {
          if (data.error) {
            errormsg = data.errorCode
            errormsg = errormsg.replaceAll("P2BCODE::", "")
            displayerror = true
            setTimeout(() => {
              displayerror = false
            }, 3000)
          }
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  /**
   * function to update the object for metadata
   * @param data {Array}  array of data stored in localstorage
   * @param key  {String} key matches the key of the metadata object
   * @param value {String} value matches the value for the respective key in metadata
   */
  const updatedObject = (data, key, value) => {
    let updatedData = data
    console.log(updatedData)
    let createObj = new Object()
    createObj[key] = value
    for (let i = 0; i < updatedData.length; i++) {
      if (
        updatedData[i].labelName != "Fieldname" &&
        updatedData[i].inputvalue
      ) {
        createObj[updatedData[i].labelName] = updatedData[i].inputvalue
      }
    }
    console.log(createObj, "createObj")
    return createObj
  }

  /**
   * Function to update the data related to receiver , docdetails , signdetails
   * @param id1 {String} string value for finding the element(label component)
   * @param id2 {String} string value for finding the element(input component)
   * @param dataToBeModified {String} it denotes the name of the array to be modified
   * @param value {Number} label value for individual labelName
   */
  const updateLabel = (id1, id2, dataToBeModified, value) => {
    let initial_value = value
    let increment_value = value + 1
    console.log(initialMetadata.receiver)
    let nextData,
      count = 0

    if (dataToBeModified == "receiver") {
      receiver = initialMetadata.receiver
      receiver.find((receiver) => {
        if (receiver.labelName == "Fieldname") {
          count++
        }
      })
      if (count == 0) {
        nextData = {
          label: increment_value,
          labelName: "Fieldname",
        }
        initialMetadata.receiver = [...receiver, nextData]
        console.log(receiver)
        console.log(initialMetadata.receiver, "receiver")
        localStorage.setItem("formDataDetails", JSON.stringify(initialMetadata))
        initialMetadata = JSON.parse(localStorage.getItem("formDataDetails"))
      }
    } else if (dataToBeModified == "documentDetails") {
      documentDetails = initialMetadata.documentDetails
      documentDetails.find((documentDetails) => {
        if (documentDetails.labelName == "Fieldname") {
          count++
        }
      })
      if (count == 0) {
        nextData = {
          label: increment_value,
          labelName: "Fieldname",
        }
        initialMetadata.documentDetails = [...documentDetails, nextData]
        console.log(initialMetadata)
        localStorage.setItem("formDataDetails", JSON.stringify(initialMetadata))
        initialMetadata = JSON.parse(localStorage.getItem("formDataDetails"))
      }
    } else {
      signatoryDetails = initialMetadata.signatoryDetails
      signatoryDetails.find((signatoryDetails) => {
        if (signatoryDetails.labelName == "Fieldname") {
          count++
        }
      })
      if (count == 0) {
        nextData = {
          label: increment_value,
          labelName: "Fieldname",
        }
        initialMetadata.signatoryDetails = [...signatoryDetails, nextData]
        console.log(initialMetadata)
        localStorage.setItem("formDataDetails", JSON.stringify(initialMetadata))
        initialMetadata = JSON.parse(localStorage.getItem("formDataDetails"))
      }
    }

    let temp = document.getElementById(id1 + initial_value)
    temp.classList.add("flex")
    temp.classList.remove("hidden")
    let temp2 = document.getElementById(id2 + initial_value)
    temp2.classList.remove("flex")
    temp2.classList.add("hidden")
  }

  /**
   * Function to hide the label and show the edit section
   * @param id1 {String} string value for finding the element(label component)
   * @param id2 {String} string value for finding the element(input component)
   * @param value {Number} label value for individual labelName
   */
  const hideLabel = (id1, id2, value) => {
    let temp = document.getElementById(id1 + value)
    temp.classList.add("hidden")
    let temp2 = document.getElementById(id2 + value)
    temp2.classList.add("flex")
    temp2.classList.remove("hidden")
  }

  /**
   * Function to cancel if the user mistakenly touches the edit button
   * @param id1 {String} string value for finding the element(label component)
   * @param id2 {String} string value for finding the element(input component)
   * @param value {Number} label value for individual labelName
   */
  const cancelLabel = (id1, id2, value) => {
    let temp = document.getElementById(id1 + value)
    temp.classList.add("flex")
    temp.classList.remove("hidden")
    let temp2 = document.getElementById(id2 + value)
    temp2.classList.remove("flex")
    temp2.classList.add("hidden")
    initialMetadata = JSON.parse(localStorage.getItem("formDataDetails"))
  }

  /**
   * Function to delete the customized label
   * @param dataToBeModified {String} it denotes the name of the array to be modified
   * @param value {Number} label value for individual labelName
   */
  const deletelabel = (dataToBeModified, value) => {
    console.log(dataToBeModified, value)
    if (dataToBeModified == "receiver") {
      receiver = initialMetadata.receiver
      receiver = receiver.filter((receiver) => receiver.label != value)
      initialMetadata.receiver = receiver
    } else if (dataToBeModified == "docDetails") {
      documentDetails = initialMetadata.documentDetails
      documentDetails = documentDetails.filter(
        (documentDetails) => documentDetails.label != value
      )
      initialMetadata.documentDetails = documentDetails
    } else if (dataToBeModified == "signDetails") {
      signatoryDetails = initialMetadata.signatoryDetails
      signatoryDetails = signatoryDetails.filter(
        (signatoryDetails) => signatoryDetails.label != value
      )
      initialMetadata.signatoryDetails = signatoryDetails
    }
    localStorage.setItem("formDataDetails", JSON.stringify(initialMetadata))
    initialMetadata = JSON.parse(localStorage.getItem("formDataDetails"))
  }
</script>

<div class="space-y-3 flex flex-col justify-center items-center">
  {#if displayerror}
    <ErrorInfo
      {errormsg}
      position="absolute top-4 right-4"
      on:click={() => (displayerror = false)}
    />
  {/if}
  <HeaderFileupload {id} />

  <div
    class="shadow-[0_0_8px_0_rgba(0,0,0,0.15)] rounded-lg bg-white  h-auto w-full lg:w-[38.5rem] p-4"
  >
    <form on:submit|preventDefault={onsubmitdata}>
      <div class="flex flex-col space-y-3">
        <div class="flex flex-col w-full  border-b-2 pb-3 space-y-3">
          <div class="border-b-2">
            <h1 class="text-lg tracking-wide font-bold ">Receiver Details</h1>
            <p class="pb-3 text-xs tracking-wider text-gray-500 font-semibold ">
              Details related to the client who receives the document
            </p>
          </div>
          <div class="flex flex-col w-full  space-y-2">
            <label
              for="issuer"
              class="after:content-['*'] after:ml-1 after:text-red-500 text-sm text-black tracking-wide font-bold"
            >
              Issued to
            </label>
            <input
              placeholder={error.issuer ? error.issuer : "Enter issuer name"}
              bind:value={issuer}
              name="issuer"
              id="issuer"
              type="text"
              class={error.issuer ? "input-error" : "input-normal"}
            />
          </div>

          {#each initialMetadata.receiver as receiver}
            <div class="flex flex-col w-full  space-y-2">
              <div class="flex">
                <div class="flex group " id="z{receiver.label}">
                  <!-- svelte-ignore a11y-click-events-have-key-events -->
                  <label
                    on:click={() => hideLabel("z", "a", receiver.label)}
                    for="label{receiver.label}"
                    class="cursor-pointer text-sm text-black tracking-wide font-bold inline-flex items-center gap-1"
                  >
                    {receiver.labelName}
                  </label>
                  <!-- svelte-ignore a11y-click-events-have-key-events -->
                  <svg
                    on:click={() => hideLabel("z", "a", receiver.label)}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="hidden group-hover:block cursor-pointer w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                  <!-- svelte-ignore a11y-click-events-have-key-events -->
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    on:click={() => deletelabel("receiver", receiver.label)}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="hidden {receiver.labelName == 'Fieldname'
                      ? ''
                      : 'group-hover:block'}  cursor-pointer w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </div>
                <div class="hidden items-center" id="a{receiver.label}">
                  <input
                    placeholder="Enter Field name"
                    bind:value={receiver.labelName}
                    type="text"
                    class="field-input"
                  />
                  <div class="pl-3">
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <svg
                      on:click={() =>
                        updateLabel("z", "a", "receiver", receiver.label)}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="cursor-pointer w-5 h-5 hover:p-1 hover:bg-green-500 hover:rounded-full"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  </div>
                  <div class="pl-3">
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <svg
                      on:click={() => cancelLabel("z", "a", receiver.label)}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="cursor-pointer w-5 h-5 hover:p-1 hover:bg-red-500 hover:rounded-full"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div>
                <input
                  name="label{receiver.label}"
                  placeholder={receiver.labelName != "Fieldname"
                    ? `Enter ${receiver.labelName}`
                    : ""}
                  bind:value={receiver.inputvalue}
                  id="label{receiver.label}"
                  type="text"
                  disabled={receiver.labelName == "Fieldname"}
                  class="input-normal disabled:cursor-not-allowed"
                />
              </div>
            </div>
          {/each}
        </div>

        <div class="flex flex-col w-full  border-b-2 pb-3 space-y-3">
          <div class="border-b-2">
            <h1 class="text-base tracking-wide font-bold ">Document Details</h1>
            <p class="pb-3 text-xs tracking-wider text-gray-500 font-semibold ">
              Details related to the document
            </p>
          </div>

          <div class="flex flex-col w-full  space-y-2">
            <label
              for="doctype"
              class="after:content-['*'] after:ml-1 after:text-red-500 text-sm text-black tracking-wide font-bold"
            >
              Document Type
            </label>
            <input
              placeholder={error.doctype
                ? error.doctype
                : "Enter document type"}
              bind:value={doctype}
              type="text"
              class={error.doctype ? "input-error" : "input-normal"}
              name="doctype"
              id="doctype"
            />
          </div>

          {#each initialMetadata.documentDetails as docDetails}
            <div class="flex flex-col w-full  space-y-2">
              <div class="flex">
                <div class="flex group" id="b{docDetails.label}">
                  <!-- svelte-ignore a11y-click-events-have-key-events -->
                  <label
                    on:click={() => hideLabel("b", "c", docDetails.label)}
                    for="doclabel{docDetails.label}"
                    class="cursor-pointer text-sm text-black tracking-wide font-bold inline-flex items-center gap-1"
                  >
                    {docDetails.labelName}
                  </label>
                  <!-- svelte-ignore a11y-click-events-have-key-events -->
                  <svg
                    on:click={() => hideLabel("b", "c", docDetails.label)}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="hidden group-hover:block cursor-pointer w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                  <!-- svelte-ignore a11y-click-events-have-key-events -->
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    on:click={() => deletelabel("docDetails", docDetails.label)}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="hidden {docDetails.labelName == 'Fieldname'
                      ? ''
                      : 'group-hover:block'}  cursor-pointer w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </div>
                <div class="hidden items-center gap-2" id="c{docDetails.label}">
                  <input
                    placeholder="Enter Field name"
                    bind:value={docDetails.labelName}
                    type="text"
                    class="field-input"
                  />
                  <div class="pl-3">
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <svg
                      on:click={() =>
                        updateLabel(
                          "b",
                          "c",
                          "documentDetails",
                          docDetails.label
                        )}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="cursor-pointer w-5 h-5 hover:p-1 hover:bg-green-500 hover:rounded-full"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  </div>
                  <div class="pl-3">
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <svg
                      on:click={() => cancelLabel("b", "c", docDetails.label)}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="cursor-pointer w-5 h-5 hover:p-1 hover:bg-red-500 hover:rounded-full"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div>
                <input
                  placeholder={docDetails.labelName != "Fieldname"
                    ? `Enter ${docDetails.labelName}`
                    : ""}
                  name="doclabel{docDetails.label}"
                  bind:value={docDetails.inputvalue}
                  id="doclabel{docDetails.label}"
                  type="text"
                  disabled={docDetails.labelName == "Fieldname"}
                  class="input-normal disabled:cursor-not-allowed"
                />
              </div>
            </div>
          {/each}
        </div>

        <div class="flex flex-col w-full border-b-2 pb-3 space-y-3">
          <div class="border-b-2">
            <h1 class="text-base tracking-wide font-bold ">
              Signatory Details
            </h1>
            <p class="pb-3 text-xs tracking-wider text-gray-500 font-semibold ">
              Details related to the person who is authorised to issue this
              document
            </p>
          </div>
          <div class="flex flex-col w-full space-y-2">
            <label
              for="signatory"
              class="after:content-['*'] after:ml-1 after:text-red-500 text-sm text-black tracking-wide font-bold"
            >
              Signatory
            </label>
            <input
              placeholder={error.signatory
                ? error.signatory
                : "Enter signatory name"}
              name="signatory"
              bind:value={signatory}
              id="signatory"
              type="text"
              class={error.signatory ? "input-error" : "input-normal"}
            />
          </div>

          {#each initialMetadata.signatoryDetails as signDetails}
            <div class="flex flex-col w-full  space-y-2">
              <div class="flex">
                <div class="flex group" id="d{signDetails.label}">
                  <!-- svelte-ignore a11y-click-events-have-key-events -->
                  <label
                    on:click={() => hideLabel("d", "e", signDetails.label)}
                    for="signlabel{signDetails.label}"
                    class="cursor-pointer text-sm text-black tracking-wide font-bold inline-flex items-center gap-1"
                  >
                    {signDetails.labelName}
                  </label>
                  <!-- svelte-ignore a11y-click-events-have-key-events -->
                  <svg
                    on:click={() => hideLabel("d", "e", signDetails.label)}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="hidden group-hover:block cursor-pointer w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                  <!-- svelte-ignore a11y-click-events-have-key-events -->
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    on:click={() =>
                      deletelabel("signDetails", signDetails.label)}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="hidden {signDetails.labelName == 'Fieldname'
                      ? ''
                      : 'group-hover:block'}  cursor-pointer w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </div>
                <div
                  class="hidden items-center gap-2"
                  id="e{signDetails.label}"
                >
                  <input
                    placeholder="Enter Field name"
                    bind:value={signDetails.labelName}
                    type="text"
                    class="field-input"
                  />
                  <div class="pl-3">
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <svg
                      on:click={() =>
                        updateLabel(
                          "d",
                          "e",
                          "signatoryDetails",
                          signDetails.label
                        )}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="cursor-pointer w-5 h-5 hover:p-1 hover:bg-green-500 hover:rounded-full"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  </div>
                  <div class="pl-3">
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <svg
                      on:click={() => cancelLabel("d", "e", signDetails.label)}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="cursor-pointer w-5 h-5 hover:p-1 hover:bg-red-500 hover:rounded-full"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div>
                <input
                  placeholder={signDetails.labelName != "Fieldname"
                    ? `Enter ${signDetails.labelName}`
                    : ""}
                  name="signlabel{signDetails.label}"
                  id="signlabel{signDetails.label}"
                  bind:value={signDetails.inputvalue}
                  type="text"
                  disabled={signDetails.labelName == "Fieldname"}
                  class="input-normal disabled:cursor-not-allowed"
                />
              </div>
            </div>
          {/each}
        </div>

        <div class="flex flex-col w-full border-b-2  pb-3 space-y-3">
          <div class="border-b-2">
            <h1 class="text-base tracking-wide font-bold ">Optional Details</h1>
            <p class="pb-3 text-xs tracking-wider text-gray-500 font-semibold ">
              Optional details such as expiry date and document title
            </p>
          </div>
          <div class="flex flex-col w-full space-y-2">
            <label
              for="docid"
              class="text-sm text-black tracking-wide font-bold"
            >
              Date Expired
            </label>
            <input
              bind:value={dateexpired}
              placeholder={error.dateexpired
                ? error.dateexpired
                : "Enter expiry date"}
              type="text"
              onfocus="(this.type = 'date')"
              class={error.dateexpired ? "input-error" : "input-normal"}
              name="docdate"
              id="docdate"
            />
          </div>
          <div class="flex flex-col w-full space-y-2">
            <label
              for="docTitle"
              class="text-sm text-black tracking-wide font-bold"
            >
              Document Title
            </label>
            <input
              placeholder="Enter document title"
              bind:value={docTitle}
              type="text"
              class="input-normal"
              name="docTitle"
              id="docTitle"
            />
          </div>
        </div>
      </div>
      <div class="flex pt-5">
        <button
          class="border-2 hover:text-white border-green-500 text-green-500 hover:bg-green-500 rounded-md px-3 py-1 text-lg font-bold tracking-wide"
        >
          Confirm and Preview
        </button>
      </div>
    </form>
  </div>
</div>

<style lang="postcss">
  .input-normal {
    @apply h-9 w-full rounded-md border-2 border-slate-200  bg-white p-1 pl-2 text-base font-bold placeholder:font-semibold placeholder:text-slate-500  focus:outline-none focus:ring-2 focus:ring-slate-800;
  }
  .input-error {
    @apply h-9 w-full rounded-md border-2 border-red-500 p-1 pl-2 text-base font-bold ring-1 ring-red-500 placeholder:font-semibold  placeholder:text-red-500  focus:outline-none;
  }
  .field-input {
    @apply h-6 w-full rounded-md border-2 border-slate-200  bg-white p-1 pl-2 text-base font-bold placeholder:font-semibold placeholder:text-slate-500  focus:outline-none focus:ring-2 focus:ring-slate-800;
  }
</style>
