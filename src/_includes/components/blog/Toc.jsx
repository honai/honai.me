import { css } from "../../style.mjs";

export const Toc = ({ tocHtml }) => (
  <div>
    <div class={tocTitle()}>目次</div>
    {/* div > nav.toc > ol > li > a.-active */}
    <div dangerouslySetInnerHTML={{ __html: tocHtml }} class={tocStyle()} />
  </div>
);

const tocTitle = css({ fontSize: "1.8rem" });

const tocStyle = css({
  "& > nav.toc": {
    ol: { padding: "0 0 0 2.4rem" },
    li: { color: "$textSecondary" },
    a: { color: "inherit" },
    "a.-active": { fontWeight: "bold" },
  },
});
