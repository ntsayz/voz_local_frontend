<script lang="ts">
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
  </div>
  
  <style>
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
  </style>