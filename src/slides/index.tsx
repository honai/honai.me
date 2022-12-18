import { Slide } from "../types.js";
import { PortfolioHero } from "../_includes/components/PortfolioHero.js";
import { SlideList } from "../_includes/components/SlideList.js";
import { PortfolioLayout } from "../_includes/layouts/PortfolioLayout.js";
import { css } from "../_includes/style.js";

export default ({ slides }: { slides: Slide[] }) => {
  const sortedSlides = slides.map((s) => ({
    ...s,
    url: `/slides/${s.slug}/`,
    // TODO
    thumb: s.thumbnail,
    subtitle: "",
  }));

  return (
    <PortfolioLayout subTitle="Slides">
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
