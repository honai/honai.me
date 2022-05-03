import { PortfolioHero } from "./_includes/components/PortfolioHero";
import { SlideList } from "./_includes/components/SlideList";
import { PortfolioLayout } from "./_includes/layouts/PortfolioLayout";
import { css } from "./_includes/style.mjs";

/**
 * @param {object} p
 * @param {{talks: object[]}} p.collections
 * @param {any} p.page
 */
export default ({ page, collections }) => {
  const talks = collections.talks
    .map((t) => ({
      title: t.data.title,
      url: t.url,
      date: t.date,
      thumb: t.data.thumbnail,
      subtitle: "",
    }))
    .sort((a, b) => b.date - a.date);
  return (
    <PortfolioLayout pageUrl={page.url}>
      <PortfolioHero title="Talks" />
      <div
        class={css({
          width: "min(100% - 2rem, 72rem)",
          margin: "0 auto",
        })()}
      >
        <SlideList slides={talks} />
      </div>
    </PortfolioLayout>
  );
};
