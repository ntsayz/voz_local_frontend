<script lang="ts">
    import { t } from 'svelte-i18n';
  
    export let category;
    export let status;
  
    // Translations
    $: categoryTranslation = $t(`surveys.dropdowns.category.${category}`);
    $: statusTranslation = $t(`surveys.dropdowns.statuses.${status}`);
  </script>
  
  <div class="flex justify-between items-center mb-4">
    <span class="bg-gray-200 text-gray-600 text-sm px-3 py-1 rounded-full">
      {categoryTranslation || category}
    </span>
    <span
      class={`text-xs font-semibold px-3 py-1 rounded-full ${
        status === 'active' ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'
      }`}
    >
      {statusTranslation || status}
    </span>
  </div>