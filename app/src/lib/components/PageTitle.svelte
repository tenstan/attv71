<script lang="ts">
  let clazz = '';
  export { clazz as class };
</script>

<h2 class="{clazz}"><slot /></h2>

<style>
  h2 {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 700;
    line-height: 1;
  }
</style>
