const markdownIt = require("markdown-it");
const mdItFootnote = require("markdown-it-footnote");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItKatex = require("@iktakahiro/markdown-it-katex");
const markdownItLinkAttrs = require("markdown-it-link-attributes");
const mdItPrism = require("markdown-it-prism");

// markdown customize
const mdLib = markdownIt({ html: true, linkify: true })
  .use(mdItFootnote)
  .use(markdownItAnchor)
  .use(markdownItKatex)
  .use(mdItPrism, { defaultLanguageForUnspecified: "text" })
  .use(markdownItLinkAttrs, {
    // 自サイトとブログ以外のリンクを target blank
    matcher(href, config) {
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

module.exports = mdLib;
