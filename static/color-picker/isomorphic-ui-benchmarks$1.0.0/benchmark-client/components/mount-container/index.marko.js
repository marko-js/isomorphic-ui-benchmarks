$_mod.def("/isomorphic-ui-benchmarks$1.0.0/benchmark-client/components/mount-container/index.marko", function(require, exports, module, __filename, __dirname) { // Compiled using marko@4.18.16 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require('/marko$4.18.16/dist/vdom'/*"marko/dist/vdom"*/).t(),
    marko_component = {},
    components_helpers = require('/marko$4.18.16/dist/runtime/components/helpers-browser'/*"marko/dist/runtime/components/helpers"*/),
    marko_registerComponent = components_helpers.rc,
    marko_componentType = marko_registerComponent("/isomorphic-ui-benchmarks$1.0.0/benchmark-client/components/mount-container/index.marko", function() {
      return module.exports;
    }),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_attrs0 = {
        "class": "mount-container"
      },
    marko_helpers = require('/marko$4.18.16/dist/runtime/vdom/helpers'/*"marko/dist/runtime/vdom/helpers"*/),
    marko_createElement = marko_helpers.e,
    marko_const = marko_helpers.const,
    marko_const_nextId = marko_const("2d1187"),
    marko_node0 = marko_createElement("div", null, "1", null, 1, 0, {
        i: marko_const_nextId()
      })
      .e("div", null, "@output", null, 0);

function render(input, out, __component, component, state) {
  var data = input;

  out.e("div", marko_attrs0, "@foo", component, 2)
    .e("h1", null, "0", component, 1)
      .t(data.libName)
    .n(marko_node0, component);
}

marko_template._ = marko_renderer(render, {
    f_: marko_componentType
  }, marko_component);

marko_template.Component = marko_defineComponent(marko_component, marko_template._);

});