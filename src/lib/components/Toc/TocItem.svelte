<script>
  /** @type {import("$lib/posts").PostToc[]} */
  export let toc
  export let highlight
</script>

<ol>
  {#each toc as item (item.id)}
    <li>
      <a href={`#${encodeURIComponent(item.id)}`} class:active={item.id === highlight}>{item.text}</a>
      {#if item.children.length > 0}
        <svelte:self toc={item.children} {highlight} />
      {/if}
    </li>
  {/each}
</ol>

<style>
  li > .active {
    font-weight: bold;
  }
</style>
