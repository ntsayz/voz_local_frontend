<script lang="ts">
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import SurveyCard from '$lib/components/survey/Card.svelte';
    import { mockSurveys } from '$lib/data/mock/surveys';
  
    let surveys = mockSurveys;
    let searchQuery = '';
    let selectedCategory = 'Todos';
    let sortOrder = 'default';
  
    const categories = ['Todos', ...new Set(mockSurveys.map((survey) => survey.category))];
  
    let isCategoryOpen = false;
    let isSortOrderOpen = false;
  
    const toggleCategoryDropdown = () => (isCategoryOpen = !isCategoryOpen);
    const toggleSortOrderDropdown = () => (isSortOrderOpen = !isSortOrderOpen);
  
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
      <div class="relative w-full md:w-auto">
        <label id="category-label" class="block text-sm font-medium text-gray-900">Categoria</label>
        <button
          type="button"
          on:click={toggleCategoryDropdown}
          class="relative w-full cursor-pointer rounded-md bg-white py-2 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 sm:text-sm"
          aria-haspopup="listbox"
          aria-expanded={isCategoryOpen}
          aria-labelledby="category-label"
        >
          <span class="block truncate">{selectedCategory}</span>
          <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg class="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M10.53 3.47a.75.75 0 0 0-1.06 0L6.22 6.72a.75.75 0 0 0 1.06 1.06L10 5.06l2.72 2.72a.75.75 0 1 0 1.06-1.06l-3.25-3.25Zm-4.31 9.81 3.25 3.25a.75.75 0 0 0 1.06 0l3.25-3.25a.75.75 0 1 0-1.06-1.06L10 14.94l-2.72-2.72a.75.75 0 0 0-1.06 1.06Z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
        </button>
        {#if isCategoryOpen}
        <ul
            class="absolute z-10 mt-1 max-h-56 w-full md:w-auto min-w-[150px] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
            tabindex="-1"
            role="listbox"
            aria-labelledby="category-label"
             >
            {#each categories as category}
            <li
                class="relative cursor-pointer select-none py-2 px-3 pr-9 text-gray-900 hover:bg-primary-600 hover:text-white"
                role="option"
                on:click={() => {
                selectedCategory = category;
                isCategoryOpen = false;
                }}
            >
                <span class="block truncate">{category}</span>
            </li>
            {/each}
        </ul>
      
        {/if}
      </div>
  
      <!-- Sort Order -->
      <div class="relative w-full md:w-auto">
        <label id="sortOrder-label" class="block text-sm font-medium text-gray-900">Ordenar por</label>
        <button
          type="button"
          on:click={toggleSortOrderDropdown}
          class="relative w-full cursor-pointer rounded-md bg-white py-2 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 sm:text-sm"
          aria-haspopup="listbox"
          aria-expanded={isSortOrderOpen}
          aria-labelledby="sortOrder-label"
        >
          <span class="block truncate">
            {sortOrder === 'default'
              ? 'Padrão'
              : sortOrder === 'status'
              ? 'Estado (Ativo/Encerrado)'
              : 'Categoria'}
          </span>
          <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg class="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M10.53 3.47a.75.75 0 0 0-1.06 0L6.22 6.72a.75.75 0 0 0 1.06 1.06L10 5.06l2.72 2.72a.75.75 0 1 0 1.06-1.06l-3.25-3.25Zm-4.31 9.81 3.25 3.25a.75.75 0 0 0 1.06 0l3.25-3.25a.75.75 0 1 0-1.06-1.06L10 14.94l-2.72-2.72a.75.75 0 0 0-1.06 1.06Z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
        </button>
        {#if isSortOrderOpen}
          <ul
            class="absolute z-10 mt-1 max-h-56 w-full min-w-[200px] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
            tabindex="-1"
            role="listbox"
            aria-labelledby="sortOrder-label"
          >
            <li
              class="relative cursor-pointer select-none py-2 pl-3  pr-9 text-gray-900 hover:bg-primary-600 hover:text-white"
              role="option"
              on:click={() => {
                sortOrder = 'default';
                isSortOrderOpen = false;
              }}
            >
              <span class="block truncate">Padrão</span>
            </li>
            <li
              class="relative cursor-pointer select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-primary-600 hover:text-white"
              role="option"
              on:click={() => {
                sortOrder = 'status';
                isSortOrderOpen = false;
              }}
            >
              <span class="block truncate">Estado (Ativo/Encerrado)</span>
            </li>
            <li
              class="relative cursor-pointer select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-primary-600 hover:text-white"
              role="option"
              on:click={() => {
                sortOrder = 'category';
                isSortOrderOpen = false;
              }}
            >
              <span class="block truncate">Categoria</span>
            </li>
          </ul>
        {/if}
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
  