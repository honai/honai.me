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

type HeadingLv = 1 | 2 | 3 | 4 | 5 | 6;
const headingToLevel: Record<string, HeadingLv> = {
  h1: 1,
  h2: 2,
  h3: 3,
  h4: 4,
  h5: 5,
  h6: 6,
};

export type Toc = { level: HeadingLv; text: string; id: string };
let globalToc: Toc[] = [];

postInstance.core.ruler.push("toc", (state) => {
  for (let i = 0; i < state.tokens.length; i++) {
    const token = state.tokens[i];
    if (token.type !== "heading_open") {
      continue;
    }
    const id = token.attrGet("id");
    const level = headingToLevel[token.tag];
    if (!id || !level) {
      throw `invalid id or level. id: ${id} type: ${token.type}`;
    }
    const text =
      state.tokens[i + 1].children
        ?.filter((t) => ["text", "code_inline"].includes(t.type))
        .map((t) => t.content)
        .join("") || "";
    globalToc.push({ level, text, id });
  }
});

export const renderPost = (content: string) => {
  globalToc = [];
  const html = postInstance.render(content);
  return { html, toc: globalToc };
};
