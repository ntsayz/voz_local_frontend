<script lang="ts">
    import { onMount } from 'svelte';
    import Chart from 'chart.js/auto';
  
    export let survey;
  
    let canvas;
    let chartInstance;
  
    // Dynamically generate chart data and type
    function getChartConfig(survey) {
      const { type, options, responses } = survey;
  
      switch (type) {
        case 'multiple_choice':
        case 'single_choice':
          return {
            type: 'bar',
            data: {
              labels: options.map((o) => o.label),
              datasets: [
                {
                  label: 'Votes',
                  data: options.map((o) => o.value),
                  backgroundColor: ['#4caf50', '#2196f3', '#ff9800', '#f44336'],
                },
              ],
            },
            options: {
              responsive: true,
              plugins: {
                legend: { display: false },
              },
            },
          };
        case 'binary':
          return {
            type: 'pie',
            data: {
              labels: options.map((o) => o.label),
              datasets: [
                {
                  data: options.map((o) => o.value),
                  backgroundColor: ['#4caf50', '#f44336'],
                },
              ],
            },
            options: {
              responsive: true,
              plugins: {
                legend: { position: 'bottom' },
              },
            },
          };
        case 'rating':
          return {
            type: 'radialGauge',
            data: {
              datasets: [
                {
                  data: [options[0].value],
                  backgroundColor: ['#4caf50'],
                  label: `Average Rating: ${options[0].value} / ${options[0].max}`,
                },
              ],
            },
            options: {
              responsive: true,
              plugins: {
                legend: { display: false },
              },
              scales: {
                r: {
                  min: 0,
                  max: options[0].max,
                },
              },
            },
          };
        default:
          return null;
      }
    }
  
    onMount(() => {
      const config = getChartConfig(survey);
      if (config) {
        chartInstance = new Chart(canvas, config);
      }
  
      return () => {
        if (chartInstance) {
          chartInstance.destroy();
        }
      };
    });
  </script>
  
  <canvas bind:this={canvas}></canvas>
  