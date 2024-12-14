<script lang="ts">
  import SurveyProgressBar from './CardProgressBar.svelte';

  export let survey;

  // Default colors
  const defaultColors = ['#4caf50', '#f44336'];
  const colors = survey.results?.colors?.length > 0 ? survey.results.colors : defaultColors;
</script>

<div>
  <!-- Multiple Choice & Single Choice -->
  {#if survey.type === 'multiple_choice' || survey.type === 'single_choice'}
    {#each survey.results as option, index}
      <SurveyProgressBar
        label={option.label}
        votes={option.votes}
        totalVotes={survey.totalVotes}
        color={option.color || colors[index]}
      />
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

  <!-- Binary Line -->
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
  {/if}
</div>