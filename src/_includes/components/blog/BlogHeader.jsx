import { css, cx, uc } from "../../style.mjs";

export const BlogHeader = () => (
  <header class={header()}>
    <div class={cx(title(), css({ centuryGothic: true })())}>
      <a
        href="/blog/"
        class={cx(uc.uncolor, css({ textDecoration: "none" })())}
      >
        Honai's Blog
      </a>
    </div>
  </header>
);

const header = css({
  height: "3.6rem",
  color: "rgba(255, 255, 255, 0.8)",
  backgroundColor: "$primary",
  borderBottom: "1px solid rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const title = css({
  fontSize: "2rem",
  lineHeight: 1,
});
