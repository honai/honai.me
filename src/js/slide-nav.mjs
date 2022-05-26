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
    this._currentSlideIdx = -1;
    this._maxSlideIdx = 0;
    this._slieWidth = 0;
    this._slideElm = document.getElementById(this.target);
    this._slideCount = this._slideElm.children.length;
    this._isIframe = window.parent !== window;
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
    console.log(idx, this._currentSlideIdx);
    if (this._currentSlideIdx === idx) {
      return;
    }
    this._currentSlideIdx = idx;
    this.render();
    console.log("update");
  };

  _slideLink = (idx) => {
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
    this._slideElm.scrollTo({
      left: this._slideWidth * idx,
      behavior: "smooth",
    });
  };

  _handleScroll = () => {
    const idx = Math.round(this._slideElm.scrollLeft / this._slideWidth);
    this._updateSlideIdx(idx);
  };

  _handleRangeChange = (e) => {
    const idx = parseInt(e.target.value) - 1;
    this._scrollTo(idx);
  };

  _handleRangeMoveStart = (ev) => {
    console.log("start", ev);
    this._slideImgs.forEach((e) => (e.style.display = "none"));
  };

  _handleRangeMoveEnd = (ev) => {
    console.log("end", ev.target);
    this._slideImgs.forEach((e, i) => (e.style.display = "block"));
    // this._loadSlideImage(parseInt(ev.target.value) - 1);
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

  connectedCallback() {
    this._hideHtmlNav();

    this._calcSlideWidth();

    window.addEventListener("resize", this._calcSlideWidth);

    this._handleScroll();

    this._slideElm.addEventListener("scroll", this._handleScroll);

    this.addEventListener("keydown", this._handleKeyDown);

    this._slideImgs = this._slideElm.querySelectorAll("img");
    this._imgSrcs = Array.from(this._slideImgs).map((e) => e.src);
  }

  disconnectedCallback() {
    window.removeEventListener("resize", this._calcSlideWidth);
    removeEventListener("keydown", this._handleKeyDown);
  }

  render() {
    const idx = this._currentSlideIdx;
    render(
      html`
        <div class="wrap">
          <input
            type="range"
            step="1"
            min="1"
            max="${this._slideCount}"
            .value="${this._currentSlideIdx + 1}"
            @input="${this._handleRangeChange}"
            @touchstart="${this._handleRangeMoveStart}"
            @touchend="${this._handleRangeMoveEnd}"
            @mousedown="${this._handleRangeMoveStart}"
            @mouseup="${this._handleRangeMoveEnd}"
          />
          <a
            href="${this._slideLink(idx)}"
            title="このスライド(${idx + 1}ページ)へのリンク"
            target="${this._isIframe ? "_blank" : null}"
            >🔗</a
          >&ensp;
          <span class="page"
            >${this._currentSlideIdx + 1}/${this._slideCount}</span
          >
          <button @click="${this._first}" title="最初のスライド">⏮️</button>
          <button @click="${this._prev}" title="前のスライド">◀️</button>
          <button @click="${this._next}" title="次のスライド">▶️</button>
          <button @click="${this._last}" title="最後のスライド">⏭️</button>
          <style>
            .wrap {
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
              font-size: 2.4rem;
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
          </style>
        </div>
      `,
      this.shadowRoot
    );
  }
}

customElements.define("slide-nav", SlideNav);
