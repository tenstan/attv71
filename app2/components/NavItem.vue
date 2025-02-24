<script setup lang="ts">
const props = defineProps<{ href: string }>()
</script>

<template>
  <li>
    <a class="hover:underline" :href="props.href"><slot /></a>
  </li>
</template>
