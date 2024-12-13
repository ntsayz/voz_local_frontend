<script>
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import SurveyCard from '$lib/components/survey/Card.svelte';
  import { onMount } from 'svelte';
  import 'aos/dist/aos.css';
  import AOS from 'aos';
  

  const mockSurveys = [
    {
      id: '1',
      title: 'Preferências de Transporte',
      description: 'Indique o meio de transporte que mais usa no seu dia a dia.',
      type: 'single_choice',
      status: 'Ativo',
      category: 'Transporte',
      results: [
        { label: 'Transporte público (Chapa, autocarro, etc.)', votes: 60 },
        { label: 'Veículo pessoal', votes: 25 },
        { label: 'Transporte privado (Táxi, Yango, etc.)', votes: 25 },
        { label: 'A pé', votes: 20 },
      ],
      totalVotes: 130,
    },
    {
        id: '10',
        title: 'Qual tecnologia digital traria mais benefícios para o teu dia-a-dia?',
        description: 'Explorar a perceção da população sobre avanços tecnológicos no trabalho, estudo ou serviços públicos.',
        type: 'multiple_choice',
        status: 'Ativo',
        category: 'Tecnologia',
        results: [
          { label: 'Internet acessível e rápida', votes: 70 },
          { label: 'Plataformas de ensino à distância', votes: 50 },
          { label: 'Digitalização de serviços públicos (licenças, registos)', votes: 40 },
          { label: 'Aplicações móveis para transporte e mapas', votes: 30 },
        ],
        totalVotes: 190,
      },
  ];

  onMount(() => {
    AOS.init({
      duration: 800, // Animation duration
      easing: 'ease-in-out', // Animation easing
      once: true, // Run animation only once
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
      Bem-vindo a <span class="text-primary-500">Voz Local</span>
    </h1>
    
    <!-- Subheading -->
    <p 
      class="text-lg text-gray-700 font-medium leading-relaxed mb-8"
      data-aos="fade-up"
      data-aos-delay="200"
    >
      Uma plataforma para conectar e informar a comunidade moçambicana. Aqui, a sua voz é importante. Participe em 
      debates, faça ouvir as suas preocupações e ajude a moldar o futuro do nosso país.
    </p>

    <!-- Features -->
    <div 
      class="grid grid-cols-1 md:grid-cols-2 gap-8 text-left"
      data-aos="fade-up"
      data-aos-delay="400"
    >
      <!-- Polls Section -->
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
          Sondagens e Opiniões Públicas
        </h2>
        <p class="text-gray-600" data-aos="fade-up" data-aos-delay="800">
          Dê a sua opinião em temas importantes que afetam a sua comunidade. As nossas sondagens ajudam a
          identificar o que mais importa para os moçambicanos.
        </p>
      </div>

      <!-- Reports Section -->
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
          Relate Problemas na Comunidade
        </h2>
        <p class="text-gray-600" data-aos="fade-up" data-aos-delay="800">
          Ajude o governo e ONGs a concentrarem os seus esforços nas áreas que mais precisam, relatando 
          problemas que afetam a sua comunidade, como infraestrutura, segurança e saúde.
        </p>
      </div>
    </div>

    <!-- Surveys Section -->
    <h3 
      class="text-2xl font-extrabold mb-6 text-primary-500"
      data-aos="fade-up"
      data-aos-delay="400"
    >
      Faça ouvir a sua opinião
    </h3>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      {#each mockSurveys as survey (survey.id)}
        <div 
          class="group relative p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg hover:border-primary-500 transition"
          data-aos="fade-up"
        >
          <SurveyCard {survey} />
        </div>
      {/each}
    </div>

    <!-- Call to Action -->
    <div 
      class="mt-12"
      data-aos="zoom-in"
    >
      <button class="bg-primary-500 text-white font-semibold px-6 py-3 rounded-md shadow-md hover:bg-primary-600 transition">
        Junte-se a Nós Agora
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


