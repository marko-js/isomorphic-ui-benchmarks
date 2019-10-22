$_mod.def("/marko$4.18.16/dist/runtime/components/ComponentsContext", function(require, exports, module, __filename, __dirname) { "use strict";

var GlobalComponentsContext = require('/marko$4.18.16/dist/runtime/components/GlobalComponentsContext'/*"./GlobalComponentsContext"*/);

function ComponentsContext(out, parentComponentsContext) {
    var globalComponentsContext;
    var componentDef;

    if (parentComponentsContext) {
        globalComponentsContext = parentComponentsContext.l_;
        componentDef = parentComponentsContext.j_;

        var nestedContextsForParent;
        if (!(nestedContextsForParent = parentComponentsContext._L_)) {
            nestedContextsForParent = parentComponentsContext._L_ = [];
        }

        nestedContextsForParent.push(this);
    } else {
        globalComponentsContext = out.global.i_;
        if (globalComponentsContext === undefined) {
            out.global.i_ = globalComponentsContext = new GlobalComponentsContext(out);
        }
    }

    this.l_ = globalComponentsContext;
    this.i_ = [];
    this.z_ = out;
    this.j_ = componentDef;
    this._L_ = undefined;
}

ComponentsContext.prototype = {
    A_: function (doc) {
        var componentDefs = this.i_;

        ComponentsContext._M_(componentDefs, doc);

        this.z_.emit("_N_");

        // Reset things stored in global since global is retained for
        // future renders
        this.z_.global.i_ = undefined;

        return componentDefs;
    }
};

function getComponentsContext(out) {
    return out.i_ || (out.i_ = new ComponentsContext(out));
}

module.exports = exports = ComponentsContext;

exports.D_ = getComponentsContext;
});