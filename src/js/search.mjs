// @ts-check
import { html, render } from "lit-html";

/**
 * @typedef PostRes
 * @prop {string} url
 * @prop {string} title
 */

export class BlogSearch extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    /** @type {PostRes[]} */
    this._searchResults = [];
    /** @type {number | null} */
    this._timeoutId = null;
  }
  /**
   * @param {string} query
   * @returns {Promise<PostRes[]>}
   */
  _handleSearch = async (query) => {
    console.log(query);
    const res = await fetch(
      `/api/search?${new URLSearchParams({ q: query }).toString()}`
    );
    if (!res.ok) {
      throw new Error("not ok");
    }
    /** @type {PostRes[]} */
    return await res.json();
  };
  _onInput = (e) => {
    if (this._timeoutId !== null) {
      window.clearTimeout(this._timeoutId);
    }
    const q = e.target.value;
    this._timeoutId = window.setTimeout(async () => {
      this._timeoutId = null;
      if (q === "") {
        this._searchResults = [];
      } else {
        this._searchResults = await this._handleSearch(q);
      }
      this.render();
    }, 500);
  };
  connectedCallback() {
    this.render();
  }
  disconnectedCallback() {}
  render() {
    render(
      html`<div class="wrap">
          <input type="search" placeholder="検索" @input="${this._onInput}" />
          ${this._searchResults.length > 0
            ? html`<ul>
                ${this._searchResults.map(
                  ({ url, title }) =>
                    html`<li><a href="${url}">${title}</a></li>`
                )}
              </ul>`
            : ""}
        </div>
        <style>
          .wrap {
            position: relative;
            color: #000;
          }
          input {
            width: 100%;
          }
          ul {
            position: absolute;
            width: min(100vw - 10px, 480px);
            top: 100%;
            right: 0;
            background-color: #fff;
            border: 1px solid gray;
          }
        </style>`,
      this.shadowRoot
    );
  }
}

customElements.define("blog-search", BlogSearch);
