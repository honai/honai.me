const path = require("path");

const { jsx } = require("preact/jsx-runtime");
const { render: renderToStaticMarkup } = require("preact-render-to-string");

let Provider;

module.exports = {
  outputFileExtension: "html",
  init() {
    const { javascriptFunctions: jsFuncs, globalData } = this.config;
    const ProviderFC = require("../src/_includes/EleventyContext.jsx").default;
    Provider = ({ otherValue, children }) =>
      jsx(ProviderFC, {
        value: { ...jsFuncs, ...globalData, ...otherValue },
        children,
      });
  },
  compile(_, inputPath) {
    return function (data) {
      const Component = require(resolveInputPath(inputPath)).default;
      const html = renderToStaticMarkup(
        jsx(Provider, {
          otherValue: { page: data.page, eleventy: data.eleventy },
          children: jsx(Component, data),
        })
      );
      return html.startsWith("<html") ? `<!DOCTYPE html>${html}` : html;
    };
  },
  read: false,
  getData(inputPath) {
    return require(resolveInputPath(inputPath)).data;
  },
  compileOptions: {
    permalink: (_, inputPath) => {
      const { data } = require(resolveInputPath(inputPath));
      if (!data || !data.permalink) {
        return;
      }
      if (typeof data.permalink === "string") {
        return () => data.permalink;
      }
      if (typeof data.permalink === "function") {
        return (arg) => data.permalink(arg);
      }
    },
  },
};

/** @param {string} inputPath */
const resolveInputPath = (inputPath) => path.join(process.cwd(), inputPath);
