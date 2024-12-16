<script>
  import { t } from 'svelte-i18n';
  import Header from '$lib/components/common/Header.svelte';
  import Footer from '$lib/components/common/Footer.svelte';
  import MainHeading from '$lib/components/home/MainHeading.svelte';
  import FeaturesSection from '$lib/components/home/FeaturesSection.svelte';
  import SurveysSection from '$lib/components/home/SurveysSection.svelte';
  import InclusionSection from '$lib/components/home/InclusionSection.svelte';
  import CTASection from '$lib/components/home/CTASection.svelte';
  import { onMount } from 'svelte';
  import 'aos/dist/aos.css';
  // @ts-ignore
  import AOS from 'aos';
  import { mockSurveys as allMockSurveys } from '$lib/data/mock/surveys';

  // Limit surveys to two items
  let mockSurveys = allMockSurveys.slice(0, 2);

  onMount(() => {
    AOS.init({
      duration: 800, // Animation duration
      easing: 'ease-in-out', // Animation easing
      once: true, // Run animation only once
      anchorPlacement: 'top-center',
    });
  });
</script>

<Header />
<main class="min-h-screen flex items-center justify-center bg-gray-100 px-4 md:px-8">
  <div class="text-center max-w-4xl">
    <MainHeading />
    <FeaturesSection />
    <SurveysSection {mockSurveys} />
    <InclusionSection />
    <CTASection />
  </div>
</main>
<Footer />

<style>
  main {
    padding-top: 2rem;
    padding-bottom: 2rem;
    margin-top: 64px;
  }

  img {
    filter: grayscale(40%) contrast(1.2);
    transition: filter 0.3s ease-in-out;
  }

  img:hover {
    filter: grayscale(0);
  }
</style>
