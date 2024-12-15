<script lang="ts">
  import { auth, type AuthState } from '$lib/stores/auth';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { t, locale } from 'svelte-i18n';
  import { onMount, onDestroy } from 'svelte';

  let currentAuth: AuthState;
  let currentPath: string;
  let isDropdownOpen = false;
  let isLocaleDropdownOpen = false;
  let isMobileMenuOpen = false;

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

  function toggleDropdown() {
    isDropdownOpen = !isDropdownOpen;
  }

  function toggleLocaleDropdown() {
    isLocaleDropdownOpen = !isLocaleDropdownOpen;
  }

  function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
  }

  function logout() {
    auth.set({ token: null, user: null });
    localStorage.removeItem('token');
    localStorage.removeItem('auth');
    goto('/login');
  }

  function handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.locale-toggle')) {
      isLocaleDropdownOpen = false;
    }
  }

  onMount(() => {
    window.addEventListener('click', handleClickOutside);
  });

  
  onDestroy(() => {
    unsubscribeAuth();
    unsubscribePage();
  });
</script>

<nav class="bg-gray-800 shadow-md">
  <div class="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
    <!-- Logo on the far left -->
    <a href="/" class="flex-shrink-0">
      <img class="h-8 w-auto" src="favicon.svg" alt="Voz Local" />
    </a>

    <!-- Centered Desktop Navigation Links -->
    <nav class="hidden md:flex flex-1 justify-center space-x-4">
      <a href="/" class="text-sm font-medium {currentPath === '/' ? 'text-primary-500' : 'text-gray-200 hover:text-blue-400'}">
        {$t('common.home')}
      </a>
      {#if currentAuth.user?.role === 'admin'}
      <a href="/dashboard" class="text-sm font-medium {currentPath === '/dashboard' ? 'text-primary-500' : 'text-gray-200 hover:text-blue-400'}">
        {$t('common.dashboard')}
      </a>
      {/if}
      <a href="/reports" class="text-sm font-medium {currentPath === '/reports' ? 'text-primary-500' : 'text-gray-200 hover:text-blue-400'}">
        {$t('common.reports')}
      </a>
      <a href="/surveys" class="text-sm font-medium {currentPath === '/surveys' ? 'text-primary-500' : 'text-gray-200 hover:text-blue-400'}">
        {$t('common.surveys')}
      </a>
    </nav>

    <div class="hidden md:block relative locale-toggle">
      <button
        aria-haspopup="true"
        aria-expanded={isLocaleDropdownOpen}
        class="flex items-center space-x-2 px-4 py-2"
        on:click={toggleLocaleDropdown}
      >
        <!-- SVG Image with CSS filter to match text-gray-200 -->
        <img
          class="h-4 w-4 filter grayscale brightness-0 invert"
          src="header/world.svg"
          alt="World"
        />
      </button>

      {#if isLocaleDropdownOpen}
      <div class="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10">
        {#each languages as lang}
        <button
          class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          on:click={() => { locale.set(lang.code); isLocaleDropdownOpen = false; }}
        >
          {lang.icon} {lang.label}
        </button>
        {/each}
      </div>
      {/if}
    </div>
  

    <!-- Mobile Menu Button -->
    <button
      type="button"
      class="md:hidden text-gray-200 hover:text-blue-400"
      on:click={toggleMobileMenu}
    >
      <span class="sr-only">Open menu</span>
      <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
      </svg>
    </button>
  </div>

  <!-- Mobile Navigation Menu -->
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
        >{$t('common.home')}</a>
        {#if currentAuth.user?.role === 'admin'}
        <a
          href="/dashboard"
          class="block rounded-md px-3 py-2 text-base font-medium 
          {currentPath === '/dashboard' ? 'bg-primary-500 text-white' : 'text-gray-700 hover:bg-gray-100'}"
        >{$t('common.dashboard')}</a>
        {/if}
        <a
          href="/reports"
          class="block rounded-md px-3 py-2 text-base font-medium 
          {currentPath === '/reports' ? 'bg-primary-500 text-white' : 'text-gray-700 hover:bg-gray-100'}"
        >{$t('common.reports')}</a>
        <a
          href="/surveys"
          class="block rounded-md px-3 py-2 text-base font-medium 
          {currentPath === '/surveys' ? 'bg-primary-500 text-white' : 'text-gray-700 hover:bg-gray-100'}"
        >{$t('common.surveys')}</a>
      </nav>

      <!-- Login and Locale Dropdown -->
      <div class="mt-4 border-t border-gray-300 pt-4">
        {#if currentAuth.user}
        <a
          href="/profile"
          class="block text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          {$t('common.profile')}
        </a>
        <button
          class="block text-left text-sm font-medium text-gray-700 hover:text-gray-900"
          on:click={logout}
        >
          {$t('common.logout')}
        </button>
        {:else}
        <a
          href="/login"
          class="block text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          {$t('common.login')}
        </a>
        {/if}

        <div class="mt-2">
          <h2 class="text-sm font-medium text-gray-500">{$t('common.language')}</h2>
          <div class="space-y-2">
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
    </div>
  </div>
</nav>
