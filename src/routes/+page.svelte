<script lang="ts">
  import ArticlePreview from '$lib/components/ArticlePreview.svelte';
  import type { HomePageData } from './+page.server'

  export let data: HomePageData;
</script>

<svelte:head>
  <title>ATTV'71 - Home</title>
</svelte:head>

<div>
  {#each data.articles as article}
    <ArticlePreview article={article} />
  {/each}
</div>
