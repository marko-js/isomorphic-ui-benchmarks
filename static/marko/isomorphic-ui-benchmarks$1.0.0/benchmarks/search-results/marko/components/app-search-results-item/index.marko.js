$_mod.def("/isomorphic-ui-benchmarks$1.0.0/benchmarks/search-results/marko/components/app-search-results-item/index.marko", function(require, exports, module, __filename, __dirname) { // Compiled using marko@4.18.16 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require('/marko$4.18.16/dist/vdom'/*"marko/dist/vdom"*/).t(),
    marko_component = {
        onInput: function(input) {
          this.state = {
              purchased: false
            };
        },
        handleBuyButtonClick: function() {
          this.state.purchased = true;
        }
      },
    components_helpers = require('/marko$4.18.16/dist/runtime/components/helpers-browser'/*"marko/dist/runtime/components/helpers"*/),
    marko_registerComponent = components_helpers.rc,
    marko_componentType = marko_registerComponent("/isomorphic-ui-benchmarks$1.0.0/benchmarks/search-results/marko/components/app-search-results-item/index.marko", function() {
      return module.exports;
    }),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_helpers = require('/marko$4.18.16/dist/runtime/vdom/helpers'/*"marko/dist/runtime/vdom/helpers"*/),
    marko_classAttr = marko_helpers.ca,
    marko_styleAttr = require('/marko$4.18.16/dist/runtime/vdom/helper-styleAttr'/*"marko/dist/runtime/vdom/helper-styleAttr"*/),
    marko_attrs0 = {
        "class": "lvpic pic img left"
      },
    marko_attrs1 = {
        "class": "price"
      },
    marko_attrs2 = {
        "class": "lvpicinner full-width picW"
      },
    marko_createElement = marko_helpers.e,
    marko_const = marko_helpers.const,
    marko_const_nextId = marko_const("df2622"),
    marko_node0 = marko_createElement("div", {
        "class": "purchased"
      }, "7", null, 1, 0, {
        i: marko_const_nextId()
      })
      .t("Purchased!"),
    marko_attrs3 = {
        type: "button",
        "class": "buy-now"
      };

function render(input, out, __component, component, state) {
  var data = input;

  out.be("div", {
      "class": marko_classAttr([
          "search-results-item"
        ]),
      style: marko_styleAttr({
          backgroundColor: state.purchased ? "#f1c40f" : ""
        })
    }, "0", component, null, 1);

  out.e("h2", null, "1", component, 1)
    .t(input.title);

  out.e("div", marko_attrs0, "2", component, 1)
    .e("div", marko_attrs2, "3", component, 1)
      .e("a", {
          href: "/buy/" + input.id,
          "class": "img imgWr2"
        }, "4", component, 1)
        .e("img", {
            src: input.image,
            alt: input.title
          }, "5", component, 0);

  out.e("span", marko_attrs1, "6", component, 1)
    .t(input.price);

  if (state.purchased) {
    out.n(marko_node0, component);
  } else {
    out.e("button", marko_attrs3, "8", component, 1, 0, {
        onclick: __component.d("click", "handleBuyButtonClick", false)
      })
      .t("Buy now!");
  }

  out.ee();
}

marko_template._ = marko_renderer(render, {
    f_: marko_componentType
  }, marko_component);

marko_template.Component = marko_defineComponent(marko_component, marko_template._);

});