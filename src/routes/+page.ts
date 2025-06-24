import type { Load } from '@sveltejs/kit';
import episodesData from '$lib/data/episodes.json';

export const load: Load = () => {
  return {
    episodes: episodesData
  };
};
