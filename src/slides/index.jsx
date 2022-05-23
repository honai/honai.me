import { PortfolioHero } from "../_includes/components/PortfolioHero";
import { SlideList } from "../_includes/components/SlideList";
import { PortfolioLayout } from "../_includes/layouts/PortfolioLayout";
import { css } from "../_includes/style.mjs";

export default ({ slides, page }) => {
  const sortedSlides = Object.keys(slides)
    .map((k) => ({
      ...slides[k],
      url: `/slides/${k}/`,
      thumb: slides[k].pages[0].image,
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <PortfolioLayout pageUrl={page.url} subTitle="Slides">
      <div
        class={css({
          width: "min(100% - 2rem, 72rem)",
          marginInline: "auto",
        })()}
      >
        <PortfolioHero title="Slides" />
        <div>
          <SlideList slides={sortedSlides} />
        </div>
      </div>
    </PortfolioLayout>
  );
};
