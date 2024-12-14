<script lang="ts">
  import { t } from 'svelte-i18n';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { onMount } from 'svelte';
  import Map from '$lib/components/Map.svelte';
  import { provinces } from '$lib/data/provinces';
  import { getReportsPerProvince } from '$lib/api/report';

  let reportsData: { [key: string]: { count: number; details: string[] } } = {};
  let selectedProvince: string | null = null;

  let scale = 1; // Current zoom scale
  let translateX = 0; // Current horizontal translation
  let translateY = 0; // Current vertical translation

  const minScale = 1; // Minimum zoom level
  const maxScale = 4; // Maximum zoom level

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

  function handleWheel(event: WheelEvent) {
    event.preventDefault();
    const delta = -event.deltaY * 0.01; // Adjust zoom speed
    scale = Math.min(maxScale, Math.max(minScale, scale + delta));
  }

  function handleMouseDrag(event: MouseEvent) {
    if (event.buttons === 1) {
      // Only drag with left mouse button
      translateX += event.movementX / scale;
      translateY += event.movementY / scale;
    }
  }
</script>

<div class="layout">
  <!-- Fixed Header -->
  <Header />

  <!-- Main Content -->
  <main class="main">
    <!-- Map Section -->
    <div
      class="map-container"
      on:wheel={handleWheel}
      on:mousemove={handleMouseDrag}
    >
      <div
        class="map-inner"
        style="transform: scale({scale}) translate({translateX}px, {translateY}px);"
      >
        <Map
          {provinces}
          data={reportsData}
          {colorScale}
          onProvinceClick={handleProvinceClick}
          tooltipFormatter={tooltipFormatter}
        />
      </div>
      <!-- Show informational text if no province is selected -->
      {#if !selectedProvince}
        <p class="map-info absolute bottom-4 left-4 bg-gray-800 text-white px-4 py-2 rounded-md shadow-md text-sm">
          {$t('reports.map.clickToSeeDetails')}
        </p>
      {/if}
    </div>

    <!-- Modal Overlay for Province Details -->
    {#if selectedProvince}
      <div
        class="modal-overlay fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
        role="dialog"
        aria-labelledby="province-title"
        aria-describedby="province-description"
        tabindex="0"
        on:click|self={closeDetailsPanel}
        on:keydown={(event) => event.key === 'Escape' && closeDetailsPanel()}
      >
        <div class="modal bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
          <button
            class="close-button absolute top-4 right-4 text-red-500 text-2xl font-bold"
            on:click={closeDetailsPanel}
          >
            &times;
          </button>
          <h2 id="province-title" class="text-2xl font-bold text-gray-800">
            {provinces.find((p) => p.id === selectedProvince)?.name || "Detalhes da Província"}
          </h2>
          <p id="province-description" class="text-gray-600 text-lg mt-4">
            <span class="font-medium">{$t('reports.map.provinceDetails.occurrences')}:</span> {reportsData[selectedProvince]?.count || 0}
          </p>
          <ul class="details-list mt-4 space-y-2 text-gray-700 text-sm">
            {#each reportsData[selectedProvince]?.details || [] as detail}
              <li class="flex items-start">
                <span class="bullet w-2 h-2 mt-1.5 rounded-full bg-blue-500 mr-2"></span> {detail}
              </li>
            {/each}
          </ul>
        </div>
      </div>
    {/if}
  </main>

  <!-- Fixed Footer -->
  <Footer />
</div>

<style>
  /* Overall Layout */
  .layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden; /* Prevent scrolling outside the layout */
  }

  /* Header and Footer */
  .header,
  .footer {
    background-color: #333;
    color: white;
    padding: 1rem;
    text-align: center;
    flex-shrink: 0; /* Prevent resizing */
  }

  /* Main Content */
  .main {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f3f4f6; /* Light background for contrast */
  }

  /* Map Container */
  .map-container {
    position: relative;
    width: 90%; /* Adjust width as needed */
    height: 90%;
    aspect-ratio: 16 / 9; /* Maintain fixed aspect ratio (16:9) */
    background-color: #e5e7eb; /* Neutral background for the map area */
    border: 2px solid #ccc;
    border-radius: 8px;
    overflow: hidden; /* Prevent content overflow */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* Map Inner Container (Zoom & Pan) */
  .map-inner {
    display: inline-block;
    transform-origin: center center; /* Keep transformations centered */
    transition: transform 0.1s ease; /* Smooth transitions */
  }

  /* Map Informational Text */
  .map-info {
    position: absolute;
    bottom: 1rem;
    left: 1rem;
    padding: 0.5rem 1rem;
    background-color: #333;
    color: white;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    pointer-events: none; /* Prevent interaction with the info box */
  }

  /* Modal Overlay */
  .modal-overlay {
    z-index: 50;
  }

  /* Modal Window */
  .modal {
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