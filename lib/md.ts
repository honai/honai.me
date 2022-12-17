import mdIt from "markdown-it";
import anchor from "markdown-it-anchor";
import linkAttrs from "markdown-it-link-attributes";
// 型定義ない
import footnote from "markdown-it-footnote";
import katex from "@iktakahiro/markdown-it-katex";
// ESModule用のmodule型定義に対応していない
import hljs from "highlight.js";

const simpleInstance = mdIt({ html: true });

export const render = (md: string) => simpleInstance.render(md);

// TODO: footnote, anchor, link attr
const postInstanceInit = mdIt({
  html: true,
  linkify: true,
  highlight: (str, lang) => {
    if (!lang) {
      return `<pre><code class="hljs">${postInstance.utils.escapeHtml(
        str
      )}</code></pre>`;
    }
    if (hljs.getLanguage(lang)) {
      const res = hljs.highlight(str, { language: lang });
      return `<pre><code class="hljs language-${lang}">${res.value}</code></pre>`;
    }
    throw `unsupported codefence language: ${lang}`;
  },
}) as mdIt; // 引数内で自身にアクセスしているためanyになる

const postInstance = postInstanceInit
  .use(footnote)
  .use(anchor)
  .use(katex)
  .use(linkAttrs, {
    // 自サイトとブログ以外のリンクを target blank
    matcher(href: string) {
      const hasScheme = /^(https?:)?\/\//;
      if (!hasScheme.test(href)) {
        // 相対パス or 絶対パス or fragment
        return false;
      }
      const sameDomainUrl =
        /^(https?:)?\/\/((www\.)|(blog\.)|())honai\.me($|[^.])/;
      return !sameDomainUrl.test(href);
    },
    attrs: {
      target: "_blank",
      rel: "noopener",
    },
  });

export const renderPost = (content: string) => postInstance.render(content);
