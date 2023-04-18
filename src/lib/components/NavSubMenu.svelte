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
