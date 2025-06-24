<script lang="ts">
  import { fly, fade } from 'svelte/transition';
  import type { Episode } from '$lib/types';
  export let episode: Episode;
</script>

{#key episode.slug}
  <div in:fade={{ duration: 200 }} out:fade={{ duration: 200 }} class="space-y-4">
    <img src={episode.artwork} alt="" class="w-32 h-32 object-cover rounded" />
    <h2 class="text-xl font-semibold" in:fly={{ x: 50 }} out:fly={{ x: -50 }}>
      {episode.title}
    </h2>
    {#if episode.date}
      <p class="text-sm text-gray-600">{episode.date}</p>
    {/if}
    <a
      href={episode.audio}
      download
      class="inline-block px-3 py-1 bg-blue-500 text-white rounded"
    >
      Download
    </a>
  </div>
{/key}
