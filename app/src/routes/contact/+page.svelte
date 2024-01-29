<script>
  import MapLocation from "./MapLocation.svelte";
  import ContactDetails from "./ContactDetails.svelte";
  import ContactIcons from "./ContactIcons.svelte";
  import EntranceInfo from "./EntranceInfo.svelte";
</script>

<div class="container">
  <h2 class="page-title">Plaats</h2>
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
  .container {
    padding-inline: 2rem;
    max-width: 80rem;
    margin: auto;
  }

  .page-title {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 700;
    line-height: 1;
    margin-bottom: 1em;
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
