<template>
  <div :class="$style.page">
    <main :class="$style.main">
      <slot />
    </main>
    <div :class="$style.footer">
      <div>footer</div>
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

.main {
  margin-top: 3rem;
  flex-grow: 1;
}

.footer {
  margin-top: 5rem;
}
</style>
