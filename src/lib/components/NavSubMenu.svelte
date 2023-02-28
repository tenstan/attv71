<script lang="ts">
  export let subItems: SubItem[];
  
  export let className: string | undefined;
  export {className as class};


  interface SubItem {
    displayName: string;
    href: string;
  }

</script>

<ul class="sub-menu {className}">
  {#each subItems as subItem}
    <li>
      <a href={subItem.href}>{subItem.displayName}</a>
    </li>
  {/each}
</ul>

<style>
  .sub-menu {
    position: absolute;
    right: 0;

    color: var(--attv-yellow);
    background-color: #000000;

    opacity: 1;
    transform: translateY(0);
  }
</style>