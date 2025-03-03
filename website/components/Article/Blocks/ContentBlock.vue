<script setup lang="ts">
import RichText from '~/components/RichText/RichText.vue'
import type { ContentBlock } from '~/shared/models/api/articles'

const { block } = defineProps<{ block: ContentBlock }>()

const getColumnWidth = (size: 'full' | 'half' | 'oneThird' | 'twoThirds') => {
  switch (size) {
    case 'full':
      return 'col-span-12' as const
    case 'half':
      return 'col-span-6' as const
    case 'oneThird':
      return 'col-span-4' as const
    case 'twoThirds':
      return 'col-span-8' as const
    default:
      return 'col-span-12' as const
  }
}
</script>

<template>
  <div :class="[$style.container, $style.grid]">
    <div v-for="column in block.columns" :key="column.id" :class="$style[getColumnWidth(column.size)]">
      <RichText :content="column.richText" />
    </div>
  </div>
</template>

<style lang="postcss" module>
.container {
  max-width: 36.25rem;
  width: calc(100% - 2.5rem);
  margin-inline: auto;
}

.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
}

.col-span-12 {
  grid-column: span 12;
}

.col-span-6 {
  grid-column: span 6;
}

.col-span-4 {
  grid-column: span 4;
}

.col-span-8 {
  grid-column: span 8;
}
</style>
