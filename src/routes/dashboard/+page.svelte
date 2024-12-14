<script lang="ts">
    import { locations } from '$lib/stores/locations';
    import { get } from 'svelte/store';
    import Header from '$lib/components/common/Header.svelte';
    import Footer from '$lib/components/common/Footer.svelte';
  
    const localLocations = get(locations); // Retrieve the current state of locations
  </script>
  
    <Header />
  {#if localLocations.length > 0}
    <h2>Available Locations</h2>
    <ul>
      {#each localLocations as location}
        <li>
          <strong>{location.name}</strong> (ID: {location.id})
          <p>
            Posto Administrativo: {location.postoAdministrativo?.name}, 
            Distrito: {location.postoAdministrativo?.distrito.name},
            Provincia: {location.postoAdministrativo?.distrito.provincia.name}
          </p>
        </li>
      {/each}
    </ul>
  {:else}
    <p>Loading locations...</p>
  {/if}

  <Footer/>
  