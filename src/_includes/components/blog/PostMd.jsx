import { css, lightTheme } from "../../style.mjs";

export const PostMd = ({ content }) => (
  <div dangerouslySetInnerHTML={{ __html: content }} class={mdStyle()} />
);

const mdStyle = css({
  "> h2": { borderBottom: "1px solid rgba(0, 0, 0, 0.2)" },
  "> h3": {
    lineHeight: 1.5,
    margin: "3.2rem 0 2.4rem",
    paddingLeft: "1rem",
    borderLeft: "4px solid $primary",
  },
  p: { margin: "1.6rem 0" },
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
    color: "#6a737d",
    borderLeft: "0.25em solid #dfe2e5",
  },
});
