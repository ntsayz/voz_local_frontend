<script lang="ts">
    import { locations, fetchLocations , type LocationType, type Provincia , type Distrito, type PostoAdministrativo, type Bairro} from '$lib/stores/locations';
    import { isBairro } from '$lib/utils/constants';
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';
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
    let citizenInfo = { occupation: '', address: '', nationalId: '' , firstName : '' , lastName : ''};
    let error = '';
    let loading = false;
    let subLocationType: 'bairro' | 'postoAdministrativo' | null = null;


    // info

    let localLocations: LocationType[] = [];
    let provinces: Provincia[] = [];
    let districts: Distrito[] = [];
    let subLocations: (PostoAdministrativo | Bairro)[] = [];

    // Selected IDs for dropdowns
    let selectedProvince: number | null = null;
    let selectedDistrict: number | null = null;
    let selectedSubLocation: number | null = null;

    onMount(async () => {
        const phoneInputField = document.querySelector('#phone');
        intlTelInput(phoneInputField, {
            initialCountry: 'mz', // Mozambique pre-selected
            utilsScript: 'https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.19/build/js/utils.js',
        });

        await fetchLocations(); // Fetch hierarchical data
        localLocations = get(locations);

    
        // Extract unique provinces
        provinces = Array.from(
            new Map(
                localLocations
                    .map((loc) => {
                        // Check if it's a Bairro with a Distrito
                        if ('distrito' in loc && loc.distrito?.provincia) {
                            return loc.distrito.provincia;
                        }
                        // Check if it's a Localidade with a PostoAdministrativo linked to a Distrito
                        if ('postoAdministrativo' in loc && loc.postoAdministrativo?.distrito.provincia) {
                            return loc.postoAdministrativo.distrito.provincia;
                        }
                        return null;
                    })
                    .filter((provincia): provincia is Provincia => !!provincia) // Ensure non-null values
                    .map((provincia) => [provincia.id, provincia]) // Use ID as unique key
            ).values()
        );

        districts = localLocations
            .filter((loc) => {
                // Handle Bairro with Distrito
                if ('distrito' in loc && loc.distrito?.provincia.name === 'Maputo') {
                    return true;
                }
                // Handle Localidade with PostoAdministrativo linked to Distrito
                if ('postoAdministrativo' in loc && loc.postoAdministrativo?.distrito.provincia.name === 'Maputo') {
                    return true;
                }
                return false;
            })
            .map((loc) => {
                // Return the Distrito from either a Bairro or Localidade
                if ('distrito' in loc) {
                    return loc.distrito;
                }
                if ('postoAdministrativo' in loc) {
                    return loc.postoAdministrativo?.distrito;
                }
                return null;
            })
            .filter((distrito): distrito is Distrito => !!distrito); // Ensure non-null values


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
            if ('postoAdministrativoId' in subLocations[0] || 'postoAdministrativo' in subLocations[0]) {
                subLocationType = 'bairro';
            } else {
                subLocationType = 'postoAdministrativo';
            }
        }

        // Opcional: Logs de depuração
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
                            id="firstName"
                            name="firstName"
                            type="text"
                            bind:value={citizenInfo.firstName}
                            placeholder="Primeiro Nome"
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            bind:value={citizenInfo.lastName}
                            placeholder="Último Nome"
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                        <input
                            id="occupation"
                            name="occupation"
                            type="text"
                            bind:value={citizenInfo.occupation}
                            placeholder="Profissão"
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
        
                <div>
                    <label for="province" class="block text-sm font-medium text-primary-500">Província</label>
                    <div class="mt-2 relative">
                      <select
                        id="province"
                        name="province"
                        bind:value={selectedProvince}
                        on:change={() => handleProvinceChange(Number(selectedProvince))}
                        class="block w-full cursor-default rounded-md border-gray-300 py-1.5 pl-3 pr-10 text-left shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      >
                        <option disabled selected value="">Selecione uma Província</option>
                        {#each provinces as province}
                          <option value={province.id}>{province.name}</option>
                        {/each}
                      </select>
                    </div>
                  </div>
                
                  <!-- District Dropdown -->
                  {#if selectedProvince && districts.length > 0}
                    <div>
                      <label for="district" class="block text-sm font-medium text-primary-500">Distrito</label>
                      <div class="mt-2 relative">
                        <select
                          id="district"
                          name="district"
                          bind:value={selectedDistrict}
                          on:change={() => handleDistrictChange(Number(selectedDistrict))}
                          class="block w-full cursor-default rounded-md border-gray-300 py-1.5 pl-3 pr-10 text-left shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        >
                          <option disabled selected value="">Selecione um Distrito</option>
                          {#each districts as district}
                            <option value={district.id}>{district.name}</option>
                          {/each}
                        </select>
                      </div>
                    </div>
                  {/if}
                
                  <!-- Sub-Location Dropdown -->
                  {#if selectedDistrict && subLocations.length > 0}
                  <div>
                      <label for="sub-location" class="block text-sm font-medium text-primary-500">
                          {subLocationType === 'bairro' ? 'Bairro' : 'Posto Administrativo / Bairro'}
                      </label>
                      <select
                          id="sub-location"
                          name="sub-location"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          bind:value={selectedSubLocation}
                      >
                          <option disabled selected value="">Selecione uma Sub-Locação</option>
                          {#each subLocations as subLocation}
                              <option value={subLocation.id}>
                                  {subLocation.name}
                              </option>
                          {/each}
                      </select>
                  </div>
              {/if}
              <input
              id="address"
              name="address"
              type="text"
              bind:value={citizenInfo.address}
              placeholder="Endereço"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />

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
