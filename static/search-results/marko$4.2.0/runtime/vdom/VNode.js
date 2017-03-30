$_mod.def("/marko$4.2.0/runtime/vdom/VNode", function(require, exports, module, __filename, __dirname) { /* jshint newcap:false */
var specialElHandlers = require('/marko$4.2.0/morphdom/specialElHandlers'/*'../../morphdom/specialElHandlers'*/);

function VNode() {}

VNode.prototype = {
    f: function(finalChildCount) {
        this.g = finalChildCount;
        this.i = 0;
        this.j = null;
        this.k = null;
        this.l = null;
        this.m = null;
    },

    get firstChild() {
        var firstChild = this.j;

        if (firstChild && firstChild.o) {
            var nestedFirstChild = firstChild.firstChild;
            // The first child is a DocumentFragment node.
            // If the DocumentFragment node has a first child then we will return that.
            // Otherwise, the DocumentFragment node is not *really* the first child and
            // we need to skip to its next sibling
            return nestedFirstChild || firstChild.nextSibling;
        }

        return firstChild;
    },

    get nextSibling() {
        var nextSibling = this.m;

        if (nextSibling) {
            if (nextSibling.o) {
                var firstChild = nextSibling.firstChild;
                return firstChild || nextSibling.nextSibling;
            }
        } else {
            var parentNode = this.l;
            if (parentNode && parentNode.o) {
                return parentNode.nextSibling;
            }
        }

        return nextSibling;
    },

    p: function(child) {
        this.i++;

        if (this.q) {
            if (child.s) {
                var childValue = child.nodeValue;
                this.u = (this.u || '') + childValue;
            } else {
                throw TypeError();
            }
        } else {
            var lastChild = this.k;

            child.l = this;

            if (lastChild) {
                lastChild.m = child;
            } else {
                this.j = child;
            }

            this.k = child;
        }

        return child;
    },

    v: function finishChild() {
        if (this.i == this.g && this.l) {
            return this.l.v();
        } else {
            return this;
        }
    },

    actualize: function(doc) {
        var actualNode = this.w(doc);

        var curChild = this.firstChild;

        while(curChild) {
            actualNode.appendChild(curChild.actualize(doc));
            curChild = curChild.nextSibling;
        }

        if (this.x === 1) {
            var elHandler = specialElHandlers[this.a];
            if (elHandler !== undefined) {
                elHandler(actualNode, this);
            }
        }

        return actualNode;
    }

    // ,toJSON: function() {
    //     var clone = Object.assign({
    //         nodeType: this.nodeType
    //     }, this);
    //
    //     for (var k in clone) {
    //         if (k.startsWith('_')) {
    //             delete clone[k];
    //         }
    //     }
    //     delete clone._nextSibling;
    //     delete clone._lastChild;
    //     delete clone.parentNode;
    //     return clone;
    // }
};

module.exports = VNode;

});