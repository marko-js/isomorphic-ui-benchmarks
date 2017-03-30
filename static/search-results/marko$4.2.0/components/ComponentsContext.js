$_mod.def("/marko$4.2.0/components/ComponentsContext", function(require, exports, module, __filename, __dirname) { 'use strict';

var ComponentDef = require('/marko$4.2.0/components/ComponentDef'/*'./ComponentDef'*/);
var initComponents = require('/marko$4.2.0/components/init-components-browser'/*'./init-components'*/);
var EMPTY_OBJECT = {};

function ComponentsContext(out, root) {
    if (!root) {
        root = new ComponentDef(null, null, out);
    }

    this._w = out;
    this.a_ = [root];
    this._u = EMPTY_OBJECT;
    this._v = EMPTY_OBJECT;
    this._p = {};
}

ComponentsContext.prototype = {
    get am() {
        return this.a_[0].ab;
    },

    aD: function(component) {
        var self = this;
        var componentStack = self.a_;
        var origLength = componentStack.length;
        var parent = componentStack[origLength - 1];

        var componentId = component.id;

        if (!componentId) {
            componentId = component.id = parent.ah();
        }

        var componentDef = new ComponentDef(component, componentId, this._w, componentStack, origLength);
        this._p[componentId] = componentDef;
        parent.ag(componentDef);
        componentStack.push(componentDef);

        return componentDef;
    },
    aE: function () {
        this.a_ = [new ComponentDef(null /* id */, this._w)];
    },
    an: function (doc) {
        var componentDefs = this.am;
        if (componentDefs) {
            initComponents.aj(componentDefs, doc);
            this.aE();
        }
    },
    _Y: function() {
        var componentStack = this.a_;
        var parent = componentStack[componentStack.length - 1];
        return parent.ah();
    },
    aF: function(elId, bodyOnly) {
        var preserved = bodyOnly === true ? this._v : this._u;
        if (preserved === EMPTY_OBJECT) {
            if (bodyOnly === true) {
                preserved = this._v = {};
            } else {
                preserved = this._u = {};
            }
        }
        preserved[elId] = true;
    }
};

ComponentsContext.aG = function (out) {
    var global = out.global;

    return out.data.components ||
        global.components ||
        (global.components = new ComponentsContext(out));
};

module.exports = ComponentsContext;

});