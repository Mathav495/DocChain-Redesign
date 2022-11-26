<script>
  import axios from "axios"
  import { navigate } from "svelte-routing"
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="w-5 h-5  fill-gray-400 mt-3 group-hover:fill-blue-700"
              >
                <path
                  d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"
                />
                <path
                  d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"
                />
              </svg>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="w-5 h-5 fill-gray-400 mt-2 group-hover:fill-blue-700"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>

            <input
              bind:value={Password}
              type="Password"
              id="Password"
              placeholder="Enter your Password..."
              class="w-full mt-2 bg-black pl-10 placeholder:text-sm focus:bg-black text-blue-500 rounded border border-gray-300 focus:border-white focus:ring-1 focus:ring-white  text-lg outline-none py-1 px-3 leading-8"
            />
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

  <div
    class="w-full lg:w-2/3 h-screen bg-gradient-to-r from-gray-500  to-black"
  />
</div>
