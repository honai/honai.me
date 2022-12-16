import { css, cx, uc } from "../../style.js";

export interface SlideCarouselNavProps {
  prev?: string;
  next?: string;
  first: string;
  last: string;
  total: number;
  /** 0-indexed */
  current: number;
}

export const Nav = ({
  next,
  prev,
  first,
  last,
  total,
  current,
}: SlideCarouselNavProps) => {
  const hashHref = (s: string | undefined) => (s ? { href: `#${s}` } : {});
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
