<script lang="ts">
    export let results;
  </script>
  
  <table class="w-full mt-2 border-collapse">
    <thead>
      <tr>
        <th class="border-b text-left">Critério</th>
        {#each results[0].columns as column}
          <th class="border-b text-left">{column}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each results as row}
        <tr>
          <td class="py-2">{row.label}</td>
          {#each row.values as value}
            <td class="py-2">{value}</td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>