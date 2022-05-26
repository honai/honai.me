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
 * @param {string} p.SITE_DOMAIN
 */
export default ({ slide, page, SITE_DOMAIN }) => {
  const { title, date, pages, slug } = slide;
  const ratio = (pages[0].width / pages[0].height).toPrecision(4);
  const embedUrl = `https://${SITE_DOMAIN}/slides/embed/${slug}/`;
  const encodedTitle = title.replaceAll('"', "&quot;");
  const embedCode = `<iframe src="${embedUrl}" title="${encodedTitle}" width="100%" style="aspect-ratio:${ratio}" frameborder="0" allowfullscreen></iframe>`;
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
        <SlideCarousel slide={slide} />
        <div>
          <h2 class={heading()}>埋め込みコード (iframe)</h2>
          <textarea
            readOnly
            value={embedCode}
            class={embedUrlInput()}
            // URLをコピーしやすいように、かつ後から部分選択もしたい
            onClick="this.select();this.onclick=null"
          />
        </div>
        <div>
          <h2 class={heading()}>スクリプト</h2>
          <p>PDFから抽出されているため不自然な場合があります</p>
          <ol class={scriptOl()}>
            {pages.map(({ text }) => (
              <li>{text}</li>
            ))}
          </ol>
        </div>
      </div>
    </PortfolioLayout>
  );
};

const heading = css({
  fontSize: "2rem",
  marginTop: "2rem",
});

const embedUrlInput = css({
  width: "100%",
  height: "2em",
  lineHeight: "1",
  resize: "vertical",
});

const scriptOl = css({
  overflowWrap: "break-word",
});
