<script setup lang="ts">
import NavItem from '~/components/Nav/NavItem.vue'
import NavDropdown from '~/components/Nav/NavDropdown.vue'
import useNavigationFetch from '~/composables/use-navigation-fetch'

const { data: nav } = await useNavigationFetch()
</script>

<template>
  <nav>
    <ul v-if="nav?.items" :class="$style['nav-list']">
      <template v-for="navItem in nav.items" :key="navItem.name">
        <NavItem v-if="!navItem.children" :href="navItem.href">{{ navItem.name }}</NavItem>
        <NavDropdown v-else :href="navItem.href" :children="navItem.children">{{ navItem.name }}</NavDropdown>
      </template>
    </ul>
  </nav>
</template>

<style lang="postcss" module>
.nav-list {
  display: flex;
  gap: 1.5rem;

  font-size: 1.25rem;
  font-weight: 300;
  font-family: 'Roboto';

  list-style: none;
}
</style>
