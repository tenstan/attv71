<script lang="ts">
  import ParagraphNode from './ParagraphNode.svelte';
  import ImageSection from './ImageSectionNode.svelte';
  import OrderedListNode from './OrderedListNode.svelte';
  import ReadMoreNode from './ReadMoreNode.svelte';
  import type { NewsPost } from "$lib/server/cms/get-news-posts";
  import IconCalendarBlankOutline from 'virtual:icons/mdi/calendar-blank-outline'

  export let newsPost: NewsPost;
</script>

<article>
  <div class="max-w-4xl mx-auto">
    <h2 class="text-center text-6xl">
      <a class="no-underline font-bold hover:underline" href="#">{newsPost.title}</a>
    </h2>
  </div>
  <div class="flex gap-2 items-center text-faded mx-auto max-w-fit mt-8">
    <IconCalendarBlankOutline class="inline-block" />
    <p>{newsPost.datePublished}</p>
  </div>
  <div class="mt-16 mx-auto max-w-4xl">
    {#each newsPost.nodes as node}
      {#if node.type === 'paragraph'}
        <ParagraphNode>{ node.text }</ParagraphNode>
      {:else if node.type === 'image-section'}
        <ImageSection images={node.images.map(image => ({ src: image.source, alt: image.alt }))} />
      {:else if node.type === 'ordered-list'}
        <OrderedListNode items={node.items.map(item => item.text)} />
      {:else if node.type === 'read-more'}
        <ReadMoreNode href={newsPost.id} />
      {/if}
    {/each}
  </div>
</article>