<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { onMount } from 'svelte';
  import { getReportsPerProvince } from '$lib/api/report';
  import Map from '$lib/components/Map.svelte';
  import { provinces } from '$lib/data/provinces';

  let reportsData: { [key: string]: { count: number; details: string[] } } = {};
  let selectedProvince: string | null = null;

  onMount(async () => {
    reportsData = await getReportsPerProvince();
  });

  function colorScale(count: number) {
    const shades = { 50: '#E3EDF3', 300: '#5790B3', 500: '#26547C' };
    return count > 5 ? shades[500] : count > 0 ? shades[300] : shades[50];
  }

  function tooltipFormatter(provinceId: string) {
    const provinceData = reportsData[provinceId];
    if (!provinceData) return 'No data';
    return `${provinceData.count} reports`;
  }

  function handleProvinceClick(provinceId: string) {
    selectedProvince = provinceId;
  }

  function closeDetailsPanel() {
    selectedProvince = null;
  }
</script>

<Header />

<main class="flex flex-col md:flex-row h-screen">
  <!-- Side Panel -->
  <aside
    class="bg-white shadow-lg md:w-1/3 w-full p-6 h-full overflow-y-auto md:border-r border-gray-300"
  >
    <!-- Default Region Info -->
    <div class="default-content">
      <h2 class="text-2xl font-bold text-gray-800">Reports in Your Region</h2>
      <p class="text-gray-600 text-lg mt-4">
        Explore the map to learn about reports in other regions. Click on a region for more details.
      </p>
    </div>

    <!-- Selected Province Details -->
    {#if selectedProvince}
      <div
        class="selected-content mt-6 border-t border-gray-300 pt-4 transition-opacity duration-300"
      >
        <button
          class="absolute top-4 right-4 text-red-500 text-2xl font-bold"
          on:click={closeDetailsPanel}
        >
          &times;
        </button>
        <h2 class="text-2xl font-bold text-gray-800">
          {provinces.find((p) => p.id === selectedProvince)?.name || "Province Details"}
        </h2>
        <p class="text-gray-600 text-lg mt-4">
          <span class="font-medium">Number of reports:</span> {reportsData[selectedProvince]?.count || 0}
        </p>
        <ul class="mt-4 space-y-2 text-gray-700 text-sm">
          {#each reportsData[selectedProvince]?.details || [] as detail}
            <li class="flex items-start">
              <span class="w-2 h-2 mt-1.5 rounded-full bg-blue-500 mr-2"></span> {detail}
            </li>
          {/each}
        </ul>
      </div>
    {/if}
  </aside>

  <!-- Map Section -->
  <div class="map-container flex-1 flex items-center justify-center relative bg-gray-100">
    <Map
      {provinces}
      data={reportsData}
      {colorScale}
      onProvinceClick={handleProvinceClick}
      tooltipFormatter={tooltipFormatter}
    />
    {#if !selectedProvince}
      <p class="absolute bottom-4 left-4 bg-gray-800 text-white px-4 py-2 rounded-md shadow-md text-sm">
        Click on a province to see details.
      </p>
    {/if}
  </div>
</main>

<Footer />

<style>
  main {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  @media (min-width: 768px) {
    main {
      flex-direction: row;
    }
  }

  .map-container {
    flex: 1;
    position: relative;
  }

  .default-content {
    transition: opacity 0.3s ease-in-out;
  }

  .selected-content {
    animation: slideDown 0.3s ease-in-out forwards;
  }

  @keyframes slideDown {
    from {
      transform: translateY(-10%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
</style>
