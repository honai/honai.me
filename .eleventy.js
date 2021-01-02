const sass = require('sass')

module.exports = (eleventyConfig) => {
  eleventyConfig.setTemplateFormats(['html', 'md', 'pug', 'ejs', '11ty.js', 'ico'])
  eleventyConfig.addPassthroughCopy('src/images')
  eleventyConfig.addFilter('sass', (code) => {
    return sass.renderSync({ data: code, outputStyle: 'compressed' }).css.toString()
  })
  return {
    dir: {
      input: 'src',
    },
  }
}
