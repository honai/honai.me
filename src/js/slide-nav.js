import { html, render } from "lit-html";

/**
 * usage
 * <slide-nav target="slide-elm-id" slide-count="30" />
 */
export class SlideNav extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.target = this.getAttribute("target");
    console.log(this.target);
    this.slideCount = parseInt(this.getAttribute("slide-count"));
    this._currentSlideIdx = 0;
    this._maxSlideIdx = 0;
    this._slieWidth = 0;
    this._slideElm = document.getElementById(this.target);
    console.log(this._slideElm);
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
      (this.slideCount - 1);
  };

  _loadSlideImage = (idx) => {
    this._slideElm.children[idx]
      ?.querySelector("img")
      ?.setAttribute("loading", "eager");
  };

  _updateSlideIdx = () => {
    const idx = Math.round(this._slideElm.scrollLeft / this._slideWidth);
    if (this._currentSlideIdx === idx) {
      return;
    }
    this._currentSlideIdx = idx;
    this.render();
    if (idx > this._maxSlideIdx) {
      this._maxSlideIdx = idx;
      // 3枚先読み
      this._loadSlideImage(idx + 3);
    }
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

  _handleKeyDown = (e) => {
    e.preventDefault();
    switch (e.key) {
      case "ArrowLeft": {
        this._prev();
        break;
      }
      case "ArrowRight": {
        this._next();
        break;
      }
      default: {
        break;
      }
    }
  };

  connectedCallback() {
    console.log("connected");
    this._hideHtmlNav();

    this._calcSlideWidth();

    window.addEventListener("resize", this._calcSlideWidth);

    this._updateSlideIdx();

    this._slideElm.addEventListener("scroll", this._updateSlideIdx);

    addEventListener("keydown", this._handleKeyDown);
  }

  disconnectedCallback() {
    console.log("disconnect");
    window.removeEventListener("resize", this._calcSlideWidth);
    removeEventListener("keydown", this._handleKeyDown);
  }

  render() {
    console.log("render");
    render(
      html`
        <div class="wrap">
          <span class="page"
            >${this._currentSlideIdx + 1}/${this.slideCount}</span
          >
          <button @click="${this._first}">⏮️</button>
          <button @click="${this._prev}">◀️</button>
          <button @click="${this._next}">▶️</button>
          <button @click="${this._last}">⏭️</button>
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
