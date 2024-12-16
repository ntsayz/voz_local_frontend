<script lang="ts">
  import { auth, type AuthState } from '$lib/stores/auth';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { t, locale } from 'svelte-i18n';
  import { onMount, onDestroy } from 'svelte';
  import { cubicOut } from 'svelte/easing';

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

  function navigateWithAnimation(href: string) {
    goto(href);
  }

  onDestroy(() => {
    unsubscribeAuth();
    unsubscribePage();
  });

  // Custom transition for favicon
  function faviconTransition(node, { delay = 0, duration = 600, easing = cubicOut }) {
    return {
      delay,
      duration,
      easing,
      css: (t: number) => `
        opacity: ${t};
        transform: scale(${1 + t * 0.2});
      `
    };
  }
</script>

<nav class="bg-primary-800 shadow-md fixed top-0 left-0 w-full z-50"
  style="
      -webkit-backdrop-filter: blur(10px);
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      background: rgba(14, 30, 46, 0.95);
    ">
  <div class="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
    <!-- Logo on the far left -->
    <a href="/" class="flex-shrink-0">
      {#if !isMobileMenuOpen}
        <img
          class="h-8 w-auto favicon"
          src="favicon.svg"
          alt="Voz Local"
          in:faviconTransition
          out:faviconTransition
        />
      {/if}
    </a>
    

    <!-- Centered Desktop Navigation Links -->
    <nav class="hidden md:flex flex-1 justify-center space-x-4">
      <a href="/" class="text-sm font-medium text-gray-200 hover:text-gray-400 ">
        {$t('common.home')}
      </a>
      {#if currentAuth.user?.role === 'admin'}
      <a href="/dashboard" class="text-sm font-medium text-gray-200 hover:text-gray-400">
        {$t('common.dashboard')}
      </a>
      {/if}
      <a href="/reports" class="text-sm font-medium text-gray-200 hover:text-gray-400">
        {$t('common.reports')}
      </a>
      <a href="/surveys" class="text-sm font-medium text-gray-200 hover:text-gray-400">
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
        <div class="absolute py-2 right-0 mt-2 w-40 bg-primary-800 text-gray-200 rounded-md shadow-lg z-50">
          {#each languages as lang}
            <button
              class="block w-full text-left px-4 py-2 text-sm hover:bg-gray-800"
              class:bg-gray-800={lang.code === $locale}
              on:click={() => { locale.set(lang.code); isLocaleDropdownOpen = false; }}
            >
              {lang.icon} {lang.label}
            </button>
          {/each}
        </div>
      {/if}

    </div>
  

    <!-- Mobile Menu Button -->
    <div class="relative md:hidden">
      {#if isMobileMenuOpen}
        <!-- Close Menu Button -->
        <button
          type="button"
          class="text-gray-200 hover:text-primary-500 transition-transform transform duration-300"
          on:click={toggleMobileMenu}
        >
          <span class="sr-only">Close menu</span>
          <img
            class="h-8 w-8 filter grayscale brightness-0 invert transition-transform transform duration-300 rotate-180"
            src="header/close.svg"
            alt="Close"
          />
        </button>
      {:else}
        <!-- Open Menu Button -->
        <button
          type="button"
          class="text-gray-200 hover:text-primary-500 transition-transform transform duration-300"
          on:click={toggleMobileMenu}
        >
          <span class="sr-only">Open menu</span>
          <img
            class="h-8 w-8 filter grayscale brightness-0 invert transition-transform transform duration-300 rotate-0"
            src="header/menu.webp"
            alt="Menu"
          />
        </button>
      {/if}
    </div>
    
  </div>

  <!-- Mobile Navigation Menu -->
  
</nav>

<div
    id="mobile-menu"
    class={`fixed inset-0 z-40 bg-opacity-80 backdrop-blur-sm transform h-screen 
      ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
      transition-all duration-500 linear`}
  >

  
    <div class="absolute right-0 top-0 w-full h-full bg-white shadow-lg p-4"
    style="
      -webkit-backdrop-filter: blur(10px);
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      background: rgba(14, 30, 46, 0.95);
       margin-top: 60px;
    ">

      <!-- Navigation Links -->
      <nav class="mt-4 space-y-5 flex flex-col items-start text-lg">
      <a
        href="/"
        on:click={() => navigateWithAnimation('/')}
        class="font-medium text-gray-300 hover:text-gray-400"
      >{$t('common.home')}</a>
      {#if currentAuth.user?.role === 'admin'}
      <a
        href="/dashboard"
        on:click={() => navigateWithAnimation('/dashboard')}
        class="font-medium text-gray-300 hover:text-gray-400"
      >{$t('common.dashboard')}</a>
      {/if}
      <a
        href="/reports"
        on:click={() => navigateWithAnimation('/reports')}
        class="font-medium text-gray-300 hover:text-gray-400"
      >{$t('common.reports')}</a>
      <a
        href="/surveys"
        on:click={() => navigateWithAnimation('/surveys')}
        class="font-medium text-gray-300 hover:text-gray-400"
      >{$t('common.surveys')}</a>
    </nav>
      

      <!-- Login and Locale Dropdown -->
      <div class="mt-4 border-t border-gray-300 pt-4">
      
        <div class="mt-2">
          <h2 class="text-sm font-medium text-gray-500">{$t('common.language')}</h2>
          <div class="space-y-2">
            {#each languages as lang}
            <button
              class="flex items-center w-full px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-400"
              on:click={() => { locale.set(lang.code); toggleMobileMenu(); }}
            >
              <span class="mr-2">{lang.icon}</span>
              {lang.label}
            </button>
            {/each}
          </div>
        </div>
      </div>
      <div class="mt-4 flex flex-col items-stretch space-y-2 px-4">
        {#if currentAuth.user}
          <!-- Profile Button -->
          <button
            type="button"
            class="block text-sm font-medium text-gray-700 hover:text-gray-900 bg-white rounded-md px-4 py-2 shadow"
            on:click={() => goto('/profile')}
          >
            {$t('common.profile')}
          </button>
          <!-- Logout Button -->
          <button
            type="button"
            class="block text-sm font-medium text-gray-700 hover:text-gray-900 bg-white rounded-md px-4 py-2 shadow"
            on:click={logout}
          >
            {$t('common.logout')}
          </button>
        {:else}
          <!-- Login Button -->
          <button
            type="button"
            class="block text-sm font-medium text-gray-700 hover:text-gray-900 bg-white rounded-md px-4 py-2 shadow"
            on:click={() => goto('/login')}
          >
            {$t('common.login')}
          </button>
        {/if}
      </div>
      
    </div>
  </div>


<style>
  .favicon {
    display: block;
    will-change: transform, opacity;
  }
</style>
