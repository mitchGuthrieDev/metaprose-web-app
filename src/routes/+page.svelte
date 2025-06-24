<!-- src/routes/+page.svelte -->
<script>
  import { goto } from '$app/navigation';
  import episodes from '$lib/data/episodes.json';
  goto(`/episodes/${episodes[0].slug}`);
</script>
