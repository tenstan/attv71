<script>
  import IconWhatsapp from "virtual:icons/mdi/whatsapp";
  import IconEmail from "virtual:icons/mdi/email";
  import IconPhone from "virtual:icons/mdi/phone";
  import IconInstagram from "virtual:icons/mdi/instagram";
</script>

<div class="icons">
  <a href="https://wa.me/31636295860"><IconWhatsapp width=3.5em height=3.5em /></a>
  <a href="mailto:attv71@hotmail.com"><IconEmail width=3.5em height=3.5em /></a>
  <a href="tel:+31 6 3629586"><IconPhone class="icon" width=3.5em height=3.5em /></a>
  <a href="https://www.instagram.com/attv.asten/"><IconInstagram width=3.5em height=3.5em /></a>
</div>

<style>
  .icons {
    display: flex;
    justify-content: space-evenly;
    gap: 1em;
    color: var(--attv-yellow);

    font-size: clamp(0.8rem, 4vw, 1.1rem); /* Used to scale the icons */
  }
</style>