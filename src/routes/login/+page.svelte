<script>
    import AuthForm from '$lib/components/AuthForm.svelte';
    import Header from '$lib/components/Header.svelte';

  </script>
  <main class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-gray-100">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <a href="/">
        <img
        class="mx-auto h-10 w-auto"
          src="favicon.svg"
          alt="Voz Local"
        />
        </a>
      
    </div>
    <AuthForm />
  </main>
  