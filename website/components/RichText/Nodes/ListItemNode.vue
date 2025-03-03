<script setup lang="ts">
import type { ListItemNode } from '~/shared/models/api/lexical-rich-text'

const { node } = defineProps<{ node: ListItemNode }>()
// A list item node of lexical rich text should only ever have one text node
const textNode = node.children[0]
</script>

<template>
  <li>
    {{ textNode.text }}
  </li>
</template>
