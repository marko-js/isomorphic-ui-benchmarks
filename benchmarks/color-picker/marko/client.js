const app = require('./components/app')
require('marko/components').init()

window.addBench('marko', function(el, colors) {
  const component = app
    .renderSync({ colors: colors })
    .appendTo(el)
    .getComponent()

  let selectedColorIndex = 0

  return function(done) {
    component.state.selectedColorIndex = ++selectedColorIndex % colors.length
    component.update()
    done()
  }
})
