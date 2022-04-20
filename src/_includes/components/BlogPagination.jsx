export const BlogPagination = ({ pagination }) => {
  const nextHref = pagination.href.next;
  const prevHref = pagination.href.previous;
  return (
    <div class="post-pagination">
      <div>{prevHref && <a href={prevHref}>&lt; Previous</a>}</div>
      <div>
        {pagination.pageNumber + 1} of {pagination.pages.length}
      </div>
      <div>{nextHref && <a href={nextHref}>Next &gt;</a>}</div>
    </div>
  );
};
