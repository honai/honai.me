<script>
  import { onMount } from "svelte"

  export let title
  export let date
  export let updated

  let dateStr = date
  let updatedStr = updated
  onMount(() => {
    ;[dateStr, updatedStr] = [date, updated].map((s) => new Date(s).toLocaleDateString())
  })
</script>

<header class="article-hero">
  <h1 class="title">{title}</h1>
  <div class="meta">
    <div class="century-gothic date">
      <time id="published-time" datetime={date}>{dateStr}</time>
      {#if !!updated}
        (Updated at <time id="updated-time" datetime={updatedStr}>{updated}</time>)
      {/if}
    </div>
  </div>
</header>

<style lang="scss">
  .article-hero {
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    > .title {
      font-size: 3.2rem;
    }
  }
</style>
