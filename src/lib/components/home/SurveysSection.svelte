<script>
  import { t } from 'svelte-i18n';
  import SurveyCard from '$lib/components/survey/SurveyCard.svelte';

  export let mockSurveys = [];
</script>

<div>
  <h3 
    class="text-2xl font-extrabold mb-6 text-primary-500 pt-12"
    data-aos="fade-up"
    data-aos-delay="400"
  >
    {$t('home.surveys.title')}
  </h3>
  <p class="text-gray-600 pt-6" data-aos="fade-up" data-aos-delay="800">
    {$t('home.surveys.description')}
  </p>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
    {#each mockSurveys as survey (survey.id)}
      <div 
        class="group relative p-3 border-gray-200 rounded-lg shadow-md hover:shadow-lg hover:border-primary-100 transition flex items-center justify-center animate-pulse-shadow"
        data-aos="fade-up"
      >
        <SurveyCard {survey} />
      </div>
    {/each}
  </div>
</div>