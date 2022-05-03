import { css, uc } from "../style.mjs";
import { ThemeToggle } from "./ThemeToggle";

export const Header = () => (
  <header
    class={css({
      padding: "1rem 2rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    })()}
  >
    <h2 className={css({ fontSize: "1.8rem", centuryGothic: true })()}>
      <a href="/" className={uc.uncolor}>
        honai.me
      </a>
    </h2>
    <ThemeToggle />
  </header>
);
