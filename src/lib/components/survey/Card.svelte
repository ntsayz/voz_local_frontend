<script lang="ts">
  export let survey;
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
          <span class="text-sm text-gray-500">{option.votes} votes</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2.5">
          <div
            class="bg-blue-500 h-2.5 rounded-full"
            style="width: {option.votes / survey.totalVotes * 100}%"
          ></div>
        </div>
      {/each}
    {/if}

    {#if survey.type === 'slider'}
      <p class="text-sm mt-2">Average Satisfaction: {survey.options[0].average} / {survey.options[0].max}</p>
      <div class="w-full bg-gray-200 h-2.5 mt-2">
        <div
          class="bg-blue-500 h-2.5"
          style="width: {survey.options[0].average / survey.options[0].max * 100}%"
        ></div>
      </div>
    {/if}

    <!-- Rating -->
    {#if survey.type === 'rating'}
      <p class="text-sm text-gray-500 mt-2">Average Rating: {survey.results.average} / {survey.results.max}</p>
      <div class="w-full bg-gray-200 h-2.5 mt-2">
        <div
          class="bg-blue-500 h-2.5"
          style="width: {survey.results.average / survey.results.max * 100}%"
        ></div>
      </div>
    {/if}

    <!-- Binary -->
    {#if survey.type === 'binary'}
      <div class="flex items-center justify-between">
        <span>Yes: {survey.results.yes} votes</span>
        <span>No: {survey.results.no} votes</span>
      </div>
      <div class="flex mt-2">
        <div
          class="bg-green-500 h-2.5 rounded-l-full"
          style="width: {survey.results.yes / survey.totalVotes * 100}%"
        ></div>
        <div
          class="bg-red-500 h-2.5 rounded-r-full"
          style="width: {survey.results.no / survey.totalVotes * 100}%"
        ></div>
      </div>
    {/if}

    <!-- Matrix -->
    {#if survey.type === 'matrix'}
      <table class="w-full mt-2 border-collapse">
        <thead>
          <tr>
            <th class="border-b text-left">Criteria</th>
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
      <ul class="mt-2 text-sm">
        {#each survey.results as option}
          <li>Rank {option.rank}: {option.label}</li>
        {/each}
      </ul>
    {/if}
  </div>

  <button
    class="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200"
  >
    {survey.status === 'Active' ? 'Participate' : 'View Results'}
  </button>
</div>
