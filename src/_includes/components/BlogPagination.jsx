import { css } from "../style.mjs";

export const BlogPagination = ({ pagination }) => {
  const nextHref = pagination.href.next;
  const prevHref = pagination.href.previous;
  return (
    <div class={wrapStyle()}>
      <div>{prevHref && <a href={prevHref}>&lt; Previous</a>}</div>
      <div>
        {pagination.pageNumber + 1} of {pagination.pages.length}
      </div>
      <div>{nextHref && <a href={nextHref}>Next &gt;</a>}</div>
    </div>
  );
};

const wrapStyle = css({
  display: "flex",
  justifyContent: "space-between",
});
