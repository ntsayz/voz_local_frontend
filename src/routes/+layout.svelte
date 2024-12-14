<script lang="ts">
	import '../i18n'; // Ensure this is the FIRST import
  	import { t } from 'svelte-i18n';
	import '../app.css';
	import { onMount } from 'svelte';
	import { fetchLocations } from '$lib/stores/locations';
	

	export const data = undefined; // Use `export const` for external references

	onMount(() => {
		console.log('Loading locations');
		fetchLocations(); // Fetch locations data when the app loads
	});
</script>

<slot /> <!-- Properly render children here using <slot /> -->
