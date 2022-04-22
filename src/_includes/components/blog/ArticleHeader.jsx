import { css } from "../../style.mjs";

/**
 * @param {object} p
 * @param {string} p.title
 * @param {string} p.published ISO formated
 * @param {string=} p.updated ISO formated
 */
export const ArticleHeader = ({ title, published, updated }) => (
  <header class={style()}>
    <h1 class="title">{title}</h1>
    <div>
      <div class="century-gothic">
        <time data-js-locale-date dateTime={published}>
          {published}
        </time>
        {updated && (
          <>
            {" "}
            (Updated at{" "}
            <time data-js-locale-date dateTime={updated}>
              {updated}
            </time>
            )
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
