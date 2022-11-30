<script>
  import axios from 'axios';
  import { navigate } from 'svelte-routing';
  import Errormsg from '../components/Errormsg.svelte';
  import Emailicon from '../icons/Emailicon.svelte';
  import Eye from '../icons/Eye.svelte';
  import Eyeslash from '../icons/Eyeslash.svelte';
  import PasswordIcons from '../icons/Password.svelte';
  let type = 'password';
  let Email = '',
    Password = '';
  let error = {
    Email: '',
    Password: '',
  };
  let valid = false;

  const onLogin = async () => {
    console.log(Email);
    console.log(Password);
    valid = true;
    const mail = /\S+@\S+\.\S+/g;
    const result1 = mail.test(Email);
    if (Email == '') {
      error.Email = "Email can't be empty";
      valid = false;
    } else if (!result1) {
      error.Email = 'Please Enter valid mail id';
      valid = false;
    } else {
      error.Email = '';
    }
    if (Password == '') {
      error.Password = "Password can't be empty";
      valid = false;
    } else {
      error.Password = '';
    }
    if (valid) {
      let sampleData = {
        email: Email,
        password: Password,
      };
      const { data } = await axios.post('https://test.swagger.print2block.in/auth/login', sampleData);
      console.log(data);
      localStorage.setItem('token', data.token);
      let token = localStorage.getItem('token');
      console.log(token);
      if (token) {
        navigate('/dash');
      }
    }
  };
  const showPassword = () => {
    if (type == 'password') {
      type = 'text';
    } else {
      type = 'password';
    }
  };
</script>

<div class="flex overflow-hidden">
  <div class=" w-full lg:w-1/3 p-10 h-screen bg-black">
    <div class="flex justify-center lg:justify-start">
      <img class=" mr-2 inline-block animate-pulse align-top " src="assets\icon1.png" alt="icon1" />
      <h1 class="text-2xl text-white tracking-wide font-normal">DocChain</h1>
    </div>

    <div class="mt-20 flex justify-center lg:justify-start">
      <h1 class="text-white text-4xl font-bold">Login</h1>
    </div>
    <div class="flex justify-center lg:justify-start">
      <form on:submit|preventDefault={onLogin}>
        <div class="w-96 mt-10 group">
          <label for="Email" class="text-xl relative block after:content-['*'] after:ml-1 after:text-red-500  text-gray-400 group-hover:text-white tracking-wide">Email</label>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
              <Emailicon />
            </span>
            <input bind:value={Email} type="email" id="Email" placeholder="Enter your Email..." class="w-full mt-2 pl-9 placeholder:text-sm bg-black focus:bg-black text-blue-500 rounded border border-gray-300 focus:border-white focus:ring-1 focus:ring-white text-lg outline-none py-1 px-3 leading-8" />
          </div>
          <Errormsg errormsg={error.Email} />
        </div>
        <div class="w-96 mt-8 group">
          <label for="Password" class="text-xl after:content-['*'] after:ml-1 group-hover:text-white  after:text-red-500 text-gray-400 tracking-wide">Password</label>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
              <PasswordIcons />
            </span>
            {#if type == 'password'}
              <input bind:value={Password} type="password" id="Password" placeholder="Enter your Password..." class="w-full mt-2 bg-black pl-10 placeholder:text-sm focus:bg-black text-blue-500 rounded border border-gray-300 focus:border-white focus:ring-1 focus:ring-white  text-lg outline-none py-1 px-3 leading-8" />
            {:else}
              <input bind:value={Password} type="text" id="Password" placeholder="Enter your Password..." class="w-full mt-2 bg-black pl-10 placeholder:text-sm focus:bg-black text-blue-500 rounded border border-gray-300 focus:border-white focus:ring-1 focus:ring-white  text-lg outline-none py-1 px-3 leading-8" />
            {/if}

            <button on:click|preventDefault={showPassword} class="absolute inset-y-0 right-4 flex items-center pl-2">
              {#if type == 'password'}
                <Eye />
              {:else}
                <Eyeslash />
              {/if}
            </button>
          </div>

          <Errormsg errormsg={error.Password} />
        </div>

        <h1 class="text-gray-600 hover:text-white underline underline-offset-4 text-base tracking-wide mt-5 mb-5 cursor-pointer font-normal">Forgot Password?</h1>
        <div>
          <button class="w-96 mt-8 text-white active:bg-blue-900 bg-blue-700 border-0 py-2 px-8 focus:outline-none hover:bg-blue-800  rounded text-lg">LOGIN</button>
        </div>
      </form>
      <h1 class="text-slate-400 tracking-wide  font-medium text-base absolute bottom-0 pb-10">
        Don't have an account? <span class="text-gray-600 tracking-wide cursor-pointer underline underline-offset-4">Contact us</span>
      </h1>
    </div>
  </div>

  <div class="w-full hidden lg:block lg:w-2/3 h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-black ">
    <div class="animation bg-gradient-to-r from-gray-700 via-gray-900 to-black ">
      <div class="particles" />
      <div class="particles" />
      <div class="particles" />
    </div>
  </div>
</div>

<style>
  .animation * {
    box-sizing: border-box;
    position: absolute;
    transform-style: preserve-3d;
  }

  .animation *:before,
  .animation *:after {
    box-sizing: border-box;
    transform-style: preserve-3d;
    position: absolute;
    content: '';
  }
  .animation {
    margin: 0;
    animation: gradient 15s ease infinite;
    background-size: 400% 400%;
    background-attachment: fixed;
    padding: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    perspective: 50vmin;
    background-size: 100vw 100vh;
  }

  @keyframes gradient {
    0% {
      background-position: 0% 0%;
    }
    50% {
      background-position: 100% 100%;
    }
    100% {
      background-position: 0% 0%;
    }
  }

  .particles {
    position: absolute;
  }

  .particles:before,
  .particles:after {
    width: 200vw;
    height: 200vh;
    left: -50vw;
    top: -50vh;
    content: '';
    border-radius: 100%;
    opacity: 0;
    transform: translateZ(-50vmin);
    background-image: repeating-conic-gradient(rgba(238, 232, 232, 0.533) 0%, transparent 0.0002%, transparent 0.075%, transparent 0.65%), repeating-conic-gradient(rgb(255, 255, 255) 0%, transparent 0.0004%, transparent 0.05%, transparent 0.495%);
    animation: particlesMovement 15s linear infinite;
    z-index: 1;
  }

  .particles:after {
    animation-name: particlesMovement2;
    animation-delay: 1s;
  }
  .particles + .particles + .particles::before {
    animation-delay: 2s;
  }
  .particles + .particles + .particles::after {
    animation-delay: 3s;
  }

  @keyframes particlesMovement {
    0% {
      transform: translateZ(-50vmin);
      opacity: 0;
    }
    30%,
    70%,
    90% {
      opacity: 1;
    }
    100% {
      transform: translateZ(50vmin) rotate(15deg);
      opacity: 0;
    }
  }

  @keyframes particlesMovement2 {
    0% {
      transform: translateZ(-50vmin) rotate(180deg);
      opacity: 0;
    }
    30%,
    70%,
    90% {
      opacity: 1;
    }
    100% {
      transform: translateZ(50vmin) rotate(195deg);
      opacity: 0;
    }
  }
</style>
