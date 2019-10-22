$_mod.def("/marko$4.18.16/dist/runtime/vdom/VText", function(require, exports, module, __filename, __dirname) { var VNode = require('/marko$4.18.16/dist/runtime/vdom/VNode'/*"./VNode"*/);
var inherit = require('/raptor-util$3.2.0/inherit'/*"raptor-util/inherit"*/);

function VText(value) {
    this.bs_(-1 /* no children */);
    this.bt_ = value;
}

VText.prototype = {
    bN_: true,

    bu_: 3,

    br_: function (doc) {
        return doc.createTextNode(this.bt_);
    },

    __: function () {
        return new VText(this.bt_);
    }
};

inherit(VText, VNode);

module.exports = VText;
});