<script setup lang="ts">
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
</script>

<template>
  <div :class="$style.page">
    <div>
      <Header />
    </div>
    <main :class="$style['main-container']">
      <slot />
    </main>
    <div :class="$style['footer-container']">
      <Footer />
    </div>
  </div>
</template>

<style lang="postcss" module>
.page {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;

  background-color: var(--background-primary);
  color: #fff;
}

.main-container {
  margin-top: 3rem;
  flex-grow: 1;
}

.footer-container {
  margin-top: 5rem;
}
</style>
