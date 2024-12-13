<script lang="ts">
  import { auth, type AuthState } from '$lib/stores/auth';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { t,locale } from 'svelte-i18n';


  let isLoaded = false;
  

  let currentAuth: AuthState;
  let currentPath: string;
  let isMobileMenuOpen = false;
  let isDropdownOpen = false;
  let isLocaleDropdownOpen = false;

  // Available languages
  const languages = [
    { code: 'en', label: 'English', icon: '🇬🇧' },
    { code: 'pt', label: 'Português', icon: '🇵🇹' }
  ];

  const unsubscribeAuth = auth.subscribe((value) => {
    currentAuth = value;
  });

  const unsubscribePage = page.subscribe(($page) => {
    currentPath = $page.url.pathname;
  });

  function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
  }

  function toggleDropdown() {
    isDropdownOpen = !isDropdownOpen;
  }

  function toggleLocaleDropdown() {
    isLocaleDropdownOpen = !isLocaleDropdownOpen;
  }

  function logout() {
    auth.set({ token: null, user: null });
    localStorage.removeItem('token');
    localStorage.removeItem('auth');
    goto('/login');
  }

  // Automatically unsubscribe on component destroy (optional best practice)
  import { onDestroy } from 'svelte';
  onDestroy(() => {
    unsubscribeAuth();
    unsubscribePage();
  });
</script>

<nav class="bg-gray-800 shadow-md">
  <div class="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="relative flex h-16 items-center justify-between">
      <!-- Mobile Menu Button -->
      <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
        <button
          type="button"
          class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          aria-controls="mobile-menu"
          aria-expanded={isMobileMenuOpen}
          on:click={toggleMobileMenu}
        >
          <span class="sr-only">Abrir menu principal</span>
          <svg
            class="h-6 w-6 {isMobileMenuOpen ? 'hidden' : 'block'}"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <svg
            class="h-6 w-6 {isMobileMenuOpen ? 'block' : 'hidden'}"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Logo -->
      <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
        <div class="flex-shrink-0">
          <a href="/">
            <img class="h-8 w-auto" src="favicon.svg" alt="Voz Local" />
          </a>
        </div>
      </div>

      <!-- Desktop Navigation Links -->
      <div class="hidden sm:ml-6 sm:block">
        <div class="flex space-x-4">
          <a
            href="/"
            class="rounded-md px-3 py-2 text-sm font-medium 
            {currentPath === '/' ? 'bg-primary-500 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}"
          > {$t('common.home')}</a>
          {#if currentAuth.user?.role === 'admin'}
          <a
            href="/dashboard"
            class="rounded-md px-3 py-2 text-sm font-medium 
            {currentPath === '/dashboard' ? 'bg-primary-500 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}"
          >Painel</a>
          {/if}
          <a
            href="/reports"
            class="rounded-md px-3 py-2 text-sm font-medium 
            {currentPath === '/reports' ? 'bg-primary-500 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}"
          >Avisos e Ocorrências</a>
          <a
            href="/surveys"
            class="rounded-md px-3 py-2 text-sm font-medium 
            {currentPath === '/surveys' ? 'bg-primary-500 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}"
          >Sondagens</a>
        </div>
      </div>

      <!-- Profile and Locale Section -->
      <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 space-x-4">
        
        <!-- Language Dropdown -->
        <div class="relative">
          <button
            type="button"
            class="flex items-center rounded-full p-2 text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            aria-expanded={isLocaleDropdownOpen}
            aria-haspopup="true"
            on:click={toggleLocaleDropdown}
          >
            <span class="sr-only">Alterar idioma</span>
            <!-- Globe Icon -->
            <svg
              class="h-5 w-5"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              fill="none"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25c4.556 0 8.25-3.694 8.25-8.25S16.556 3.75 12 3.75 3.75 7.444 3.75 12s3.694 8.25 8.25 8.25z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12h19.5M12 2.25v19.5" />
            </svg>
          </button>
          {#if isLocaleDropdownOpen}
            <div
              class="absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-20"
              role="menu"
              aria-orientation="vertical"
              tabindex="-1"
            >
              {#each languages as lang}
                <button
                  class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  tabindex="-1"
                  on:click={() => { locale.set(lang.code); isLocaleDropdownOpen = false; }}
                >
                  <span class="mr-2">{lang.icon}</span>
                  {lang.label}
                </button>
              {/each}
            </div>
          {/if}
        </div>
        
        {#if currentAuth.user}
          <!-- Logged-in User Dropdown -->
          <div class="relative ml-3">
            <button
              type="button"
              class="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              id="user-menu-button"
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
              on:click={toggleDropdown}
            >
              <span class="sr-only">Abrir menu do utilizador</span>
              <img
                class="h-8 w-8 rounded-full"
                src="https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"
                alt="Avatar do utilizador"
              />
            </button>
            {#if isDropdownOpen}
              <div
                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabindex="-1"
              >
                <a href="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabindex="-1">Perfil</a>
                <button
                  class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  on:click={logout}
                >
                  Sair
                </button>
              </div>
            {/if}
          </div>
        {:else if currentPath !== '/login' && currentPath !== '/register'}
          <!-- Login Button -->
          <a
            href="/login"
            class="rounded-md bg-primary-500 px-3 py-2 text-sm font-medium text-white hover:bg-primary-700"
          >
            Entrar
          </a>
        {/if}
      </div>

    </div>
  </div>

  <!-- Mobile Menu -->
  <div
    id="mobile-menu"
    class={`fixed inset-0 z-40 bg-gray-800 bg-opacity-80 backdrop-blur-sm transform 
      ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      transition-all duration-300 ease-in-out`}
  >
    <div class="absolute right-0 top-0 h-full w-3/4 bg-white shadow-lg p-4">
      <!-- Close Button -->
      <button
        type="button"
        class="text-gray-500 hover:text-gray-700 focus:outline-none"
        on:click={toggleMobileMenu}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="h-6 w-6"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Navigation Links -->
      <nav class="mt-4 space-y-2">
        <a
          href="/"
          class="block rounded-md px-3 py-2 text-base font-medium 
          {currentPath === '/' ? 'bg-primary-500 text-white' : 'text-gray-700 hover:bg-gray-100'}"
        >Início</a>
        {#if currentAuth.user?.role === 'admin'}
        <a
          href="/dashboard"
          class="block rounded-md px-3 py-2 text-base font-medium 
          {currentPath === '/dashboard' ? 'bg-primary-500 text-white' : 'text-gray-700 hover:bg-gray-100'}"
        >Painel</a>
        {/if}
        <a
          href="/reports"
          class="block rounded-md px-3 py-2 text-base font-medium 
          {currentPath === '/reports' ? 'bg-primary-500 text-white' : 'text-gray-700 hover:bg-gray-100'}"
        >Avisos e Ocorrências</a>
        <a
          href="/surveys"
          class="block rounded-md px-3 py-2 text-base font-medium 
          {currentPath === '/surveys' ? 'bg-primary-500 text-white' : 'text-gray-700 hover:bg-gray-100'}"
        >Sondagens</a>
      </nav>

      <!-- Language Switcher on Mobile -->
      <div class="mt-4">
        <h2 class="text-gray-500 text-sm font-semibold uppercase tracking-wide mb-2">Idioma</h2>
        {#each languages as lang}
          <button
            class="flex items-center w-full px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
            on:click={() => { locale.set(lang.code); toggleMobileMenu(); }}
          >
            <span class="mr-2">{lang.icon}</span>
            {lang.label}
          </button>
        {/each}
      </div>
    </div>
  </div>
</nav>
