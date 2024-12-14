<script>
    import { t } from 'svelte-i18n';
  </script>
  
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