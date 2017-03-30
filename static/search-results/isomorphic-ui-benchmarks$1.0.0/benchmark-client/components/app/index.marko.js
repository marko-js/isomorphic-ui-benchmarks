$_mod.def("/isomorphic-ui-benchmarks$1.0.0/benchmark-client/components/app/index.marko", function(require, exports, module, __filename, __dirname) { // Compiled using marko@4.2.0 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require('/marko$4.2.0/vdom'/*"marko/vdom"*/).t(),
    marko_components = require('/marko$4.2.0/components/index-browser'/*"marko/components"*/),
    marko_registerComponent = marko_components.rc,
    marko_componentType = marko_registerComponent("/isomorphic-ui-benchmarks$1.0.0/benchmark-client/components/app/index.marko", function() {
      return module.exports;
    }),
    marko_component = require('/isomorphic-ui-benchmarks$1.0.0/benchmark-client/components/app/component'/*"./component"*/),
    marko_helpers = require('/marko$4.2.0/runtime/vdom/helpers'/*"marko/runtime/vdom/helpers"*/),
    marko_loadTag = marko_helpers.t,
    w_preserve_tag = marko_loadTag(require('/marko$4.2.0/components/taglib/preserve-tag'/*"marko/components/taglib/preserve-tag"*/)),
    marko_attrs0 = {
        type: "button"
      },
    marko_createElement = marko_helpers.e,
    marko_const = marko_helpers.const,
    marko_const_nextId = marko_const("8193b1"),
    marko_node0 = marko_createElement("DIV", {
        id: "mount"
      }, 0, 0, {
        c: marko_const_nextId()
      });

function render(input, out, __component, component, state) {
  var data = input;

  out.be("DIV", {
      id: __component.id
    }, null, 4);

  out.e("BUTTON", marko_attrs0, 2, 0, {
      onclick: __component.d("handleBenchmarkButtonClick")
    })
    .t("Run benchmark: ")
    .t(state.benchmarkName);

  var __componentId0 = __component.elId("results");

  w_preserve_tag({
      id: __componentId0,
      renderBody: function renderBody(out) {
        out.e("PRE", {
            style: "width: 100%; border: 1px solid black;",
            id: __componentId0
          }, 0, 4);
      }
    }, out);

  out.n(marko_node0);

  out.ee();
}

marko_template._ = marko_components.r(render, {
    type: marko_componentType
  }, marko_component);

marko_template.Component = marko_components.c(marko_component, marko_template._);

});