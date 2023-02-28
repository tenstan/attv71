<script>
  import Icon from "$lib/components/Icon.svelte";
</script>

<div class="contact contact-grid">
  <h2 class="page-title">Plaats</h2>
  <iframe
    title="Sporthal locatie"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2092.908568319332!2d5.752750288539847!3d51.40485975182589!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c73ac4d61c40f5%3A0xe174996ec1ab2477!2sDe%20Schop!5e0!3m2!1sen!2snl!4v1675379157059!5m2!1sen!2snl"
    width="600"
    height="450"
    style="border:0;"
    allow="fullscreen"
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade"
    class="location-map"
  />
  <div class="contact-details">
    <p class="spaced">Sporthal De Schop</p>
    <p class="spaced">Lienderweg 66</p>
    <p class="spaced">5721 CN Asten</p>
    <p class="spaced">Iedere donderdag van 19:00 tot 23:00</p>
  </div>
  <div class="media">
    <Icon name="whatsapp" />
    <Icon name="email" />
    <Icon name="phone" />
    <Icon name="instagram" />
  </div>
  <div class="walk-route">
    <p>
      Parkeren kan vooraan het gebouw van De Schop. Bij binnenkomst van De Schop
      rechtdoor lopen, daar hangt een krijtbord dat aangeeft welke kleedlokalen
      beschikbaar zijn (ATTV'71 Mannen / Vrouwen). Aan de andere zijde via de
      deur van het kleedlokaal bevindt zich de sporthal.
    </p>
  </div>
</div>

<style>
  
  .spaced {
    letter-spacing: 0.1rem;
  }

  .contact-grid {
    display: grid;
    grid-template-areas:
      "title ."
      "map contact-details"
      "map media"
      "map route";
    grid-template-rows: auto auto 1fr 1fr;
    grid-template-columns: auto 1fr;
    column-gap: 2rem;
  }

  .contact {  
    color: white;

    max-width: 75rem;

    margin-left: auto;
    margin-right: auto;
  }

  .contact-details {
    grid-area: contact-details;
  }

  .contact-details > p:not(:first-child) {
    margin-top: 0.5em;
  }

  .location-map {
    grid-area: map;
  }

  .media {
    grid-area: media;

    display: flex;
    justify-content: space-evenly;
  }

  .walk-route {
    grid-area: route;
  }

  h2 {
    grid-area: title;
    padding-bottom: 1em;

    font-size: 3rem;
    font-weight: 600;
  }
</style>
