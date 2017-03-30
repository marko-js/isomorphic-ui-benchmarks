$_mod.def("/marko$4.2.0/runtime/RenderResult", function(require, exports, module, __filename, __dirname) { var domInsert = require('/marko$4.2.0/runtime/dom-insert'/*'./dom-insert'*/);
var EMPTY_ARRAY = [];


function getComponentDefs(result) {
    var componentDefs = result.am;

    if (!componentDefs.length) {
        throw Error('No component');
    }
    return componentDefs;
}

function RenderResult(out) {
   this.out = this._w = out;
   this.am = undefined;
}

module.exports = RenderResult;

var proto = RenderResult.prototype = {
    getComponent: function() {
        return this.getComponents()[0];
    },
    getComponents: function(selector) {
        if (!this.am) {
            throw Error('Not added to DOM');
        }

        var componentDefs = getComponentDefs(this);

        var components = [];

        componentDefs.forEach(function(componentDef) {
            var component = componentDef.Z;
            if (!selector || selector(component)) {
                components.push(component);
            }
        });

        return components;
    },

    afterInsert: function(doc) {
        var out = this._w;
        var componentsContext = out.global.components;
        if (componentsContext) {
            this.am = componentsContext.am;
            componentsContext.an(doc);
        } else {
            this.am = EMPTY_ARRAY;
        }

        return this;
    },
    getNode: function(doc) {
        return this._w.ao(doc);
    },
    getOutput: function() {
        return this._w._S();
    },
    toString: function() {
        return this._w.toString();
    },
    document: typeof document != 'undefined' && document
};

// Add all of the following DOM methods to Component.prototype:
// - appendTo(referenceEl)
// - replace(referenceEl)
// - replaceChildrenOf(referenceEl)
// - insertBefore(referenceEl)
// - insertAfter(referenceEl)
// - prependTo(referenceEl)
domInsert(
    proto,
    function getEl(renderResult, referenceEl) {
        return renderResult.getNode(referenceEl.ownerDocument);
    },
    function afterInsert(renderResult, referenceEl) {
        return renderResult.afterInsert(referenceEl.ownerDocument);
    });

});