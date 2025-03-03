<script setup lang="ts">
import type { MediaBlock } from '~/shared/models/api/articles'

const { block } = defineProps<{ block: MediaBlock }>()
</script>

<template>
  <div :class="$style.container">
    <!-- prettier-ignore -->
    <img :class="$style['mw-100']" :src="block.media.url" :alt="block.media.alt">
  </div>
</template>

<style lang="postcss" module>
.container {
  max-width: 36.25rem;
  width: calc(100% - 2.5rem);
  margin-inline: auto;
}

.mw-100 {
  max-width: 100%;
}
</style>
