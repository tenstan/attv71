<script lang="ts">
  import DynamicNewsPost from '$lib/components/DynamicNewsPost.svelte';
  import PreviewArticleSeparator from '$lib/components/PreviewArticleSeparator.svelte';
    import type { HomePageData } from './+page.server';

  export let data: HomePageData;
</script>

<svelte:head>
  <title>ATTV'71 - Home</title>
</svelte:head>

<div class="mx-auto w-fit">
  {#each data.posts as post}
    {#if data.posts[0] !== post}
      <PreviewArticleSeparator />
    {/if}

    <DynamicNewsPost newsPost={post}></DynamicNewsPost>
  {/each}
</div>