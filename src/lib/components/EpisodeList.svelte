<script lang="ts">
  import { episodes, currentSlug } from '$lib/stores';
  import EpisodeItem from './EpisodeItem.svelte';
  import { goto } from '$app/navigation';
  // Use Svelte's $ syntax for auto-subscription to stores
  // No need to manually subscribe or declare $variables
  function select(slug: string) {
    currentSlug.set(slug);
    goto(`/episodes/${slug}`);
  }
</script>

<ul class="space-y-2">
  {#each $episodes as ep}
    <EpisodeItem
      ep={ep}
      active={ep.slug === $currentSlug}
      on:click={() => select(ep.slug)}
    />
  {/each}
</ul>
