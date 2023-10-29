<script lang="ts">
  import IconDotsHorizontal from 'virtual:icons/mdi/dots-horizontal'
  import NavItem from './NavItem.svelte';
  import SubMenuNavItem from './SubMenuNavItem.svelte';
</script>

<header class="bg-secondary text-primary">
  <div class="mx-auto flex justify-between py-12 px-14 max-w-[105rem]">
    <h1 class="text-2xl flex items-center font-bold">
      <a href="/">ATTV'71</a>
    </h1>
    <div class="flex items-center">
      <nav class="hidden lg:block">
        <ul class="flex gap-6 text-xl">
          <NavItem href='/'>Home</NavItem>
          <NavItem href='/evenementen'>Evenementen</NavItem>
          <SubMenuNavItem href="/over-ons">
            <svelte:fragment slot="main">Over ons</svelte:fragment>
            <svelte:fragment slot="sublist">
              <li class="hover:underline px-4"><a href="/over-ons">Over ons</a></li>
              <li class="hover:underline pt-4 px-4"><a href="/bestuur">Bestuur</a></li>
              <li class="hover:underline pt-4 px-4"><a href="/leden-van-verdienste">Leden van verdienste</a></li>
              <li class="hover:underline pt-4 px-4"><a href="/club-van-25">Club van 25</a></li>
            </svelte:fragment>
          </SubMenuNavItem>
          <SubMenuNavItem href="/competitie">
            <svelte:fragment slot="main">Competitie</svelte:fragment>
            <svelte:fragment slot="sublist">
              <li class="hover:underline px-4"><a href="/competitie">Competitie</a></li>
              <li class="hover:underline pt-4 px-4"><a href="/standen">Standen</a></li>
            </svelte:fragment>
          </SubMenuNavItem>
          <NavItem href='/contact'>Contact</NavItem>
        </ul>
      </nav>
      <div class="relative px-10 mx-10 border-l border-neutral-900 lg:hidden">
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