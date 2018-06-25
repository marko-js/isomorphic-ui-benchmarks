const app = require('./components/app')

module.exports = function(colors) {
  return function benchFn() {
    const html = app.renderToString({
      colors: colors
    })

    return html
  }
}
