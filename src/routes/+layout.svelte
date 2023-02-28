<script>
  import Footer from '$lib/components/Footer.svelte';
  import Nav from '$lib/components/Nav.svelte';
  import '../app.css';
</script>

<Nav />

<main>
  <slot />
</main>

<Footer />

<style>
  main {
    padding-top: 5rem;
  }
</style>