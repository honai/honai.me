import { css } from "../../style.js";

/**
 * @param {object} p
 * @param {string} p.title
 * @param {string} p.published ISO formated
 * @param {string=} p.updated ISO formated
 */

interface Props {
  title: string;
  /** ISO formated */
  published: string;
  /** ISO formated */
  updated?: string;
}

export const ArticleHeader = ({ title, published, updated }: Props) => (
  <header class={style()}>
    <h1 class="title">{title}</h1>
    <div>
      <div class={css({ centuryGothic: true })()}>
        <time dateTime={published}>{published}</time>
        {updated && (
          <>
            {" "}
            (Updated at <time dateTime={updated}>{updated}</time>)
          </>
        )}
      </div>
    </div>
  </header>
);

const style = css({
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  gap: "1.2rem",
  "> .title": { fontSize: "3.2rem" },
});
