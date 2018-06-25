const app = require('./components/app')
require('marko/components').init()

window.addBench('marko', function(el, getNextSearchResults) {
  const component = app
    .renderSync(getNextSearchResults())
    .appendTo(el)
    .getComponent()

  return function(done) {
    component.input = getNextSearchResults()
    component.update()
    done()
  }
})
