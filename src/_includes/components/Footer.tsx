import { css, uc } from "../style.js";
const year = new Date().getFullYear();
export const Footer = () => (
  <footer class={style()}>
    <nav
      class={css({
        padding: "1rem",
        display: "flex",
        gap: "1.5rem",
        justifyContent: "center",
      })()}
    >
      <a href="/" class={uc.uncolor}>
        About
      </a>
      <a href="/works/" class={uc.uncolor}>
        Works
      </a>
      <a href="/talks/" class={uc.uncolor}>
        Talks
      </a>
      <a href="/slides/" class={uc.uncolor}>
        Slides
      </a>
      <a href="/blog/" class={uc.uncolor}>
        Blog
      </a>
    </nav>
    <div
      class={css({
        fontSize: "1.4rem",
      })()}
    >
      &copy; {year} Honai Ueoka.
      <br />
    </div>
  </footer>
);

const style = css({
  color: "$textSecondary",
  textAlign: "center",
  padding: "2rem 0",
  centuryGothic: true,
});
