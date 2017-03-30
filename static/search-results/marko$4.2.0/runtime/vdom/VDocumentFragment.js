$_mod.def("/marko$4.2.0/runtime/vdom/VDocumentFragment", function(require, exports, module, __filename, __dirname) { var VNode = require('/marko$4.2.0/runtime/vdom/VNode'/*'./VNode'*/);
var inherit = require('/raptor-util$3.2.0/inherit'/*'raptor-util/inherit'*/);
var extend = require('/raptor-util$3.2.0/extend'/*'raptor-util/extend'*/);

function VDocumentFragmentClone(other) {
    extend(this, other);
    this.l = null;
    this.m = null;
}

function VDocumentFragment(documentFragment) {
    this.f(null /* childCount */);
    this.namespaceURI = null;
}

VDocumentFragment.prototype = {
    x: 11,

    o: true,

    y: function() {
        return new VDocumentFragmentClone(this);
    },

    w: function(doc) {
        return doc.createDocumentFragment();
    }
};

inherit(VDocumentFragment, VNode);

VDocumentFragmentClone.prototype = VDocumentFragment.prototype;

module.exports = VDocumentFragment;

});