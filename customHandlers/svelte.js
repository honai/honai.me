const path = require("path");

const { resolveInputPath } = require("./common");

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
      // console.log({ head, html, css });
      // console.log(data.page.url);
      // CSSをビルドするために、必要なcomponentをまとめてpermalinkがcssである
      // svelte componentをつくり、各ページcomponentにはstyleタグを書くようにする
      if (path.extname(data.page.url) === ".css") {
        return css.code;
      }
      const htmlTrimmed = html.trim();
      return htmlTrimmed.startsWith("<html")
        ? `<!DOCTYPE html>${htmlTrimmed}`
        : htmlTrimmed;
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
