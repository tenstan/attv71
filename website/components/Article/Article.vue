<script setup lang="ts">
import type { Article } from '~/shared/models/api/articles'
import ContentBlock from '~/components/Article/Blocks/ContentBlock.vue'
import MediaBlock from '~/components/Article/Blocks/MediaBlock.vue'

const { article } = defineProps<{ article: Article }>()
</script>

<template>
  <div>
    <h2 :class="$style['article-title']">{{ article.title }}</h2>
    <div>
      <template v-for="block in article.layout">
        <ContentBlock v-if="block.blockType === 'contentBlock'" :key="`contentBlock-${block.id}`" :block="block" />
        <MediaBlock v-else-if="block.blockType === 'mediaBlock'" :key="`mediaBlock-${block.id}`" :block="block" />
      </template>
    </div>
  </div>
</template>

<style lang="postcss" module>
.article-title {
  font-weight: 800;
  line-height: 1.25;
  letter-spacing: -0.16rem;
  font-size: 4rem;

  width: fit-content;
  margin-inline: auto;
  margin-block-end: 0.5em;
}
</style>
