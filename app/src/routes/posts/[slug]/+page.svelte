<script lang="ts">
    import type { MarkdownData } from "./+page";

  export let data: MarkdownData;
</script>

<svelte:head>
  <title>{data.title}</title>
</svelte:head>

<div class="prose dark:prose-invert">
  <h2>{data.title}</h2>
  <svelte:component this={data.markdownContent}></svelte:component>
</div>