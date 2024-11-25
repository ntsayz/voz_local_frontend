<script lang="ts">
  import { auth, type AuthState } from '$lib/stores/auth';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores'; // Import the $page store
  
  let currentAuth: AuthState;
  let currentPath: string; // Holds the current path from the $page store
  let isMobileMenuOpen = false; // State for mobile menu visibility
  let isDropdownOpen = false; // State to toggle dropdown visibility

  const unsubscribeAuth = auth.subscribe((value) => {
    currentAuth = value;
  });

  const unsubscribePage = page.subscribe(($page) => {
    currentPath = $page.url.pathname; // Get the current path
  });

  function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen; // Toggle the menu state
  }

  function toggleDropdown() {
    isDropdownOpen = !isDropdownOpen; // Toggle the dropdown state
  }

  function logout() {
    auth.set({ token: null, user: null });
    localStorage.removeItem('token');
    localStorage.removeItem('auth');
    goto('/login');
  }
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

      <!-- Navigation Links -->
      <div class="hidden sm:ml-6 sm:block">
        <div class="flex space-x-4">
          <a
            href="/"
            class="rounded-md px-3 py-2 text-sm font-medium 
            {currentPath === '/' ? 'bg-primary-500 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}"
          >Início</a>
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

      <!-- Profile / Auth Section -->
      <!-- Profile / Auth Section -->
      <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
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
    class="sm:hidden"
    id="mobile-menu"
    class:hidden={!isMobileMenuOpen} 
  >
    <div class="space-y-1 px-2 pb-3 pt-2">
      <a
        href="/"
        class="block rounded-md px-3 py-2 text-base font-medium 
        {currentPath === '/' ? 'bg-primary-500 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}"
      >Início</a>
      {#if currentAuth.user?.role === 'admin'}
      <a
        href="/dashboard"
        class="block rounded-md px-3 py-2 text-base font-medium 
        {currentPath === '/dashboard' ? 'bg-primary-500 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}"
      >Painel</a>
      {/if}
      <a
        href="/reports"
        class="block rounded-md px-3 py-2 text-base font-medium 
        {currentPath === '/reports' ? 'bg-primary-500 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}"
      >Avisos e Ocorrências</a>
      <a
            href="/surveys"
            class="rounded-md px-3 py-2 text-sm font-medium 
            {currentPath === '/surveys' ? 'bg-primary-500 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}"
        >Sondagens</a>
    </div>
  </div>
</nav>
