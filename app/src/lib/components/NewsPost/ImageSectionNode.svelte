<script lang="ts">
  interface Image {
    src: string;
    alt: string;
  }

  export let images: Image[];
</script>

<div class="flex justify-between">
  {#each images as image}
    <img
      class="max-w-sm"
      src={image.src}
      alt={image.alt}
    />
  {/each}
</div>
