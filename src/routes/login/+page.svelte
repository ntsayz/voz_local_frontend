<script>
    import AuthForm from '$lib/components/AuthForm.svelte';
	import Footer from '$lib/components/common/Footer.svelte';
    import Header from '$lib/components/common/Header.svelte';

  </script>
  <Header />
  <main class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-gray-100">
    <div class="sm:mx-auto sm:w-full sm:max-w-lg text-center mb-6">
      <h1 class="text-3xl font-bold text-primary-600">Login</h1>
  </div>
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    </div>
    <AuthForm />
  </main>

<Footer/>

<style>
  main {
    padding-top: 2rem;
    padding-bottom: 2rem;
    margin-top: 64px;
  }
</style>
  