<div class="prosef">
  <slot />
</div>

<style>
  .prosef {
    font-size: 1.125rem;
  }

  .prosef :global(p > img) {
    margin-left: auto;
    margin-right: auto;

    max-width: 40%;
  }

  .prosef > :global(*) {
    margin-left: auto;
    margin-right: auto;
  }

  .prosef :global(p) {
    margin-top: 1.25em;
    margin-bottom: 1.25em;
  }

  .prosef :global(p:not(:has(img))), 
  .prosef :global(ol) {
    max-width: 65ch;
  }

  .prosef :global(img) {
    margin-top: 2em;
    margin-bottom: 2em;
  }

  .prosef :global(ol) {
    list-style-type: decimal;
    margin-top: 1.25em;
    margin-bottom: 1.25em;
    padding-left: 1.625rem;
  }

  .prosef :global(ol > li) {
    padding-left: 0.375em;
  }

  .prosef :global(li) {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  }
</style>