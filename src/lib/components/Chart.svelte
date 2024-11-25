<script lang="ts">
    import { onMount } from 'svelte';
    import Chart from 'chart.js/auto';
    import type { ChartConfiguration, ChartType, ChartTypeRegistry } from 'chart.js';
  
    // Define types for the survey data
    type Option = {
      label: string;
      value: number;
      max?: number; // For rating surveys
    };
  
    type Survey = {
      type: 'multiple_choice' | 'single_choice' | 'binary' | 'rating';
      options: Option[];
      responses: number;
    };
  
    export let survey: Survey; // Ensure survey prop has a defined type
  
    let canvas: HTMLCanvasElement | null = null; // Explicitly define the canvas type
    let chartInstance: Chart | null = null; // Explicitly define the Chart instance type
  
    // Dynamically generate chart data and type
    function getChartConfig(survey: Survey): ChartConfiguration | null {
      const { type, options, responses } = survey;
  
      switch (type) {
        case 'multiple_choice':
        case 'single_choice':
          return {
            type: 'bar' as ChartType,
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
            type: 'pie' as ChartType,
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
            type: 'doughnut' as ChartType, // Doughnut chart for ratings
            data: {
              labels: [`Rating: ${options[0].value}/${options[0].max}`],
              datasets: [
                {
                  data: [options[0].value, options[0].max! - options[0].value],
                  backgroundColor: ['#4caf50', '#e0e0e0'], // Fill remaining with a neutral color
                },
              ],
            },
            options: {
              responsive: true,
              plugins: {
                legend: { display: false },
              },
              elements: {
                arc: {
                  borderWidth: 0,
                  cutout: '80%', // Nested under elements.arc for doughnut charts
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
      if (config && canvas) {
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
  