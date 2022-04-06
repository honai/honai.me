const fs = require("fs");
const path = require("path");

const sass = require("sass");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItKatex = require("@iktakahiro/markdown-it-katex");
const pluginTOC = require("eleventy-plugin-nesting-toc");
const yaml = require("js-yaml");

const svelte = require("./customHandlers/svelte");

module.exports = (eleventyConfig) => {
  eleventyConfig.setTemplateFormats(["svelte", "md", "11ty.js"]);

  // static file copy
  const fileCopies = ["images", "favicon.ico", "scripts"];
  for (const f of fileCopies) {
    eleventyConfig.addPassthroughCopy(`src/${f}`);
  }

  // markdown customize
  const mdLib = markdownIt({ html: true })
    .use(markdownItAnchor)
    .use(markdownItKatex);
  eleventyConfig.setLibrary("md", mdLib);

  // ===== PLUGINS =====
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addPlugin(pluginTOC, {
    tags: ["h2", "h3"],
    wrapperClass: "toc",
  });

  // ===== custom extensions =====
  // yaml
  eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));

  // svelte
  eleventyConfig.addExtension("svelte", svelte);

  // ===== Helper functions =====
  // sass
  eleventyConfig.addJavaScriptFunction("sassinline", (filename) => {
    return sass.compile(`${__dirname}/src/styles/${filename}`, {
      style: "compressed",
    }).css;
  });
  eleventyConfig.addWatchTarget("src/styles");

  // inline markdown
  const mdLibInline = markdownIt({ linkify: true });
  eleventyConfig.addJavaScriptFunction("mdinline", (md) => {
    return mdLibInline.render(md);
  });

  // JS Date to ISO date string (YYYY-MM-DD)
  eleventyConfig.addJavaScriptFunction(
    "isodate",
    (/**@type {Date | string}*/ date) => {
      if (typeof date === "string") {
        return new Date(date).toISOString().slice(0, 10);
      }
      return date.toISOString().slice(0, 10);
    }
  );

  // inline svg
  eleventyConfig.addJavaScriptFunction("svginline", (filename) =>
    fs.readFileSync(path.join(__dirname, `src/_includes/svg/${filename}.svg`))
  );

  return {
    dir: {
      input: "src",
      output: "build",
    },
  };
};
