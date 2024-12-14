<script lang="ts">
    import { t, locale } from 'svelte-i18n';
    export let selectedProvince: string | null = null;
    export let provinces: { id: string; name: string }[] = [];
    export let reportsData: { [key: string]: { count: number; details: string[] } } = {};
    export let closeModal: () => void = () => {};
  
    const getProvinceName = () =>
      provinces.find((p) => p.id === selectedProvince)?.name || 'Detalhes da Província';
  </script>
  
  {#if selectedProvince}
    <div
      class="modal-overlay fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
      role="dialog"
      aria-labelledby="province-title"
      aria-describedby="province-description"
      tabindex="0"
      on:click|self={closeModal}
      on:keydown={(event) => event.key === 'Escape' && closeModal()}
    >
      <div
        class="modal bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative animate-modal-in"
      >
        <button
          class="close-button absolute top-4 right-4 text-red-500 text-2xl font-bold"
          on:click={closeModal}
        >
          &times;
        </button>
        <h2 id="province-title" class="text-2xl font-bold text-gray-800">
          {provinces.find((p) => p.id === selectedProvince)?.name || "Detalhes da Província"}
        </h2>
        <p id="province-description" class="text-gray-600 text-lg mt-4">
          <span class="font-medium">{$t('reports.map.provinceDetails.occurrences')}:</span> {reportsData[selectedProvince]?.count || 0}
        </p>
        <ul class="details-list mt-4 space-y-2 text-gray-700 text-sm">
          {#each reportsData[selectedProvince]?.details || [] as detail}
            <li class="flex items-start">
              <span class="bullet w-2 h-2 mt-1.5 rounded-full bg-blue-500 mr-2"></span> {detail}
            </li>
          {/each}
        </ul>
      </div>
    </div>
  {/if}
  
  <style>
    /* Modal Overlay */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
    }
  
    /* Modal Container */
    .modal {
      background: white;
      border-radius: 8px;
      padding: 16px;
      max-width: 500px;
      width: 100%;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
      animation: modal-in 0.4s cubic-bezier(0.25, 0.8, 0.5, 1) forwards; /* New animation */
      opacity: 0; /* Start hidden */
      transform: scale(0.9); /* Start smaller */
    }
  
    /* Close Button */
    .close-button {
      position: absolute;
      top: 8px;
      right: 8px;
      font-size: 24px;
      border: none;
      background: none;
      cursor: pointer;
    }
  
    /* Modal Animation */
    @keyframes modal-in {
      0% {
        opacity: 0;
        transform: scale(0.9);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }
  </style>