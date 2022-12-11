<script>
  import { createEventDispatcher } from 'svelte';
  import { pannable } from '../d-sign';
  const dispatch = createEventDispatcher();
  let canvas;
  let x = 0,
    y = 0;
  let path = '';
  let minimumX = Infinity;
  let maximumX = 0;
  let minimumY = Infinity;
  let maximumY = 0;
  let paths = [];
  let signing = false;

  const handleMouseStart = (e) => {
    if (e.detail.target !== canvas) {
      return (signing = false);
    }
    signing = true;
    x = e.detail.x;
    console.log(x);
    y = e.detail.y;
    console.log(y);

    minimumX = Math.min(minimumX, x);
    maximumX = Math.max(maximumX, x);
    minimumY = Math.min(minimumY, y);
    maximumY = Math.max(maximumY, y);
 //adding new mousepointer position while signing
    paths.push(["M", x , y])
    path += `M${x}, ${y}`
    console.log(path)
  };

  const handleMouseMove = (e) => {
    if(!signing) return
    x = e.detail.x;
    y = e.detail.y;
    minimumX = Math.min(minimumX, x);
    maximumX = Math.max(maximumX, x);
    minimumY = Math.min(minimumY, y);
    maximumY = Math.max(maximumY, y);
    paths.push(["L", x, y]); //adding new length
    path += `L${x}, ${y}`;
  }

  const handleMouseEnd = () => {
    signing = false
  }


  const finish = () => {
    if(!paths.length) return

    const dx = -(minimumX -10)
    const dy = -(minimumY -10)
    const width = maximumX - minimumX + 15
    const height = maximumY - minimumY + 15
    dispatch ("finish" , {
      originWidth: width,
      originHeight : height,
      path: paths.reduce((acc, cur) => {
        return acc + cur[0] + (cur[1] + dx) + "," + (cur[2] + dy);
      }, "")
    })
  }
  const cancel = () => {
    dispatch("cancel")
  }
</script>

<div
  bind:this={canvas}
  use:pannable
  on:panstart={handleMouseStart}
  on:panmove={handleMouseMove}
  on:panend={handleMouseEnd}
  class="relative w-full h-full select-none">
  <div class="absolute right-0 bottom-0 mr-4 mb-4 flex">
    <button
      on:click={cancel}
      class=" w-24 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4
      rounded mr-4">
      Cancel
    </button>
    <button
      on:click={finish}
      class="w-24 bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-4
      rounded">
      Done
    </button>
  </div>
  <svg class="w-full h-full pointer-events-none">
    <path
      stroke-width="5"
      stroke-linejoin="round"
      stroke-linecap="round"
      d={path}
      stroke="black"
      fill="none" />
  </svg>
</div>
