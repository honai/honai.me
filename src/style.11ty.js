const sass = require('sass')

class Style {
  data() {
    return {
      permalink: 'style.css',
    }
  }
  render(data) {
    return sass.renderSync({
      file: `${__dirname}/styles/index.scss`,
      outputStyle: 'compressed',
    }).css
  }
}

module.exports = Style
