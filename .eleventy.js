const fs = require("fs");
const path = require("path");

const sass = require("sass");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItKatex = require("@iktakahiro/markdown-it-katex");
const pluginTOC = require("eleventy-plugin-nesting-toc");
const yaml = require("js-yaml");

const jsx = require("./jsxHandler");

module.exports = (eleventyConfig) => {
  eleventyConfig.setTemplateFormats(["jsx", "scss", "md", "11ty.js", "css"]);

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
  eleventyConfig.addExtension("scss", {
    outputFileExtension: "css",
    compile: async function (inputContent, inputPath) {
      const parsed = path.parse(inputPath);
      if (parsed.name.startsWith("_")) {
        return;
      }
      const result = sass.compileString(inputContent, {
        loadPaths: [parsed.dir, `${__dirname}/src/_includes`],
        style: "compressed",
      });
      return async (data) => {
        return result.css;
      };
    },
  });
  eleventyConfig.addShortcode("sassinline", function (filename) {
    return sass.compile(`${__dirname}/src/styles/${filename}`, {
      loadPaths: [`${__dirname}/src/_includes`],
      style: "compressed",
    }).css;
  });

  eleventyConfig.addPlugin(syntaxHighlight);

  // inline markdown
  const mdLibInline = markdownIt({ linkify: true });
  eleventyConfig.addFilter("mdinline", (md) => {
    return mdLibInline.render(md);
  });

  // JS Date to ISO date string (YYYY-MM-DD)
  eleventyConfig.addFilter("isodate", (/**@type {Date | string}*/ date) => {
    if (typeof date === "string") {
      return new Date(date).toISOString().slice(0, 10);
    }
    return date.toISOString().slice(0, 10);
  });

  eleventyConfig.addJavaScriptFunction("svginline", (filename) =>
    fs.readFileSync(path.join(__dirname, `src/_includes/svg/${filename}.svg`))
  );

  eleventyConfig.addPlugin(pluginTOC, {
    tags: ["h2", "h3"],
    wrapperClass: "toc",
  });

  // markdown customize
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
