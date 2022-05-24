/**
 * @param {HTMLElement} elm
 * @param {number} slideCount
 */
const calcSlideWidth = (elm, slideCount) => {
  return (elm.scrollWidth - elm.clientWidth) / (slideCount - 1);
};

/**
 * @param {HTMLElement} elm
 * @param {"next" | "prev" | "first" | "last"} direction
 * @param {number} w
 */
const scrollSlide = (elm, direction, w) => {
  switch (direction) {
    case "next": {
      elm.scrollBy({ left: w });
      break;
    }
    case "prev": {
      elm.scrollBy({ left: -w });
      break;
    }
    case "first": {
      elm.scroll({ left: 0 });
      break;
    }
    case "last": {
      elm.scroll({ left: elm.scrollWidth });
      break;
    }
    default: {
    }
  }
};

/**
 * @typedef {object} CeOptions
 * @prop {[string, EventListenerOrEventListenerObject][]} [listeners]
 * @prop {string} [class]
 */

/**
 * @param {keyof HTMLElementTagNameMap} tagName
 * @param {CeOptions} [options]
 * @param {string} [textContent]
 */
const ce = (tagName, options = {}, textContent = "") => {
  const e = document.createElement(tagName);
  options.class && e.classList.add(options.class);
  e.textContent = textContent;
  (options.listeners ?? []).forEach(([type, handler]) =>
    e.addEventListener(type, handler)
  );
  return e;
};

/**
 * <slide-nav class="" data-slide-id="">
 * TODO: disconnected callback
 */
class SlideNav extends HTMLElement {
  #css = `
    .wrap {
      line-height: 1;
      padding: 0.6rem 0;
    }
    button {
      appearance: none;
      border: none;
      background-color: transparent;
      font-family: inherit;
      font-size: 2.4rem;
      line-height: 1;
      cursor: pointer;
      padding: 0 0.5rem;
      margin: 0;
      color: inherit;
    }
  `;
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const slideElm = document.getElementById(this.dataset.slideId);
    const slideCount = parseInt(this.dataset.slideCount);

    // HTMLでのnavを隠す
    slideElm
      .querySelectorAll("[data-hide-nav]")
      .forEach((/** @type {HTMLElement} */ e) => {
        e.style.display = "none";
      });

    // 幅の計算
    let slideWidth = calcSlideWidth(slideElm, slideCount);
    window.addEventListener("resize", () => {
      slideWidth = calcSlideWidth(slideElm, slideCount);
    });

    let currentSlideIdx = 1;
    const slideNumElm = ce("span", {}, currentSlideIdx.toString());
    /** @param {HTMLElement} elm */
    const updateSlideNum = (elm) => {
      const idx = Math.round(elm.scrollLeft / slideWidth) + 1;
      if (idx === currentSlideIdx) {
        return;
      }
      slideNumElm.textContent = idx.toString();
      currentSlideIdx = idx;
    };
    updateSlideNum(slideElm);

    /** @ts-ignore */
    slideElm.addEventListener("scroll", (e) => updateSlideNum(e.target));

    const wrap = ce("div", { class: "wrap" });

    const prev = ce(
      "button",
      {
        listeners: [["click", () => scrollSlide(slideElm, "prev", slideWidth)]],
      },
      "◀️"
    );

    const next = ce(
      "button",
      {
        listeners: [["click", () => scrollSlide(slideElm, "next", slideWidth)]],
      },
      "▶️"
    );

    const first = ce(
      "button",
      {
        listeners: [
          ["click", () => scrollSlide(slideElm, "first", slideWidth)],
        ],
      },
      "⏮️"
    );

    const last = ce(
      "button",
      {
        listeners: [["click", () => scrollSlide(slideElm, "last", slideWidth)]],
      },
      "⏭️"
    );

    const pageIndicator = ce("span", { class: "page" }, "");
    pageIndicator.append(slideNumElm, ` / ${slideCount}`);

    wrap.append(
      first,
      prev,
      next,
      last,
      pageIndicator,
      ce("style", {}, this.#css)
    );
    document.addEventListener("keydown", (e) => {
      if (document.activeElement !== this) {
        return;
      }
      if (!["ArrowLeft", "ArrowRight"].includes(e.key)) {
        return;
      }
      e.preventDefault();
      switch (e.key) {
        case "ArrowLeft": {
          scrollSlide(slideElm, "prev", slideWidth);
          break;
        }
        case "ArrowRight": {
          scrollSlide(slideElm, "next", slideWidth);
          break;
        }
        default: {
          break;
        }
      }
    });

    this.shadowRoot.append(wrap);
  }
}

customElements.define("slide-nav", SlideNav);
