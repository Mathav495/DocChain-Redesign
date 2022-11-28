<script>
  import axios from "axios"
  import { navigate } from "svelte-routing"
  import Emailicon from "../icons/Emailicon.svelte"
  import PasswordIcons from "../icons/Password.svelte"
  let type = "password"
  let Email = "",
    Password = ""
  let error = {
    Email: "",
    Password: "",
  }
  let valid = false
  const onLogin = async () => {
    console.log(Email)
    console.log(Password)
    valid = true
    const mail = /\S+@\S+\.\S+/g
    const result1 = mail.test(Email)
    if (Email == "") {
      error.Email = "Email can't be empty"
      valid = false
    } else if (!result1) {
      error.Email = "Please Enter valid mail id"
      valid = false
    } else {
      error.Email = ""
    }
    if (Password == "") {
      error.Password = "Password can't be empty"
      valid = false
    } else {
      error.Password = ""
    }
    if (valid) {
      let sampleData = {
        email: Email,
        password: Password,
      }
      const { data } = await axios.post(
        "https://test.swagger.print2block.in/auth/login",
        sampleData
      )
      console.log(data)
      localStorage.setItem("token", data.token)
      let token = localStorage.getItem("token")
      console.log(token)
      if (token) {
        navigate("/dash")
      }
    }
  }
  const showPassword = () => {
    if (type == "password") {
      type = "text"
    } else {
      type = "password"
    }
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
            class="text-xl relative block after:content-['*'] after:ml-1 after:text-red-500  text-gray-400 group-hover:text-white tracking-wide"
            >Email</label
          >
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
              <Emailicon />
            </span>
            <input
              bind:value={Email}
              type="email"
              id="Email"
              placeholder="Enter your Email..."
              class="w-full mt-2 pl-9 placeholder:text-sm bg-black focus:bg-black text-blue-500 rounded border border-gray-300 focus:border-white focus:ring-1 focus:ring-white text-lg outline-none py-1 px-3 leading-8"
            />
          </div>
          <h1 class="pt-1 text-sm font-semibold text-blue-500 md:text-base">
            {error.Email}
          </h1>
        </div>

        <div class="w-96 mt-8 group">
          <label
            for="Password"
            class="text-xl after:content-['*'] after:ml-1 group-hover:text-white  after:text-red-500 text-gray-400 tracking-wide"
            >Password</label
          >
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
              <PasswordIcons />
            </span>
            {#if type == "password"}
              <input
                bind:value={Password}
                type="password"
                id="Password"
                placeholder="Enter your Password..."
                class="w-full mt-2 bg-black pl-10 placeholder:text-sm focus:bg-black text-blue-500 rounded border border-gray-300 focus:border-white focus:ring-1 focus:ring-white  text-lg outline-none py-1 px-3 leading-8"
              />
            {:else}
              <input
                bind:value={Password}
                type="text"
                id="Password"
                placeholder="Enter your Password..."
                class="w-full mt-2 bg-black pl-10 placeholder:text-sm focus:bg-black text-blue-500 rounded border border-gray-300 focus:border-white focus:ring-1 focus:ring-white  text-lg outline-none py-1 px-3 leading-8"
              />
            {/if}

            <button
              on:click={showPassword}
              class="absolute inset-y-0 right-4 flex items-center pl-2"
            >
              {#if type == "password"}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 fill-gray-400 mt-2  group-hover:fill-blue-700"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              {:else}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 fill-gray-400 mt-2  group-hover:fill-blue-700"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              {/if}
            </button>
          </div>

          <h1 class="pt-1 text-sm font-semibold text-blue-500 md:text-base">
            {error.Password}
          </h1>
        </div>

        <h1
          class="text-gray-600 hover:text-white underline underline-offset-4 text-base tracking-wide mt-5 mb-5 cursor-pointer font-normal"
        >
          Forgot Password?
        </h1>
        <div>
          <button
            class="w-96 mt-8 text-white active:bg-blue-900 bg-blue-700 border-0 py-2 px-8 focus:outline-none hover:bg-blue-800  rounded text-lg"
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

  <div class="w-full lg:w-2/3 h-screen" />
</div>
