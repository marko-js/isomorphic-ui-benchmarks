$_mod.def("/isomorphic-ui-benchmarks$1.0.0/benchmark-client/components/app/index.marko", function(require, exports, module, __filename, __dirname) { // Compiled using marko@4.18.16 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require('/marko$4.18.16/dist/vdom'/*"marko/dist/vdom"*/).t(),
    components_helpers = require('/marko$4.18.16/dist/runtime/components/helpers-browser'/*"marko/dist/runtime/components/helpers"*/),
    marko_registerComponent = components_helpers.rc,
    marko_componentType = marko_registerComponent("/isomorphic-ui-benchmarks$1.0.0/benchmark-client/components/app/index.marko", function() {
      return module.exports;
    }),
    marko_component = require('/isomorphic-ui-benchmarks$1.0.0/benchmark-client/components/app/component'/*"./component"*/),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_helpers = require('/marko$4.18.16/dist/runtime/vdom/helpers'/*"marko/dist/runtime/vdom/helpers"*/),
    marko_loadTag = marko_helpers.t,
    _preserve_tag = marko_loadTag(require('/marko$4.18.16/dist/core-tags/components/preserve-tag-browser'/*"marko/dist/core-tags/components/preserve-tag"*/)),
    marko_attrs0 = {
        type: "button"
      },
    marko_createElement = marko_helpers.e,
    marko_const = marko_helpers.const,
    marko_const_nextId = marko_const("8193b1"),
    marko_node0 = marko_createElement("div", {
        id: "mount"
      }, "2", null, 0, 0, {
        i: marko_const_nextId()
      }),
    marko_attrs1 = {
        style: "width: 100%; border: 1px solid black;"
      };

function render(input, out, __component, component, state) {
  var data = input;

  out.be("div", null, "0", component);

  out.e("button", marko_attrs0, "1", component, 2, 0, {
      onclick: __component.d("click", "handleBenchmarkButtonClick", false)
    })
    .t("Run benchmark: ")
    .t(state.benchmarkName);

  var $key$0 = __component.c_("@results");

  _preserve_tag({
      key: $key$0,
      renderBody: function(out) {
        out.e("pre", marko_attrs1, $key$0, component, 0);
      }
    }, out);

  out.n(marko_node0, component);

  out.ee();
}

marko_template._ = marko_renderer(render, {
    f_: marko_componentType
  }, marko_component);

marko_template.Component = marko_defineComponent(marko_component, marko_template._);

});