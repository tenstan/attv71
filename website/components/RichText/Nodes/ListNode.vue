<script setup lang="ts">
import type { ListNode } from '~/shared/models/api/lexical-rich-text'
import ListItemNode from './ListItemNode.vue'

const { node } = defineProps<{ node: ListNode }>()
</script>

<template>
  <component :is="node.tag === 'ol' ? 'ol' : 'ul'" :class="$style.list">
    <ListItemNode v-for="child in node.children" :node="child" />
  </component>
</template>

<style lang="postcss" module>
.list {
  margin-block: 1em;
}
</style>
