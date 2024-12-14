<script>
    import { t } from 'svelte-i18n';
  </script>
  
  <div>
    <h1 
      class="text-4xl font-extrabold mb-6 text-primary-500 leading-tight"
      data-aos="fade-up"
    >
      {$t('home.welcome')}
    </h1>
    <p 
      class="text-lg text-gray-700 font-medium leading-relaxed mb-8"
      data-aos="fade-up"
      data-aos-delay="200"
    >
      {$t('home.intro')}
    </p>
  </div>