$_mod.def("/marko$4.18.16/dist/runtime/vdom/VDocumentFragment", function(require, exports, module, __filename, __dirname) { var VNode = require('/marko$4.18.16/dist/runtime/vdom/VNode'/*"./VNode"*/);
var inherit = require('/raptor-util$3.2.0/inherit'/*"raptor-util/inherit"*/);
var extend = require('/raptor-util$3.2.0/extend'/*"raptor-util/extend"*/);

function VDocumentFragmentClone(other) {
    extend(this, other);
    this.bx_ = null;
    this.by_ = null;
}

function VDocumentFragment(out) {
    this.bs_(null /* childCount */);
    this.z_ = out;
}

VDocumentFragment.prototype = {
    bu_: 11,

    bz_: true,

    __: function () {
        return new VDocumentFragmentClone(this);
    },

    br_: function (doc) {
        return doc.createDocumentFragment();
    }
};

inherit(VDocumentFragment, VNode);

VDocumentFragmentClone.prototype = VDocumentFragment.prototype;

module.exports = VDocumentFragment;
});