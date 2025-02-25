<script setup lang="ts">
const props = defineProps<{ href: string; children: { text: string; href: string }[] }>()
</script>

<template>
  <li>
    <a :class="$style['outer-link']" :href="props.href">
      <slot />
    </a>
    <ul :class="$style['dropdown-list']">
      <li v-for="child in props.children" :key="child.text">
        <a :href="child.href">{{ child.text }}</a>
      </li>
    </ul>
  </li>
</template>

<style lang="postcss" module>
.outer-link {
  color: var(--nav-item-link);
}

.dropdown-list {
  display: none;
}
</style>
