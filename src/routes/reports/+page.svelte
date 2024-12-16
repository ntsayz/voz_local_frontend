<script lang="ts">
  import { t } from 'svelte-i18n';
  import Header from '$lib/components/common/Header.svelte';
  import Footer from '$lib/components/common/Footer.svelte';
  import MapContainer from '$lib/components/reports/MapContainer.svelte';
  import ProvinceModal from '$lib/components/reports/ProvinceModal.svelte';
  import NotificationContainer from '$lib/components/common/NotificationContainer.svelte';
  import { provinces } from '$lib/data/provinces';
  import { onMount } from 'svelte';
  import { getReportsPerProvince } from '$lib/api/report';

  let reportsData = {};
  let notifications = [
    "Cidade de Maputo: Corte de energia no Bairro de Maxaquene devido a avaria técnica. EDM informada.",
    "Cabo Delgado: Chuvas intensas previstas. Alerta para inundações.",
    "Nampula: Obras no Km 200 da N104 causam trânsito em Mómula.",
    "Sofala: Caminão avariado na EN6 provoca filas em Dondo.",
    "Inhambane: Abastecimento de água interrompido em Maxixe para manutenção. FIPAG informado.",
    "Gaza: Forte vento danifica telhados na região de Chibuto. Equipas de emergência acionadas.",
    "Zambézia: Ponte sobre o rio Licungo sob inspeção. Rota alternativa sugerida.",
    "Tete: Interrupção de rede de telefonia em Moatize devido a falha técnica. Operadora notificada.",
    "Niassa: Registo de incêndio florestal próximo a Lichinga. Autoridades em alerta.",
    "Manica: Deslizamento de terra afeta EN7 perto de Machipanda. Trânsito condicionado."
    ];
  let selectedProvince: string | null = null;

  onMount(async () => {
    reportsData = await getReportsPerProvince();
  });

  function colorScale(count: number) {
    const shades = { 50: '#E3EDF3', 300: '#5790B3', 500: '#26547C' };
    return count > 5 ? shades[500] : count > 0 ? shades[300] : shades[50];
  }

  function closeModal() {
    selectedProvince = null;
  }

  function handleProvinceClick(provinceId: string) {
    selectedProvince = provinceId;
  }
</script>


  <Header />
  <main class="min-h-screen">
    <NotificationContainer
    {notifications}
    entryDirection="top"
    cycleInterval={5000}
    marginTop="64px"
  />
    <MapContainer
      {provinces}
      {colorScale}
      data={reportsData}
      onProvinceClick={handleProvinceClick}
      tooltipFormatter={(id) => `${reportsData[id]?.count || 0} reports`}
      notifications={notifications}
    />
    <ProvinceModal
      {selectedProvince}
      {provinces}
      {reportsData}
      closeModal={closeModal}
    />
  </main>
  <Footer />


<style>

  main {
    padding-top: 2rem;
    padding-bottom: 2rem;
    margin-top: 40px;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>