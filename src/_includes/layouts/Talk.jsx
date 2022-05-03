import { css } from "../style.mjs";
import { PortfolioLayout } from "./PortfolioLayout";

export default ({ page, content, title }) => {
  return (
    <PortfolioLayout pageUrl={page.url}>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} class={mdStyle()} />
    </PortfolioLayout>
  );
};

const mdStyle = css({
  "h2, h3": {
    marginBlock: "4rem 2rem",
  },
  iframe: {
    display: "block",
    margin: "2rem auto",
    width: "100%",
  },
});
