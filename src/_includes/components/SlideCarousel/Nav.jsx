import { css, cx, uc } from "../../style.mjs";

/**
 * @param {import("../../../../types").SlideCarouselNavProps} p
 */
export const Nav = ({ next, prev, first, last, total, current }) => {
  const hashHref = (s) => (s ? { href: `#${s}` } : {});
  return (
    <div class={cx(slideNav(), uc.emojiFont)} data-hide-nav>
      <a {...hashHref(first)} title="最初のスライド">
        ⏮️
      </a>
      <a {...hashHref(prev)} title="前のスライド">
        ◀️
      </a>
      <a {...hashHref(next)} title="次のスライド">
        ▶️
      </a>
      <a {...hashHref(last)} title="最後のスライド">
        ⏭️
      </a>
      <span class={css({ fontFamily: "sans-serif" })()}>
        {current + 1} / {total}
      </span>
    </div>
  );
};

const slideNav = css({
  fontSize: "2.4rem",
  lineHeight: 1,
  padding: "0.6rem 0",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem",
  "& > a": {
    textDecoration: "none",
  },
  "& > a:hover": {
    opacity: 0.6,
  },
});
