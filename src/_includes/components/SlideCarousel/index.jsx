import { css, cx, darkTheme, uc } from "../../style.mjs";
import { Link } from "../Link.jsx";
import { Nav } from "./Nav.jsx";

/**
 * @typedef Rect
 * @prop {number} x
 * @prop {number} y
 * @prop {number} width
 * @prop {number} height
 */

/**
 * @typedef SlidePage
 * @prop {(Rect & {url: string})[]} links
 * @prop {number} width
 * @prop {number} height
 * @prop {string} text
 * @prop {string} imageUrl
 */

/**
 * @param {object} p
 * @param {import("../../../../types").Slide} p.slide
 * @param {boolean} [p.embed]
 */
export const SlideCarousel = ({ slide, embed }) => {
  const slides = slide.pages.map((s) => {
    const links = s.links.map(({ url, ...rect }) => {
      return { position: rectToPos(rect, s.width, s.height), url };
    });
    return {
      ...s,
      alt: s.text.split("\n")[0].trim(),
      links,
    };
  });

  const slideElmId = "slide-scroll";
  const slideRatio = `${slides[0].width} / ${slides[0].height}`;
  return (
    // 埋め込みなどを考慮するとデフォでダークに固定したい
    <div
      class={cx(
        darkTheme,
        css({
          color: "$text",
          backgroundColor: "$bg",
        })()
      )}
    >
      {embed && (
        <div class={slideTitle()}>
          <a
            href={`/slides/${slide.slug}/`}
            target="_blank"
            rel="noopener"
            class={uc.uncolor}
          >
            {slide.title}
          </a>
        </div>
      )}
      <div
        id={slideElmId}
        class={slidesWrap()}
        style={`--slide-ratio: ${slideRatio};`}
      >
        {slides.map((s, i) => (
          <SlideCarouselItem
            {...s}
            id={s.slideId}
            lazy={i > 0}
            nav={{
              prev: i > 0 ? slides[i - 1].slideId : undefined,
              next: i < slides.length - 1 ? slides[i + 1].slideId : undefined,
              first: slides[0].slideId,
              last: slides.slice(-1)[0].slideId,
              current: i,
              total: slides.length,
            }}
          />
        ))}
      </div>
      <div
        class={css({
          backgroundColor: "$primary",
        })()}
      >
        {/* @ts-ignore */}
        <slide-nav
          class={cx(uc.emojiFont)}
          target={slideElmId}
          slug={slide.slug}
          title={slide.title}
          embed={embed}
          ratio={slideRatio}
        />
        <script type="module" src="/js/slide-nav.js" />
      </div>
    </div>
  );
};

const slideTitle = css({
  backgroundColor: "$primary",
  padding: "0 1rem",
  height: "3rem",
  display: "flex",
  alignItems: "center",
});

/**
 * @param {object} p
 * @param {string} p.id
 * @param {string} p.imageUrl
 * @param {string} p.thumbUrl
 * @param {string} p.alt
 * @param {number} p.width
 * @param {number} p.height
 * @param {boolean} p.lazy
 * @param {unknown[]} p.links
 * @param {import("../../../../types").SlideCarouselNavProps} p.nav
 */
const SlideCarouselItem = ({
  id,
  width,
  height,
  imageUrl,
  thumbUrl,
  alt,
  links,
  lazy,
  nav,
}) => {
  return (
    <div id={id} class={slideWrap()} tabIndex={0}>
      <div
        class={slidePositioning()}
        style={{
          aspectRatio: `${width}/${height}`,
        }}
      >
        <img
          src={imageUrl}
          data-thumb={thumbUrl}
          width={width}
          height={height}
          alt={alt}
          loading={lazy ? "lazy" : "eager"}
          class={slideImg()}
        />
        <>
          {links.map((/** @type {{url: string; position: any}} */ l) => (
            <Link
              href={l.url}
              class={linkOverlay()}
              style={{
                ...l.position,
              }}
              title={l.url}
            />
          ))}
        </>
      </div>
      <Nav {...nav} />
    </div>
  );
};

const slideImg = css({
  display: "block",
  width: "100%",
  height: "auto",
});

const slidePositioning = css({
  position: "relative",
});

const slideWrap = css({
  $$border: "1px solid rgba(255, 255, 255, 0.6)",
  borderLeft: "$$border",
  borderRight: "$$border",
  "&:target": {
    border: "4px solid $link",
  },
});

const slidesWrap = css({
  border: "1px solid $border",
  display: "flex",
  flexFlow: "row nowrap",
  overflowX: "scroll",
  overflowY: "hidden",
  scrollSnapType: "x mandatory",
  scrollBehavior: "auto",
  gap: "5px",
  // 高さが100vhを超えないようにする (スクロールバーは考慮しない)
  // 3rem * 2: コントロール, 2px: ボーダー, --scrollbar-size
  // 100%だとlazy-imgで先読みされなくなる
  $$slideWidth:
    "min(95%, (100vh - 3rem * 2 - 2px - var(--scrollbar-size, 0px)) * var(--slide-ratio))",
  $$slideMargin: "calc((100% - $$slideWidth) / 2)",
  scrollPadding: "0 $$slideMargin",
  [`& > .${slideWrap}`]: {
    flex: "0 0 $$slideWidth",
    scrollSnapAlign: "center",
    "&:first-child": {
      marginLeft: "$$slideMargin",
    },
    "&:last-child": {
      marginRight: "$$slideMargin",
    },
  },
});

const linkOverlay = css({
  position: "absolute",
  border: "2px dashed $link",
  "&:visited": {
    borderColor: "$linkVisited",
  },
});

/**
 * @param {Rect} rect
 * @param {number} width
 * @param {number} height
 */
function rectToPos(rect, width, height) {
  return {
    left: toPercent(rect.x / width),
    top: toPercent(rect.y / height),
    right: toPercent(1 - (rect.x + rect.width) / width),
    bottom: toPercent(1 - (rect.y + rect.height) / height),
  };
}

/** @param {number} n */
function toPercent(n, digits = 2) {
  const val = Math.round(n * 100 * 10 ** digits) / 10 ** digits;
  return `${val.toString()}%`;
}
