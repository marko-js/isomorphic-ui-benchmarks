$_mod.def("/marko$4.18.16/dist/runtime/vdom/vdom", function(require, exports, module, __filename, __dirname) { var VNode = require('/marko$4.18.16/dist/runtime/vdom/VNode'/*"./VNode"*/);
var VComment = require('/marko$4.18.16/dist/runtime/vdom/VComment'/*"./VComment"*/);
var VDocumentFragment = require('/marko$4.18.16/dist/runtime/vdom/VDocumentFragment'/*"./VDocumentFragment"*/);
var VElement = require('/marko$4.18.16/dist/runtime/vdom/VElement'/*"./VElement"*/);
var VText = require('/marko$4.18.16/dist/runtime/vdom/VText'/*"./VText"*/);
var VComponent = require('/marko$4.18.16/dist/runtime/vdom/VComponent'/*"./VComponent"*/);
var VFragment = require('/marko$4.18.16/dist/runtime/vdom/VFragment'/*"./VFragment"*/);

var defaultDocument = typeof document != "undefined" && document;
var specialHtmlRegexp = /[&<]/;

function virtualizeChildNodes(node, vdomParent) {
    var curChild = node.firstChild;
    while (curChild) {
        vdomParent.bl_(virtualize(curChild));
        curChild = curChild.nextSibling;
    }
}

function virtualize(node) {
    switch (node.nodeType) {
        case 1:
            return VElement.bI_(node, virtualizeChildNodes);
        case 3:
            return new VText(node.nodeValue);
        case 8:
            return new VComment(node.nodeValue);
        case 11:
            var vdomDocFragment = new VDocumentFragment();
            virtualizeChildNodes(node, vdomDocFragment);
            return vdomDocFragment;
    }
}

function virtualizeHTML(html, doc) {
    if (!specialHtmlRegexp.test(html)) {
        return new VText(html);
    }

    var container = doc.createElement("body");
    container.innerHTML = html;
    var vdomFragment = new VDocumentFragment();

    var curChild = container.firstChild;
    while (curChild) {
        vdomFragment.bl_(virtualize(curChild));
        curChild = curChild.nextSibling;
    }

    return vdomFragment;
}

var Node_prototype = VNode.prototype;

/**
 * Shorthand method for creating and appending a Text node with a given value
 * @param  {String} value The text value for the new Text node
 */
Node_prototype.t = function (value) {
    var type = typeof value;
    var vdomNode;

    if (type !== "string") {
        if (value == null) {
            value = "";
        } else if (type === "object") {
            if (value.toHTML) {
                vdomNode = virtualizeHTML(value.toHTML(), document);
            }
        }
    }

    this.bl_(vdomNode || new VText(value.toString()));
    return this.bF_();
};

/**
 * Shorthand method for creating and appending a Comment node with a given value
 * @param  {String} value The value for the new Comment node
 */
Node_prototype.c = function (value) {
    this.bl_(new VComment(value));
    return this.bF_();
};

Node_prototype.bp_ = function () {
    return this.bl_(new VDocumentFragment());
};

exports.aV_ = VComment;
exports.aU_ = VDocumentFragment;
exports.aT_ = VElement;
exports.aW_ = VText;
exports.aX_ = VComponent;
exports.aY_ = VFragment;
exports.bI_ = virtualize;
exports.aZ_ = virtualizeHTML;
exports.b__ = defaultDocument;
});