<script lang="ts">
  import { t } from 'svelte-i18n';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import MapContainer from '$lib/components/reports/MapContainer.svelte';
  import ProvinceModal from '$lib/components/reports/ProvinceModal.svelte';
  import NotificationContainer from '$lib/components/common/NotificationContainer.svelte';
  import { provinces } from '$lib/data/provinces';
  import { onMount } from 'svelte';
  import { getReportsPerProvince } from '$lib/api/report';

  let reportsData = {};
  let notifications = [
    "Breaking News: Event 1 happened!",
    "Update: Event 2 just occurred!",
    "Alert: Event 3 is ongoing!"
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

<div class="layout">
  <Header />
  <main>
    <NotificationContainer
    {notifications}
    entryDirection="top"
    cycleInterval={7000}
  />
    <MapContainer
      {provinces}
      {colorScale}
      data={reportsData}
      onProvinceClick={handleProvinceClick}
      tooltipFormatter={(id) => `${reportsData[id]?.count || 0} reports`}
    />
    <ProvinceModal
      {selectedProvince}
      {provinces}
      {reportsData}
      closeModal={closeModal}
    />
  </main>
  <Footer />
</div>

<style>
  .layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  main {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>