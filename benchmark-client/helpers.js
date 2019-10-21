var mountContainer = require("./components/mount-container");

var mountEls = {};

function createMountEl(libName) {
  var key = libName;
  var mountedComponent = mountContainer
    .renderSync({
      libName: libName
    })
    .appendTo(document.getElementById("mount"))
    .getComponent();

  mountEls[key] = mountedComponent.el;

  return mountedComponent.getEl("output");
}

function showSingleMountEl(libName) {
  var key = libName;

  for (var curKey in mountEls) {
    var mountEl = mountEls[curKey];
    if (curKey === key) {
      mountEl.style.display = "inline-block";
    } else {
      mountEl.style.display = "none";
    }
  }
}

function showMountEl(libName) {
  var key = libName;

  var mountEl = mountEls[key];
  mountEl.style.display = "inline-block";
}

exports.createMountEl = createMountEl;
exports.showSingleMountEl = showSingleMountEl;
exports.showMountEl = showMountEl;
