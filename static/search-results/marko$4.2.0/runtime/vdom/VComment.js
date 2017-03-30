$_mod.def("/marko$4.2.0/runtime/vdom/VComment", function(require, exports, module, __filename, __dirname) { var VNode = require('/marko$4.2.0/runtime/vdom/VNode'/*'./VNode'*/);
var inherit = require('/raptor-util$3.2.0/inherit'/*'raptor-util/inherit'*/);

function VComment(value) {
    this.f(-1 /* no children */);
    this.nodeValue = value;
}

VComment.prototype = {
    x: 8,

    w: function(doc) {
        return doc.createComment(this.nodeValue);
    },

    y: function() {
        return new VComment(this.nodeValue);
    }
};

inherit(VComment, VNode);

module.exports = VComment;

});