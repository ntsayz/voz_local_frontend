<script lang="ts">
    export let survey;
  
    // Default colors for dynamic binary choices
    const defaultColors = ['#4caf50', '#f44336']; // Primary and secondary colors
  
    // Dynamically set colors if not provided in survey metadata
    const colors = survey.results?.colors?.length > 0 ? survey.results.colors : defaultColors;
  </script>
  
  <div class="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-200">
    <h2 class="text-xl font-bold text-gray-800">{survey.title}</h2>
    <p class="text-gray-600 text-sm mt-2">{survey.description}</p>
  
    <div class="mt-4">
      <!-- Multiple Choice & Single Choice -->
      {#if survey.type === 'multiple_choice' || survey.type === 'single_choice'}
        {#each survey.results as option}
          <div class="flex items-center justify-between">
            <span>{option.label}</span>
            <span class="text-sm text-gray-500">{option.votes} votos</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2.5">
            <div
              class="h-2.5 rounded-full"
              style="width: {option.votes / survey.totalVotes * 100}%; background-color: {option.color || '#2196f3'};"
            ></div>
          </div>
        {/each}
      {/if}
  
      <!-- Rating -->
      {#if survey.type === 'rating'}
        <p class="text-sm text-gray-500 mt-2">
            Avaliação média: {survey.results.average} / {survey.results.max}
        </p>
        <div class="w-full bg-gray-200 h-2.5 mt-2">
          <div
            class="h-2.5"
            style="width: {survey.results.average / survey.results.max * 100}%; background-color: {survey.results.color || '#ff9800'};"
          ></div>
        </div>
      {/if}
  
      <!-- Binary -->
      {#if survey.type === 'binary'}
        {#each survey.results.options as option, index}
          <div class="flex items-center justify-between">
            <span>{option.label}: {option.votes} votos</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2.5 mt-1">
            <div
              class="h-2.5"
              style="width: {option.votes / survey.totalVotes * 100}%; background-color: {colors[index]};"
            ></div>
          </div>
        {/each}
      {/if}

      {#if survey.type === 'binary-line'}
      <div class="flex h-4 w-full overflow-hidden rounded-full bg-gray-200">
        {#each survey.results.options as option, index}
          <div
            class="h-full"
            style="
              width: {option.votes / survey.totalVotes * 100}%;
              background-color: {colors[index]};
            "
          ></div>
        {/each}
      </div>
      <div class="flex justify-between mt-2 text-sm text-gray-600">
        {#each survey.results.options as option}
          <span>{option.label}: {option.votes} votos</span>
        {/each}
      </div>
    {/if}
  
      <!-- Matrix -->
      {#if survey.type === 'matrix'}
        <table class="w-full mt-2 border-collapse">
          <thead>
            <tr>
              <th class="border-b text-left">Critério</th>
              {#each survey.results[0].columns as column}
                <th class="border-b text-left">{column}</th>
              {/each}
            </tr>
          </thead>
          <tbody>
            {#each survey.results as row}
              <tr>
                <td class="py-2">{row.label}</td>
                {#each row.values as value}
                  <td class="py-2">{value}</td>
                {/each}
              </tr>
            {/each}
          </tbody>
        </table>
      {/if}
  
      <!-- Ranking -->
      {#if survey.type === 'ranking'}
        <div class="mt-4">
            <h3 class="text-lg font-semibold text-gray-800">Rankings:</h3>
            <ul class="mt-2 space-y-2">
            {#each survey.results as option}
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
        {/if}

    </div>
  
    <button
      class="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200"
    >
      {survey.status === 'Active' ? 'Participate' : 'View Results'}
    </button>
  </div>
  