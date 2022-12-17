import mdIt from "markdown-it";
// ESModule用のmodule型定義に対応していない
import hljs from "highlight.js";

const simpleInstance = mdIt({ html: true });

export const render = (md: string) => simpleInstance.render(md);

const postInstance = mdIt({
  html: true,
  linkify: true,
  highlight: (str, lang) => {
    if (!lang) {
      // todo escape
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

export const renderPost = (content: string) => postInstance.render(content);
