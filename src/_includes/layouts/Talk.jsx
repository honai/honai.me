import { TitleDate } from "../components/TitleDate.jsx";
import { css } from "../style.mjs";
import { PortfolioLayout } from "./PortfolioLayout";

export default ({ page, content, title, thumbnail }) => {
  return (
    <PortfolioLayout
      pageUrl={page.url}
      subTitle={title}
      description=""
      thumbnailUrl={thumbnail}
    >
      <div
        class={css({
          width: "min(100% - 2rem, 72rem)",
          margin: "0 auto",
        })()}
      >
        <TitleDate title={title} date={page.date} />
        <div dangerouslySetInnerHTML={{ __html: content }} class={mdStyle()} />
      </div>
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
