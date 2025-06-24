// src/routes/episodes/[slug]/+page.ts
import { error } from '@sveltejs/kit';
import type { Load } from '@sveltejs/kit';
import type { Episode } from '$lib/types';
import episodes from '$lib/data/episodes.json';

export const load: Load = async ({ params }) => {
  // 1. Find the episode metadata by slug
  const ep = (episodes as Episode[]).find((e) => e.slug === params.slug);
  if (!ep) {
    throw error(404, `Episode "${params.slug}" not found`);
  }

  // 2. Dynamically import the compiled Svelte component from your .md
  const { default: Content } = await import(`$lib/descriptions/${params.slug}.md`);

  return {
    episode: ep,
    Content
  };
};
