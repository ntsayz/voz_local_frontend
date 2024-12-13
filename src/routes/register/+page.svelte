<script lang="ts">
    import { locations, fetchLocations, type LocationType, type Provincia, type Distrito, type PostoAdministrativo, type Bairro } from '$lib/stores/locations';
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';
    import 'intl-tel-input/build/css/intlTelInput.css';
    import intlTelInput from 'intl-tel-input';
    import { register } from '$lib/api/auth';
    import { goto } from '$app/navigation';
    import Footer from '$lib/components/Footer.svelte';
    import Header from '$lib/components/Header.svelte';

    let email = '';
    let username = '';
    let password = '';
    let confirmPassword = '';
    let phone = '';
    let citizenInfo = { 
        occupation: '', 
        address: '', 
        nationalId: '', 
        firstName : '', 
        lastName : ''
    };
    let error = '';
    let loading = false;
    let subLocationType: 'bairro' | 'postoAdministrativo' | null = null;

    // Informações de localização
    let localLocations: LocationType[] = [];
    let provinces: Provincia[] = [];
    let districts: Distrito[] = [];
    let subLocations: (PostoAdministrativo | Bairro)[] = [];

    // IDs selecionados para dropdowns
    let selectedProvince: number | null = null;
    let selectedDistrict: number | null = null;
    let selectedSubLocation: number | null = null;

    // Custom Dropdown States
    let isProvinceOpen = false;
    let isDistrictOpen = false;
    let isSubLocationOpen = false;
    let isCategoryOpen = false;

    // Categories for the Category dropdown
    let categories: string[] = ['Categoria 1', 'Categoria 2', 'Categoria 3']; // Replace with actual categories
    let selectedCategory: string = 'Selecione uma Categoria';

    // Multi-step form state
    let currentStep = 1;

    onMount(async () => {
        const phoneInputField = document.querySelector('#phone') as HTMLInputElement;
        if (phoneInputField) {
            intlTelInput(phoneInputField, {
                initialCountry: 'mz', // Mozambique pre-selecionado
                utilsScript: 'https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.19/build/js/utils.js',
            });
        }

        await fetchLocations(); // Buscar dados hierárquicos
        localLocations = get(locations);

        // Extrair províncias únicas
        provinces = Array.from(
            new Map(
                localLocations
                    .map((loc) => {
                        // Verificar se é um Bairro com um Distrito
                        if ('distrito' in loc && loc.distrito?.provincia) {
                            return loc.distrito.provincia;
                        }
                        // Verificar se é uma Localidade com Posto Administrativo ligado a um Distrito
                        if ('postoAdministrativo' in loc && loc.postoAdministrativo?.distrito.provincia) {
                            return loc.postoAdministrativo.distrito.provincia;
                        }
                        return null;
                    })
                    .filter((provincia): provincia is Provincia => !!provincia) // Garantir valores não nulos
                    .map((provincia) => [provincia.id, provincia]) // Usar ID como chave única
            ).values()
        );

        // Automaticamente selecionar Maputo se for a única província
        if (provinces.length === 1) {
            selectedProvince = provinces[0].id;
            handleProvinceChange(selectedProvince);
        }
    });

    function handleProvinceChange(provinceId: number) {
        selectedProvince = provinceId;
        selectedDistrict = null;
        selectedSubLocation = null;
        subLocationType = null; // Resetar o tipo de sub-local

        // Coletar distritos de Bairros e Postos Administrativos
        districts = Array.from(
            new Map(
                localLocations
                    .map((loc) => {
                        if ('distrito' in loc && loc.distrito.provinciaId === provinceId) {
                            return loc.distrito;
                        }
                        if ('postoAdministrativo' in loc && loc.postoAdministrativo?.distrito.provinciaId === provinceId) {
                            return loc.postoAdministrativo.distrito;
                        }
                        return null;
                    })
                    .filter(
                        (distrito): distrito is Distrito =>
                            !!distrito && distrito.provinciaId === provinceId
                    )
                    .map((distrito) => [distrito.id, distrito]) // Evitar duplicatas
            ).values()
        );

        subLocations = [];
    }

    function handleDistrictChange(districtId: number) {
        selectedDistrict = districtId;
        selectedSubLocation = null;
        subLocationType = null; // Resetar o tipo de sub-local

        // Filtrar sub-locações com base no distrito selecionado
        subLocations = localLocations.filter((loc) => {
            // Verificar se é um Bairro e corresponde ao distrito
            if ('distrito' in loc && loc.distrito?.id === districtId) {
                return true;
            }
            // Verificar se é uma Localidade e seu Posto Administrativo pertence ao distrito
            if (
                'postoAdministrativo' in loc &&
                loc.postoAdministrativo?.distrito.id === districtId
            ) {
                return true;
            }
            return false;
        });

        // Determinar o tipo de sub-locações
        if (subLocations.length > 0) {
            if ('postoAdministrativo' in subLocations[0]) {
                subLocationType = 'postoAdministrativo';
            } else {
                subLocationType = 'bairro';
            }
        }

        // Logs de depuração (opcional)
        console.log('Sub-Locations:', subLocations);
        console.log('Tipo de Sub-Local:', subLocationType);
    }

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

    // Funções para navegar entre as etapas
    function nextStep() {
        currentStep += 1;
    }

    function prevStep() {
        currentStep -= 1;
    }

    // Toggle functions for custom dropdowns
    function toggleProvinceDropdown() {
        isProvinceOpen = !isProvinceOpen;
        // Close other dropdowns
        isDistrictOpen = false;
        isSubLocationOpen = false;
        isCategoryOpen = false;
    }

    function toggleDistrictDropdown() {
        isDistrictOpen = !isDistrictOpen;
        // Close other dropdowns
        isProvinceOpen = false;
        isSubLocationOpen = false;
        isCategoryOpen = false;
    }

    function toggleSubLocationDropdown() {
        isSubLocationOpen = !isSubLocationOpen;
        // Close other dropdowns
        isProvinceOpen = false;
        isDistrictOpen = false;
        isCategoryOpen = false;
    }
</script>

<Header />

<main class="flex h-auto flex-col justify-center px-6 py-12 lg:px-8 bg-gray-100 flex-grow">
    <div class="sm:mx-auto sm:w-full sm:max-w-lg text-center mb-6">
        <h1 class="text-3xl font-bold text-primary-600">Registro</h1>
    </div>
    
    <div class="min-h-screen mt-5 sm:mx-auto sm:w-full sm:max-w-lg">
        <form on:submit={handleSubmit} class="space-y-6">
            {#if error}
                <div class="text-red-500 text-center">{error}</div>
            {/if}

            {#if currentStep === 1}
                <!-- Etapa 1: Informações Pessoais -->
                <div class="space-y-4">
                    <h2 class="text-xl font-semibold text-primary-600 mb-4">Informações Pessoais</h2>

                    <div>
                        <label for="firstName" class="block text-sm font-medium text-primary-500">Primeiro Nome</label>
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            bind:value={citizenInfo.firstName}
                            placeholder="Primeiro Nome"
                            required
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label for="lastName" class="block text-sm font-medium text-primary-500">Último Nome</label>
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            bind:value={citizenInfo.lastName}
                            placeholder="Último Nome"
                            required
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label for="phone" class="block text-sm font-medium text-primary-500">Número de Telefone</label>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            bind:value={phone}
                            required
                            placeholder="Insira seu número de telefone"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label for="occupation" class="block text-sm font-medium text-primary-500">Profissão</label>
                        <input
                            id="occupation"
                            name="occupation"
                            type="text"
                            bind:value={citizenInfo.occupation}
                            placeholder="Profissão"
                            required
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label for="national-id" class="block text-sm font-medium text-primary-500">Número de Identificação (BI)</label>
                        <input
                            id="national-id"
                            name="national-id"
                            type="text"
                            bind:value={citizenInfo.nationalId}
                            placeholder="Número de Identificação (BI)"
                            required
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                    </div>
                </div>

                <div class="flex justify-end">
                    <button
                        type="button"
                        on:click={nextStep}
                        class="mt-4 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                        Próximo
                    </button>
                </div>
            {/if}

            {#if currentStep === 2}
    <!-- Etapa 2: Endereço -->
    <div class="space-y-4">
        <h2 class="text-xl font-semibold text-primary-600 mb-4">Endereço</h2>

        <!-- Província Dropdown -->
        <div class="relative w-full">
            <label id="province-label" class="block text-sm font-medium text-primary-500">Província</label>
            <button
                type="button"
                on:click={toggleProvinceDropdown}
                class="relative w-full cursor-pointer rounded-md bg-white py-2 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 sm:text-sm"
                aria-haspopup="listbox"
                aria-expanded={isProvinceOpen}
                aria-labelledby="province-label"
            >
            <span class="block truncate">
                {selectedProvince ? provinces.find(p => p.id === selectedProvince)?.name : 'Selecione uma Província'}
            </span>
            
            
                <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg class="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            fill-rule="evenodd"
                            d="M10.53 3.47a.75.75 0 0 0-1.06 0L6.22 6.72a.75.75 0 0 0 1.06 1.06L10 5.06l2.72 2.72a.75.75 0 1 0 1.06-1.06l-3.25-3.25Zm-4.31 9.81 3.25 3.25a.75.75 0 0 0 1.06 0l3.25-3.25a.75.75 0 1 0-1.06-1.06L10 14.94l-2.72-2.72a.75.75 0 0 0-1.06 1.06Z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </span>
            </button>
            {#if isProvinceOpen}
                <ul
                    class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                    tabindex="-1"
                    role="listbox"
                    aria-labelledby="province-label"
                >
                    {#each provinces as province}
                        <li
                            class="relative cursor-pointer select-none py-2 px-3 pr-9 text-gray-900 hover:bg-primary-600 hover:text-white"
                            role="option"
                            on:click={() => {
                                selectedProvince = province.id;
                                handleProvinceChange(province.id);
                                isProvinceOpen = false;
                            }}
                        >
                            <span class="block truncate">{province.name}</span>
                            {#if selectedProvince === province.id}
                                <span class="absolute inset-y-0 right-0 flex items-center pr-4 text-primary-600">
                                    <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path
                                            fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 5.707 8.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                </span>
                            {/if}
                        </li>
                    {/each}
                </ul>
            {/if}
        </div>

        <!-- Distrito Dropdown -->
        {#if selectedProvince && districts.length > 0}
            <div class="relative w-full">
                <label id="district-label" class="block text-sm font-medium text-primary-500">Distrito</label>
                <button
                    type="button"
                    on:click={toggleDistrictDropdown}
                    class="relative w-full cursor-pointer rounded-md bg-white py-2 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 sm:text-sm"
                    aria-haspopup="listbox"
                    aria-expanded={isDistrictOpen}
                    aria-labelledby="district-label"
                >
                
                    <span class="block truncate">
                        {selectedDistrict ? districts.find(d => d.id === selectedDistrict)?.name : 'Selecione um Distrito'}
                    </span>
                    <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg class="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                fill-rule="evenodd"
                                d="M10.53 3.47a.75.75 0 0 0-1.06 0L6.22 6.72a.75.75 0 0 0 1.06 1.06L10 5.06l2.72 2.72a.75.75 0 1 0 1.06-1.06l-3.25-3.25Zm-4.31 9.81 3.25 3.25a.75.75 0 0 0 1.06 0l3.25-3.25a.75.75 0 1 0-1.06-1.06L10 14.94l-2.72-2.72a.75.75 0 0 0-1.06 1.06Z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </span>
                </button>
                {#if isDistrictOpen}
                    <ul
                        class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                        tabindex="-1"
                        role="listbox"
                        aria-labelledby="district-label"
                    >
                        {#each districts as district}
                            <li
                                class="relative cursor-pointer select-none py-2 px-3 pr-9 text-gray-900 hover:bg-primary-600 hover:text-white"
                                role="option"
                                on:click={() => {
                                    selectedDistrict = district.id;
                                    handleDistrictChange(district.id);
                                    isDistrictOpen = false;
                                }}
                            >
                                <span class="block truncate">{district.name}</span>
                                {#if selectedDistrict === district.id}
                                    <span class="absolute inset-y-0 right-0 flex items-center pr-4 text-primary-600">
                                        <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path
                                                fill-rule="evenodd"
                                                d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 5.707 8.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
                                                clip-rule="evenodd"
                                            />
                                        </svg>
                                    </span>
                                {/if}
                            </li>
                        {/each}
                    </ul>
                {/if}
            </div>
        {/if}

        <!-- Sub-Locação Dropdown -->
        {#if selectedDistrict && subLocations.length > 0}
            <div class="relative w-full">
                <label id="sub-location-label" class="block text-sm font-medium text-primary-500">
                    {subLocationType === 'bairro' ? 'Bairro' : 'Posto Administrativo'}
                </label>
                <button
                    type="button"
                    on:click={toggleSubLocationDropdown}
                    class="relative w-full cursor-pointer rounded-md bg-white py-2 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 sm:text-sm"
                    aria-haspopup="listbox"
                    aria-expanded={isSubLocationOpen}
                    aria-labelledby="sub-location-label"
                >
            
                    <span class="block truncate">
                        {selectedSubLocation ? subLocations.find(sl => sl.id === selectedSubLocation)?.name : 'Selecione'}

                    </span>
                    <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg class="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                fill-rule="evenodd"
                                d="M10.53 3.47a.75.75 0 0 0-1.06 0L6.22 6.72a.75.75 0 0 0 1.06 1.06L10 5.06l2.72 2.72a.75.75 0 1 0 1.06-1.06l-3.25-3.25Zm-4.31 9.81 3.25 3.25a.75.75 0 0 0 1.06 0l3.25-3.25a.75.75 0 1 0-1.06-1.06L10 14.94l-2.72-2.72a.75.75 0 0 0-1.06 1.06Z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </span>
                </button>
                {#if isSubLocationOpen}
                    <ul
                        class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                        tabindex="-1"
                        role="listbox"
                        aria-labelledby="sub-location-label"
                    >
                        {#each subLocations as subLocation}
                            <li
                                class="relative cursor-pointer select-none py-2 px-3 pr-9 text-gray-900 hover:bg-primary-600 hover:text-white"
                                role="option"
                                on:click={() => {
                                    selectedSubLocation = subLocation.id;
                                    isSubLocationOpen = false;
                                }}
                            >
                                <span class="block truncate">{subLocation.name}</span>
                                {#if selectedSubLocation === subLocation.id}
                                    <span class="absolute inset-y-0 right-0 flex items-center pr-4 text-primary-600">
                                        <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path
                                                fill-rule="evenodd"
                                                d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 5.707 8.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
                                                clip-rule="evenodd"
                                            />
                                        </svg>
                                    </span>
                                {/if}
                            </li>
                        {/each}
                    </ul>
                {/if}
            </div>
        {/if}

        <!-- Endereço Input -->
        <div>
            <label for="address" class="block text-sm font-medium text-primary-500">Endereço</label>
            <input
                id="address"
                name="address"
                type="text"
                bind:value={citizenInfo.address}
                placeholder="Ex.: Rua do Mercado, Casa 45, Próximo à Escola"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            />
        </div>
    </div>

    <div class="flex justify-between">
        <button
            type="button"
            on:click={prevStep}
            class="mt-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
            Voltar
        </button>
        <button
            type="button"
            on:click={nextStep}
            class="mt-4 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
            disabled={!selectedSubLocation}
        >
            Próximo
        </button>
    </div>
{/if}

            {#if currentStep === 3}
                <!-- Etapa 3: Credenciais -->
                <div class="space-y-4">
                    <h2 class="text-xl font-semibold text-primary-600 mb-4">Credenciais</h2>

                    <div>
                        <label for="email" class="block text-sm font-medium text-primary-500">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            bind:value={email}
                            autocomplete="email"
                            required
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label for="username" class="block text-sm font-medium text-primary-500">Nome de Usuário</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            bind:value={username}
                            autocomplete="username"
                            required
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label for="password" class="block text-sm font-medium text-primary-500">Senha</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            bind:value={password}
                            autocomplete="new-password"
                            required
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label for="confirm-password" class="block text-sm font-medium text-primary-500">Confirmar Senha</label>
                        <input
                            id="confirm-password"
                            name="confirm-password"
                            type="password"
                            bind:value={confirmPassword}
                            required
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                    </div>
                </div>

                <div class="flex justify-between">
                    <button
                        type="button"
                        on:click={prevStep}
                        class="mt-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                        Voltar
                    </button>
                    <button
                        type="submit"
                        class="mt-4 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        disabled={loading}
                    >
                        {#if loading}
                            Criando conta...
                        {:else}
                            Registrar
                        {/if}
                    </button>
                </div>
            {/if}
        </form>

        
        <!-- Indicador de Progresso (Opcional) -->
        <div class="mt-2">
            <div class="flex justify-center space-x-2">
                <div class={`w-4 h-4 rounded-full ${currentStep >= 1 ? 'bg-primary-500' : 'bg-gray-300'}`}></div>
                <div class={`w-4 h-4 rounded-full ${currentStep >= 2 ? 'bg-primary-500' : 'bg-gray-300'}`}></div>
                <div class={`w-4 h-4 rounded-full ${currentStep >= 3 ? 'bg-primary-500' : 'bg-gray-300'}`}></div>
            </div>
        </div>

        <p class="mt-10 text-center text-sm text-gray-600">
            Já tem uma conta?
            <a href="/login" class="font-medium text-primary-600 hover:text-primary-900">Entrar</a>
        </p>
    </div>
</main>

<Footer />
