<script>
  const selectNav = (id) => {
    for (let i = 1; i < 8; i++) {
      document.getElementById(`nav${i}`).classList.remove('border-x-2');
    }
    document.getElementById(`nav${id}`).classList.add('border-x-2');
  };
</script>

<nav class="text-base font-semibold flex flex-col gap-6">
  <a href="/dash" class="group flex transition-all duration-100 ease-in-out flex-row gap-1 items-center hover:border-x-2 border-blue-500 px-2  rounded-md" id="nav1" on:click|preventDefault={() => selectNav(1)}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-8 w-8 flex-shrink-0 transition-all duration-100 ease-in-out rounded-md ">
      <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
      <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
    </svg>
    <span class="text-white w-full  rounded-md px-3 py-1">Dashboard</span>
  </a>
  <a href="/publish" class="group flex transition-all duration-100 ease-in-out flex-row gap-1 items-center  hover:border-x-2 border-blue-500 px-2  rounded-md" id="nav2" on:click|preventDefault={() => selectNav(2)}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-8 w-8 flex-shrink-0 transition-all duration-100 ease-in-out  rounded-md ">
      <path fill-rule="evenodd" d="M6.912 3a3 3 0 00-2.868 2.118l-2.411 7.838a3 3 0 00-.133.882V18a3 3 0 003 3h15a3 3 0 003-3v-4.162c0-.299-.045-.596-.133-.882l-2.412-7.838A3 3 0 0017.088 3H6.912zm13.823 9.75l-2.213-7.191A1.5 1.5 0 0017.088 4.5H6.912a1.5 1.5 0 00-1.434 1.059L3.265 12.75H6.11a3 3 0 012.684 1.658l.256.513a1.5 1.5 0 001.342.829h3.218a1.5 1.5 0 001.342-.83l.256-.512a3 3 0 012.684-1.658h2.844z" clip-rule="evenodd" />
    </svg>
    <p class="text-white w-full  rounded-md px-3 py-1">Publish Document</p>
  </a>
  <a href="/dash" class="group flex transition-all duration-100 ease-in-out flex-row gap-1 items-center  hover:border-x-2 border-blue-500 px-2  rounded-md" id="nav3" on:click|preventDefault={() => selectNav(3)}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-8 w-8 flex-shrink-0 transition-all duration-100 ease-in-out  rounded-md ">
      <path d="M11.47 1.72a.75.75 0 011.06 0l3 3a.75.75 0 01-1.06 1.06l-1.72-1.72V7.5h-1.5V4.06L9.53 5.78a.75.75 0 01-1.06-1.06l3-3zM11.25 7.5V15a.75.75 0 001.5 0V7.5h3.75a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9a3 3 0 013-3h3.75z" />
    </svg>
    <span class="text-white w-full  rounded-md px-3 py-1">Bulk Upload</span>
  </a>
  <a href="/dash" class="group flex transition-all duration-100 ease-in-out flex-row gap-1 items-center  hover:border-x-2 border-blue-500 px-2  rounded-md" id="nav4" on:click|preventDefault={() => selectNav(4)}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-8 w-8 flex-shrink-0 transition-all duration-100 ease-in-out  rounded-md ">
      <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625z" />
      <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
    </svg>
    <span class="text-white w-full  rounded-md px-3 py-1">Documents</span>
  </a>
  <a href="/dash" class="group flex transition-all duration-100 ease-in-out items-center flex-row gap-1  hover:border-x-2 border-blue-500 px-2  rounded-md" id="nav5" on:click|preventDefault={() => selectNav(5)}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-8 w-8 flex-shrink-0 transition-all duration-100 ease-in-out  rounded-md ">
      <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
    </svg>
    <span class="text-white w-full  rounded-md px-3 py-1">Recievers</span>
  </a>
  <a href="/dash" class="group flex transition-all duration-100 ease-in-out items-center flex-row gap-1  hover:border-x-2 border-blue-500 px-2  rounded-md" id="nav6" on:click|preventDefault={() => selectNav(6)}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-8 w-8 flex-shrink-0 transition-all duration-100 ease-in-out  rounded-md ">
      <path fill-rule="evenodd" d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z" clip-rule="evenodd" />
      <path fill-rule="evenodd" d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z" clip-rule="evenodd" />
    </svg>
    <p class="text-white w-full  rounded-md px-3 py-1">Analytics</p>
  </a>
  <a href="/dash" class="group flex transition-all duration-100 ease-in-out items-center flex-row gap-1  hover:border-x-2 border-blue-500 px-2  rounded-md" id="nav7" on:click|preventDefault={() => selectNav(7)}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-8 w-8 flex-shrink-0 transition-all duration-100 ease-in-out  rounded-md ">
      <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
    </svg>
    <span class="text-white w-full  rounded-md px-3 py-1">Templates</span>
  </a>
</nav>
