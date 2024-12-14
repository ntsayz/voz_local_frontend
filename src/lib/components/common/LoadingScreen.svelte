<script>
	import Header from "../Header.svelte";
    let isLoading = true;
  </script>
  {#if isLoading}
  <div class="loading-screen">
    
    <div class="loader"></div>
  </div>
  {/if}
  
  <style>
    /* Full-page container */
    .loading-screen {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #FFFFFF; /* Plain white background */
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  
    /* Circular loader */
    .loader {
      width: 80px;
      height: 80px;
      border: 6px solid #E3EDF3; /* Light blue */
      border-top: 6px solid #26547C; /* Darker blue */
      border-radius: 50%;
      animation: spin 1s linear infinite; /* Smooth spinning */
    }
  
    /* Circular loader spin */
    @keyframes spin {
      100% {
        transform: rotate(360deg);
      }
    }
  </style>