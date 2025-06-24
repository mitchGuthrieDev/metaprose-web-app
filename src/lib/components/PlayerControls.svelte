<script lang="ts">
  import { onMount } from 'svelte';
  import { current } from '$lib/stores';
  import type { Episode } from '$lib/types';
  import { derived } from 'svelte/store';

  let audio: HTMLAudioElement;
  // Subscribe to current episode
  let currentEpisode: Episode | null;
  current.subscribe((v) => (currentEpisode = v));

  // UI state
  let playing = false;
  let currentTime = 0;
  let duration = 0;

  // Expose a derived store for the current audio src
  const src = derived(current, ($c) => $c?.audio || '');

  onMount(() => {
    // whenever src changes, load new file
    const unsubscribe = src.subscribe((url) => {
      if (!audio || !url) return;
      audio.src = url;
      audio.load();
      audio.addEventListener('loadedmetadata', () => {
        duration = audio.duration;
      });
      audio.addEventListener('timeupdate', () => {
        currentTime = audio.currentTime;
      });
    });
    return () => {
      unsubscribe();
    };
  });

  function togglePlay() {
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
    playing = !playing;
  }

  function seek(e: Event) {
    const input = e.target as HTMLInputElement;
    audio.currentTime = parseFloat(input.value);
  }
</script>

<div class="space-y-2">
  <audio bind:this={audio} preload="metadata" hidden></audio>
  <button on:click={togglePlay} aria-label={playing ? 'Pause' : 'Play'}>
    {#if playing}⏸️{:else}▶️{/if}
  </button>

  <div>
    <input
      type="range"
      min="0"
      max={duration}
      step="0.01"
      value={currentTime}
      on:input={seek}
    />
  </div>
  <div class="text-sm">
    {Math.floor(currentTime / 60)}:{String(Math.floor(currentTime % 60)).padStart(2,'0')}
    /
    {Math.floor(duration / 60)}:{String(Math.floor(duration % 60)).padStart(2,'0')}
  </div>
</div>
