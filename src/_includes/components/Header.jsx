import { useEleventy } from "../EleventyContext.jsx";
import { css, uc } from "../style.mjs";
import { ThemeToggle } from "./ThemeToggle";

export const Header = () => {
  const { page } = useEleventy();
  const segment = page.url.split("/")[1];
  console.log(page.url, segment);
  const segmentMatch = page.url === `/${segment}/`;
  console.log(segmentMatch);
  return (
    <header
      class={css({
        width: "min(100% - 2rem, 72rem)",
        margin: "0 auto",
        padding: "1rem 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      })()}
    >
      <h2 className={css({ fontSize: "1.8rem", centuryGothic: true })()}>
        <a href="/" className={uc.uncolor}>
          honai.me
        </a>
        {segment !== "" && (
          <>
            {" / "}
            {segmentMatch ? (
              <>{segment}</>
            ) : (
              <a href={`/${segment}/`} class={uc.uncolor}>
                {segment}
              </a>
            )}
          </>
        )}
      </h2>
      <ThemeToggle />
    </header>
  );
};
