$_mod.def("/marko$4.18.16/dist/runtime/vdom/VComment", function(require, exports, module, __filename, __dirname) { var VNode = require('/marko$4.18.16/dist/runtime/vdom/VNode'/*"./VNode"*/);
var inherit = require('/raptor-util$3.2.0/inherit'/*"raptor-util/inherit"*/);

function VComment(value) {
    this.bs_(-1 /* no children */);
    this.bt_ = value;
}

VComment.prototype = {
    bu_: 8,

    br_: function (doc) {
        var nodeValue = this.bt_;
        return doc.createComment(nodeValue);
    },

    __: function () {
        return new VComment(this.bt_);
    }
};

inherit(VComment, VNode);

module.exports = VComment;
});