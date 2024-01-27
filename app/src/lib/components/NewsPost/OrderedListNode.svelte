<script lang="ts">
  export let items: string[];
</script>

<ol>
  {#each items as item}
      <li>{item}</li>
  {/each}
</ol>