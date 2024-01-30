<script lang="ts">
  export let data;
</script>

<div class="events">
  <h2>Evenementen</h2>
  <table>
    <thead>
      <tr>
        <th>Titel</th>
        <th>Datum</th>
        <th>Extra informatie</th>
      </tr>
    </thead>
    <tbody>
      {#each data.calendar.activities as item}
        <tr>
          <td>{item.title}</td>
          <td>{item.date.toLocaleDateString('nl-NL', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
          <td>{item.moreInfo}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>



<style>
  h2 {
    font-size: 3rem;
    padding-bottom: 1em;
  }

  .events {
    font-size: 1.125rem;
    margin: 0 auto;
    max-width: var(--container-width);
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
</style>