<script>
  let year = new Date().getFullYear();
</script>

<style>
  @keyframes marquee {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }

  .animate-marquee {
    display: inline-block;
    animation: marquee 15s linear infinite;
    white-space: nowrap;
  }

  @media (max-width: 640px) {
    .animate-marquee {
      animation: marquee 15s linear infinite;
    }
  }
</style>

<!-- Scrolling Message -->
<div class="bg-primary-400 text-white py-2 overflow-hidden relative">
  <div class="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="flex justify-center relative overflow-hidden">
      <p class="text-sm font-medium animate-marquee">
        Este website está em desenvolvimento e não representa a versão final.
      </p>
    </div>
  </div>
</div>

<!-- Footer -->
<footer class="bg-gray-800">
  <div class="container mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
    <div class="flex flex-col md:flex-row justify-between items-center">
      <!-- Footer Branding -->
      <div class="text-white text-sm text-center md:text-left mb-4 md:mb-0">
        <a href="/" class="font-bold text-lg">Voz Local</a> &copy; {year}
      </div>

      <!-- Footer Navigation -->
      <nav class="flex flex-wrap justify-center md:justify-start space-x-4">
        <a href="/sobre" class="text-gray-300 hover:text-primary-400 text-sm">Sobre Nós</a>
        <a href="/privacidade" class="text-gray-300 hover:text-primary-400 text-sm">Política de Privacidade</a>
        <a href="/contacto" class="text-gray-300 hover:text-primary-400 text-sm">Contacto</a>
      </nav>
    </div>

    <div class="mt-4 text-center text-gray-400 text-xs">
      Feito com ❤️ para Moçambique
    </div>
  </div>
</footer>
