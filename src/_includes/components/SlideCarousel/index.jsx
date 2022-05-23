import { css, uc } from "../../style.mjs";
import { Script } from "../Script.jsx";
import { Nav } from "./Nav.jsx";

/**
 * @typedef SlidePage
 * @prop {{rect: number[], url: string}[]} links
 * @prop {number} width
 * @prop {number} height
 * @prop {string} imageUrl
 */

/**
 * @param {object} p
 * @param {SlidePage[]} p.pages
 */
export const SlideCarousel = ({ pages }) => {
  const slides = pages.map((s) => {
    const links = s.links.map(({ rect, url }) => {
      return { position: rectToPos(rect, s.width, s.height), url };
    });
    return {
      ...s,
      links,
    };
  });

  const slideElmId = "slide-scroll-elem";
  return (
    <div>
      <div id={slideElmId} class={slidesWrap()}>
        <div class={slideMargin()} />
        {slides.map((s, i) => (
          <SlideCarouselItem idx={i} {...s} />
        ))}
        <div class={slideMargin()} />
      </div>
    </div>
  );
};

const SlideNav = () => (
  <div class={css({ display: "flex", justifyContent: "center" })()}>
    {/* @ts-ignore */}
    <slide-nav class={uc.emojiFont} data-slide-id={slideElmId} />
    <script src="/scripts/slide-nav.js" />
  </div>
);

const SlideCarouselItem = ({ id, width, height, imageUrl, links }) => {
  return (
    <div
      id={id}
      class={slideWrap()}
      // これがないと高さ制限の時に画像がoverflowする
      style={`aspect-ratio: ${width} / ${height}`}
    >
      <img
        src={imageUrl}
        width={width}
        height={height}
        loading="lazy"
        class={slideImg()}
      />
      <>
        {links.map((l) => (
          <a
            href={l.url}
            class={linkOverlay()}
            style={{
              ...l.position,
            }}
          ></a>
        ))}
      </>
    </div>
  );
};

const slideImg = css({
  // 画像縦横比を保つ
  height: "auto",
  verticalAlign: "bottom",
});

const slideWrap = css({
  border: "1px solid $border",
  // linkのpositioningのため
  position: "relative",
});

const slideMargin = css({ flex: "0 0 50%" });

const slidesWrap = css({
  display: "flex",
  flexFlow: "row nowrap",
  overflowX: "scroll",
  scrollBehavior: "auto",
  scrollSnapType: "inline mandatory",
  gap: "1%",
  [`& > .${slideWrap}`]: {
    scrollSnapAlign: "none center",
    // 0 0 90% とするとPC表示で画像より枠が大きくなる
    flex: "0 0 auto",
    maxWidth: "90%",
  },
});

const linkOverlay = css({
  position: "absolute",
  border: "1px dashed rgba(0, 0, 0, 0.5)",
});

function rectToPos(rect, width, height) {
  const position = {
    bottom: `${toPercent(rect[1] / height, 3)}%`,
    left: `${toPercent(rect[0] / width, 3)}%`,
    top: `${toPercent(1 - rect[3] / height, 3)}%`,
    right: `${toPercent(1 - rect[2] / width, 3)}%`,
  };
  return position;
}

function toPercent(n, digits = 0) {
  return Math.round(n * 100 * 10 ** digits) / 10 ** digits;
}

function slideId(i) {
  return `slide-${i + 1}`;
}
