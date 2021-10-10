const sass = require('sass')
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")
const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')
const markdownItKatex = require('@iktakahiro/markdown-it-katex')
const pluginTOC = require('eleventy-plugin-nesting-toc');

const fileCopies = ['images', 'favicon.ico', 'scripts']

module.exports = (eleventyConfig) => {
  eleventyConfig.setTemplateFormats(['html', 'md', 'njk', 'pug', 'ejs', '11ty.js', 'png', 'jpg'])

  // static file copy
  for (const f of fileCopies) {
    eleventyConfig.addPassthroughCopy(`src/${f}`)
  }

  // sass
  eleventyConfig.addFilter('sass', (code) => {
    return sass.renderSync({ data: code, outputStyle: 'compressed' }).css.toString()
  })
  eleventyConfig.addWatchTarget('src/styles')
  eleventyConfig.addPlugin(syntaxHighlight)

  // markdown customize
  eleventyConfig.addPlugin(pluginTOC, { tags: ['h2', 'h3'], wrapperClass: 'toc', });
  const mdLib = markdownIt({ html: true }).use(markdownItAnchor).use(markdownItKatex)
  eleventyConfig.setLibrary('md', mdLib)

  return {
    dir: {
      input: 'src',
      output: 'build'
    },
  }
}
