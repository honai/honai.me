const fs = require("fs");
const path = require("path");

const markdownIt = require("markdown-it");
const pluginTOC = require("eleventy-plugin-nesting-toc");
const yaml = require("js-yaml");

const jsx = require("./customHandlers/jsx");
const jsBundler = require("./customHandlers/jsBundle");
const mdLib = require("./customHandlers/mdLib");

const globalVals = [["SITE_DOMAIN", "www.honai.me"]];

module.exports = (eleventyConfig) => {
  eleventyConfig.setTemplateFormats(["jsx", "mjs", "md", "11ty.js"]);

  globalVals.forEach(([k, v]) => {
    eleventyConfig.addGlobalData(k, v);
  });

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

  // client js
  eleventyConfig.addExtension("mjs", jsBundler);

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

  eleventyConfig.setLibrary("md", mdLib);

  // prism css
  eleventyConfig.addPassthroughCopy({
    "node_modules/prismjs/themes/prism-tomorrow.min.css":
      "styles/prism-tomorrow.min.css",
  });

  eleventyConfig.on("eleventy.before", async () => {
    const runMode = process.env.npm_lifecycle_event;
    if (runMode === "build" && process.env.NODE_ENV !== "production") {
      console.warn("building on non-production mode");
    }
  });

  eleventyConfig.on("eleventy.after", async () => {
    // build js
    const { getCssText } = require("./src/_includes/style.mjs");
    await fs.promises.writeFile("build/styles/index.css", getCssText());
  });

  return {
    dir: {
      input: "src",
      output: "build",
    },
    markdownTemplateEngine: false,
  };
};
