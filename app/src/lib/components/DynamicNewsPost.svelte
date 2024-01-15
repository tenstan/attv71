<script lang="ts">
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
        <p>{node.text}</p>
      {:else if node.type === 'image-section'}
        <div class="flex justify-between">
        {#each node.images as image}
          <img class="max-w-sm" src="http://localhost:3000{image.source}" alt="placeholder" />
        {/each}
        </div>
      {:else if node.type === 'ordered-list'}
        <ol>
          {#each node.items as item}
              <li>{item.text}</li>
          {/each}
        </ol>
      {/if}
    {/each}
  </div>
</article>