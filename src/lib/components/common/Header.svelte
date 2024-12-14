<script lang="ts">
  import { auth, type AuthState } from '$lib/stores/auth';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { t, locale } from 'svelte-i18n';

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

  function toggleLocaleDropdown() {
    isLocaleDropdownOpen = !isLocaleDropdownOpen;
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
          <span class="sr-only">{$t('common.mobileMenu.openMenu')}</span>
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
          >{$t('common.dashboard')}</a>
          {/if}
          <a
            href="/reports"
            class="rounded-md px-3 py-2 text-sm font-medium 
            {currentPath === '/reports' ? 'bg-primary-500 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}"
          >{$t('common.reports')}</a>
          <a
            href="/surveys"
            class="rounded-md px-3 py-2 text-sm font-medium 
            {currentPath === '/surveys' ? 'bg-primary-500 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}"
          >{$t('common.surveys')}</a>
        </div>
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