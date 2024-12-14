<script lang="ts">
  import { auth, type AuthState } from '$lib/stores/auth';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { t, locale } from 'svelte-i18n';

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

  import { onDestroy } from 'svelte';
  onDestroy(() => {
    unsubscribeAuth();
    unsubscribePage();
  });
</script>

<header class="fixed top-0 left-0 w-full bg-primary-800 shadow-md z-50">
  <div class="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
    <!-- Logo -->
    <a href="/" class="flex-shrink-0">
      <img class="h-8 w-auto" src="favicon.svg" alt="Voz Local" />
    </a>

    <!-- Desktop Navigation Links -->
    <nav class="hidden md:flex space-x-4">
      <a
        href="/"
        class="text-sm font-medium {currentPath === '/' ? 'text-blue-600' : 'text-gray-200 hover:text-blue-400'}"
      >
        {$t('common.home')}
      </a>
      {#if currentAuth.user?.role === 'admin'}
      <a
        href="/dashboard"
        class="text-sm font-medium {currentPath === '/dashboard' ? 'text-blue-600' : 'text-gray-200 hover:text-blue-400'}"
      >
        {$t('common.dashboard')}
      </a>
      {/if}
      <a
        href="/reports"
        class="text-sm font-medium {currentPath === '/reports' ? 'text-blue-600' : 'text-gray-200 hover:text-blue-400'}"
      >
        {$t('common.reports')}
      </a>
      <a
        href="/surveys"
        class="text-sm font-medium {currentPath === '/surveys' ? 'text-blue-600' : 'text-gray-200 hover:text-blue-400'}"
      >
        {$t('common.surveys')}
      </a>
    </nav>

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
    class={`fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
      isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}
    on:click={toggleMobileMenu}
  ></div>

  <div
    class={`fixed top-0 right-0 z-50 h-full w-3/4 max-w-xs bg-primary-800 text-gray-200 transform transition-transform duration-300 ease-in-out ${
      isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
    }`}
  >
    <div class="p-4">
      <!-- Close Button -->
      <button
        type="button"
        class="text-gray-200 hover:text-blue-400"
        on:click={toggleMobileMenu}
      >
        <span class="sr-only">Close menu</span>
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Navigation Links -->
      <nav class="mt-6 space-y-4">
        <a
          href="/"
          class="block text-sm font-medium {currentPath === '/' ? 'text-blue-600' : 'hover:text-blue-400'}"
        >
          {$t('common.home')}
        </a>
        {#if currentAuth.user?.role === 'admin'}
        <a
          href="/dashboard"
          class="block text-sm font-medium {currentPath === '/dashboard' ? 'text-blue-600' : 'hover:text-blue-400'}"
        >
          {$t('common.dashboard')}
        </a>
        {/if}
        <a
          href="/reports"
          class="block text-sm font-medium {currentPath === '/reports' ? 'text-blue-600' : 'hover:text-blue-400'}"
        >
          {$t('common.reports')}
        </a>
        <a
          href="/surveys"
          class="block text-sm font-medium {currentPath === '/surveys' ? 'text-blue-600' : 'hover:text-blue-400'}"
        >
          {$t('common.surveys')}
        </a>

        <!-- User Section -->
        {#if currentAuth.user}
        <a
          href="/profile"
          class="block text-sm font-medium hover:text-blue-400"
        >
          Perfil
        </a>
        <button
          class="block text-left text-sm font-medium text-gray-200 hover:text-blue-400"
          on:click={logout}
        >
          {$t('common.logout')}
        </button>
        {:else}
        <a
          href="/login"
          class="block text-sm font-medium text-gray-200 hover:text-blue-400"
        >
          {$t('common.login')}
        </a>
        {/if}

        <!-- Language Switcher -->
        <div class="pt-4 border-t border-gray-700">
          <h3 class="text-sm font-semibold">{$t('common.language')}</h3>
          <div class="space-y-2">
            {#each languages as lang}
            <button
              class="block text-sm text-gray-200 hover:text-blue-400"
              on:click={() => { locale.set(lang.code); toggleMobileMenu(); }}
            >
              <span class="mr-2">{lang.icon}</span>
              {lang.label}
            </button>
            {/each}
          </div>
        </div>
      </nav>
    </div>
  </div>
</header>

<style>
  header {
    backdrop-filter: blur(100px);
  }
</style>