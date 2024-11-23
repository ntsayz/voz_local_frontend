<script lang="ts">
    export let provinces: { id: string; name: string; d: string }[] = [];
    export let data: { [key: string]: { count: number; details: string[] } } = {};
    export let colorScale: (count: number) => string = (count) => '#ccc'; // Default color scale
    export let onProvinceClick: (id: string) => void = () => {};
    export let tooltipFormatter: (id: string, data: any) => string = (id, data) => '';
  
    let hoveredProvince: string | null = null;
    let mouseX = 0;
    let mouseY = 0;

    console.log(data[0]);
  
    function handleMouseMove(event: MouseEvent) {
      mouseX = event.clientX + 10;
      mouseY = event.clientY + 10;
    }
  
    function handleHover(provinceId: string) {
      hoveredProvince = provinceId;
    }
  
    function handleMouseOut() {
      hoveredProvince = null;
    }
  </script>
  
  <div class="map-container">
    <!-- Embed the SVG map -->
    <!-- Replace the content below with the actual content of mz_provinces.svg -->
    <svg fill="#26547C" height="1000" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width=".5" version="1.2" viewbox="0 0 1000 1000" width="1000" xmlns="http://www.w3.org/2000/svg">
        <g id="features">
            {#each provinces as province}
            <path
              d="{province.d}" 
              id="{province.id}"
              name="{province.name}"
              style="fill: {colorScale(data[province.id]?.count || 0)}"
                on:mouseover={() => handleHover(province.id)}
                on:mouseout={handleMouseOut}
                on:click={() => onProvinceClick(province.id)}
                tabindex="0"
                role="button"
                aria-label="{province.name}"
            >
            </path>
          {/each}
        </g>
        <g id="points">
         <circle class="-26.040708312663366|30.745552613208286" cx="249.6" cy="906.6" id="0">
         </circle>
         <circle class="-19.484202944226734|36.06262618029728" cx="527.8" cy="534.3" id="1">
         </circle>
         <circle class="-11.288571233680939|40.31628503396848" cx="750.4" cy="89.1" id="2">
         </circle>
        </g>
        <g id="label_points">
         <circle class="Maputo" cx="338.6" cy="865.8" id="MZL">
         </circle>
         <circle class="Cabo Delgado" cx="701.9" cy="152" id="MZP">
         </circle>
         <circle class="Niassa" cx="551.9" cy="189.5" id="MZA">
         </circle>
         <circle class="Tete" cx="356.1" cy="311.7" id="MZT">
         </circle>
         <circle class="Manica" cx="385.9" cy="510.1" id="MZB">
         </circle>
         <circle class="Gaza" cx="348.4" cy="749.9" id="MZG">
         </circle>
         <circle class="Zambezia" cx="574.2" cy="369.5" id="MZQ">
         </circle>
         <circle class="Maputo City" cx="345.7" cy="899.7" id="MZMPM">
         </circle>
         <circle class="Inhambane" cx="447.4" cy="715.7" id="MZI">
         </circle>
         <circle class="Sofala" cx="466.3" cy="494.1" id="MZS">
         </circle>
         <circle class="Nampula" cx="705.2" cy="287" id="MZN">
         </circle>
        </g>
       </svg>
  
       {#if hoveredProvince}
    <div
        class="tooltip"
        style="top: {mouseY}px; left: {mouseX}px;"
        > {hoveredProvince}
        {tooltipFormatter(hoveredProvince, data[hoveredProvince])}
        </div>
    {/if}
    </div>

    
  
  
  <style>
    .map-container {
      position: relative;
      width: 100%;
      max-width: 800px;
      height: auto;
    }
  
    path {
      fill: #ccc;
      stroke: #333;
      cursor: pointer;
      transition: fill 0.2s;
    }

    .tooltip {
      position: absolute;
      background-color: #26547C;
      color: #fff;
      padding: 5px 8px;
      border-radius: 4px;
      pointer-events: none;
      font-size: 14px;
      z-index: 1000;
    }
  
    @media (max-width: 800px) {
      .map-container {
        width: 100%;
        height: auto;
      }
  
      svg {
        width: 100%;
        height: auto;
      }
    }
  </style>
  