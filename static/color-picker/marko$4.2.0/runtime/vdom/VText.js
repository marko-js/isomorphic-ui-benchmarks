$_mod.def("/marko$4.2.0/runtime/vdom/VText", function(require, exports, module, __filename, __dirname) { var VNode = require('/marko$4.2.0/runtime/vdom/VNode'/*'./VNode'*/);
var inherit = require('/raptor-util$3.2.0/inherit'/*'raptor-util/inherit'*/);

function VText(value) {
    this.f(-1 /* no children */);
    this.nodeValue = value;
}

VText.prototype = {
    s: true,

    x: 3,

    w: function(doc) {
        return doc.createTextNode(this.nodeValue);
    },

    y: function() {
        return new VText(this.nodeValue);
    }
};

inherit(VText, VNode);

module.exports = VText;

});