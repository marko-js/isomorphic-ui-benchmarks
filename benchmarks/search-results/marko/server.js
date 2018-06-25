const app = require('./components/app')

module.exports = function(getNextSearchResults) {
  return function benchFn() {
    const html = app.renderToString(getNextSearchResults())
    return html
  }
}
