import { css, uc } from "../style.mjs";

/**
 * @param {object} p
 * @param {string} p.title
 * @param {boolean} [p.showNav]
 */
export const PortfolioHero = ({ title, showNav }) => (
  <>
    <div
      class={css({
        centuryGothic: true,
        padding: "4rem 1rem",
        display: "flex",
        flexFlow: "column nowrap",
        gap: "1rem",
      })()}
    >
      <h1 class={css({ textAlign: "center" })()}>{title}</h1>
      {showNav && <Nav />}
    </div>
  </>
);

const Nav = () => (
  <nav
    class={css({
      fontSize: "1.8rem",
      display: "flex",
      gap: "3rem",
      justifyContent: "center",
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
