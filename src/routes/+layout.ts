// src/routes/+layout.ts
import type { Load } from '@sveltejs/kit';
import episodes from '$lib/data/episodes.json';

export const load: Load = () => {
  return { episodes };
};
