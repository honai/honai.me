const path = require("path");

const { jsx } = require("preact/jsx-runtime");
const { render: renderToStaticMarkup } = require("preact-render-to-string");

let Provider;

module.exports = {
  outputFileExtension: "html",
  init() {
    require("@babel/register")({
      extensions: [".jsx"],
    });
    const jsFuncs = this.config.javascriptFunctions;
    const ProviderFC = require("../src/_includes/EleventyContext.jsx").default;
    Provider = ({ children }) => jsx(ProviderFC, { value: jsFuncs, children });
  },
  compile(_, inputPath) {
    return function (data) {
      const Component = require(resolveInputPath(inputPath)).default;
      const html = renderToStaticMarkup(
        jsx(Provider, { children: jsx(Component, data) })
      );
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
