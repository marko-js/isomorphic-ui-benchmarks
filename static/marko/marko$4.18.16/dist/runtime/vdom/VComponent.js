$_mod.def("/marko$4.18.16/dist/runtime/vdom/VComponent", function(require, exports, module, __filename, __dirname) { var VNode = require('/marko$4.18.16/dist/runtime/vdom/VNode'/*"./VNode"*/);
var inherit = require('/raptor-util$3.2.0/inherit'/*"raptor-util/inherit"*/);

function VComponent(component, key, ownerComponent, preserve) {
    this.bs_(null /* childCount */);
    this.bv_ = key;
    this.k_ = component;
    this.aC_ = ownerComponent;
    this.bw_ = preserve;
}

VComponent.prototype = {
    bu_: 2
};

inherit(VComponent, VNode);

module.exports = VComponent;
});