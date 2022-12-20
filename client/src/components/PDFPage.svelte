<script>
  import { onMount, onDestroy, createEventDispatcher } from "svelte"
  export let page
  let dispatch = createEventDispatcher()
  let canvas
  let width
  let height
  let nextbtn = true
  let prevbtn = true
  let clientWidth
  let mounted
  function measure() {
    dispatch("measure", {
      scale: canvas.clientWidth / width,
    })
  }
  async function render() {
    let _page = await page
    let context = canvas.getContext("2d")
    let viewport = _page.getViewport({ scale: 1, rotation: 0 })
    width = viewport.width
    height = viewport.height
    await _page.render({
      canvasContext: context,
      viewport,
    }).promise
    // measure();
    // window.addEventListener("resize", measure);
  }
  onMount(render)

  onDestroy(() => {
    window.removeEventListener("resize", measure)
  })

  const nextpage = () => {
    if (currentpage < _total_pages) {
      console.log("initial", currentpage)
      showPage(currentpage + 1)
      currentpage++
      console.log("final", currentpage)
    }
  }

  $: if (currentpage < _total_pages) {
    nextbtn = true
  } else {
    nextbtn = false
  }
  $: if (currentpage > 1) {
    prevbtn = true
  } else {
    prevbtn = false
  }
  const previouspage = () => {
    if (currentpage > 1) {
      console.log("initial", currentpage)
      showPage(currentpage - 1)
      currentpage--
      console.log("final", currentpage)
    }
  }
</script>

<div>
  <!-- <canvas id="mycanvas" bind:this={canvas} class="w-full h-auto" style="width: {width}px;" {width} {height} /> -->

  <canvas id="mycanvas" class="border-2 rounded-md overflow-hidden" />
  <!-- <img src="" alt="sampleimage" id="pdf-preview" class="w-full max-h-[34rem] lg:max-h-[37rem]" /> -->
  <div class="flex justify-center items-center gap-8 pt-3">
    <button on:click={previouspage} disabled={!prevbtn}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        class="w-6 h-6 {!prevbtn ? 'stroke-gray-600' : 'stroke-black'}"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.75 19.5L8.25 12l7.5-7.5"
        />
      </svg>
    </button>
    <h1 class="text-lg text-black font-bold">{currentpage}</h1>
    <button on:click={nextpage} disabled={!nextbtn}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        class="w-6 h-6 {!nextbtn ? 'stroke-gray-600' : 'stroke-black'}"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M8.25 4.5l7.5 7.5-7.5 7.5"
        />
      </svg>
    </button>
  </div>
</div>
