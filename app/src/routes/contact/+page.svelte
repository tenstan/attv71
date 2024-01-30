<script>
  import MapLocation from "./MapLocation.svelte";
  import ContactDetails from "./ContactDetails.svelte";
  import ContactIcons from "./ContactIcons.svelte";
  import EntranceInfo from "./EntranceInfo.svelte";
  import PageTitle from "$lib/components/PageTitle.svelte";
</script>

<div class="container-s">
  <PageTitle class="title">Plaats</PageTitle>
  <div class="contact-row">
    <div class="min-map-size">
      <MapLocation />
    </div>
    <div class="contact-info">
      <ContactDetails />
      <ContactIcons />
      <EntranceInfo />
    </div>
  </div>
</div>

<style>
  .container-s {
    padding-inline: 2rem;
    max-width: 80rem;
    margin: auto;
  }

  .container-s :global(.title) {
    margin-bottom: 0.5em;
  }

  .contact-row {
    display: flex;
    gap: 3rem;
    flex-wrap: wrap;
  }

  .contact-row > * {
    flex: 1;
  }

  .contact-info {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    font-size: 1.125rem;
  }

  .min-map-size {
    min-height: 300px;
    min-width: 240px;
  }
</style>
