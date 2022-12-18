import { Toc as TocType } from "../../../../lib/md.js";
import { css } from "../../style.js";

type NestedToc = {
  text: string;
  id: string;
  level: number;
  children: { text: string; id: string }[];
}[];

/** Only handle h2 and h3 */
const tocToNest = (toc: TocType[]): NestedToc => {
  const result: NestedToc = [];
  for (const tocElm of toc) {
    const { level } = tocElm;
    if (level === 1) {
      throw `Toc: do not use level 1: ${tocElm.text}`;
    }
    if (![2, 3].includes(level)) {
      continue;
    }
    // levelに関わらず最初の要素はトップレベル要素
    if (result.length === 0) {
      result.push({ ...tocElm, children: [] });
      continue;
    }
    const prevLv = result.slice(-1)[0].level;
    if (level <= prevLv) {
      result.push({ ...tocElm, children: [] });
    } else if (level - prevLv === 1) {
      result.slice(-1)[0].children.push({ ...tocElm });
    }
  }
  return result;
};

export const Toc = ({ toc }: { toc: TocType[] }) => {
  const nested = tocToNest(toc);
  return (
    <div>
      <div class={tocTitle()}>目次</div>
      <nav class={tocStyle()}>
        <ol class="toc">
          {nested.map((t1) => (
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
