import { html, render } from "lit-html";

/**
 * usage
 * <slide-nav
 *   target="slide-elm-id"
 *   slug="slide-slug" />
 */
export class SlideNav extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.target = this.getAttribute("target");
    this.slug = this.getAttribute("slug");
    this.embed = this.getAttribute("embed") !== null;
    this.ratio = this.getAttribute("ratio");
    this._currentSlideIdx = -1;
    this._previewSlideIdx = 0;
    this._slideThumbUrls = [];
    this._maxSlideIdx = -1;
    this._slieWidth = 0;
    this._slideElm = document.getElementById(this.target);
    this._slideCount = this._slideElm.children.length;
    this._isPreview = false;
    this.render();
  }

  // HTMLでのnavigationを隠す
  _hideHtmlNav = () => {
    this._slideElm.querySelectorAll("[data-hide-nav]").forEach((e) => {
      e.style.display = "none";
    });
  };

  _calcSlideWidth = () => {
    this._slideWidth =
      (this._slideElm.scrollWidth - this._slideElm.clientWidth) /
      (this._slideCount - 1);
  };

  _loadSlideImage = (idx) => {
    const img = this._slideElm.children[idx]?.querySelector("img");
    // img && img.setAttribute("loading", "eager");
    img && (img.src = this._imgSrcs[idx]);
  };

  _updateSlideIdx = (idx) => {
    if (this._currentSlideIdx === idx) {
      return;
    }
    this._currentSlideIdx = idx;
    this._previewSlideIdx = idx;
    this.render();
    // 間引き必要
    this.shadowRoot.querySelector("input[name=page]").value =
      this._currentSlideIdx + 1;
  };

  _slideLink = (idx) => {
    if (typeof idx !== "number") {
      return `/slides/${this.slug}/`;
    }
    return `/slides/${this.slug}/#slide-${idx + 1}`;
  };

  _next = () => {
    this._slideElm.scrollBy({ left: this._slideWidth });
  };

  _prev = () => {
    this._slideElm.scrollBy({ left: -this._slideWidth });
  };

  _first = () => {
    this._slideElm.scroll({ left: 0 });
  };

  _last = () => {
    this._slideElm.scroll({ left: this._slideElm.scrollWidth });
  };

  _scrollTo = (idx) => {
    this._slideElm.scroll({
      left: this._slideWidth * idx,
    });
  };

  _handleScroll = () => {
    const idx = Math.round(this._slideElm.scrollLeft / this._slideWidth);
    this._updateSlideIdx(idx);
  };

  _handleRangeInput = (e) => {
    this._previewSlideIdx = parseInt(e.target.value) - 1;
    this.render();
  };

  _handleRangeChange = (e) => {
    const idx = parseInt(e.target.value) - 1;
    this._scrollTo(idx);
  };

  _handleRangeMoveStart = (ev) => {
    this._isPreview = true;
    this.render();
  };

  _handleRangeMoveEnd = (ev) => {
    this._isPreview = false;
    this.render();
  };

  _handleKeyDown = (e) => {
    switch (e.key) {
      case "ArrowLeft": {
        e.preventDefault();
        this._prev();
        break;
      }
      case "ArrowRight": {
        e.preventDefault();
        this._next();
        break;
      }
      default: {
        break;
      }
    }
  };

  _adjastScrollbarSize() {
    const elm = document.createElement("div");
    elm.style.overflowX = "scroll";
    // elm.style.scrollbarWidth = "thin";
    document.body.appendChild(elm);
    const scrollBarSize = elm.offsetHeight;
    if (scrollBarSize > 0) {
      // console.log("scrollbar", scrollBarSize);
      this._slideElm.classList.add("scrollbar-obtrusive");
      // Mac safari scrollbar custom bug
      const ua = window.navigator.userAgent.toLowerCase();
      if (!ua.includes("chrome") && ua.includes("safari")) {
        this._slideElm.style.overflowX = "hidden";
        window.setTimeout(() => {
          this._slideElm.style.overflowX = "scroll";
        }, 1);
      }
    }
  }

  connectedCallback() {
    this._hideHtmlNav();
    this._adjastScrollbarSize();

    this._calcSlideWidth();
    this._slideElm.addEventListener("scroll", this._handleScroll);

    this._handleScroll();

    this._slideImgs = this._slideElm.querySelectorAll("img");
    this._slideImgs.forEach((img) => {
      this._slideThumbUrls.push(img.dataset.thumb);
    });

    this.addEventListener("keydown", this._handleKeyDown);

    window.addEventListener("resize", this._calcSlideWidth);
  }

  disconnectedCallback() {
    window.removeEventListener("resize", this._calcSlideWidth);
    removeEventListener("keydown", this._handleKeyDown);
    this._slideElm.removeEventListener("scroll", this._handleScroll);
  }

  render() {
    const idx = this._currentSlideIdx;
    render(
      html`
        <div class="wrap">
          <input
            type="range"
            name="page"
            class="slider ${this.embed ? "embed" : ""}"
            step="1"
            min="1"
            max="${this._slideCount}"
            @change="${this._handleRangeChange}"
            @input="${this._handleRangeInput}"
            @touchstart="${this._handleRangeMoveStart}"
            @mousedown="${this._handleRangeMoveStart}"
            @touchend="${this._handleRangeMoveEnd}"
            @mouseup="${this._handleRangeMoveEnd}"
          />
          <div class="buttons">
            <a
              href="${this._slideLink(idx)}"
              title="このスライド(${idx + 1}ページ)へのリンク"
              target="${this.embed ? "_blank" : null}"
              >🔗</a
            >&ensp;
            <span class="page"
              >${this._currentSlideIdx + 1}/${this._slideCount}</span
            >
            <button @click="${this._prev}" title="前のスライド">◀️</button>
            <button @click="${this._next}" title="次のスライド">▶️</button>
          </div>
          <div
            class="preview ${this._isPreview ? "" : "hide"}"
            title="スライドのサムネイル"
            style="background-image: url('${this._slideThumbUrls[
              this._previewSlideIdx
            ]}');"
          >
            <div class="count">
              ${this._previewSlideIdx}/${this._slideCount}
            </div>
          </div>
          <style>
            .wrap {
              height: 3rem;
              padding: 0 10px;
              display: flex;
              justify-content: flex-end;
              align-items: center;
              gap: 10px;
              position: relative;
            }
            .buttons {
              flex: 0 0 auto;
              line-height: 1;
              padding: 0.6rem 0;
              display: flex;
              align-items: center;
            }
            button {
              appearance: none;
              border: none;
              background-color: transparent;
              font-family: inherit;
              font-size: 2rem;
              line-height: 1;
              cursor: pointer;
              padding: 0 0.5rem;
              margin: 0;
              color: inherit;
              touch-action: manipulation;
            }
            .page {
              font-family: sans-serif;
            }
            .slider {
              flex: 0 1 360px;
            }
            .preview {
              --idx: ${this._previewSlideIdx};
              --len: ${this._slideCount - 1};
              --bg-color: rgba(255, 255, 255, 0.25);
              --border: 1px;
              --width: min(100%, 320px);
              --margin: 10px;
              background: no-repeat center/contain none;
              position: absolute;
              width: var(--width);
              max-height: calc(100vh - 3.6rem - var(--margin) * 2);
              aspect-ratio: ${this.ratio};
              background-color: var(--bg-color);
              border: var(--border) solid var(--bg-color);
              box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
              background-color: gray;
              left: calc(
                var(--margin) + (100% - var(--width) - var(--margin) * 2) *
                  var(--idx) / var(--len)
              );
              bottom: calc(100% + var(--margin));
              z-index: 1;
              display: flex;
              align-items: flex-end;
              justify-content: center;
            }
            .preview.hide {
              display: none;
            }
            .preview > .count {
              font-family: sans-serif;
              padding: 0 5px;
              background-color: rgba(0, 0, 0, 0.5);
              color: #fff;
            }
          </style>
        </div>
      `,
      this.shadowRoot
    );
  }
}

customElements.define("slide-nav", SlideNav);
