<script lang="ts">
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import SurveyCard from '$lib/components/survey/Card.svelte';
    import { mockSurveys } from '$lib/data/mock/surveys';
    
    let surveys = mockSurveys;
    let searchQuery = '';
    let selectedCategory = 'Todos';
    let sortOrder = 'default'; // 'default', 'status', 'category'
  
    const categories = ['Todos', ...new Set(mockSurveys.map((survey) => survey.category))];
  
    // Filters and sorts surveys dynamically
    $: filteredSurveys = surveys
      .filter((survey) => 
        survey.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        survey.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter((survey) => selectedCategory === 'Todos' || survey.category === selectedCategory)
      .sort((a, b) => {
        if (sortOrder === 'status') {
          return a.status.localeCompare(b.status); // Active first
        }
        if (sortOrder === 'category') {
          return a.category.localeCompare(b.category);
        }
        return 0; // Default order
      });
  </script>
  
  <Header />
  
  <main class="container mx-auto p-6">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Pesquisas Populares</h1>
    
    <!-- Filters & Search -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
      <!-- Search -->
      <div class="flex items-center w-full md:w-auto">
        <input
          type="text"
          bind:value={searchQuery}
          placeholder="Pesquisar..."
          class="w-full md:w-80 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>
      
      <!-- Category Filter -->
      <div class="flex items-center">
        <label for="category" class="text-sm font-semibold text-gray-700 mr-2">Categoria:</label>
        <select
          id="category"
          bind:value={selectedCategory}
          class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        >
          {#each categories as category}
            <option value={category}>{category}</option>
          {/each}
        </select>
      </div>
      
      <!-- Sort Order -->
      <div class="flex items-center">
        <label for="sortOrder" class="text-sm font-semibold text-gray-700 mr-2">Ordenar por:</label>
        <select
          id="sortOrder"
          bind:value={sortOrder}
          class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option value="default">Padrão</option>
          <option value="status">Estado (Ativo/Encerrado)</option>
          <option value="category">Categoria</option>
        </select>
      </div>
    </div>
    
    <!-- Surveys Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#if filteredSurveys.length > 0}
        {#each filteredSurveys as survey (survey.id)}
          <SurveyCard {survey} />
        {/each}
      {:else}
        <p class="text-gray-500 text-center col-span-full">Nenhuma pesquisa encontrada.</p>
      {/if}
    </div>
  </main>
  
  <Footer />
  