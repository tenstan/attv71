<script lang="ts">
  import PageTitle from "$lib/components/PageTitle.svelte";
  import type { CalendarData } from "./+page.server";

  export let data: CalendarData;
</script>

<!-- a11y roles need to be set explicitly, since semantics are destroyed through display: block on mobile view -->
<!-- svelte-ignore a11y-no-redundant-roles -->

<div class="container-s">
  <PageTitle class="title">Kalender</PageTitle>
  <table role="table">
    <thead role="rowgroup">
      <tr role="row">
        <th role="columnheader">Titel</th>
        <th role="columnheader" >Datum</th>
        <th role="columnheader">Meer informatie</th>
      </tr>
    </thead>
    <tbody role="rowgroup">
      {#each data.calendar.activities as item}
        <tr role="row">
          <td role="cell" data-heading="Titel">{item.title}</td>
          <td role="cell" data-heading="Datum">{item.date.toLocaleDateString('nl-NL', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
          <td role="cell" data-heading="Meer info">{item.moreInfo}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .container-s :global(.title) {
    margin-bottom: 1.5rem;
  }

  .container-s {
    width: calc(100% - 2em);
    max-width: 75rem;
    margin-inline: auto;
  }

  td {
    border-top: 1px solid white;
    padding: 0.8rem;
  }

  th {
    padding: 0.8rem;
  }

  table {
    text-align: left;
    width: 100%;
  }

  @media (max-width: 37.5rem) {
    thead {
      display: none;
    }

    tr {
      display: block;
      border: 1px solid hsl(47, 15%, 59%);
      padding-block: 0.5rem;
    }

    tr:not(:last-child) {
      margin-bottom: 2rem;
    }

    td {
      display: grid;
      grid-template-columns: 8ch auto;
      gap: max(1rem, 5vw);
      border: none;
      word-break: break-word;
    }

    td::before {
      content: attr(data-heading) ':';
      font-weight: 700;
    }

    td[data-heading="Meer info"]:empty::after {
      content: '-';
    }
  }
</style>