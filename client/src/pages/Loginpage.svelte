<script>
  import axios from "axios"
  import { navigate } from "svelte-routing"
  let Email = "",
    Password = ""

  const onLogin = async () => {
    console.log(Email)
    console.log(Password)

    let sampleData = {
      email: Email,
      password: Password,
    }
    const { data } = await axios.post(
      "http://localhost:5000/auth/login",
      sampleData
    )
    console.log(data)
  }
</script>

<div class="flex">
  <div class=" w-full lg:w-1/3 p-10 h-screen bg-black relative">
    <div class="flex">
      <img
        class=" mr-2 inline-block animate-pulse align-top "
        src="assets\icon1.png"
        alt="icon1"
      />
      <h1 class="text-2xl text-white font-normal">DocChain</h1>
    </div>

    <div class="mt-20">
      <h1 class="text-white text-4xl font-bold">Login</h1>
    </div>
    <div>
      <form on:submit|preventDefault={onLogin}>
        <div class="w-96 mt-10 group">
          <label
            for="Email"
            class="text-xl text-gray-400 group-hover:text-white tracking-wide"
            >Email</label
          >
          <input
            bind:value={Email}
            type="email"
            id="Email"
            class="w-full mt-2 bg-black focus:bg-black text-blue-500 rounded border border-gray-300 focus:border-white focus:ring-1 focus:ring-white text-lg outline-none py-1 px-3 leading-8"
          />
        </div>

        <div class="w-96 mt-10">
          <label for="Password" class="text-xl text-gray-400 tracking-wide"
            >Password</label
          >
          <input
            bind:value={Password}
            type="Password"
            id="Password"
            class="w-full mt-2 bg-black focus:bg-black text-blue-500 rounded border border-gray-300 focus:border-white focus:ring-1 focus:ring-white  text-lg outline-none py-1 px-3 leading-8"
          />
        </div>

        <h1
          class="text-gray-600 underline underline-offset-4 text-base tracking-wide mt-5 mb-5 cursor-pointer font-normal"
        >
          Forgot Password?
        </h1>
        <div>
          <button
            class="w-96 mt-10 text-white bg-blue-700 border-0 py-2 px-8 focus:outline-none hover:bg-blue-800  rounded text-lg"
            >LOGIN</button
          >
        </div>
      </form>
      <h1
        class="text-slate-400 tracking-wide  font-medium text-base absolute bottom-0 pb-10"
      >
        Don't have an account? <span
          class="text-gray-600 tracking-wide cursor-pointer underline underline-offset-4"
          >Contact us</span
        >
      </h1>
    </div>
  </div>

  <div
    class="w-full lg:w-2/3 h-screen bg-gradient-to-r from-gray-500  to-black"
  />
</div>
