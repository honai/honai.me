import { Toc as TocType } from "../../../../lib/md.js";
import { css } from "../../style.js";

export const Toc = ({ toc }: { toc: TocType }) => {
  return (
    <div>
      <div class={tocTitle()}>目次</div>
      <nav class={tocStyle()}>
        <ol class="toc">
          {toc.map((t1) => (
            <li>
              <a href={`#${t1.id}`}>{t1.text}</a>
              <ol>
                {t1.children.map((t2) => (
                  <li>
                    <a href={`#${t2.id}`}>{t2.text}</a>
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

const tocTitle = css({ fontSize: "1.8rem" });

const tocStyle = css({
  fontSize: "1.4rem",
  ol: { padding: "0 0 0 1.8rem" },
  li: { color: "$textSecondary" },
  a: {
    color: "inherit",
    display: "block",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  "a.-active": { fontWeight: "bold" },
});
