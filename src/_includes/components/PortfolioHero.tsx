import { css, uc } from "../style.js";

export const PortfolioHero = ({
  title,
  showNav,
}: {
  title: string;
  showNav?: boolean;
}) => (
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
    <a href="/talks/" class={uc.uncolor}>
      Talks
    </a>
    <a href="/blog/" class={uc.uncolor}>
      Blog
    </a>
    <a href="/slides/" class={uc.uncolor}>
      Slides
    </a>
  </nav>
);
