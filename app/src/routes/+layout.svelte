<script>
  import Footer from '$lib/components/Footer.svelte';
  import Nav from '$lib/components/Nav.svelte';
  import '../app.css';
  import '../fonts.css';
</script>

<div class="flex flex-col min-h-screen bg-primary text-white">
  <Nav />
  <main class="pt-20 grow">
    <slot />
  </main>
  <div class="mt-20">
    <Footer />
  </div>
</div>
