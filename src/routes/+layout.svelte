```svelte
<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { goto } from '$app/navigation';
  import { episodes, currentSlug, current } from '$lib/stores';
  import type { Episode } from '$lib/types';

  import PlayerControls from '$lib/components/PlayerControls.svelte';
  import Visualizer     from '$lib/components/Visualizer.svelte';
  import TrackInfo      from '$lib/components/TrackInfo.svelte';
  import EpisodeList    from '$lib/components/EpisodeList.svelte';

  export let data: { episodes: Episode[] };
  episodes.set(data.episodes);

  let episodesList: Episode[] = [];
  let currentSlugValue: string | null = null;
  let currentEpisode: Episode | null = null;

  const unsubEp = episodes.subscribe(v => episodesList = v);
  const unsubSlug = currentSlug.subscribe(v => currentSlugValue = v);
  const unsubCurr = current.subscribe(v => currentEpisode = v);

  onMount(() => {
    if (!currentSlugValue && episodesList.length) {
      const first = episodesList[0].slug;
      currentSlug.set(first);
      goto(`/episodes/${first}`, { replaceState: true });
    }
    return () => {
      unsubEp(); unsubSlug(); unsubCurr();
    };
  });

  function prev() {
    if (!currentSlugValue) return;
    const idx = episodesList.findIndex(e => e.slug === currentSlugValue);
    const prevIdx = (idx - 1 + episodesList.length) % episodesList.length;
    const slug = episodesList[prevIdx].slug;
    currentSlug.set(slug);
    goto(`/episodes/${slug}`);
  }

  function next() {
    if (!currentSlugValue) return;
    const idx = episodesList.findIndex(e => e.slug === currentSlugValue);
    const nextIdx = (idx + 1) % episodesList.length;
    const slug = episodesList[nextIdx].slug;
    currentSlug.set(slug);
    goto(`/episodes/${slug}`);
  }
</script>

<div class="layout-grid">
  <!-- LEFT PANEL -->
  <aside class="panel left">
    <div class="player-controls-wrap">
      <PlayerControls />
    </div>
    <div class="visualizer-wrap">
      <Visualizer />
    </div>
    <nav class="nav-buttons">
      <button on:click={prev} aria-label="Previous">← Prev</button>
      <button on:click={next} aria-label="Next">Next →</button>
    </nav>
  </aside>

  <!-- CENTER PANEL -->
  <main class="panel center">
    {#if currentEpisode}
      {#key currentEpisode.slug}
        <div class="center-content" in:fade={{ duration: 300 }} out:fade={{ duration: 200 }}>
          <TrackInfo episode={currentEpisode} />
          <slot />
        </div>
      {/key}
    {:else}
      <div class="placeholder">Select an episode from the list →</div>
    {/if}
  </main>

  <!-- RIGHT PANEL -->
  <aside class="panel right">
    <EpisodeList />
  </aside>
</div>

<style>
  /* Grid Layout */
  .layout-grid {
    display: grid;
    grid-template-columns: 300px 1fr 300px;
    height: 100vh;
    overflow: hidden;
  }

  /* Panels Generic */
  .panel {
    display: flex;
    flex-direction: column;
    background: var(--panel-bg);
    color: var(--text);
  }
  .panel.center { background: var(--bg); }

  /* Left Panel */
  .panel.left {
    border-right: 1px solid var(--border);
    padding: 2rem 1.5rem;
  }
  .player-controls-wrap {
    margin-bottom: 2rem;
  }
  .visualizer-wrap {
    flex: 1;
    margin-bottom: 2rem;
  }
  .nav-buttons {
    display: flex;
    justify-content: space-between;
  }
  .nav-buttons button {
    font-family: var(--font-mono);
    background: var(--accent);
    color: var(--bg);
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    user-select: none;
    transition: transform 0.1s ease;
  }
  .nav-buttons button:hover { transform: translateY(-1px); }

  /* Center Panel */
  .panel.center {
    padding: 2rem;
    overflow-y: auto;
  }
  .center-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    animation: fadeIn 0.5s ease;
  }

  /* Right Panel */
  .panel.right {
    border-left: 1px solid var(--border);
    padding: 2rem 1.5rem;
    overflow-y: auto;
  }

  /* Placeholder */
  .placeholder {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-muted);
    font-size: 1.25rem;
  }

  /* Custom Scrollbar */
  .panel.right::-webkit-scrollbar {
    width: 8px;
  }
  .panel.right::-webkit-scrollbar-thumb {
    background: var(--accent);
    border-radius: 4px;
  }

  /* Simple FadeIn Keyframes */
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
</style>
```
