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
