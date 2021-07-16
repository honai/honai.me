<script>
  /** @type {import("$lib/posts").PostToc} */
  export let toc
</script>

<li>
  <a href={`#${toc.id}`}>{toc.text}</a>
  {#if toc.children.length > 0}
    <ol>
      {#each toc.children as child (child.id)}
        <svelte:self toc={child} />
      {/each}
    </ol>
  {/if}
</li>
