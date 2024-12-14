<script lang="ts">
    export let label;
    export let votes;
    export let totalVotes;
    export let color = '#2196f3';
  </script>
  
  <div class="flex items-center justify-between">
    <span>{label}</span>
    <span class="text-sm text-gray-500">{votes} votos</span>
  </div>
  <div class="w-full bg-gray-200 rounded-full h-2.5">
    <div
      class="h-2.5 rounded-full"
      style="width: {votes / totalVotes * 100}%; background-color: {color};"
    ></div>
  </div>