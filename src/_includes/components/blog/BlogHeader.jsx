import { css, cx, uc } from "../../style.mjs";
import { Search } from "../Search.jsx";
import { ThemeToggle } from "../ThemeToggle.jsx";

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
    <div class={search()}>
      <Search />
    </div>
    <div>
      <ThemeToggle />
    </div>
  </header>
);

const header = css({
  height: "4rem",
  color: "rgba(255, 255, 255, 0.8)",
  backgroundColor: "$primary",
  borderBottom: "1px solid rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "1rem",
  padding: "0 2rem",
  lineHeight: 1,
});

const title = css({
  fontSize: "2rem",
  flex: "1 0 auto",
});

const search = css({
  flex: "0 1 300px",
});
