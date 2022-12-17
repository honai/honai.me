import { Talk } from "../../talks/talks.js";
import { DateTag } from "../components/DateTag.js";
import { css } from "../style.js";
import { PortfolioLayout } from "./PortfolioLayout.js";

export default ({ date, content, title, thumbnail }: Talk) => {
  return (
    <PortfolioLayout subTitle={title} description="" thumbnailUrl={thumbnail}>
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
            <DateTag date={date} />
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
