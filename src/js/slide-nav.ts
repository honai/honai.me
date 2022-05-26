import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";

/**
 * usage
 * <slide-nav target="slide-elm-id" slide-count="30" />
 */
@customElement("slide-nav")
export class SlideNav extends LitElement {
  @property()
  target: string;

  @property({ attribute: "slide-count", type: Number })
  slideCount: number;

  @state()
  private _currentSlideIdx: number = 0;

  // 閲覧した最大のスライド番号
  @state()
  private _maxSlideIdx: number = 0;

  @state()
  private _slideWidth: number = 0;

  @state()
  private _slideElm: HTMLElement = null;

  // HTMLでのnavigationを隠す
  private _hideHtmlNav = () => {
    this._slideElm.querySelectorAll("[data-hide-nav]").forEach((e) => {
      e.style.display = "none";
    });
  };

  private _calcSlideWidth = () => {
    this._slideWidth =
      (this._slideElm.scrollWidth - this._slideElm.clientWidth) /
      (this.slideCount - 1);
  };

  private _loadSlideImage = (idx: number) => {
    this._slideElm.children[idx]
      ?.querySelector("img")
      ?.setAttribute("loading", "eager");
  };

  private _updateSlideIdx = () => {
    console.log(this);
    const idx = Math.round(this._slideElm.scrollLeft / this._slideWidth);
    this._currentSlideIdx = idx;
    if (idx > this._maxSlideIdx) {
      this._maxSlideIdx = idx;
      // 3枚先読み
      this._loadSlideImage(idx + 3);
    }
  };

  private _next = () => {
    this._slideElm.scrollBy({ left: this._slideWidth });
  };

  private _prev = () => {
    this._slideElm.scrollBy({ left: -this._slideWidth });
  };

  private _first = () => {
    this._slideElm.scroll({ left: 0 });
  };

  private _last = () => {
    this._slideElm.scroll({ left: this._slideElm.scrollWidth });
  };

  private _handleKeyDown = (e: KeyboardEvent) => {
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

  connectedCallback(): void {
    super.connectedCallback();
    const e = document.getElementById(this.target);
    if (!e) {
      throw new Error("Cannot find slide element");
    }
    this._slideElm = e;

    this._hideHtmlNav();

    this._calcSlideWidth();

    window.addEventListener("resize", this._calcSlideWidth);

    this._updateSlideIdx();

    this._slideElm.addEventListener("scroll", this._updateSlideIdx);

    addEventListener("keydown", this._handleKeyDown);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    console.log("disconnect");
    window.removeEventListener("resize", this._calcSlideWidth);
    removeEventListener("keydown", this._handleKeyDown);
  }

  render() {
    console.log("render");
    return html`
      <div class="wrap">
        <span class="page"
          >${this._currentSlideIdx + 1}/${this.slideCount}</span
        >
        <button @click="${this._first}">⏮️</button>
        <button @click="${this._prev}">◀️</button>
        <button @click="${this._next}">▶️</button>
        <button @click="${this._last}">⏭️</button>
      </div>
    `;
  }

  static styles = css`
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
  `;
}
