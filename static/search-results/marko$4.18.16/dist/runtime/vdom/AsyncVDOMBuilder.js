$_mod.def("/marko$4.18.16/dist/runtime/vdom/AsyncVDOMBuilder", function(require, exports, module, __filename, __dirname) { var EventEmitter = require('/events-light$1.0.5/src/index'/*"events-light"*/);
var vdom = require('/marko$4.18.16/dist/runtime/vdom/vdom'/*"./vdom"*/);
var VElement = vdom.aT_;
var VDocumentFragment = vdom.aU_;
var VComment = vdom.aV_;
var VText = vdom.aW_;
var VComponent = vdom.aX_;
var VFragment = vdom.aY_;
var virtualizeHTML = vdom.aZ_;
var RenderResult = require('/marko$4.18.16/dist/runtime/RenderResult'/*"../RenderResult"*/);
var defaultDocument = vdom.b__;
var morphdom = require('/marko$4.18.16/dist/runtime/vdom/morphdom/index'/*"./morphdom"*/);
var attrsHelper = require('/marko$4.18.16/dist/runtime/vdom/helper-attrs'/*"./helper-attrs"*/);

var EVENT_UPDATE = "update";
var EVENT_FINISH = "finish";

function State(tree) {
    this.ba_ = new EventEmitter();
    this.bb_ = tree;
    this.bc_ = false;
}

function AsyncVDOMBuilder(globalData, parentNode, parentOut) {
    if (!parentNode) {
        parentNode = new VDocumentFragment();
    }

    var state;

    if (parentOut) {
        state = parentOut.J_;
    } else {
        state = new State(parentNode);
    }

    this.bd_ = 1;
    this.be_ = 0;
    this.bf_ = null;
    this.bg_ = parentOut;

    this.data = {};
    this.J_ = state;
    this.aA_ = parentNode;
    this.global = globalData || {};
    this.bh_ = [parentNode];
    this.bi_ = false;
    this.bj_ = undefined;
    this.i_ = null;

    this.ax_ = null;
    this.an_ = null;
    this.ay_ = null;
}

var proto = AsyncVDOMBuilder.prototype = {
    aP_: true,
    X_: defaultDocument,

    bc: function (component, key, ownerComponent) {
        var vComponent = new VComponent(component, key, ownerComponent);
        return this.bk_(vComponent, 0, true);
    },

    p_: function (component, key, ownerComponent) {
        var vComponent = new VComponent(component, key, ownerComponent, true);
        this.bk_(vComponent, 0);
    },

    bk_: function (child, childCount, pushToStack) {
        this.aA_.bl_(child);
        if (pushToStack === true) {
            this.bh_.push(child);
            this.aA_ = child;
        }
        return childCount === 0 ? this : child;
    },

    element: function (tagName, attrs, key, component, childCount, flags, props) {
        var element = new VElement(tagName, attrs, key, component, childCount, flags, props);
        return this.bk_(element, childCount);
    },

    aM_: function (tagName, attrs, key, component, childCount, flags, props) {
        return this.element(tagName, attrsHelper(attrs), key, component, childCount, flags, props);
    },

    n: function (node, component) {
        // NOTE: We do a shallow clone since we assume the node is being reused
        //       and a node can only have one parent node.
        var clone = node.__();
        this.node(clone);
        clone.aC_ = component;

        return this;
    },

    node: function (node) {
        this.aA_.bl_(node);
        return this;
    },

    text: function (text) {
        var type = typeof text;

        if (type != "string") {
            if (text == null) {
                return;
            } else if (type === "object") {
                if (text.toHTML) {
                    return this.h(text.toHTML());
                }
            }

            text = text.toString();
        }

        this.aA_.bl_(new VText(text));
        return this;
    },

    comment: function (comment) {
        return this.node(new VComment(comment));
    },

    html: function (html) {
        if (html != null) {
            var vdomNode = virtualizeHTML(html, this.X_ || document);
            this.node(vdomNode);
        }

        return this;
    },

    beginElement: function (tagName, attrs, key, component, childCount, flags, props) {
        var element = new VElement(tagName, attrs, key, component, childCount, flags, props);
        this.bk_(element, childCount, true);
        return this;
    },

    aK_: function (tagName, attrs, key, component, childCount, flags, props) {
        return this.beginElement(tagName, attrsHelper(attrs), key, component, childCount, flags, props);
    },

    aN_: function (key, component, preserve) {
        var fragment = new VFragment(key, component, preserve);
        this.bk_(fragment, null, true);
        return this;
    },

    aO_: function () {
        this.endElement();
    },

    endElement: function () {
        var stack = this.bh_;
        stack.pop();
        this.aA_ = stack[stack.length - 1];
    },

    end: function () {
        this.aA_ = undefined;

        var remaining = --this.bd_;
        var parentOut = this.bg_;

        if (remaining === 0) {
            if (parentOut) {
                parentOut.bm_();
            } else {
                this.bn_();
            }
        } else if (remaining - this.be_ === 0) {
            this.bo_();
        }

        return this;
    },

    bm_: function () {
        var remaining = --this.bd_;

        if (remaining === 0) {
            var parentOut = this.bg_;
            if (parentOut) {
                parentOut.bm_();
            } else {
                this.bn_();
            }
        } else if (remaining - this.be_ === 0) {
            this.bo_();
        }
    },

    bn_: function () {
        var state = this.J_;
        state.bc_ = true;
        state.ba_.emit(EVENT_FINISH, this.aQ_());
    },

    bo_: function () {
        var lastArray = this._last;

        var i = 0;

        function next() {
            if (i === lastArray.length) {
                return;
            }
            var lastCallback = lastArray[i++];
            lastCallback(next);

            if (!lastCallback.length) {
                next();
            }
        }

        next();
    },

    error: function (e) {
        try {
            this.emit("error", e);
        } finally {
            // If there is no listener for the error event then it will
            // throw a new Error here. In order to ensure that the async fragment
            // is still properly ended we need to put the end() in a `finally`
            // block
            this.end();
        }

        return this;
    },

    beginAsync: function (options) {
        if (this.bi_) {
            throw Error("Tried to render async while in sync mode. Note: Client side await is not currently supported in re-renders (Issue: #942).");
        }

        var state = this.J_;

        if (options) {
            if (options.last) {
                this.be_++;
            }
        }

        this.bd_++;

        var documentFragment = this.aA_.bp_();
        var asyncOut = new AsyncVDOMBuilder(this.global, documentFragment, this);

        state.ba_.emit("beginAsync", {
            out: asyncOut,
            parentOut: this
        });

        return asyncOut;
    },

    createOut: function () {
        return new AsyncVDOMBuilder(this.global);
    },

    flush: function () {
        var events = this.J_.ba_;

        if (events.listenerCount(EVENT_UPDATE)) {
            events.emit(EVENT_UPDATE, new RenderResult(this));
        }
    },

    C_: function () {
        return this.J_.bb_;
    },

    aQ_: function () {
        return this.bq_ || (this.bq_ = new RenderResult(this));
    },

    on: function (event, callback) {
        var state = this.J_;

        if (event === EVENT_FINISH && state.bc_) {
            callback(this.aQ_());
        } else if (event === "last") {
            this.onLast(callback);
        } else {
            state.ba_.on(event, callback);
        }

        return this;
    },

    once: function (event, callback) {
        var state = this.J_;

        if (event === EVENT_FINISH && state.bc_) {
            callback(this.aQ_());
        } else if (event === "last") {
            this.onLast(callback);
        } else {
            state.ba_.once(event, callback);
        }

        return this;
    },

    emit: function (type, arg) {
        var events = this.J_.ba_;
        switch (arguments.length) {
            case 1:
                events.emit(type);
                break;
            case 2:
                events.emit(type, arg);
                break;
            default:
                events.emit.apply(events, arguments);
                break;
        }
        return this;
    },

    removeListener: function () {
        var events = this.J_.ba_;
        events.removeListener.apply(events, arguments);
        return this;
    },

    sync: function () {
        this.bi_ = true;
    },

    isSync: function () {
        return this.bi_;
    },

    onLast: function (callback) {
        var lastArray = this._last;

        if (lastArray === undefined) {
            this._last = [callback];
        } else {
            lastArray.push(callback);
        }

        return this;
    },

    B_: function (doc) {
        var node = this.bj_;
        if (!node) {
            var vdomTree = this.C_();
            // Create the root document fragment node
            doc = doc || this.X_ || document;
            this.bj_ = node = vdomTree.br_(doc, null);
            morphdom(node, vdomTree, doc, this.i_);
        }
        return node;
    },

    toString: function (doc) {
        var docFragment = this.B_(doc);
        var html = "";

        var child = docFragment.firstChild;
        while (child) {
            var nextSibling = child.nextSibling;
            if (child.nodeType != 1) {
                var container = docFragment.ownerDocument.createElement("div");
                container.appendChild(child.cloneNode());
                html += container.innerHTML;
            } else {
                html += child.outerHTML;
            }

            child = nextSibling;
        }

        return html;
    },

    then: function (fn, fnErr) {
        var out = this;
        var promise = new Promise(function (resolve, reject) {
            out.on("error", reject).on(EVENT_FINISH, function (result) {
                resolve(result);
            });
        });

        return Promise.resolve(promise).then(fn, fnErr);
    },

    catch: function (fnErr) {
        return this.then(undefined, fnErr);
    },

    isVDOM: true,

    c: function (componentDef, key, customEvents) {
        this.ax_ = componentDef;
        this.an_ = key;
        this.ay_ = customEvents;
    }
};

proto.e = proto.element;
proto.be = proto.beginElement;
proto.ee = proto.aL_ = proto.endElement;
proto.t = proto.text;
proto.h = proto.w = proto.write = proto.html;

module.exports = AsyncVDOMBuilder;
});