<script lang="ts">
    import { onMount } from 'svelte';
    import 'intl-tel-input/build/css/intlTelInput.css';
    import intlTelInput from 'intl-tel-input';
    import 'intl-tel-input/build/css/intlTelInput.css';
    import { register } from '$lib/api/auth';
    import { goto } from '$app/navigation';

    let email = '';
    let username = '';
    let password = '';
    let confirmPassword = '';
    let phone = '';
    let citizenInfo = { occupation: '', address: '', nationalId: '' };
    let error = '';
    let loading = false;

    onMount(() => {
        const phoneInputField = document.querySelector('#phone');
        intlTelInput(phoneInputField, {
            initialCountry: 'mz', // Mozambique pre-selected
            utilsScript: 'https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.19/build/js/utils.js',
        });
    });

    async function handleSubmit(event: Event) {
        event.preventDefault();
        error = '';
        loading = true;

        if (password !== confirmPassword) {
            error = 'As senhas não coincidem';
            loading = false;
            return;
        }

        try {
            await register(username, email, password);
            goto('/login');
        } catch (err) {
            error = (err as Error).message;
        } finally {
            loading = false;
        }
    }
</script>

<main class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-gray-100">
    <div class="sm:mx-auto sm:w-full sm:max-w-lg">
        <a href="/">
            <img
                class="mx-auto h-10 w-auto"
                src="favicon.svg"
                alt="Voz Local"
            />
        </a>
    </div>

    <div class="min-h-screen mt-10 sm:mx-auto sm:w-full sm:max-w-lg">
        <form on:submit={handleSubmit} class="space-y-8">
            {#if error}
                <div class="text-red-500">{error}</div>
            {/if}

            <!-- Seção 1: Credenciais -->
            <div class="space-y-6">
                <h2 class="text-lg font-semibold text-primary-600">Credenciais</h2>

                <!-- Campo de Email -->
                <div>
                    <label for="email" class="block text-sm font-medium text-primary-500">Email</label>
                    <div class="mt-2">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            bind:value={email}
                            autocomplete="email"
                            required
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                    </div>
                </div>

                <!-- Campo de Nome de Usuário -->
                <div>
                    <label for="username" class="block text-sm font-medium text-primary-500">Nome de Usuário</label>
                    <div class="mt-2">
                        <input
                            id="username"
                            name="username"
                            type="text"
                            bind:value={username}
                            autocomplete="username"
                            required
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                    </div>
                </div>

                <!-- Campo de Senha -->
                <div>
                    <label for="password" class="block text-sm font-medium text-primary-500">Senha</label>
                    <div class="mt-2">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            bind:value={password}
                            autocomplete="new-password"
                            required
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                    </div>
                </div>

                <!-- Campo de Confirmar Senha -->
                <div>
                    <label for="confirm-password" class="block text-sm font-medium text-primary-500">Confirmar Senha</label>
                    <div class="mt-2">
                        <input
                            id="confirm-password"
                            name="confirm-password"
                            type="password"
                            bind:value={confirmPassword}
                            required
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                    </div>
                </div>
            </div>

            <!-- Seção 2: Informações Pessoais -->
            <div class="space-y-6">
                <h2 class="text-lg font-semibold text-primary-600">Informações Pessoais</h2>

                <!-- Campo de Telefone -->
                <div>
                    <label for="phone" class="block text-sm font-medium text-primary-500">Número de Telefone</label>
                    <div class="mt-2">
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            bind:value={phone}
                            required
                            placeholder="Insira seu número de telefone"
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                    </div>
                </div>

                <!-- Informações do Cidadão -->
                <div>
                    <label for="citizen-info" class="block text-sm font-medium text-primary-500">Informações do Cidadão</label>
                    <div class="space-y-4 mt-2">
                        <input
                            id="occupation"
                            name="occupation"
                            type="text"
                            bind:value={citizenInfo.occupation}
                            placeholder="Profissão"
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                        <input
                            id="address"
                            name="address"
                            type="text"
                            bind:value={citizenInfo.address}
                            placeholder="Endereço"
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                        <input
                            id="national-id"
                            name="national-id"
                            type="text"
                            bind:value={citizenInfo.nationalId}
                            placeholder="Número de Identificação (BI/NIF)"
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                    </div>
                </div>
            </div>

            <!-- Botão de Enviar -->
            <div>
                <button
                    type="submit"
                    class="flex w-full justify-center rounded-md bg-primary-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    disabled={loading}
                >
                    {#if loading}
                        Criando conta...
                    {:else}
                        Registrar
                    {/if}
                </button>
            </div>
        </form>

        <!-- Redirecionar para Login -->
        <p class="mt-10 text-center text-sm text-gray-600">
            Já tem uma conta?
            <a href="/login" class="font-medium text-primary-600 hover:text-primary-900">Entrar</a>
        </p>
    </div>
</main>
