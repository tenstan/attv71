<script lang="ts">
  export let size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
  export let alt: string = 'GENERIC';
  export let src: string;
</script>

<div class:max-w-[15%]="{size === 'xs'}"
     class:max-w-[30%]="{size === 'sm'}"
     class:max-w-[45%]="{size === 'md'}"
     class:max-w-[60%]="{size === 'lg'}"
     class:max-w-[75%]="{size === 'xl'}">
  <img {src} {alt} />
</div>