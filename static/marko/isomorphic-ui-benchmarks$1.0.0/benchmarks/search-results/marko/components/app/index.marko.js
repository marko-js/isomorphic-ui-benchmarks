$_mod.def("/isomorphic-ui-benchmarks$1.0.0/benchmarks/search-results/marko/components/app/index.marko", function(require, exports, module, __filename, __dirname) { // Compiled using marko@4.18.16 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require('/marko$4.18.16/dist/vdom'/*"marko/dist/vdom"*/).t(),
    marko_component = {
        onInput: function() {
          this.input = {};
        },
        onMount: function() {
          window.onMount();
        }
      },
    components_helpers = require('/marko$4.18.16/dist/runtime/components/helpers-browser'/*"marko/dist/runtime/components/helpers"*/),
    marko_registerComponent = components_helpers.rc,
    marko_componentType = marko_registerComponent("/isomorphic-ui-benchmarks$1.0.0/benchmarks/search-results/marko/components/app/index.marko", function() {
      return module.exports;
    }),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_helpers = require('/marko$4.18.16/dist/runtime/vdom/helpers'/*"marko/dist/runtime/vdom/helpers"*/),
    marko_forEach = marko_helpers.f,
    app_search_results_item_template = require('/isomorphic-ui-benchmarks$1.0.0/benchmarks/search-results/marko/components/app-search-results-item/index.marko'/*"../app-search-results-item"*/),
    marko_loadTag = marko_helpers.t,
    app_search_results_item_tag = marko_loadTag(app_search_results_item_template),
    app_footer_template = require('/isomorphic-ui-benchmarks$1.0.0/benchmarks/search-results/marko/components/app-footer/index.marko'/*"../app-footer"*/),
    app_footer_tag = marko_loadTag(app_footer_template),
    marko_attrs0 = {
        "class": "search-results"
      };

function render(input, out, __component, component, state) {
  var data = input;

  out.be("div", marko_attrs0, "0", component);

  out.be("div", null, "1", component);

  var $for$0 = 0;

  marko_forEach(input.items || window.searchResultsData.items, function(item) {
    var $keyScope$0 = "[" + (($for$0++) + "]");

    app_search_results_item_tag(item, out, __component, "2" + $keyScope$0);
  });

  out.ee();

  app_footer_tag({}, out, __component, "3");

  out.ee();
}

marko_template._ = marko_renderer(render, {
    f_: marko_componentType
  }, marko_component);

marko_template.Component = marko_defineComponent(marko_component, marko_template._);

});