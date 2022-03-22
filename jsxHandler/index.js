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
    return function (data) {
      const Component = require(resolveInputPath(inputPath)).default(data);
      const html = renderToStaticMarkup(Component);
      return html.startsWith("<html") ? `<!DOCTYPE html>${html}` : html;
    };
  },
  getData(inputPath) {
    return require(resolveInputPath(inputPath)).data;
  },
  read: false,
};

/** @param {string} inputPath */
const resolveInputPath = (inputPath) => path.join(process.cwd(), inputPath);
