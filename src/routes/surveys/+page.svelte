<script lang="ts">
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import { mockSurveys } from '$lib/data/mock/surveys';
  
    let searchQuery = '';
    let filteredSurveys = mockSurveys;
  
    function filterSurveys() {
      filteredSurveys = mockSurveys.filter((survey) =>
        survey.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  </script>
  
  <Header />
  
  <main class="container mx-auto p-6 min-h-screen">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-800">Surveys</h1>
      <input
        type="text"
        class="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search surveys..."
        bind:value={searchQuery}
        on:input={filterSurveys}
      />
    </div>
  
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each filteredSurveys as survey (survey.id)}
        <div
          class="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-200"
        >
          <h2 class="text-xl font-bold text-gray-800">{survey.title}</h2>
          <p class="text-gray-600 text-sm mt-2">{survey.description}</p>
          <div class="mt-4 flex justify-between items-center">
            <span
              class="text-xs font-bold uppercase px-3 py-1 rounded-full"
              class:!bg-green-100="{survey.status === 'Active'}"
              class:!bg-gray-200="{survey.status === 'Closed'}"
              class:!text-green-600="{survey.status === 'Active'}"
              class:!text-gray-500="{survey.status === 'Closed'}"
            >
              {survey.status}
            </span>
            <span class="text-xs text-gray-500">{survey.responses} responses</span>
          </div>
          <button
            class="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200"
          >
            {survey.status === 'Active' ? 'Participate' : 'View Results'}
          </button>
        </div>
      {/each}
    </div>
  </main>
  
  <Footer />
  