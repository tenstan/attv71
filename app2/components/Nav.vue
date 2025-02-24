<script setup lang="ts">
interface NavigationItem {
  text: string
  href: string
  children?: {
    text: string
    href: string
  }[]
}

const nav: NavigationItem[] = [
  {
    text: 'Sample1',
    href: '/',
  },
  {
    text: 'Sample2',
    href: '/sample2',
  },
  {
    text: 'Sample3',
    href: '/sample3',
    children: [
      {
        text: 'Sample3',
        href: '/sample3',
      },
      {
        text: 'Sample4',
        href: '/sample4',
      },
      {
        text: 'Sample5',
        href: '/sample5',
      },
    ],
  },
]
</script>

<template>
  <nav>
    <ul :class="$style['nav-list']">
      <template v-for="navItem in nav" :key="navItem.text">
        <NavItem v-if="!navItem.children" :href="navItem.href">{{ navItem.text }}</NavItem>
        <NavDropdown v-else :href="navItem.href" :children="navItem.children">{{ navItem.text }}</NavDropdown>
      </template>
    </ul>
  </nav>
</template>

<style lang="postcss" module>
.nav-list {
  display: flex;
  gap: 1.5rem;
  font-size: 1.25rem;
  list-style: none;
  color: black;
}
</style>
