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
      <div
        id={slideElmId}
        class={slidesWrap()}
        style={`--slide-ratio: ${slideRatio};`}
      >
        {slides.map((s, i) => (
          <SlideCarouselItem
            idx={i}
            total={slides.length}
            lazy={i > 0}
            {...s}
          />
        ))}
      </div>
      <div
        class={css({
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 1rem",
          gap: "1rem",
          backgroundColor: "$primary",
        })()}
      >
        <div class={flexShrink()}>
          {embed && (
            <a
              href={`/slides/${slide.slug}/`}
              title={slide.title}
              class={cx(uc.uncolor, uc.anchorNewIconStart)}
              // サイト内でiframeするときもblankにしたいのでLinkを使わない
              target="_blank"
            >
              {slide.title}
            </a>
          )}
        </div>
        {/* @ts-ignore */}
        <slide-nav
          class={cx(uc.emojiFont, flexNoShrink())}
          target={slideElmId}
          slug={slide.slug}
        />
        <script type="module" src="/js/slide-nav.js" />
      </div>
    </div>
  );
};

const flexNoShrink = css({ flex: "0 0 auto" });
const flexShrink = css({
  flex: "0 1 auto",
  whiteSpace: "nowrap",
  overflowInline: "hidden",
  textOverflow: "ellipsis",
});

/**
 * @param {any} p
 */
const SlideCarouselItem = ({
  idx,
  total,
  width,
  height,
  imageUrl,
  alt,
  links,
  lazy,
}) => {
  const navProps = {
    current: idx,
    total,
    first: slideId(0, true),
    last: slideId(total - 1, true),
    prev: idx > 0 ? slideId(idx - 1, true) : undefined,
    next: idx + 1 < total ? slideId(idx + 1, true) : undefined,
  };
  return (
    <div id={slideId(idx)} class={slideWrap()} tabIndex={0}>
      <div class={css({ position: "relative" })()}>
        <img
          src={imageUrl}
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
      <Nav {...navProps} />
    </div>
  );
};

const slideImg = css({
  display: "block",
  width: "100%",
  height: "auto",
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
  gap: "1rem",
  // 高さが100vhを超えないようにする
  // 3.6rem: コントロール, 2px: ボーダー
  // var(, 100) は未定義フォールバック
  // 100%だとlazy-imgで先読みされなくなるので90%
  $$slideWidth: "min(90%, (100vh - 3.6rem - 2px) * var(--slide-ratio, 100))",
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
  border: "1px dashed rgba(0, 0, 0, 0.5)",
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

/** @param {number} i @param {boolean} hash */
function slideId(i, hash = false) {
  return `${hash ? "#" : ""}slide-${i + 1}`;
}
