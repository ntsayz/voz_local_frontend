<script>
  import { t } from 'svelte-i18n';
  import SurveyCard from '$lib/components/survey/SurveyCard.svelte';

  export let mockSurveys = [];

  let scrollTimeout;

  function handleScroll(event) {
    clearTimeout(scrollTimeout);

    scrollTimeout = setTimeout(() => {
      const container = event.target;
      const scrollLeft = container.scrollLeft;
      const children = Array.from(container.children);

      const containerCenter = container.offsetWidth / 2;
      let closestChild = children[0];
      let closestOffset = Math.abs(
        closestChild.offsetLeft + closestChild.offsetWidth / 2 - containerCenter - scrollLeft
      );

      children.forEach((child) => {
        const childCenter = child.offsetLeft + child.offsetWidth / 2;
        const offset = Math.abs(childCenter - containerCenter - scrollLeft);
        if (offset < closestOffset) {
          closestOffset = offset;
          closestChild = child;
        }
      });

      closestChild.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
      });
    }, 100);
  }
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

  <!-- Horizontal Scroll Container -->
  <div
    class="horizontal-scroll-container snap-x overflow-x-auto flex gap-6 mt-8"
    on:scroll={handleScroll}
  >
    {#each mockSurveys as survey (survey.id)}
      <div
        class="group relative flex-shrink-0 snap-center px-4 p-3 border-gray-200 rounded-lg shadow-md hover:shadow-lg hover:border-primary-100 transition flex items-center justify-center w-full md:w-3/4 lg:w-1/2 animate-pulse-shadow"
        data-aos="fade-up"
      >
        <SurveyCard {survey} />
      </div>
    {/each}
  </div>
</div>


  <style>
    /* Horizontal scroll container */
    .horizontal-scroll-container {
  display: flex;
  scroll-snap-type: x mandatory;
  overflow-x: auto;
  padding-bottom: 1rem;
  scrollbar-width: none;
}

.horizontal-scroll-container::-webkit-scrollbar {
  display: none;
}

.horizontal-scroll-container > div {
  scroll-snap-align: center;
  min-width: 80%; /* Ensures one card per view */
  max-width: 90%; /* Ensures cards don’t overflow */
}

@media (min-width: 768px) {
  .horizontal-scroll-container > div {
    min-width: 75%; /* Medium screens: show 75% of card */
    max-width: 75%;
  }
}

@media (min-width: 1024px) {
  .horizontal-scroll-container > div {
    min-width: 49%; /* Larger screens: show 50% of card */
    max-width: 49%;
  }
}


  </style>
  