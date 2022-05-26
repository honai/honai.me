import { SlideCarousel } from "../_includes/components/SlideCarousel";

export const data = {
  pagination: { data: "slides", size: 1, alias: "slide" },
  permalink: (/** @type {any} */ data) => `/slides/embed/${data.slide.slug}/`,
};

/**
 * @param {object} p
 * @param {import("../../types").Slide} p.slide
 * @param {import("../../types").EleventyPage} p.page
 * @param {string } p.SITE_DOMAIN
 */
export default ({ slide, SITE_DOMAIN }) => {
  const { title, slug } = slide;
  return (
    <html lang="ja">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width" />
        <title>{title}</title>
        <link rel="canonical" href={`https://${SITE_DOMAIN}/slides/${slug}/`} />
        <link rel="stylesheet" href="/index.css" />
      </head>
      <body>
        <SlideCarousel slide={slide} embed />
      </body>
    </html>
  );
};
