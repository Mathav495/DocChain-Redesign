<script>
  import axios from 'axios';
  import { navigate } from 'svelte-routing';
  import ErrorInfo from '../components/ErrorInfo.svelte';
  import Emailicon from '../icons/Emailicon.svelte';
  import Eye from '../icons/Eye.svelte';
  import Eyeslash from '../icons/Eyeslash.svelte';
  import PasswordIcons from '../icons/Password.svelte';
  let animate = document.querySelector('#particles-js');
  console.log(animate);
  animate.style.display = 'block';
  let sampleData;

  let display = false;
  let type = 'password';
  let Email = '',
    Password = '';
  let error = {
    Email: '',
    Password: '',
  };
  /**
   * @type { boolean }
   */
  let valid = false;
  /**
   * Funtion for submitting login credientials
   */
  const onLogin = async () => {
    console.log(Email);
    console.log(Password);
    valid = true;
    // const mail = /\S+@\S+\.\S+/g;
    // const result1 = mail.test(Email);
    if (Email == '') {
      error.Email = "Email can't be empty";
      valid = false;
    } else {
      error.Email = '';
    }
    if (Password == '') {
      error.Password = "Password can't be empty";
      setTimeout(() => {
        error.Password = '';
      }, 2000);
      valid = false;
    } else {
      error.Password = '';
    }
    if (valid) {
      sampleData = {
        email: Email,
        password: Password,
      };
      const { data } = await axios.post('https://test.swagger.print2block.in/auth/login', sampleData);
      console.log(data);

      if (!data.success) {
        console.log(data.errorCode);
        display = true;

        setTimeout(() => {
          display = false;
        }, 2000);
      } else {
        localStorage.setItem('token', data.token);
        let token = localStorage.getItem('token');
        console.log(token);
        navigate('/dash');
      }
    }
  };

  /**
   * function for hide and show the password
   */
  const showPassword = () => {
    if (type == 'password') {
      type = 'text';
    } else {
      type = 'password';
    }
  };
  const hideErrmsg = () => {
    display = false;
  };
</script>

<svelte:head>
  <title>Loginpage</title>
</svelte:head>
<div class="absolute w-full top-0 left-0">
  <div class="w-full xl:w-1/3 p-10 h-screen bg-black/50">
    <div class="flex justify-center xl:justify-start">
      <img class=" mr-2 inline-block animate-pulse align-top " src="assets\icon1.png" alt="icon1" />
      <h1 class="text-2xl text-white tracking-wide font-normal">DocChain</h1>
    </div>

    <div class="mt-20 flex justify-center xl:justify-start">
      <h1 class="text-white text-4xl font-bold">Login</h1>
    </div>
    <div class="flex justify-center xl:justify-start">
      <form on:submit|preventDefault={onLogin}>
        <div class="w-96 mt-10 group">
          <label for="Email" class="text-xl relative block after:content-['*'] after:ml-1 after:text-red-500  text-gray-400 group-hover:text-white tracking-wide">Email</label>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
              <Emailicon />
            </span>
            <input bind:value={Email} type="text" id="Email" placeholder={error.Email ? error.Email : 'Enter Your Email'} class="w-full mt-2 pl-9  placeholder:text-base  bg-black focus:bg-black text-blue-500 rounded border {error.Email ? 'border-red-500 ring-2 ring-red-500 placeholder:text-red-500' : 'border-gray-300 placeholder:text-blue-500'} focus:border-white focus:ring-1 focus:ring-white text-lg outline-none py-1 px-3 leading-8" />
          </div>
        </div>
        <div class="w-96 mt-8 group">
          <label for="Password" class="text-xl after:content-['*'] after:ml-1 group-hover:text-white  after:text-red-500 text-gray-400 tracking-wide">Password</label>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
              <PasswordIcons />
            </span>
            {#if type == 'password'}
              <input bind:value={Password} type="password" id="Password" placeholder={error.Password ? error.Password : 'Enter Your Password'} class="w-full placeholder:text-base mt-2 bg-black pl-10  focus:bg-black text-blue-500 rounded border {error.Password ? 'border-red-500 ring-2 ring-red-500 placeholder:text-red-500' : 'border-gray-300 placeholder:text-blue-500'} focus:border-white focus:ring-1 focus:ring-white  text-lg outline-none py-1 px-3 leading-8" />
            {:else}
              <input bind:value={Password} type="text" id="Password" placeholder={error.Password ? error.Password : 'Enter Your Password'} class="w-full mt-2 bg-black pl-10 placeholder:text-base focus:bg-black text-blue-500 rounded border {error.Password ? 'border-red-500 ring-2 ring-red-500 placeholder:text-red-500' : 'border-gray-300 placeholder:text-blue-500'} focus:border-white focus:ring-1 focus:ring-white  text-lg outline-none py-1 px-3 leading-8" />
            {/if}

            <button on:click|preventDefault={showPassword} class="absolute inset-y-0 right-4 flex items-center pl-2">
              {#if type == 'password'}
                <Eye />
              {:else}
                <Eyeslash />
              {/if}
            </button>
          </div>
        </div>
        <h1 class="text-gray-400 hover:text-white underline underline-offset-4 text-base tracking-wide mt-5 mb-5 cursor-pointer font-normal">Forgot Password?</h1>
        <div>
          <button class="w-96 mt-5 text-white font-medium active:bg-blue-900 bg-blue-700 border-0 py-2 px-8 focus:outline-none hover:bg-blue-800 tracking-wider uppercase rounded text-lg">login</button>
        </div>
        <div class="pt-4">
          {#if display}
            <ErrorInfo errormsg="Invalid Username or Password" on:click={hideErrmsg} />
          {/if}
        </div>
      </form>
      <h1 class="absolute bottom-0  pb-10 text-base font-medium tracking-wide text-neutral-400">
        Don't have an account? <span class="text-gray-400 hover:text-white tracking-wide cursor-pointer underline underline-offset-4">Contact us</span>
      </h1>
    </div>
  </div>
</div>
