import { SlideCarousel } from "../_includes/components/SlideCarousel";
import { TitleDate } from "../_includes/components/TitleDate";
import { PortfolioLayout } from "../_includes/layouts/PortfolioLayout";
import { css } from "../_includes/style.mjs";

export const data = {
  pagination: { data: "slides", size: 1, alias: "slide" },
  permalink: (/** @type {any} */ data) => `/slides/${data.slide.slug}/`,
};

/**
 * @param {object} p
 * @param {import("../../types").Slide} p.slide
 * @param {import("../../types").EleventyPage} p.page
 */
export default ({ slide, page }) => {
  const { title, date, pages } = slide;
  // TODO imageUrl
  return (
    <PortfolioLayout
      pageUrl={page.url}
      subTitle={title}
      thumbnailUrl={slide.pages[0].imageUrl}
    >
      <div
        class={css({
          width: "min(100% - 2rem, 96rem)",
          marginInline: "auto",
        })()}
      >
        <TitleDate title={title} date={date} />
        <SlideCarousel pages={slide.pages} />
        <div class={css({ marginTop: "12rem" })()}>
          <h3>スクリプト</h3>
          <p>PDFから抽出されているため不自然な場合があります</p>
          <ol class={scriptOl()}>
            {slide.pages.map(({ text }) => (
              <li>{text}</li>
            ))}
          </ol>
        </div>
      </div>
    </PortfolioLayout>
  );
};

const scriptOl = css({
  overflowWrap: "break-word",
});
