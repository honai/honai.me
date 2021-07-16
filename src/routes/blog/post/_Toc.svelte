<script>
  /** @type {import("$lib/posts").PostToc[]} */
  export let toc
</script>

<ol>
  {#each toc as item (item.id)}
    <li>
      <a href={`#${encodeURIComponent(item.id)}`}>{item.text}</a>
      {#if item.children.length > 0}
        <svelte:self toc={item.children} />
      {/if}
    </li>
  {/each}
</ol>
