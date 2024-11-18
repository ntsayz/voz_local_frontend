<script lang="ts">
	import '../app.css'
	import { onMount } from 'svelte';
	import { fetchLocations } from '$lib/stores/locations';
	let { children } = $props();
	

  onMount(() => {
	console.log("Loading locations");
    fetchLocations(); // Fetch locations data when the app loads
  });
</script>

{@render children()}
