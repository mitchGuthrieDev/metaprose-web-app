import { writable, derived } from 'svelte/store';
import type { Episode } from './types';
import episodesData from './data/episodes.json';

export const episodes = writable<Episode[]>(episodesData);

// currentSlug could come from the URL or from user clicks
export const currentSlug = writable<string | null>(null);

// Derive the current episode object
export const current = derived(
  [episodes, currentSlug],
  ([$episodes, $currentSlug]) =>
    $episodes.find((e) => e.slug === $currentSlug) || null
);
