<script>
  import { t } from 'svelte-i18n';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import MainHeading from '$lib/components/home/MainHeading.svelte';
  import FeaturesSection from '$lib/components/home/FeaturesSection.svelte';
  import SurveysSection from '$lib/components/home/SurveysSection.svelte';
  import InclusionSection from '$lib/components/home/InclusionSection.svelte';
  import CTASection from '$lib/components/home/CTASection.svelte';
  import SurveyCard from '$lib/components/survey/SurveyCard.svelte';
  import { onMount } from 'svelte';
  import 'aos/dist/aos.css';
  // @ts-ignore
  import AOS from 'aos';
  


  const mockSurveys = [
    {
      id: '1',
      title: 'Preferências de Transporte',
      description: 'Indique o meio de transporte que mais usa no seu dia a dia.',
      type: 'single_choice',
      status: 'active',
      category: 'transport',
      results: [
        { label: 'Transporte público (Chapa, autocarro)', votes: 60 },
        { label: 'Veículo pessoal', votes: 25 },
        { label: 'Transporte privado (Táxi, Yango)', votes: 25 },
        { label: 'A pé', votes: 20 },
      ],
      totalVotes: 130,
    },
    {
        id: '6',
        title: 'Percepção sobre a Transformação Digital',
        description: 'Como é que acha que a transformação digital poderia beneficiar a sua comunidade?',
        type: 'ranking',
        status: 'active',
        category: 'technology',
        results: [
          { label: 'Acesso a consultas e serviços de saúde online', rank: 1 },
          { label: 'Acesso online a serviços públicos e administrativos', rank: 2 },
          { label: 'Digitalizaçao de documentos de identificaçao', rank: 3 },
        ],
      },
  ];

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
  }

  img {
    filter: grayscale(40%) contrast(1.2);
    transition: filter 0.3s ease-in-out;
  }

  img:hover {
    filter: grayscale(0);
  }
</style>


