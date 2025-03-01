<script setup lang="ts">
import Nav from '~/components/Nav/Nav.vue'
</script>

<template>
  <header :class="$style.header">
    <Nav />
  </header>
</template>

<style lang="postcss" module>
.header {
  display: grid;
  justify-content: end;
  padding: 2rem 10rem;

  background-color: var(--background-secondary);
}
</style>
