<script lang="ts">
    export let results;
  </script>
  
  <div class="mt-4">
    <h3 class="text-lg font-semibold text-gray-800">Rankings:</h3>
    <ul class="mt-2 space-y-2">
      {#each results as option}
        <li class="flex items-center bg-gray-100 rounded-lg p-3 shadow-sm">
          <div
            class="flex items-center justify-center w-8 h-8 rounded-full text-white font-bold mr-3"
            style="background-color: hsl({option.rank * 36}, 70%, 50%);" 
          >
            {option.rank}
          </div>
          <div class="text-gray-700">{option.label}</div>
        </li>
      {/each}
    </ul>
  </div>