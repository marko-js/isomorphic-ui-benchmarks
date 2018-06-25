const mountContainer = require('./components/mount-container')

const mountEls = {}

function createMountEl(libName) {
  const key = libName
  const mountedComponent = mountContainer
    .renderSync({
      libName: libName
    })
    .appendTo(document.getElementById('mount'))
    .getComponent()

  mountEls[key] = mountedComponent.el

  return mountedComponent.getEl('output')
}

function showSingleMountEl(libName) {
  const key = libName

  for (const curKey in mountEls) {
    const mountEl = mountEls[curKey]
    if (curKey === key) {
      mountEl.style.display = 'inline-block'
    } else {
      mountEl.style.display = 'none'
    }
  }
}

function showMountEl(libName) {
  const key = libName

  const mountEl = mountEls[key]
  mountEl.style.display = 'inline-block'
}

exports.createMountEl = createMountEl
exports.showSingleMountEl = showSingleMountEl
exports.showMountEl = showMountEl
