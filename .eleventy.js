const sass = require('sass')
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")
const markdownIt = require('markdown-it')
const markdownItKatex = require('@iktakahiro/markdown-it-katex')

const fileCopies = ['images', 'favicon.ico', 'ads.txt', 'redirects']

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
  const mdLib = markdownIt({ html: true }).use(markdownItKatex)
  eleventyConfig.setLibrary('md', mdLib)

  // filter for no-trailing-slash
  // convert filePathStem with `/index` to standard html file name
  eleventyConfig.addFilter('dirname', (value) => value.split('/').slice(0, -1).join('/'))
  eleventyConfig.addFilter('noextension', (value) => {
    const bySlash = value.split('/')
    const last = bySlash.slice(-1)[0]
    const lastWoExt = last.includes('.') ? last.split('.').slice(0, -1).join('.') : last
    return bySlash.slice(0, -1).concat([lastWoExt]).join('/')
  })

  return {
    dir: {
      input: 'src',
    },
  }
}
