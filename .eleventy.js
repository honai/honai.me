const sass = require('sass')
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")
const markdownIt = require('markdown-it')
const markdownItKatex = require('@iktakahiro/markdown-it-katex')

const fileCopies = ['images', 'favicon.ico', 'ads.txt']

module.exports = (eleventyConfig) => {
  eleventyConfig.setTemplateFormats(['html', 'md', 'pug', 'ejs', '11ty.js'])

  for (const f of fileCopies) {
    eleventyConfig.addPassthroughCopy(`src/${f}`)
  }

  eleventyConfig.addFilter('sass', (code) => {
    return sass.renderSync({ data: code, outputStyle: 'compressed' }).css.toString()
  })
  eleventyConfig.addWatchTarget('src/styles')
  eleventyConfig.addPlugin(syntaxHighlight)

  const mdLib = markdownIt({ html: true }).use(markdownItKatex)
  eleventyConfig.setLibrary('md', mdLib)

  return {
    dir: {
      input: 'src',
    },
  }
}
