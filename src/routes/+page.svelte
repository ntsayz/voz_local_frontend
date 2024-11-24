<script>
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
</script>

<Header />

<main class="min-h-screen flex items-center justify-center bg-gray-100 px-4 md:px-8">
  <div class="text-center max-w-4xl">
    <!-- Main Heading -->
    <h1 class="text-4xl font-extrabold mb-6 text-primary-500 leading-tight">
      Bem-vindo a <span class="text-primary-500">Voz Local</span>
    </h1>
    
    <!-- Subheading -->
    <p class="text-lg text-gray-700 font-medium leading-relaxed mb-8">
      Uma plataforma para conectar e informar a comunidade moçambicana. Aqui, a sua voz é importante. Participe em 
      debates, faça ouvir as suas preocupações e ajude a moldar o futuro do nosso país.
    </p>

    <!-- Features -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
      <!-- Polls Section -->
      <div class="flex flex-col items-center md:items-start">
        <img
          src="graphics/data_trends.svg"
          alt="Mozambique Community Polls"
          class="w-128 h-64 mb-4"
        />
        <h2 class="text-xl font-bold text-brand_grey-800 mb-2">
          Sondagens e Opiniões Públicas
        </h2>
        <p class="text-gray-600">
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
        />
        <h2 class="text-xl font-bold text-brand_grey-800 mb-2">
          Relate Problemas na Comunidade
        </h2>
        <p class="text-gray-600">
          Ajude o governo e ONGs a concentrarem os seus esforços nas áreas que mais precisam, relatando 
          problemas que afetam a sua comunidade, como infraestrutura, segurança e saúde.
        </p>
      </div>
    </div>

    <!-- Call to Action -->
    <div class="mt-12">
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


