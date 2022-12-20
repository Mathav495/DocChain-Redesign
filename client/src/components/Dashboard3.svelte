<script>
  import axios from "axios"
  import { onMount } from "svelte"
  import Pagination from "./pagination.svelte"
  import Usagecard1 from "./Usagecard1.svelte"

  let hidden = true
  let token = localStorage.getItem("token")
  let usage = {
    initiated: 0,
    published: 0,
    revoked: 0,
  }
  console.log(token)
  /**
   * onMount function to get a document usage details by calling api
   */
  onMount(async () => {
    const { data } = await axios.get(
      "https://test.swagger.print2block.in/account/usage?from=2022-01-01T00%3A00%3A00Z&to=2022-11-15T00%3A00%3A00Z",
      {
        headers: {
          "x-access-token": token,
        },
      }
    )
    usage = data
    console.log(usage)

    let loader = document.getElementById("load3")
    loader.classList.add("hidden")
    let home = document.getElementById("homepage3")
    home.classList.remove("hidden")
    hidden = false
  })
</script>

<div class:hidden class="flex flex-col lg:flex-row gap-4">
  <div
    class="lg:w-8/12 w-full h-60 lg:h-auto lg:order-1 order-2 shadow-around shadow-gray-200 text-2xl p-4 rounded-md flex flex-col justify-end items-center font-bold text-blue-500"
  >
    <div><Pagination /></div>
  </div>
  <div
    class="flex flex-row lg:flex-col lg:order-2 order-1 w-full lg:w-4/12 gap-4"
  >
    <Usagecard1 {usage} />
  </div>
</div>
