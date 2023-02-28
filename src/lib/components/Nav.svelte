<header class="attv-header">
  <h1 class="logo">
    <a href="/">ATTV'71</a>
  </h1>
  <nav class="main-nav">
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/evenementen">Evenementen</a></li>
      <li><a href="/over-ons">Over ons</a></li>
      <li><a href="/competitie">Competitie</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>
  </nav>
</header>

<style>
  .attv-header {
    display: grid;
    grid-template-areas: ". logo nav-links";
    grid-template-columns: 9% 49% 1fr;
    align-items: center;

    min-height: 15vh;
  }

  a {
    font-size: 1.2rem;
    text-decoration: none;
    color: var(--attv-black);
  }

  header {
    background-color: var(--attv-yellow);
  }

  h1 {
    font-size: 1.5rem;
  }

  ul {
    display: flex;
    gap: 1.5rem;

    list-style: none;
  }

  .logo {
    grid-area: logo
  }

  .main-nav {
    grid-area: nav-links
  }
</style>