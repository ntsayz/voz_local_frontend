<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { getSurveys, getSurveyById } from '$lib/api/surveys';
    import { t } from 'svelte-i18n';
	import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
  
    export let data; // Preloaded survey data (optional with load function)
    let survey;
    let loading = true;
  
    // Get the ID from the route
    let id = $page.params.id;
  
    // Fetch survey data
    onMount(async () => {
    try {
      survey = await getSurveyById(id);
    } catch (error) {
      console.error('Error fetching surveys:', error.message);
    } finally {
      loading = false;
    }
  });
  </script>
<Header />

  <div class="container mx-auto p-6">
    {#if survey}
      <h1 class="text-3xl font-bold text-gray-800">{survey.title}</h1>
      <p class="text-gray-600">{survey.description}</p>
      <!-- Add survey details or custom content -->
    {:else}
      <p>Loading...</p>
    {/if}
  </div>

<Footer/>