<script lang="ts">
  import type { Episode } from '$lib/types';
  export let ep: Episode;
  export let active = false;
</script>

<li
  class="p-2 rounded cursor-pointer hover:bg-gray-100 flex justify-between"
  class:font-bold={active}
>
  <span>{ep.title}</span>
  {#if ep.date}
    <span class="text-xs text-gray-500">{ep.date}</span>
  {/if}
</li>
