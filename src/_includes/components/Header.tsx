import { useEleventy } from "../EleventyContext.js";
import { css, uc } from "../style.js";
import { ThemeToggle } from "./ThemeToggle.js";

export const Header = ({ maxWidth }: { maxWidth: string }) => {
  const { page } = useEleventy();
  const segment = page.url.split("/")[1];
  const showSegment = segment !== "" && !segment.endsWith(".html");
  const segmentMatch = page.url === `/${segment}/`;
  return (
    <header
      class={css({
        width: `min(100% - 2rem, ${maxWidth})`,
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
        {showSegment && (
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
