$_mod.def("/marko$4.18.16/dist/runtime/RenderResult", function(require, exports, module, __filename, __dirname) { var domInsert = require('/marko$4.18.16/dist/runtime/dom-insert'/*"./dom-insert"*/);

function getComponentDefs(result) {
    var componentDefs = result.i_;

    if (!componentDefs) {
        throw Error("No component");
    }
    return componentDefs;
}

function RenderResult(out) {
    this.out = this.z_ = out;
    this.i_ = undefined;
}

module.exports = RenderResult;

var proto = RenderResult.prototype = {
    getComponent: function () {
        return this.getComponents()[0];
    },
    getComponents: function (selector) {
        if (this.i_ === undefined) {
            throw Error("Not added to DOM");
        }

        var componentDefs = getComponentDefs(this);

        var components = [];

        componentDefs.forEach(function (componentDef) {
            var component = componentDef.k_;
            if (!selector || selector(component)) {
                components.push(component);
            }
        });

        return components;
    },

    afterInsert: function (doc) {
        var out = this.z_;
        var componentsContext = out.i_;
        if (componentsContext) {
            this.i_ = componentsContext.A_(doc);
        } else {
            this.i_ = null;
        }

        return this;
    },
    getNode: function (doc) {
        return this.z_.B_(doc);
    },
    getOutput: function () {
        return this.z_.C_();
    },
    toString: function () {
        return this.z_.toString();
    },
    document: typeof document != "undefined" && document
};

// Add all of the following DOM methods to Component.prototype:
// - appendTo(referenceEl)
// - replace(referenceEl)
// - replaceChildrenOf(referenceEl)
// - insertBefore(referenceEl)
// - insertAfter(referenceEl)
// - prependTo(referenceEl)
domInsert(proto, function getEl(renderResult, referenceEl) {
    return renderResult.getNode(referenceEl.ownerDocument);
}, function afterInsert(renderResult, referenceEl) {
    var isShadow = typeof ShadowRoot === "function" && referenceEl instanceof ShadowRoot;
    return renderResult.afterInsert(isShadow ? referenceEl : referenceEl.ownerDocument);
});
});