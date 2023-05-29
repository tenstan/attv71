<script lang="ts">
  export let href: string;
</script>

<li>
  <a class="hover:underline" {href}><slot /></a>
</li>