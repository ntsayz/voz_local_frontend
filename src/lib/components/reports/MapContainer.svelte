<script lang="ts">
    import { t } from 'svelte-i18n';
    import Map from '$lib/components/reports/Map.svelte';
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
  
    function handleWheel(event: WheelEvent) {
      event.preventDefault();
      const delta = -event.deltaY * 0.01;
      scale = Math.min(maxScale, Math.max(minScale, scale + delta));
    }
  
    function startDrag(event: MouseEvent) {
      isDragging = true;
      lastMouseX = event.clientX;
      lastMouseY = event.clientY;
    }
  
    function endDrag() {
      isDragging = false;
    }
  
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
    bottom: 2%;
    right: 4%;
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

  .legend-title {
    font-size: 12px;
    margin-bottom: 8px;
    color: #333;
  }

  .gradient-container {
    display: flex;
    align-items: center; /* Align items horizontally */
    gap: 8px; /* Add space between gradient and labels */
  }

  .gradient-bar {
    width: 20px;
    height: 100px;
    background: linear-gradient(to bottom, #26547c, #5790b3, #e3edf3);
    border-radius: 8px;
  }

  .gradient-labels {
    display: flex;
    flex-direction: column; /* Stack labels vertically */
    justify-content: space-between;
    align-items: flex-start; /* Align to the start of the gradient */
    font-size: 14px;
    font-weight: bold;
    color: #555;
    height: 100px; /* Match the gradient height */
  }

  .label-plus {
    margin-top: -2px; /* Align to top */
    margin-right: -2px; /* Align to top */
  }

  .label-minus {
    margin-bottom: -2px; /* Align to bottom */
  }
  </style>