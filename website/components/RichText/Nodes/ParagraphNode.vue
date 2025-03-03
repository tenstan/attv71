<script setup lang="ts">
import type { ParagraphNode } from '~/shared/models/api/lexical-rich-text'

const { node } = defineProps<{ node: ParagraphNode }>()
// A paragraph node of lexical rich text should only ever have one text node
const textNode = node.children[0]
</script>

<template>
  <p>{{ textNode.text }}</p>
</template>
