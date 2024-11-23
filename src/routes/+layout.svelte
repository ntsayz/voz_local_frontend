<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { fetchLocations } from '$lib/stores/locations';

	export let data; // This is required to ensure `data` from parent layouts is accessible.

	onMount(() => {
		console.log('Loading locations');
		fetchLocations(); // Fetch locations data when the app loads
	});
</script>

<slot /> <!-- Properly render children here using <slot /> -->
