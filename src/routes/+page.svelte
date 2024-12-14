<script>
  import { t } from 'svelte-i18n';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import SurveyCard from '$lib/components/survey/Card.svelte';
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
    <!-- Main Heading -->
    <h1 
      class="text-4xl font-extrabold mb-6 text-primary-500 leading-tight"
      data-aos="fade-up"
    >
    {$t('home.welcome')}
    </h1>
    
    <!-- Subheading -->
    <p 
      class="text-lg text-gray-700 font-medium leading-relaxed mb-8"
      data-aos="fade-up"
      data-aos-delay="200"
    >
    {$t('home.intro')} 
    </p>

    <!-- Features -->
    <div 
      class="grid grid-cols-1 md:grid-cols-2 gap-8 text-left"
      data-aos="fade-up"
      data-aos-delay="400"
    >
      <!-- Polls Section -->
      <div 
          class="group relative p-7 border-gray-200 rounded-lg shadow-md hover:shadow-lg hover:border-primary-500 transition flex items-center justify-center hover:animate-pulse-shadow"
          data-aos="fade-up"
        >
        <div class="flex flex-col items-center md:items-start">
          <img
            src="graphics/data_trends.svg"
            alt="Mozambique Community Polls"
            class="w-128 h-64 mb-4"
            data-aos="zoom-in"
          />
          <h2 
            class="text-xl font-bold text-brand_grey-800 mb-2"
            data-aos="fade-up"
            data-aos-delay="600"
          >
          {$t('home.features.polls.title')}
          </h2>
          <p class="text-gray-600" data-aos="fade-in" data-aos-delay="1000">
            {$t('home.features.polls.description')}
          </p>
        </div>
      </div>

      <!-- Reports Section -->

      <div 
          class="group relative p-7 border-gray-200 rounded-lg shadow-md hover:shadow-lg hover:border-primary-100 transition flex items-center justify-center hover:animate-pulse-shadow"
          data-aos="fade-up"
        >

        <div class="flex flex-col items-center md:items-start">
          <img
            src="graphics/people.svg"
            alt="Mozambique Issue Reports"
            class="w-128 h-64 mb-4 text-primary-300"
            data-aos="zoom-in"
          />
          <h2 
            class="text-xl font-bold text-brand_grey-800 mb-2"
            data-aos="fade-up"
            data-aos-delay="600"
          >
          {$t('home.features.reports.title')}
          </h2>
          <p class="text-gray-600" data-aos="fade-in" data-aos-delay="1000">
            {$t('home.features.reports.description')}
          </p>
        </div>
      </div>



    </div>

    
  <div
  >

    <!-- Surveys Section -->
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
          class="group relative p-3 border-gray-200 rounded-lg shadow-md hover:shadow-lg hover:border-primary-100 transition flex items-center justify-center hover:animate-pulse-shadow"
          data-aos="fade-up"
        >
          <SurveyCard {survey} />
        </div>
      {/each}
    </div>
    

  </div>

  <div class="pt-12">
    <h3 
      class="text-2xl font-extrabold mb-6 text-primary-500"
      data-aos="fade-up"
      data-aos-delay="400"
    >
    {$t('home.inclusion.title')}
    </h3>

    <p class="text-gray-600 pt-6" data-aos="fade-up" data-aos-delay="800">
      {@html $t('home.inclusion.description', {
        values: {
          link: `<a href="#" class="text-primary-500">${$t('home.inclusion.location_sugestion_text')}</a>`
        }
      })}
    </p>
    

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div 
            class="group relative p-7 border-gray-200 rounded-lg shadow-md hover:shadow-lg hover:border-primary-100 transition flex items-center justify-center hover:animate-pulse-shadow"
            data-aos="fade-up"
        >
            <div 
              class="group relative p-3 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg hover:border-primary-100 transition flex items-center justify-center"
              data-aos="fade-up"
            >

              <img
                  src="demo/location3.png"
                  alt="List of communities"
                  class="w-128 h-64 mb-4 text-primary-300 rounded-lg"
                  data-aos="zoom-in"
                />
            
            </div>
        
        </div>

        <div 
            class="group relative p-7 border-gray-200 rounded-lg shadow-md hover:shadow-lg hover:border-primary-100 transition flex items-center justify-center hover:animate-pulse-shadow"
            data-aos="fade-up"
        >
            <div 
              class="group relative p-3 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg hover:border-primary-100 transition flex items-center justify-center"
              data-aos="fade-up"
            >

              <img
                  src="demo/location4.png"
                  alt="List of communities"
                  class="w-128 h-64 mb-4 text-primary-300 rounded-lg"
                  data-aos="zoom-in"
                />
            
            </div>
        
        </div>

    </div>

      
  </div>
    <!-- Call to Action -->
    <div 
      class="mt-12"
      data-aos="zoom-in"
    >
      <button class="bg-primary-500 text-white font-semibold px-6 py-3 rounded-md shadow-md hover:bg-primary-600 transition">
        {$t('home.cta.button')}
      </button>
    </div>
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


