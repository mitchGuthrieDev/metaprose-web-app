<!-- src/routes/episodes/[slug]/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { currentSlug } from '$lib/stores';
  import type { Episode } from '$lib/types';

  import type { ComponentType } from 'svelte';

  export let data: {
    episode: Episode;
    Content: ComponentType;
  };

  // Keep the global store in sync so layout and controls update
  onMount(() => {
    currentSlug.set(data.episode.slug);
  });
</script>

<article class="prose max-w-none p-6">
  <!-- Render the MDsvex‐compiled Markdown for this episode -->
  <svelte:component this={data.Content} />
</article>
