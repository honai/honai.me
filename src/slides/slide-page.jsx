import { DateTag } from "../_includes/components/DateTag";
import { SlideCarousel } from "../_includes/components/SlideCarousel";
import { TitleDate } from "../_includes/components/TitleDate";
import { PortfolioLayout } from "../_includes/layouts/PortfolioLayout";
import { css } from "../_includes/style.mjs";

export const data = {
  pagination: { data: "slides", size: 1, alias: "slideKey" },
  permalink: (data) => `/slides/${data.slideKey}/`,
};

export default ({ slideKey, slides, page }) => {
  const { title, date, pages } = slides[slideKey];
  const slidePages = pages.map((p) => ({ ...p, imageUrl: p.image }));
  return (
    <PortfolioLayout
      pageUrl={page.url}
      subTitle={title}
      thumbnailUrl={slidePages[0].imageUrl}
    >
      <div
        class={css({
          width: "min(100% - 2rem, 72rem)",
          marginInline: "auto",
        })()}
      >
        <TitleDate title={title} date={date} />
      </div>
      <div>
        <SlideCarousel pages={slidePages} />
      </div>
    </PortfolioLayout>
  );
};
