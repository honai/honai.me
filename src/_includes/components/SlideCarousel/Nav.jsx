import { css, cx, uc } from "../../style.mjs";

/**
 * @param {object} p
 * @param {string} [p.prev]
 * @param {string} [p.next]
 * @param {string} p.first
 * @param {string} p.last
 * @param {number} p.total
 * @param {number} p.current 0-indexedでOK
 */
export const Nav = ({ next, prev, first, last, total, current }) => {
  return (
    <div class={cx(slideNav(), uc.emojiFont)} data-hide-nav>
      <a href={first} title="最初のスライド">
        ⏮️
      </a>
      <a href={prev} title="前のスライド">
        ◀️
      </a>
      <a href={next} title="次のスライド">
        ▶️
      </a>
      <a href={last} title="最後のスライド">
        ⏭️
      </a>
      <span class={css({ fontFamily: "monospace" })()}>
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
