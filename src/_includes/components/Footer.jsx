import { css, uc } from "../style.mjs";

export const Footer = () => (
  <footer class={style()}>
    <nav class={css({ padding: "1rem" })()}>
      <a href="/" class={uc.uncolor}>
        About
      </a>
      &ensp;
      <a href="/works/" class={uc.uncolor}>
        Works
      </a>
      &ensp;
      <a href="/blog/" class={uc.uncolor}>
        Blog
      </a>
    </nav>
    <div
      class={css({
        fontSize: "1.4rem",
      })()}
    >
      &copy; 2021 Honai Ueoka.
      <br />
      Powered by{" "}
      <a
        href="https://www.11ty.dev/"
        target="_blank"
        rel="noopener"
        class={uc.uncolor}
      >
        Eleventy
      </a>
    </div>
  </footer>
);

const style = css({
  color: "$textSecondary",
  textAlign: "center",
  padding: "2rem 0",
});
