<script>
  import Footer from '$lib/components/Footer.svelte';
  import Nav from '$lib/components/Nav.svelte';
  import '../app.css';
</script>

<div class="flex flex-col min-h-screen bg-primary text-white">
  <Nav />
  <main>
    <slot />
  </main>
  <Footer />
</div>

<style>
  main {
    padding-top: 5rem;
  }
</style>