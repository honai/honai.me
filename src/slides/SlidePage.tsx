import { Slide } from "../types.js";
import { SlideCarousel } from "../_includes/components/SlideCarousel/index.js";
import { TitleDate } from "../_includes/components/TitleDate.js";
import { useEleventy } from "../_includes/EleventyContext.js";
import { PortfolioLayout } from "../_includes/layouts/PortfolioLayout.js";
import { css } from "../_includes/style.js";

export default ({ slide }: { slide: Slide }) => {
  const { SITE_DOMAIN } = useEleventy();
  const { title, date, pages, slug } = slide;
  const numRatio = pages[0].width / pages[0].height;
  const ratio = numRatio.toPrecision(4);
  const embedUrl = `https://${SITE_DOMAIN}/slides/embed/${slug}/`;
  const encodedTitle = title.replaceAll('"', "&quot;");
  const embedCode = `<iframe src="${embedUrl}" title="${encodedTitle}" width="100%" style="aspect-ratio:${ratio}" frameborder="0" allowfullscreen></iframe>`;
  const scriptListItems = pages.map(({ text, slideId }) => {
    const [alt, ...rest] = text.split("\n");
    return (
      <li>
        <a href={`#${slideId}`}>{alt}</a> {rest.join(" ")}
      </li>
    );
  });
  const playerCardWidth = 320;
  return (
    <PortfolioLayout
      subTitle={title}
      thumbnailUrl={slide.pages[0].imageUrl}
      twitterCard={{
        kind: "player",
        iframeUrl: embedUrl,
        width: playerCardWidth,
        height: playerCardWidth / numRatio,
      }}
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
            // @ts-ignore
            onClick="this.select();this.onclick=null"
          />
        </div>
        <div>
          <article>
            <h2 class={heading()}>{title} のスクリプト</h2>
            <ol class={scriptOl()}>{scriptListItems}</ol>
          </article>
        </div>
      </div>
      <script type="module" src="/js/slide-page.js"></script>
    </PortfolioLayout>
  );
};

const heading = css({
  fontSize: "2rem",
  marginTop: "3rem",
});

const embedUrlInput = css({
  width: "100%",
  height: "2em",
  lineHeight: "1",
  resize: "vertical",
});

const scriptOl = css({
  overflowWrap: "break-word",
  fontSize: "1.4rem",
});
