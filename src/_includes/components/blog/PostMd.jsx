import { css } from "../../style.mjs";

/** @param {{content: string}} props */
export const PostMd = ({ content }) => (
  <div dangerouslySetInnerHTML={{ __html: content }} class={mdStyle()} />
);

const mdStyle = css({
  "h2, h3, h4": {
    fontWeight: 600,
  },
  h2: {
    borderBlockEnd: "1px solid rgba(0, 0, 0, 0.2)",
    marginBlock: "4rem 3rem",
  },
  h3: {
    lineHeight: 1.5,
    marginBlock: "3.2rem 2.4rem",
    paddingInlineStart: "1rem",
    borderInlineStart: "4px solid $primary",
  },
  h4: {
    fontSize: "1.8rem",
  },
  p: { marginBlock: "1.6rem" },
  ul: { margin: "1.6rem 0" },
  img: { boxShadow: "0 1px 3px rgba(0, 0, 0, 0.3)" },
  ".img-row-wrap": {
    maxWidth: "100%",
    display: "flex",
    flexFlow: "row wrap",
  },
  ".img-row-wrap > *": { flex: "0 1 430px", margin: "5px !important" },
  "> table": { borderCollapse: "collapse", width: "100%" },
  "> table th,\n  > table td": {
    padding: "0.8rem",
    verticalAlign: "top",
    borderTop: "1px solid #dee2e6",
  },
  "> table > thead th": {
    verticalAlign: "bottom",
    borderBottom: "2px solid #dee2e6",
  },
  ":not(pre) > code.language-text": {
    color: "$text",
    backgroundColor: "$bgGray",
  },
  "> blockquote": {
    margin: "0",
    padding: "0 1em",
    color: "$textSecondary",
    borderInlineStart: "0.25em solid #dfe2e5",
  },
  ".footnote-item": {
    "&:target": {
      outline: "2px dashed blue",
    },
    "& > p": {
      margin: 0,
    },
  },
});
