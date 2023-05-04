<script lang="ts">
  import type { HomePageData } from './+page';

  export let data: HomePageData;
</script>

<svelte:head>
  <title>ATTV'71 - Home</title>
</svelte:head>

<div>
  {#each data.posts as post}
    <article class="prose dark:prose-invert max-w-2xl mx-auto center-images">
      <h2 class="text-center text-4xl font-bold"><a href={post.slug}>{post.title}</a></h2>
      <p class="text-center">{post.date}</p>
      {@html post.html}
    </article>
  {/each}
</div>

<style>
   :global(.center-images img) {
    margin-left: auto;
    margin-right: auto;
  }
</style>