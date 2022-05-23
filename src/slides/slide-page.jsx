import { DateTag } from "../_includes/components/DateTag";
import { SlideCarousel } from "../_includes/components/SlideCarousel";
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
    <PortfolioLayout pageUrl={page.url}>
      <h2>{title}</h2>
      <div>
        <DateTag date={date} /> <span>{pages.length} ページ</span>
      </div>
      <div>
        <SlideCarousel pages={slidePages} />
      </div>
    </PortfolioLayout>
  );
};
