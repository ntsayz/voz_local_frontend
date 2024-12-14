<script lang="ts">
    import { t } from 'svelte-i18n';
  
    export let categories = [];
    export let searchQuery = '';
    export let selectedCategory = 'all';
    export let sortOrder = 'default';
  
    // New prop to handle filter changes
    export let onChange: (filters: { search: string; category: string; sort: string }) => void;
  
    let isCategoryOpen = false;
    let isSortOrderOpen = false;
  
    const toggleCategoryDropdown = () => (isCategoryOpen = !isCategoryOpen);
    const toggleSortOrderDropdown = () => (isSortOrderOpen = !isSortOrderOpen);
  
    const updateFilters = () => {
      onChange({
        search: searchQuery,
        category: selectedCategory,
        sort: sortOrder,
      });
    };
  </script>
  
  <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
    <!-- Search -->
    <div class="flex items-center w-full md:w-auto">
      <input
        type="text"
        bind:value={searchQuery}
        on:input={updateFilters}
        placeholder="{$t('surveys.searchPlaceholder')}"  
        class="w-full md:w-80 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
      />
    </div>
  
    <!-- Category Filter -->
    <div class="relative w-full md:w-auto">
      <label id="category-label" class="block text-sm font-medium text-gray-900">{$t('surveys.categoryLabel')}</label>
      <button
        type="button"
        on:click={toggleCategoryDropdown}
        class="relative w-full cursor-pointer rounded-md bg-white py-2 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 sm:text-sm"
      >
        <span class="block truncate">{$t(`surveys.dropdowns.category.${selectedCategory}`)}</span>
      </button>
      {#if isCategoryOpen}
        <ul
          class="absolute z-10 mt-1 max-h-56 w-full md:w-auto min-w-[150px] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
        >
          {#each categories as category}
            <li
              class="relative cursor-pointer select-none py-2 px-3 pr-9 text-gray-900 hover:bg-primary-600 hover:text-white"
              on:click={() => {
                selectedCategory = category;
                isCategoryOpen = false;
                updateFilters();
              }}
            >
              <span class="block truncate">{$t(`surveys.dropdowns.category.${category}`)}</span>
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  
    <!-- Sort Order -->
    <div class="relative w-full md:w-auto">
      <label id="sortOrder-label" class="block text-sm font-medium text-gray-900">{$t('surveys.sortOrderLabel')}</label>
      <button
        type="button"
        on:click={toggleSortOrderDropdown}
        class="relative w-full cursor-pointer rounded-md bg-white py-2 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 sm:text-sm"
      >
        <span class="block truncate">{$t(`surveys.dropdowns.sortOrder.${sortOrder}`)}</span>
      </button>
      {#if isSortOrderOpen}
        <ul
          class="absolute z-10 mt-1 max-h-56 w-full min-w-[200px] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
        >
          <li
            class="relative cursor-pointer select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-primary-600 hover:text-white"
            on:click={() => {
              sortOrder = 'default';
              isSortOrderOpen = false;
              updateFilters();
            }}
          >
            <span class="block truncate">{$t('surveys.dropdowns.sortOrder.default')}</span>
          </li>
          <li
            class="relative cursor-pointer select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-primary-600 hover:text-white"
            on:click={() => {
              sortOrder = 'status';
              isSortOrderOpen = false;
              updateFilters();
            }}
          >
            <span class="block truncate">{$t('surveys.dropdowns.sortOrder.status')}</span>
          </li>
          <li
            class="relative cursor-pointer select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-primary-600 hover:text-white"
            on:click={() => {
              sortOrder = 'category';
              isSortOrderOpen = false;
              updateFilters();
            }}
          >
            <span class="block truncate">{$t('surveys.dropdowns.sortOrder.category')}</span>
          </li>
        </ul>
      {/if}
    </div>
  </div>