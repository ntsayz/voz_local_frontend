<script>
    import Header from '$lib/components/common/Header.svelte';
  </script>
  
  <Header />
  
  <main class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="text-center">
      <h1 class="text-3xl font-bold">Protected Page</h1>
      <p class="text-lg text-gray-700">You must be logged in to see this content.</p>
    </div>
  </main>

  <style>
    main {
    padding-top: 2rem;
    padding-bottom: 2rem;
    margin-top: 64px;
  }
  </style>
  