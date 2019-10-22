$_mod.def("/marko$4.18.16/dist/runtime/vdom/VNode", function(require, exports, module, __filename, __dirname) { /* jshint newcap:false */
function VNode() {}

VNode.prototype = {
    bs_: function (finalChildCount) {
        this.bK_ = finalChildCount;
        this.bL_ = 0;
        this.bA_ = null;
        this.bM_ = null;
        this.bx_ = null;
        this.by_ = null;
    },

    aC_: null,

    get a_() {
        var firstChild = this.bA_;

        if (firstChild && firstChild.bz_) {
            var nestedFirstChild = firstChild.a_;
            // The first child is a DocumentFragment node.
            // If the DocumentFragment node has a first child then we will return that.
            // Otherwise, the DocumentFragment node is not *really* the first child and
            // we need to skip to its next sibling
            return nestedFirstChild || firstChild.b_;
        }

        return firstChild;
    },

    get b_() {
        var nextSibling = this.by_;

        if (nextSibling) {
            if (nextSibling.bz_) {
                var firstChild = nextSibling.a_;
                return firstChild || nextSibling.b_;
            }
        } else {
            var parentNode = this.bx_;
            if (parentNode && parentNode.bz_) {
                return parentNode.b_;
            }
        }

        return nextSibling;
    },

    bl_: function (child) {
        this.bL_++;

        if (this.bC_ === "textarea") {
            if (child.bN_) {
                var childValue = child.bt_;
                this.bD_ = (this.bD_ || "") + childValue;
            } else {
                throw TypeError();
            }
        } else {
            var lastChild = this.bM_;

            child.bx_ = this;

            if (lastChild) {
                lastChild.by_ = child;
            } else {
                this.bA_ = child;
            }

            this.bM_ = child;
        }

        return child;
    },

    bF_: function finishChild() {
        if (this.bL_ === this.bK_ && this.bx_) {
            return this.bx_.bF_();
        } else {
            return this;
        }
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