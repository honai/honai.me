const sass = require("sass");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItKatex = require("@iktakahiro/markdown-it-katex");
const pluginTOC = require("eleventy-plugin-nesting-toc");
const yaml = require("js-yaml");

const jsx = require("./jsxHandler");

module.exports = (eleventyConfig) => {
  eleventyConfig.setTemplateFormats([
    "jsx",
    "html",
    "md",
    "njk",
    "11ty.js",
  ]);

  // static file copy
  const fileCopies = ["images", "favicon.ico", "scripts"];
  for (const f of fileCopies) {
    eleventyConfig.addPassthroughCopy(`src/${f}`);
  }

  // yaml
  eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));

  // jsx
  eleventyConfig.addExtension("jsx", jsx);

  // sass
  eleventyConfig.addShortcode("sassinline", (filename) => {
    return sass
      .renderSync({
        file: `${__dirname}/src/styles/${filename}`,
        outputStyle: "compressed",
      })
      .css.toString();
  });
  eleventyConfig.addWatchTarget("src/styles");
  eleventyConfig.addPlugin(syntaxHighlight);

  // inline markdown
  const mdLibInline = markdownIt({ linkify: true });
  eleventyConfig.addFilter("mdinline", (md) => {
    return mdLibInline.render(md);
  });

  // JS Date to ISO date string (YYYY-MM-DD)
  eleventyConfig.addFilter("isodate", (/**@type {Date}*/ date) =>
    date.toISOString().slice(0, 10)
  );

  // markdown customize
  eleventyConfig.addPlugin(pluginTOC, {
    tags: ["h2", "h3"],
    wrapperClass: "toc",
  });
  const mdLib = markdownIt({ html: true })
    .use(markdownItAnchor)
    .use(markdownItKatex);
  eleventyConfig.setLibrary("md", mdLib);

  return {
    dir: {
      input: "src",
      output: "build",
    },
  };
};
