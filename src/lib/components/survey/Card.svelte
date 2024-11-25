<script lang="ts">
    export let survey;
  </script>
  
  <div class="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-200">
    <h2 class="text-xl font-bold text-gray-800">{survey.title}</h2>
    <p class="text-gray-600 text-sm mt-2">{survey.description}</p>
  
    <div class="mt-4">
      <!-- Multiple Choice & Single Choice -->
      {#if survey.type === 'multiple_choice' || survey.type === 'single_choice'}
        {#each survey.options as option}
          <div class="flex items-center justify-between">
            <span>{option.label}</span>
            <span class="text-sm text-gray-500">{option.value} votes</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2.5">
            <div
              class="bg-blue-500 h-2.5 rounded-full"
              style="width: {option.value / survey.responses * 100}%"
            ></div>
          </div>
        {/each}
      {/if}
  
      <!-- Rating -->
      {#if survey.type === 'rating'}
        <p class="text-sm text-gray-500 mt-2">Rating: {survey.options[0].value} / {survey.options[0].max}</p>
      {/if}
  
      <!-- Binary -->
      {#if survey.type === 'binary'}
        <div class="flex items-center justify-between">
          <span>Yes: {survey.options[0].value}</span>
          <span>No: {survey.options[1].value}</span>
        </div>
        <div class="flex mt-2">
          <div
            class="bg-green-500 h-2.5 rounded-l-full"
            style="width: {survey.options[0].value / survey.responses * 100}%"
          ></div>
          <div
            class="bg-red-500 h-2.5 rounded-r-full"
            style="width: {survey.options[1].value / survey.responses * 100}%"
          ></div>
        </div>
      {/if}
  
      <!-- Open-Ended -->
      {#if survey.type === 'open_ended'}
        <ul class="mt-2 text-sm text-gray-500">
          {#each survey.options[0].value as comment}
            <li>• {comment}</li>
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
  