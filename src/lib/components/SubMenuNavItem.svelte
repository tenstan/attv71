
<script lang="ts">
  import IconChevronDown from "virtual:icons/mdi/chevron-down";

  export let href: string;
</script>

<li class="relative">
  <a class="hover:underline" {href}>
    <slot name="main" />   
    <IconChevronDown class="inline" />
    <ul class="sub-menu">
      <slot name="sublist" />
    </ul>
  </a>
</li>

<style>
  /* TODO: It's terrible... Please rewrite */
  .sub-menu {
    position: absolute;

    @apply bg-black;
    @apply text-secondary;

    padding: 1rem;

    top: calc(100% + 1rem);
    right: 5%;

    opacity: 0;

    pointer-events: none;

    width: 12.5rem;
  }

  a:hover > .sub-menu {
    transition: opacity 0.2s linear, transform 0.2s linear;
    opacity: 1;

    pointer-events: all;
  }

  .sub-menu::before {
    content: '';
    height: 1.5rem;
    width: 100%;
    display: block;
    background-color: transparent;
    bottom: 100%;
    position: absolute;
    right: 0;
  }

  .sub-menu::after {
    content: '';
    position: absolute;

    bottom: 100%;
    right: 10%;

    border: 0.5rem solid #000;
    border-color: transparent transparent black transparent;
  }
</style>