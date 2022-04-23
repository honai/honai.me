import { css, uc } from "../style.mjs";
import { ThemeToggle } from "./ThemeToggle";

export const PortfolioHeader = () => (
  <header class={css({ display: "flex", justifyContent: "space-between" })()}>
    <h2 className={css({ fontSize: "1.8rem", centuryGothic: true })()}>
      <a href="/" className={uc.uncolor}>
        honai.me
      </a>
    </h2>
    <ThemeToggle />
  </header>
);

export const Footer = () => (
  <footer
    class={css({
      color: "$textSecondary",
      fontSize: "1.4rem",
      textAlign: "center",
      padding: "2rem 0",
    })()}
  >
    &copy; 2022 Honai Ueoka
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
  </footer>
);
