<script setup lang="ts">
const props = defineProps<{ href: string }>()
</script>

<template>
  <li>
    <a :class="$style['link']" :href="props.href"><slot /></a>
  </li>
</template>

<style lang="postcss" module>
.link {
  color: var(--nav-item-link);
}
</style>
