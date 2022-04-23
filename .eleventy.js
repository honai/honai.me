const fs = require("fs");
const path = require("path");

const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItKatex = require("@iktakahiro/markdown-it-katex");
const pluginTOC = require("eleventy-plugin-nesting-toc");
const yaml = require("js-yaml");

const jsx = require("./customHandlers/jsx");

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
  require("@babel/register")({
    extensions: [".jsx", ".mjs"],
  });
  eleventyConfig.addExtension("jsx", jsx);

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

  // after
  eleventyConfig.on("eleventy.after", async () => {
    const { getCssText } = require("./src/_includes/style.mjs");
    await fs.promises.writeFile("build/styles/stitches.css", getCssText());
  });

  return {
    dir: {
      input: "src",
      output: "build",
    },
  };
};
