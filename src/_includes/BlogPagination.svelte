<script>
  export let pagination;
  const nextHref = pagination.href.next;
  const prevHref = pagination.href.previous;
</script>

<div class="post-pagination">
  <div>
    {#if prevHref}<a href={prevHref}>&lt; Previous</a>{/if}
  </div>
  <div>
    {pagination.pageNumber + 1} of {pagination.pages.length}
  </div>
  <div>
    {#if nextHref}<a href={nextHref}>Next &gt;</a>{/if}
  </div>
</div>
