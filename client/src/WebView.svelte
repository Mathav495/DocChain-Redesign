<script>

  import { onMount, createEventDispatcher } from 'svelte';
  import WebViewer from '@pdftron/pdfjs-express';

  let instance = null;
  const dispatch = createEventDispatcher();

	onMount(async () => {
		instance = null
		const ele = document.getElementById('viewer');
	WebViewer(
		{
		licenseKey: '0uTsV6qWffrLJ98Zs5WU	',
      path: '/lib'
		}, ele)
		.then(instance => {
			dispatch('ready', {
				instance
			})
		})
	});

</script>

<style>
	#viewer {
		width: 100%;
		height: 100%;
	}
</style>


<div id='viewer'>

</div>
