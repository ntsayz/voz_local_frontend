<script lang="ts">
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import SurveyCard from '$lib/components/survey/Card.svelte';
    import { mockSurveys } from '$lib/data/mock/surveys';
  
    let filteredSurveys = mockSurveys;
  </script>
  
  <Header />
  
  <main class="container mx-auto p-6">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Popular Surveys</h1>
  
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each filteredSurveys as survey (survey.id)}
        <SurveyCard {survey} />
      {/each}
    </div>
  </main>
  
  <Footer />
  