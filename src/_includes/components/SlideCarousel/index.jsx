import { css, uc } from "../../style.mjs";
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
 * @param {SlidePage[]} p.pages
 */
export const SlideCarousel = ({ pages }) => {
  const slides = pages.map((s) => {
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
    <div>
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
      <SlideNav slideElmId={slideElmId} slideCount={slides.length} />
    </div>
  );
};

/** @param {{slideElmId: string; slideCount: number}} props */
const SlideNav = ({ slideElmId, slideCount }) => (
  <div class={css({ display: "flex", justifyContent: "center" })()}>
    {/* @ts-ignore */}
    <slide-nav
      class={uc.emojiFont}
      data-slide-id={slideElmId}
      data-slide-count={slideCount}
    />
    <script type="module" src="/scripts/slide-nav.js" />
  </div>
);

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
            <a
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
  border: "1px solid $border",
});

const slideWrap = css({
  // linkのpositioningのため
  position: "relative",
});

const slidesWrap = css({
  border: "1px solid $border",
  display: "flex",
  flexFlow: "row nowrap",
  overflowX: "scroll",
  scrollSnapType: "x mandatory",
  scrollBehavior: "auto",
  gap: "1rem",
  // 高さが100vhを超えないようにする
  // var(, 100) は未定義フォールバック
  // 100%だとlazy-imgで先読みされなくなるので90%
  $$slideWidth: "min(90%, (100vh - 3.6rem) * var(--slide-ratio, 100))",
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