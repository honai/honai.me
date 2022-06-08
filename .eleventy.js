const fs = require("fs");
const path = require("path");

const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItKatex = require("@iktakahiro/markdown-it-katex");
const markdownItLinkAttrs = require("markdown-it-link-attributes");
const pluginTOC = require("eleventy-plugin-nesting-toc");
const yaml = require("js-yaml");

const jsx = require("./customHandlers/jsx");
const jsBundler = require("./customHandlers/jsBundle");

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
  const mdLib = markdownIt({ html: true, linkify: true })
    .use(markdownItAnchor)
    .use(markdownItKatex)
    .use(markdownItLinkAttrs, {
      // 自サイトとブログ以外のリンクを target blank
      matcher(href, config) {
        const hasScheme = /^(https?:)?\/\//;
        if (!hasScheme.test(href)) {
          // 相対パス or 絶対パス or fragment
          return false;
        }
        const sameDomainUrl =
          /^(https?:)?\/\/((www\.)|(blog\.)|())honai\.me($|[^.])/;
        return !sameDomainUrl.test(href);
      },
      attrs: {
        target: "_blank",
        rel: "noopener",
      },
    });
  eleventyConfig.setLibrary("md", mdLib);

  eleventyConfig.on("eleventy.before", async () => {
    const runMode = process.env.npm_lifecycle_event;
    if (runMode === "build" && process.env.NODE_ENV !== "production") {
      console.warn("building on non-production mode");
    }
  });

  eleventyConfig.on("eleventy.after", async () => {
    // build js
    const { getCssText } = require("./src/_includes/style.mjs");
    await fs.promises.writeFile("build/index.css", getCssText());
  });

  return {
    dir: {
      input: "src",
      output: "build",
    },
    markdownTemplateEngine: false,
  };
};
