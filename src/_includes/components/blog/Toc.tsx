import { css } from "../../style.js";

export const Toc = ({ tocHtml }: { tocHtml: string }) => (
  <div>
    <div class={tocTitle()}>目次</div>
    {/* div > nav.toc > ol > li > a.-active */}
    <div dangerouslySetInnerHTML={{ __html: tocHtml }} class={tocStyle()} />
  </div>
);

const tocTitle = css({ fontSize: "1.8rem" });

const tocStyle = css({
  fontSize: "1.4rem",
  "& > nav.toc": {
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
  },
});
