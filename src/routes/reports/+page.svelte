<script lang="ts">
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import { onMount } from 'svelte';
    import { getReportsPerProvince } from '$lib/api/report';
    import Map from '$lib/components/Map.svelte';
    import { provinces } from '$lib/data/provinces';

    let reportsData = {};
    

    onMount(async () => {
      reportsData = await getReportsPerProvince();
    });

    function colorScale(count : number) {
      const shades = { 50: '#E3EDF3', 300: '#5790B3', 500: '#26547C' };
      return count > 5 ? shades[500] : count > 0 ? shades[300] : shades[50];
    }

    function tooltipFormatter(provinceId : string, data :{ [key: string]: number }) {
      return `${data?.count || 0} reports`;
    }

    function handleProvinceClick(provinceId : string) {
      console.log(`Province clicked: ${provinceId}`);
    }

  </script>
  
  <Header/>
  
  <main class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="text-center">
      <h1 class="text-4xl font-bold mb-4">Reports</h1>
      <div class="w-full max-w-4xl">
        <Map
        {provinces}
        data={reportsData}
        {colorScale}
        onProvinceClick={handleProvinceClick}
        tooltipFormatter={tooltipFormatter}
      />
      </div>
    </div>
  </main>

<Footer/>