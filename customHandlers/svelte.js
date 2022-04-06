const path = require("path");

let context = new Map();

module.exports = {
  outputFileExtension: "html",
  init() {
    // this.config is the config object
    require("svelte/register");
    const { JS_FUNCS_KEY } = require("../src/_includes/SvelteContext.svelte");
    context.set(JS_FUNCS_KEY, this.config.javascriptFunctions);
  },
  compile(_, inputPath) {
    const Component = require(resolveInputPath(inputPath)).default;
    return function (data) {
      const { head, html, css } = Component.render(data, { context });
      // CSSをビルドするために、必要なcomponentをまとめてpermalinkがcssである
      // svelte componentをつくり、各ページcomponentにはstyleタグを書くようにする
      if (path.extname(data.page.url) === ".css") {
        return css.code;
      }
      const htmlTrimmed = html.trim();
      if (htmlTrimmed.startsWith("<html") || htmlTrimmed.startsWith("<body")) {
        throw new Error("don't use <html> or <body> in svelte template");
      }
      return [
        '<!DOCTYPE html><html lang="ja"><head>',
        head.trim(),
        "</head><body>",
        htmlTrimmed,
        "</body></html>",
      ].join("");
    };
  },
  read: false,
  getData(inputPath) {
    return require(resolveInputPath(inputPath)).data;
  },
  compileOptions: {
    permalink: "raw",
  },
};

/** @param {string} inputPath */
const resolveInputPath = (inputPath) => path.join(process.cwd(), inputPath);
