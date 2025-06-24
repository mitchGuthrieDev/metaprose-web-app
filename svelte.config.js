import adapter from '@sveltejs/adapter-static';
import { mdsvex } from 'mdsvex';
import sveltePreprocess from 'svelte-preprocess';

export default {
  extensions: ['.svelte', '.svx', '.md'],

  preprocess: [
    sveltePreprocess(),
    mdsvex({ extension: '.md' })
  ],

  kit: {
    adapter: adapter({
      // For SPA-style routing: fallback to index.html on unknown routes
      fallback: 'index.html'
    }),
    // If your repo is in a subfolder, set base path:
    // paths: { base: '/music-for-programming-clone' }
  }
};
