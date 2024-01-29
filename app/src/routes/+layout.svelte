<script>
  import Footer from '$lib/components/Footer.svelte';
  import Nav from '$lib/components/Nav.svelte';
  import '../app.css';
  import '../fonts.css';
</script>

<div class="page">
  <Nav />
  <main class="main">
    <slot />
  </main>
  <div class="footer">
    <Footer />
  </div>
</div>

<style>
  .page {
    display: flex;
    flex-direction: column;
    min-height: 100dvh;

    background-color: var(--attv-black);
    color: #FFF;
  }

  .main {
    margin-top: 3rem;
    flex-grow: 1;
  }

  .footer {
    margin-top: 5rem;
  }
</style>