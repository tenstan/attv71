<script setup lang="ts">
import { useArticlesFetch } from '#imports'
import Article from '~/components/Article/Article.vue'

const { data: articles } = await useArticlesFetch()

const data = articles.value?.docs
</script>

<template>
  <Article v-for="article in data" :key="article.id" :article="article" />
</template>
