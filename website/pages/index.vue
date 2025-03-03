<script setup lang="ts">
import { useHead } from '#imports'
import ArticleList from '~/components/Article/ArticleList.vue'

useHead({
  title: "ATTV'71 - Home",
})
</script>

<template>
  <div>
    <ArticleList />
  </div>
</template>
