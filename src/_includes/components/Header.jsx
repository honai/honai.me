import { useEleventy } from "../EleventyContext.jsx";
import { css, uc } from "../style.mjs";
import { ThemeToggle } from "./ThemeToggle";

export const Header = () => {
  const { page } = useEleventy();
  const segment = firstPathSegment(page.url);
  return (
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
        {segment && (
          <>
            {" "}
            /{" "}
            <a href={`/${segment}/`} class={uc.uncolor}>
              {segment}
            </a>
          </>
        )}
      </h2>
      <ThemeToggle />
    </header>
  );
};

/** @param {string} url starts with "/" */
const firstPathSegment = (url) => {
  // "/blog/" -> ["", "blog", ""]
  const split = url.split("/");
  if (split.length < 3) {
    return null;
  }
  return split[1];
};
