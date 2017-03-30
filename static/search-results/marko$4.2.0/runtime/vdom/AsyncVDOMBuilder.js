$_mod.def("/marko$4.2.0/runtime/vdom/AsyncVDOMBuilder", function(require, exports, module, __filename, __dirname) { var EventEmitter = require('/events-light$1.0.5/src/index'/*'events-light'*/);
var vdom = require('/marko$4.2.0/runtime/vdom/vdom'/*'./vdom'*/);
var VElement = vdom.E;
var VDocumentFragment = vdom.J;
var VComment = vdom.I;
var VText = vdom.K;
var virtualizeHTML = vdom.M;
var RenderResult = require('/marko$4.2.0/runtime/RenderResult'/*'../RenderResult'*/);
var defaultDocument = vdom.N;

var FLAG_FINISHED = 1;
var FLAG_LAST_FIRED = 2;

var EVENT_UPDATE = 'update';
var EVENT_FINISH = 'finish';

function State(tree) {
    this.ap = 1;
    this.aq = new EventEmitter();
    this.ar = tree;
    this.as = null;
    this.at = 0;
    this.C = 0;
}

function AsyncVDOMBuilder(globalData, parentNode, state) {
    if (!parentNode) {
        parentNode = new VDocumentFragment();
    }

    if (state) {
        state.ap++;
    } else {
        state = new State(parentNode);
    }

    this.data = {};
    this._x = state;
    this.au = parentNode;
    this.global = globalData || {};
    this.av = [parentNode];
    this.aw = false;
    this.ax = undefined;
    this.$c = null; // Component args
}

var proto = AsyncVDOMBuilder.prototype = {
    ay: true,
    _H: defaultDocument,

    element: function(name, attrs, childCount, flags, constId) {
        var element = new VElement(name, attrs, childCount, flags, constId);

        var parent = this.au;

        if (parent !== undefined) {
            parent.p(element);
        }

        return childCount === 0 ? this : element;
    },

    n: function(node) {
        // NOTE: We do a shallow clone since we assume the node is being reused
        //       and a node can only have one parent node.
        return this.node(node.y());
    },

    node: function(node) {
        var parent = this.au;
        if (parent !== undefined) {
            parent.p(node);
        }
        return this;
    },

    text: function(text) {
        var type = typeof text;

        if (type != 'string') {
            if (text == null) {
                return;
            } else if (type === 'object') {
                if (text.toHTML) {
                    return this.h(text.toHTML());
                }
            }

            text = text.toString();
        }

        var parent = this.au;
        if (parent !== undefined) {
            var lastChild = parent.lastChild;
            if (lastChild && lastChild.s) {
                lastChild.nodeValue += text;
            } else {
                parent.p(new VText(text));
            }
        }
        return this;
    },

    comment: function(comment) {
        return this.node(new VComment(comment));
    },

    html: function(html) {
        if (html != null) {
            var vdomNode = virtualizeHTML(html, this._H);
            this.node(vdomNode);
        }

        return this;
    },

    beginElement: function(name, attrs, childCount, flags, constId) {
        var element = new VElement(name, attrs, childCount, flags, constId);
        var parent = this.au;
        if (parent !== undefined) {
            parent.p(element);
            this.av.push(element);
            this.au = element;
        }
        return this;
    },

    endElement: function() {
        var stack = this.av;
        stack.pop();
        this.au = stack[stack.length-1];
    },

    end: function() {
        var state = this._x;

        this.au = undefined;

        var remaining = --state.ap;

        if (!(state.C & FLAG_LAST_FIRED) && (remaining - state.at === 0)) {
            state.C |= FLAG_LAST_FIRED;
            state.at = 0;
            state.aq.emit('last');
        }

        if (remaining === 0) {
            state.C |= FLAG_FINISHED;
            state.aq.emit(EVENT_FINISH, this.az());
        }

        return this;
    },

    error: function(e) {
        try {
            this.emit('error', e);
        } finally {
            // If there is no listener for the error event then it will
            // throw a new Error here. In order to ensure that the async fragment
            // is still properly ended we need to put the end() in a `finally`
            // block
            this.end();
        }

        return this;
    },

    beginAsync: function(options) {
        if (this.aw) {
            throw Error('Not allowed');
        }

        var state = this._x;

        if (options) {
            if (options.last) {
                state.at++;
            }
        }

        var documentFragment = this.au.H();
        var asyncOut = new AsyncVDOMBuilder(this.global, documentFragment, state);

        state.aq.emit('beginAsync', {
           out: asyncOut,
           parentOut: this
       });

       return asyncOut;
    },

    createOut: function(callback) {
        return new AsyncVDOMBuilder(this.global);
    },

    flush: function() {
        var events = this._x.aq;

        if (events.listenerCount(EVENT_UPDATE)) {
            events.emit(EVENT_UPDATE, new RenderResult(this));
        }
    },

    _S: function() {
        return this._x.ar;
    },

    az: function() {
        return this.aA || (this.aA = new RenderResult(this));
    },

    on: function(event, callback) {
        var state = this._x;

        if (event === EVENT_FINISH && (state.C & FLAG_FINISHED)) {
            callback(this.az());
        } else {
            state.aq.on(event, callback);
        }

        return this;
    },

    once: function(event, callback) {
        var state = this._x;

        if (event === EVENT_FINISH && (state.C & FLAG_FINISHED)) {
            callback(this.az());
            return this;
        }

        state.aq.once(event, callback);
        return this;
    },

    emit: function(type, arg) {
        var events = this._x.aq;
        switch(arguments.length) {
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

    removeListener: function() {
        var events = this._x.aq;
        events.removeListener.apply(events, arguments);
        return this;
    },

    sync: function() {
        this.aw = true;
    },

    isSync: function() {
        return this.aw;
    },

    onLast: function(callback) {
        var state = this._x;

        var lastArray = state.as;

        if (!lastArray) {
            lastArray = state.as = [];
            var i = 0;
            var next = function() {
                if (i === lastArray.length) {
                    return;
                }
                var _next = lastArray[i++];
                _next(next);
            };

            this.once('last', function() {
                next();
            });
        }

        lastArray.push(callback);
        return this;
    },

    ao: function(doc) {
        var node = this.ax;
        if (!node) {
            var vdomTree = this._S();

            node = this.ax = vdomTree.actualize(doc || this._H);
        }
        return node;
    },

    toString: function() {
        return this.ao().outerHTML;
    },

    then: function(fn, fnErr) {
        var out = this;
        var promise = new Promise(function(resolve, reject) {
            out.on('error', reject)
                .on(EVENT_FINISH, function(result) {
                    resolve(result);
                });
        });

        return Promise.resolve(promise).then(fn, fnErr);
    },

    catch: function(fnErr) {
        return this.then(undefined, fnErr);
    },

    isVDOM: true
};

proto.e = proto.element;
proto.be = proto.beginElement;
proto.ee = proto.endElement;
proto.t = proto.text;
proto.h = proto.w = proto.write = proto.html;

module.exports = AsyncVDOMBuilder;

});