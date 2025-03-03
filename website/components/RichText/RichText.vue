<script setup lang="ts">
import type { RichText } from '~/shared/models/api/lexical-rich-text'
import ParagraphNode from './Nodes/ParagraphNode.vue'
import ListNode from './Nodes/ListNode.vue'

const { content } = defineProps<{ content: RichText }>()
</script>

<template>
  <div :class="$style['rich-text']">
    <template v-for="child in content.root.children">
      <ParagraphNode v-if="child.type === 'paragraph'" :node="child" />
      <ListNode v-if="child.type === 'list'" :node="child" />
    </template>
  </div>
</template>

<style lang="postcss" module>
.rich-text {
  font-size: 1.125rem;

  :global(p) {
    margin-block: 1em;
    line-height: 1.4;
  }

  :global(li) {
    list-style-position: inside;
    margin-block: 0.2em;
  }
}
</style>
