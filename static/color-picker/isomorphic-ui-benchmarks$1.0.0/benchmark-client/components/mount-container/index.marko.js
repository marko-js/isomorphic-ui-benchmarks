$_mod.def("/isomorphic-ui-benchmarks$1.0.0/benchmark-client/components/mount-container/index.marko", function(require, exports, module, __filename, __dirname) { // Compiled using marko@4.2.0 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require('/marko$4.2.0/vdom'/*"marko/vdom"*/).t(),
    marko_component = {},
    marko_components = require('/marko$4.2.0/components/index-browser'/*"marko/components"*/),
    marko_registerComponent = marko_components.rc,
    marko_componentType = marko_registerComponent("/isomorphic-ui-benchmarks$1.0.0/benchmark-client/components/mount-container/index.marko", function() {
      return module.exports;
    });

function render(input, out, __component, component, state) {
  var data = input;

  out.e("DIV", {
      "class": "mount-container",
      id: __component.elId("foo")
    }, 2, 4)
    .e("H1", null, 1)
      .t(data.libName)
    .e("DIV", null, 1)
      .e("DIV", {
          id: __component.elId("output")
        }, 0, 4);
}

marko_template._ = marko_components.r(render, {
    type: marko_componentType,
    roots: [
      "foo"
    ]
  }, marko_component);

marko_template.Component = marko_components.c(marko_component, marko_template._);

});