<script lang="ts">
    import { register } from '$lib/api/auth'; // Modular register function
    import { goto } from '$app/navigation';
  
    let email = '';
    let username = '';
    let password = '';
    let confirmPassword = '';
    let error = '';
    let loading = false;
  
    async function handleSubmit(event: Event) {
        event.preventDefault();
        error = '';
        loading = true;

        if (password !== confirmPassword) {
            error = 'Passwords do not match';
            loading = false;
            return;
        }

        try {
            await register(username, email, password); // Call modular register function
            goto('/login'); // Redirect to login page after successful registration
        } catch (err) {
            error = (err as Error).message; // Handle API errors
        } finally {
            loading = false;
        }
    }
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
    <div class="min-h-screen mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form on:submit={handleSubmit} class="space-y-6">
            {#if error}
                <div class="text-red-500">{error}</div>
            {/if}

            <!-- Email Field -->
            <div>
                <label for="email" class="block text-sm/6 font-medium text-primary-500">Email</label>
                <div class="mt-2">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        bind:value={email}
                        autocomplete="email"
                        required
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm/6"
                    />
                </div>
            </div>

            <!-- Username Field -->
            <div>
                <label for="username" class="block text-sm/6 font-medium text-primary-500">Username</label>
                <div class="mt-2">
                    <input
                        id="username"
                        name="username"
                        type="text"
                        bind:value={username}
                        autocomplete="username"
                        required
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm/6"
                    />
                </div>
            </div>

            <!-- Password Field -->
            <div>
                <label for="password" class="block text-sm/6 font-medium text-primary-500">Password</label>
                <div class="mt-2">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        bind:value={password}
                        autocomplete="new-password"
                        required
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm/6"
                    />
                </div>
            </div>

            <!-- Confirm Password Field -->
            <div>
                <label for="confirm-password" class="block text-sm/6 font-medium text-primary-500">Confirm Password</label>
                <div class="mt-2">
                    <input
                        id="confirm-password"
                        name="confirm-password"
                        type="password"
                        bind:value={confirmPassword}
                        required
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm/6"
                    />
                </div>
            </div>

            <!-- Submit Button -->
            <div>
                <button
                    type="submit"
                    class="flex w-full justify-center rounded-md bg-primary-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-brand_grey-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    disabled={loading}
                >
                    {#if loading}
                        Creating account...
                    {:else}
                        Sign up
                    {/if}
                </button>
            </div>
        </form>

        <!-- Redirect to Login -->
        <p class="mt-10 text-center text-sm/6 text-primary-500">
            Already have an account?
            <a href="/login" class="font-semibold text-primary-500 hover:text-primary-900">Log in</a>
        </p>
    </div>
</main>
