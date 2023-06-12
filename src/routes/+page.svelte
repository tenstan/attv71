<script lang="ts">
  import PreviewArticle from '$lib/components/PreviewArticle.svelte';
    import PreviewArticleSeparator from '$lib/components/PreviewArticleSeparator.svelte';
import type { HomePageData } from './+page';

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

    <PreviewArticle title={post.title} href={post.slug} date={new Date(post.date)}>
      {@html post.html}
    </PreviewArticle>
  {/each}
</div>