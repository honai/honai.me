const sass = require('sass')

class Style {
  data() {
    return {
      permalink: 'blog.css',
    }
  }
  render(data) {
    return sass.renderSync({
      file: `${__dirname}/blog.scss`,
      outputStyle: 'compressed',
    }).css
  }
}

module.exports = Style
