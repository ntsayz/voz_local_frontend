<script lang="ts">
  import { t } from 'svelte-i18n';
  import Map from '$lib/components/reports/Map.svelte';
  import NotificationContainer from '$lib/components/common/NotificationContainer.svelte';
  export let provinces: { id: string; name: string; d: string }[] = [];
  export let data: { [key: string]: { count: number; details: string[] } } = {};
  export let colorScale: (count: number) => string = (count) => '#ccc';
  export let onProvinceClick: (id: string) => void = () => {};
  export let tooltipFormatter: (id: string) => string = (id) => '';

  let scale = 1;
  let translateX = 0;
  let translateY = 0;
  const minScale = 1;
  const maxScale = 4;
  let isDragging = false;
  let lastMouseX = 0;
  let lastMouseY = 0;

  let notifications = [
    "Cidade de Maputo: Corte de energia no Bairro de Maxaquene devido a avaria técnica. EDM informada.",
    "Cabo Delgado: Chuvas intensas previstas. Alerta para inundações.",
    "Nampula: Obras no Km 200 da N104 causam trânsito em Mómula.",
    "Sofala: Caminão avariado na EN6 provoca filas em Dondo.",
    "Inhambane: Abastecimento de água interrompido em Maxixe para manutenção. FIPAG informado.",
    "Gaza: Forte vento danifica telhados na região de Chibuto. Equipas de emergência acionadas.",
    "Zambézia: Ponte sobre o rio Licungo sob inspeção. Rota alternativa sugerida.",
    "Tete: Interrupção de rede de telefonia em Moatize devido a falha técnica. Operadora notificada.",
    "Niassa: Registo de incêndio florestal próximo a Lichinga. Autoridades em alerta.",
    "Manica: Deslizamento de terra afeta EN7 perto de Machipanda. Trânsito condicionado."
    ];



  // Handles zooming via the mouse wheel
  function handleWheel(event: WheelEvent) {
    event.preventDefault();
    const delta = -event.deltaY * 0.01;
    scale = Math.min(maxScale, Math.max(minScale, scale + delta));
  }

  // Handles the start of dragging
  function startDrag(event: MouseEvent) {
    isDragging = true;
    lastMouseX = event.clientX;
    lastMouseY = event.clientY;
  }

  // Ends dragging
  function endDrag() {
    isDragging = false;
  }

  // Handles dragging movement
  function handleMouseMove(event: MouseEvent) {
    if (!isDragging) return;

    const dx = event.clientX - lastMouseX;
    const dy = event.clientY - lastMouseY;
    translateX += dx / scale;
    translateY += dy / scale;

    lastMouseX = event.clientX;
    lastMouseY = event.clientY;
  }
</script>

<div
  class="map-container"
  on:wheel={handleWheel}
  on:mousedown={startDrag}
  on:mouseup={endDrag}
  on:mouseleave={endDrag}
  on:mousemove={handleMouseMove}
>
<NotificationContainer
    {notifications}
    entryDirection="top"
    cycleInterval={5000}
  />
  <!-- Map Content -->
  <div
    class="map-inner"
    style="transform: scale({scale}) translate({translateX}px, {translateY}px);"
  >

  
    <Map
      {provinces}
      data={data}
      {colorScale}
      onProvinceClick={onProvinceClick}
      tooltipFormatter={tooltipFormatter}
    />
  </div>

  <!-- Floating Legend -->
  <div class="floating-legend">
    <div class="legend-background">
      <div class="gradient-container">
        <div class="gradient-bar"></div>
        <div class="gradient-labels">
          <span class="label-plus">{$t('reports.map.legend.moreOccurrences')}</span>
          <span class="label-minus">{$t('reports.map.legend.lessOccurrences')}</span>
        </div>
      </div>
    </div>
  </div>

  <!-- News Container -->
  
</div>

<style>
  /* Map Container */
  .map-container {
    position: relative;
    width: 90%;
    height: 90%;
    aspect-ratio: 16 / 9;
    background-color: #e5e7eb;
    border: 2px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: grab;
  }

  .map-container:active {
    cursor: grabbing;
  }

  .map-inner {
    transform-origin: center center;
    transition: transform 0.1s ease;
  }

  /* Floating Legend */
  .floating-legend {
    position: absolute;
    bottom: 5%;
    right: 5%;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 10;
  }

  .legend-background {
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    padding: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .gradient-container {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .gradient-bar {
    width: 20px;
    height: 100px;
    background: linear-gradient(to bottom, #26547c, #5790b3, #e3edf3);
    border-radius: 8px;
  }

  .gradient-labels {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 14px;
    font-weight: bold;
    color: #555;
    height: 100px;
  }

  /* News Container */
  .news-container {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    max-width: calc(100% - 40px);
    padding: 10px 20px;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 12px;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    color: #333;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    animation: slide-up 5s ease-in-out infinite;
    z-index: 10;
    overflow-wrap: break-word;
  }

  .news-content {
    transition: transform 0.5s ease, color 0.3s ease;
  }

  .news-container:hover .news-content {
    transform: translateY(-10px);
    color: #000;
  }

  @keyframes slide-up {
    0% {
      transform: translateY(30px);
      opacity: 0;
    }
    10% {
      transform: translateY(0);
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translateY(30px);
      opacity: 0;
    }
  }

  /* Responsive Adjustments */
  @media (max-width: 768px) {
    .news-container {
      max-width: 90%;
      padding: 8px 16px;
    }

    .gradient-bar {
      height: 80px;
    }

    .gradient-labels {
      font-size: 12px;
    }
  }
</style>