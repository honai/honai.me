import { Paginate } from "../../../types.js";
import { css } from "../../style.js";

export const BlogPagination = (p: Paginate) => {
  return (
    <div class={wrapStyle()}>
      <div>{p.prevHref && <a href={p.prevHref}>&lt; Previous</a>}</div>
      <div>
        {p.currentIdx + 1} of {p.total}
      </div>
      <div>{p.nextHref && <a href={p.nextHref}>Next &gt;</a>}</div>
    </div>
  );
};

const wrapStyle = css({
  display: "flex",
  justifyContent: "space-between",
});
