<script setup lang="ts">
const props = defineProps<{ href: string; children: { text: string; href: string }[] }>()
</script>

<template>
  <li>
    <a :href="props.href">
      <slot />
      <ul>
        <li v-for="child in props.children" :key="child.text">
          <a :href="child.href">{{ child.text }}</a>
        </li>
      </ul>
    </a>
  </li>
</template>
