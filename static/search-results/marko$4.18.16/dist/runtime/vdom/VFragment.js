$_mod.def("/marko$4.18.16/dist/runtime/vdom/VFragment", function(require, exports, module, __filename, __dirname) { var domData = require('/marko$4.18.16/dist/runtime/components/dom-data'/*"../components/dom-data"*/);
var keysByDOMNode = domData.aa_;
var vElementByDOMNode = domData._Z_;
var VNode = require('/marko$4.18.16/dist/runtime/vdom/VNode'/*"./VNode"*/);
var inherit = require('/raptor-util$3.2.0/inherit'/*"raptor-util/inherit"*/);
var createFragmentNode = require('/marko$4.18.16/dist/runtime/vdom/morphdom/fragment'/*"./morphdom/fragment"*/).ai_;

function VFragment(key, ownerComponent, preserve) {
    this.bs_(null /* childCount */);
    this.bv_ = key;
    this.aC_ = ownerComponent;
    this.bw_ = preserve;
}

VFragment.prototype = {
    bu_: 12,
    br_: function () {
        var fragment = createFragmentNode();
        keysByDOMNode.set(fragment, this.bv_);
        vElementByDOMNode.set(fragment, this);
        return fragment;
    }
};

inherit(VFragment, VNode);

module.exports = VFragment;
});