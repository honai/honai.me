import { DateTag } from "../components/DateTag.jsx";
import { css, uc } from "../style.mjs";
import { PortfolioLayout } from "./PortfolioLayout";

export default ({ page, content, title }) => {
  return (
    <PortfolioLayout pageUrl={page.url}>
      <div
        class={css({
          width: "min(100% - 2rem, 72rem)",
          margin: "0 auto",
        })()}
      >
        <div
          class={css({
            textAlign: "center",
            padding: "4rem 1rem",
            display: "flex",
            flexFlow: "column nowrap",
            gap: "2rem",
          })()}
        >
          <h1 class={css({ fontSize: "2.4rem", lineHeight: 1.25 })()}>
            {title}
          </h1>
          <div class={css({ centuryGothic: true })()}>
            <DateTag date={page.date} />
          </div>
        </div>
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
