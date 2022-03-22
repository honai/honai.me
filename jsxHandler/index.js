const path = require("path");

const { renderToStaticMarkup } = require("react-dom/server");

module.exports = {
  outputFileExtension: "html",
  init() {
    require("@babel/register")({
      extensions: [".jsx"],
    });
  },
  compile(_, inputPath) {
    // this.config is eleventyConfig object
    const _functions = this.config.javascriptFunctions;
    return function (data) {
      const Component = require(resolveInputPath(inputPath)).default({
        ...data,
        _functions,
      });
      const html = renderToStaticMarkup(Component);
      return html.startsWith("<html") ? `<!DOCTYPE html>${html}` : html;
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
