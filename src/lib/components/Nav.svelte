<script lang="ts">
  const anchorLinks = [
    { title: 'Home',        href: '/'            },
    { title: 'Evenementen', href: '/evenementen' },
    { title: 'Over ons',    href: '/over-ons'    },
    { title: 'Competitie',  href: '/competitie'  },
    { title: 'Contact',     href: '/contact'     }
  ]
</script>

<header class="header bg-secondary items-center min-h-[15vh]">
  <h1 class="logo text-primary text-lg">
    <a href="/">ATTV'71</a>
  </h1>
  <nav class="main-nav">
    <ul class="flex gap-6">
      {#each anchorLinks as link}
        <li><a class="text-primary text-lg no-underline" href={link.href}>{link.title}</a></li>
      {/each}
    </ul>
  </nav>
</header>

<style>
  .header {
    display: grid;
    grid-template-areas: ". logo nav-links";
    grid-template-columns: 9% 49% 1fr;
  }

  .logo {
    grid-area: logo
  }

  .main-nav {
    grid-area: nav-links
  }
</style>