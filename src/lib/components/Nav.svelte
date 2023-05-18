<script lang="ts">
  import IconDotsHorizontal from 'virtual:icons/mdi/dots-horizontal'

  const anchorLinks = [
    { title: 'Home',        href: '/'            },
    { title: 'Evenementen', href: '/evenementen' },
    { title: 'Over ons',    href: '/over-ons'    },
    { title: 'Competitie',  href: '/competitie'  },
    { title: 'Contact',     href: '/contact'     }
  ]
</script>

<header class="bg-secondary text-primary">
  <div class="mx-auto flex justify-between py-12 px-14 max-w-[105rem]">
    <h1 class="text-2xl flex items-center">
      <a href="/">ATTV'71</a>
    </h1>
    <div class="flex items-center">
      <nav>
        <ul class="flex gap-6 text-xl">
          {#each anchorLinks as link}
            <li><a class="hover:underline" href={link.href}>{link.title}</a></li>
          {/each}
        </ul>
      </nav>
      <div class="relative px-10 mx-10 border-l border-neutral-900">
        <button class="nav-toggle-button">
          <IconDotsHorizontal class="inline" height="40" width="40" />
          <span class="absolute left-0 right-0 top-10 text-xs">Menu</span>     
        </button>
      </div>
    </div>
  </div>
</header>

<style>
  .nav-toggle-button:hover > span {
    text-decoration: underline;
  }
</style>