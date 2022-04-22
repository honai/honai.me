import { css } from "../../style.mjs";

export const BlogHeader = () => (
  <header class={header()}>
    <div class={title()}>
      <a href="/blog/" class="_reset-a">
        Honai's Blog
      </a>
    </div>
  </header>
);

const header = css({
  height: "var(--height-blog-header)",
  color: "rgba(255, 255, 255, 0.8)",
  backgroundColor: "var(--color-primary)",
  borderBottom: "1px solid rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const title = css({
  fontFamily: "var(--font-family-century)",
  fontWeight: "var(--font-weight-century)",
  fontSize: "2rem",
  lineHeight: 1,
});
