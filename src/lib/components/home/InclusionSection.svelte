<script>
    import { t } from 'svelte-i18n';
  </script>
  
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
      <!-- Image Cards -->
      <div 
          class="group relative p-7 border-gray-200 rounded-lg shadow-md hover:shadow-lg hover:border-primary-100 transition flex items-center justify-center animate-pulse-shadow"
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
          class="group relative p-7 border-gray-200 rounded-lg shadow-md hover:shadow-lg hover:border-primary-100 transition flex items-center justify-center animate-pulse-shadow"
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