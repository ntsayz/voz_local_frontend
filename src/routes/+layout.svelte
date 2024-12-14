<script lang="ts">
	// Ensure the i18n module initializes first
	import { initializeI18n } from '../i18n';
	import '../app.css';
	import { onMount } from 'svelte';
	import { fetchLocations } from '$lib/stores/locations';
	import { writable } from 'svelte/store';

	// Reactive state for readiness
	export let ready = writable(false); // Use Svelte's store for reactivity

	// Ensure translations are fully initialized before fetching other data
	onMount(async () => {
		console.log('Initializing i18n...');
		await initializeI18n(); // Wait for translations to be ready
		ready.set(true); // Update readiness

		console.log('Loading locations...');
		fetchLocations(); // Fetch locations data after i18n is ready
	});
</script>

<!-- Render a loading state if i18n isn't ready -->
{#if $ready}
	<slot /> <!-- Properly render children here using <slot /> -->
{:else}
	<p>Loading...</p>
{/if}