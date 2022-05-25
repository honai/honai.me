import { PortfolioHero } from "../_includes/components/PortfolioHero";
import { SlideList } from "../_includes/components/SlideList";
import { PortfolioLayout } from "../_includes/layouts/PortfolioLayout";
import { css } from "../_includes/style.mjs";

/**
 * @param {object} p
 * @param {import("../../types").Slide[]} p.slides
 * @param {import("../../types").EleventyPage} p.page
 */
export default ({ slides, page }) => {
  const sortedSlides = slides.map((s) => ({
    ...s,
    url: `/slides/${s.slug}/`,
    // TODO
    thumb: s.thumbnail,
    subtitle: "",
  }));

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
