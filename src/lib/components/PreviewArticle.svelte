<script lang="ts">
  import IconCalendarBlankOutline from 'virtual:icons/mdi/calendar-blank-outline'
    import ArticleContent from './ArticleContent.svelte';

  export let href: string;
  export let title: string;
  export let date: Date;
</script>

<article class="max-w-6xl">
  <div class="max-w-4xl mx-auto">
    <h2 class="text-center text-6xl">
      <a class="no-underline font-bold hover:underline" {href}>{title}</a>
    </h2>
  </div>
  <div class="flex gap-2 items-center text-faded mx-auto max-w-fit mt-8">
    <IconCalendarBlankOutline class="inline-block"/>
    <p>{date.toLocaleDateString('nl-NL')}</p>
  </div>
  <div class="mt-16">
    <ArticleContent>
      <slot />
    </ArticleContent>
  </div>
</article>