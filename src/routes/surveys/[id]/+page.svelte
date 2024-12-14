<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { getSurveyById } from '$lib/api/surveys';
  import { t } from 'svelte-i18n';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import LoadingScreen from '$lib/components/common/LoadingScreen.svelte';

  export let data; // Preloaded survey data (optional with load function)
  let survey;
  let loading = true;
  let timeoutReached = false;

  // Get the ID from the route
  let id = $page.params.id;

  // Timer for redirecting if the fetch takes too long
  onMount(async () => {
    const timeout = setTimeout(() => {
      timeoutReached = true;
    }, 1000); // 10 seconds timeout

    try {
      survey = await getSurveyById(id);
    } catch (error) {
      console.error('Error fetching surveys:', error.message);
    } finally {
      clearTimeout(timeout);
      loading = false;
    }
  });

  // Redirect back if timeout reached
  if (timeoutReached) {
    history.back();
  }
</script>

<Header />

<div class="flex flex-col min-h-screen">
  {#if survey}
  <div class="flex-1 flex flex-col items-center justify-center p-6">
    <h1 class="text-3xl font-bold text-gray-800">{survey.title}</h1>
    <p class="text-gray-600 mt-2">{survey.description}</p>
    <!-- Add survey details or custom content here -->
  </div>
 
  {:else}
  <LoadingScreen />
  {/if}
</div>

<Footer />