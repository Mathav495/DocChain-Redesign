<script>
  import axios from "axios";
  import { createEventDispatcher, onMount } from "svelte";
  const dispatch = createEventDispatcher();
  let documentID,
    signature,
    error = "";
  // disabled = false,;
  // let element = document.getElementById("Load");
  // element.classList.remove("hidden");

  let Token = localStorage.getItem("token");
  console.log("token", Token);
  let fileHash = localStorage.getItem("filehash");
  console.log("filehash", fileHash);
  let dataHash = localStorage.getItem("datahash");
  console.log("datahash", dataHash);

  // /**
  //  * function to generate 6 digits otp
  //  */
  // const generateOTP = () => {
  //   // Declare a digits variable
  //   // which stores all digits
  //   var digits = '0123456789';
  //   let OTP = '';
  //   for (let i = 0; i < 6; i++) {
  //     OTP += digits[Math.floor(Math.random() * 10)];
  //   }
  //   return OTP;
  // };
  // document.write('OTP of 6 digits: ');
  // document.write(generateOTP());
  // console.log(generateOTP());

  // let URL = 'http://localhost:5000/sign/publish';

  // publishing documents
  const publishdoc = async () => {
    if (signature == null) {
      error = "signature can't be empty";
      console.log(error);
    } else {
      const sample = {
        documentID: documentID,
        signature: signature,
      };
      const { data } = await axios.post(
        "http://localhost:5000/docs/publish",
        sample
      );
      console.log(data);

      let getData = {
        docID: data.documentID,
        sign: data.signature,
        // filehash: data.filehash,
      };
      localStorage.setItem("dataKey", JSON.stringify(getData));
      let doc = localStorage.getItem("dataKey");
      console.log(doc);

      dispatch("push", data);
      // element.classList.add("hidden");
      // let element2 = document.getElementById("Preview");
      // element2.classList.remove("hidden");
      console.log(element);
    }
  };
</script>

<div class=" flex h-screen w-screen bg-transparent">
  <div class=" mx-auto flex items-center md:flex-row">
    <div class="overflow-x-auto">
      <table class="text-md w-full text-left text-gray-500">
        <thead class="bg-transparent text-base uppercase text-gray-300 ">
          <tr>
            <th scope="col" class="w-80 py-3 px-10 md:w-40"> Name </th>
            <th scope="col" class="w-32 py-3 px-6"> : </th>
            <th scope="col" class="w-80 py-3 px-10 md:w-40"> John </th>
          </tr>
        </thead>
        <thead class="bg-transparent text-base uppercase text-gray-300 ">
          <tr>
            <th scope="col" class="w-80 py-3 px-10"> Type </th>
            <th scope="col" class="w-32 py-3 px-6"> : </th>

            <th scope="col" class="w-80 py-3 px-10 "> Sample </th>
          </tr>
        </thead>
      </table>
      <div class="mt-5 flex justify-center">
        <img
          src="data:image/jpeg;base64,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"
          alt="document"
          class="relative mx-auto mt-10 h-[400px] w-[320px] rounded-md "
        />
        <img
          class="absolute ml-40 h-16 w-16  rounded-lg"
          src="data:image/png;base64,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"
          alt=""
        />
      </div>

      <div
        class="mx-auto mt-10 flex-col items-center justify-center text-center "
      >
        <label for="signature" class="text-md block font-medium text-gray-500 "
          >signature</label
        >
        <div class="mt-1">
          <textarea
            name="signature"
            bind:value={signature}
            class=" mt-5 w-full rounded-md border-2 
               border-gray-300 px-4 py-2
                 placeholder:text-lg 
                   focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="ECDSA Signature obtained"
          />
        </div>
      </div>
      <h1 class="text-md font-semibold text-rose-500">{error}</h1>

      <div class="mx-auto mt-10 flex justify-between">
        <button
          class="rounded-lg bg-teal-500 px-6 py-2 text-lg text-white"
          on:click={signature}>sign</button
        >
        <button
          href="/blockchain"
          on:click={publishdoc}
          class="rounded-lg bg-teal-500 px-6 py-2 text-lg 
                text-white disabled:cursor-not-allowed disabled:bg-teal-200"
        >
          publish to blockchain
        </button>

        <button
          class="rounded-lg bg-teal-500 px-6 py-2 text-lg text-white"
          href="/user/publish">revoke</button
        >
      </div>
    </div>
  </div>
</div>
