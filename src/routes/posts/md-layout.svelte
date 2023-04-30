<!--
  This layout file is solely used to render markdown through mdsvex. It is not used by other Svelte pages within the path.
-->

<script lang="ts">
  export let title: string | undefined; // Passed in through frontmatter
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>


<div class="prose dark:prose-invert">
  <slot />
</div>