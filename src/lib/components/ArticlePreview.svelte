<script lang="ts">
  import type { Article } from "$lib/models/article";

  export let article: Article;
</script>

<div>
  <h2>{article.title}</h2>
  <p>{article.content}</p>
</div>
