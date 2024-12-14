<script lang="ts">
  import { t } from 'svelte-i18n';
  import SurveyCardHeader from '$lib/components/survey/pollComponents/CardHeader.svelte';
  import SurveyCardBody from '$lib/components/survey/pollComponents/CardBody.svelte';
  import SurveyRanking from '$lib/components/survey/pollComponents/Ranking.svelte';
  import SurveyMatrix from '$lib/components/survey/pollComponents/Matrix.svelte';
  import { goto } from '$app/navigation';
  export let survey;

  let clicked = false;

  const handleClick = () => {
    clicked = true;
    setTimeout(() => (clicked = false), 200);
    goto(`/surveys/${survey.id}`);
  };
</script>

<div
  class="survey-card select-none bg-white shadow-lg rounded-lg p-6 hover:animate-pulse-shadow hover:shadow-xl transition-transform duration-200"
  role="button"
  class:clicked={clicked}
  on:click={handleClick}
  aria-label={`Survey: ${survey.title}`}
>
  <SurveyCardHeader category={survey.category} status={survey.status} />
  <h2 class="text-xl font-bold text-gray-800">{survey.title}</h2>
  <p class="text-gray-600 text-sm mt-2">{survey.description}</p>

  <div class="mt-4">
    <SurveyCardBody {survey} />
    {#if survey.type === 'ranking'}
      <SurveyRanking results={survey.results} />
    {/if}
    {#if survey.type === 'matrix'}
      <SurveyMatrix results={survey.results} />
    {/if}
  </div>
</div>

<style>
  .survey-card {
    transform: scale(1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .survey-card.clicked {
    transform: scale(1.05);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
  }
</style>