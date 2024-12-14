<script lang="ts">
  import { t } from 'svelte-i18n';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import SurveyCard from '$lib/components/survey/SurveyCard.svelte';
  import Filters from '$lib/components/survey/Filters.svelte';
  import { mockSurveys } from '$lib/data/mock/surveys';

  let surveys = mockSurveys;
  let searchQuery = '';
  let selectedCategory = 'all';
  let sortOrder = 'default';

  // Categories
  const categories = ['all', ...new Set(mockSurveys.map((survey) => survey.category))];

  // Filters and sorts surveys dynamically
  $: filteredSurveys = surveys
    .filter((survey) =>
      survey.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      survey.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((survey) => selectedCategory === 'all' || survey.category === selectedCategory)
    .sort((a, b) => {
      if (sortOrder === 'status') {
        return a.status.localeCompare(b.status);
      }
      if (sortOrder === 'category') {
        return a.category.localeCompare(b.category);
      }
      return 0;
    });

  // Handle filter and sort changes
  const updateFilters = ({ search, category, sort }) => {
    searchQuery = search || searchQuery;
    selectedCategory = category || selectedCategory;
    sortOrder = sort || sortOrder;
  };
</script>

<div class="page-container">
  <Header />

  <main class="container mx-auto p-6">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">{$t('surveys.title')}</h1>

    <!-- Filters Component -->
    <Filters
    {categories}
    {searchQuery}
    {selectedCategory}
    {sortOrder}
    onChange={(filters) => {
      searchQuery = filters.search;
      selectedCategory = filters.category;
      sortOrder = filters.sort;
    }}
  />

    <!-- Surveys Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#if filteredSurveys.length > 0}
        {#each filteredSurveys as survey (survey.id)}
          <SurveyCard {survey} />
        {/each}
      {:else}
        <p class="text-gray-500 text-center col-span-full">{$t('surveys.noResults')}</p>
      {/if}
    </div>
  </main>

  <Footer />
</div>

<style>
.page-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>