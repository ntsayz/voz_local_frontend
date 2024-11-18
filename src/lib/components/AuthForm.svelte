<script lang="ts">
    import { login } from '$lib/api/auth';
    import { auth } from '$lib/stores/auth';
    import { goto } from '$app/navigation';
  
    let email = '';
    let username = '';
    let password = '';
    let error = '';
    let loading = false;
  
    async function handleSubmit(event: Event) {
        event.preventDefault();
        error = '';
        loading = true;

        try {
        const { token, user } = await login(username, password); // Using the modular login function
        auth.set({ token, user });
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        goto('/');
        } catch (err) {
        error = (err as Error).message; // Handle API errors
        } finally {
        loading = false;
        }
    }

  </script>
  
  <div class="min-h-screen mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form on:submit={handleSubmit} class="space-y-6">
      {#if error}
        <div class="text-red-500">{error}</div>
      {/if}
  
      <div>
        <label for="username" class="block text-sm/6 font-medium text-primary-500">Username</label>
        <div class="mt-2">
          <input
            id="username"
            name="username"
            type="username"
            bind:value={username}
            autocomplete="username"
            required
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm/6"
          />
        </div>
      </div>
  
      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm/6 font-medium text-primary-500">Password</label>
          <div class="text-sm text-primary-500">
            <a href="/forgot-password" class="font-semibold text-primary hover:text-brand_grey-500">Forgot password?</a>
          </div>
        </div>
        <div class="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            bind:value={password}
            autocomplete="current-password"
            required
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm/6"
          />
        </div>
      </div>
  
      <div>
        <button
          type="submit"
          class="flex w-full justify-center rounded-md bg-primary-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-brand_grey-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          disabled={loading}
        >
          {#if loading}
            Signing in...
          {:else}
            Sign in
          {/if}
        </button>
      </div>
    </form>
  
    <p class="mt-10 text-center text-sm/6 text-primary-500">
      <a href="/register" class="font-semibold text-primary-500 hover:text-primary-900">Registe-se</a>
    </p>
  </div>
  