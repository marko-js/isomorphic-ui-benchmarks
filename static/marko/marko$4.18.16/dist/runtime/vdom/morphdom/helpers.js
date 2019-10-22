$_mod.def("/marko$4.18.16/dist/runtime/vdom/morphdom/helpers", function(require, exports, module, __filename, __dirname) { function insertBefore(node, referenceNode, parentNode) {
    if (node.insertInto) {
        return node.insertInto(parentNode, referenceNode);
    }
    return parentNode.insertBefore(node, referenceNode && referenceNode.startNode || referenceNode);
}

function insertAfter(node, referenceNode, parentNode) {
    return insertBefore(node, referenceNode && referenceNode.nextSibling, parentNode);
}

function nextSibling(node) {
    var next = node.nextSibling;
    var fragment = next && next.fragment;
    if (fragment) {
        return next === fragment.startNode ? fragment : null;
    }
    return next;
}

function firstChild(node) {
    var next = node.firstChild;
    return next && next.fragment || next;
}

function removeChild(node) {
    if (node.remove) node.remove();else node.parentNode.removeChild(node);
}

exports.aH_ = insertBefore;
exports.aI_ = insertAfter;
exports.b_ = nextSibling;
exports.a_ = firstChild;
exports.aJ_ = removeChild;
});