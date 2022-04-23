import { css, uc } from "../style.mjs";
import { ThemeToggle } from "./ThemeToggle";

/**
 * @param {object} p
 * @param {string} p.title
 * @param {boolean} [p.showNav]
 */
export const PortfolioHeader = ({ title, showNav }) => (
  <>
    <header class={css({ display: "flex", justifyContent: "space-between" })()}>
      <h2 className={css({ fontSize: "1.8rem", centuryGothic: true })()}>
        <a href="/" className={uc.uncolor}>
          honai.me
        </a>
      </h2>
      <ThemeToggle />
    </header>
    <div class={css({ padding: "1rem 0 0", centuryGothic: true })()}>
      <h1 class={css({ padding: "2rem 0 1rem", textAlign: "center" })()}>
        {title}
      </h1>
      {showNav && <Nav />}
    </div>
  </>
);

const Nav = () => (
  <nav
    class={css({
      fontSize: "1.8rem",
      display: "flex",
      width: "120px",
      margin: "0 auto",
      justifyContent: "space-between",
    })()}
  >
    <a href="/works/" class={uc.uncolor}>
      Works
    </a>
    <a href="/blog/" class={uc.uncolor}>
      Blog
    </a>
  </nav>
);
