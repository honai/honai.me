import { Slide } from "../types.js";
import { SlideCarousel } from "../_includes/components/SlideCarousel/index.js";
import { useEleventy } from "../_includes/EleventyContext.js";
import { css } from "../_includes/style.js";

export default ({ slide }: { slide: Slide }) => {
  const { title, slug } = slide;
  const { SITE_DOMAIN } = useEleventy();
  return (
    <html lang="ja">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width" />
        <title>{title}</title>
        <link rel="canonical" href={`https://${SITE_DOMAIN}/slides/${slug}/`} />
        <link rel="stylesheet" href="/styles/index.css" />
      </head>
      <body class={css({ backgroundColor: "$primary" })()}>
        <SlideCarousel slide={slide} embed />
        <script type="module" src="/js/slide-page.js"></script>
      </body>
    </html>
  );
};
