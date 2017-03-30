var app = (function () {
'use strict';

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

/* jshint newcap:false */
var slice = Array.prototype.slice;

function isFunction(arg) {
    return typeof arg === 'function';
}

function checkListener(listener) {
    if (!isFunction(listener)) {
        throw TypeError('Invalid listener');
    }
}

function invokeListener(ee, listener, args) {
    switch (args.length) {
        // fast cases
        case 1:
            listener.call(ee);
            break;
        case 2:
            listener.call(ee, args[1]);
            break;
        case 3:
            listener.call(ee, args[1], args[2]);
            break;
            // slower
        default:
            listener.apply(ee, slice.call(args, 1));
    }
}

function addListener(eventEmitter, type, listener, prepend) {
    checkListener(listener);

    var events = eventEmitter.$e || (eventEmitter.$e = {});

    var listeners = events[type];
    if (listeners) {
        if (isFunction(listeners)) {
            events[type] = prepend ? [listener, listeners] : [listeners, listener];
        } else {
            if (prepend) {
                listeners.unshift(listener);
            } else {
                listeners.push(listener);
            }
        }

    } else {
        events[type] = listener;
    }
    return eventEmitter;
}

function EventEmitter() {
    this.$e = this.$e || {};
}

EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype = {
    $e: null,

    emit: function(type) {
        var args = arguments;

        var events = this.$e;
        if (!events) {
            return;
        }

        var listeners = events && events[type];
        if (!listeners) {
            // If there is no 'error' event listener then throw.
            if (type === 'error') {
                var error = args[1];
                if (!(error instanceof Error)) {
                    var context = error;
                    error = new Error('Error: ' + context);
                    error.context = context;
                }

                throw error; // Unhandled 'error' event
            }

            return false;
        }

        if (isFunction(listeners)) {
            invokeListener(this, listeners, args);
        } else {
            listeners = slice.call(listeners);

            for (var i=0, len=listeners.length; i<len; i++) {
                var listener = listeners[i];
                invokeListener(this, listener, args);
            }
        }

        return true;
    },

    on: function(type, listener) {
        return addListener(this, type, listener, false);
    },

    prependListener: function(type, listener) {
        return addListener(this, type, listener, true);
    },

    once: function(type, listener) {
        checkListener(listener);

        function g() {
            this.removeListener(type, g);

            if (listener) {
                listener.apply(this, arguments);
                listener = null;
            }
        }

        this.on(type, g);

        return this;
    },

    // emits a 'removeListener' event iff the listener was removed
    removeListener: function(type, listener) {
        checkListener(listener);

        var events = this.$e;
        var listeners;

        if (events && (listeners = events[type])) {
            if (isFunction(listeners)) {
                if (listeners === listener) {
                    delete events[type];
                }
            } else {
                for (var i=listeners.length-1; i>=0; i--) {
                    if (listeners[i] === listener) {
                        listeners.splice(i, 1);
                    }
                }
            }
        }

        return this;
    },

    removeAllListeners: function(type) {
        var events = this.$e;
        if (events) {
            delete events[type];
        }
    },

    listenerCount: function(type) {
        var events = this.$e;
        var listeners = events && events[type];
        return listeners ? (isFunction(listeners) ? 1 : listeners.length) : 0;
    }
};

var index$4 = EventEmitter;

function syncBooleanAttrProp(fromEl, toEl, name) {
    if (fromEl[name] !== toEl[name]) {
        fromEl[name] = toEl[name];
        if (fromEl[name]) {
            fromEl.setAttribute(name, '');
        } else {
            fromEl.removeAttribute(name, '');
        }
    }
}

var specialElHandlers = {
    /**
     * Needed for IE. Apparently IE doesn't think that "selected" is an
     * attribute when reading over the attributes using selectEl.attributes
     */
    OPTION: function(fromEl, toEl) {
        syncBooleanAttrProp(fromEl, toEl, 'selected');
    },
    /**
     * The "value" attribute is special for the <input> element since it sets
     * the initial value. Changing the "value" attribute without changing the
     * "value" property will have no effect since it is only used to the set the
     * initial value.  Similar for the "checked" attribute, and "disabled".
     */
    INPUT: function(fromEl, toEl) {
        syncBooleanAttrProp(fromEl, toEl, 'checked');
        syncBooleanAttrProp(fromEl, toEl, 'disabled');

        if (fromEl.value != toEl.value) {
            fromEl.value = toEl.value;
        }

        if (!toEl.__('value')) {
            fromEl.removeAttribute('value');
        }
    },

    TEXTAREA: function(fromEl, toEl) {
        var newValue = toEl.value;
        if (fromEl.value != newValue) {
            fromEl.value = newValue;
        }

        var firstChild = fromEl.firstChild;
        if (firstChild) {
            // Needed for IE. Apparently IE sets the placeholder as the
            // node value and vise versa. This ignores an empty update.
            var oldValue = firstChild.nodeValue;

            if (oldValue == newValue || (!newValue && oldValue == fromEl.placeholder)) {
                return;
            }

            firstChild.nodeValue = newValue;
        }
    },
    SELECT: function(fromEl, toEl) {
        if (!toEl.__('multiple')) {
            var selectedIndex = -1;
            var i = 0;
            var curChild = toEl.firstChild;
            while(curChild) {
                if (curChild.Z == 'OPTION') {
                    if (curChild.__('selected')) {
                        selectedIndex = i;
                        break;
                    }
                    i++;
                }
                curChild = curChild.nextSibling;
            }

            fromEl.selectedIndex = i;
        }
    }
};

/* jshint newcap:false */


function VNode() {}

VNode.prototype = {
    P: function(finalChildCount) {
        this.Q = finalChildCount;
        this.R = 0;
        this.S = null;
        this.T = null;
        this.U = null;
        this.V = null;
    },

    get firstChild() {
        var firstChild = this.S;

        if (firstChild && firstChild.W) {
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
        var nextSibling = this.V;

        if (nextSibling) {
            if (nextSibling.W) {
                var firstChild = nextSibling.firstChild;
                return firstChild || nextSibling.nextSibling;
            }
        } else {
            var parentNode = this.U;
            if (parentNode && parentNode.W) {
                return parentNode.nextSibling;
            }
        }

        return nextSibling;
    },

    C: function(child) {
        this.R++;

        if (this.L) {
            if (child.E) {
                var childValue = child.nodeValue;
                this.M = (this.M || '') + childValue;
            } else {
                throw TypeError();
            }
        } else {
            var lastChild = this.T;

            child.U = this;

            if (lastChild) {
                lastChild.V = child;
            } else {
                this.S = child;
            }

            this.T = child;
        }

        return child;
    },

    N: function finishChild() {
        if (this.R == this.Q && this.U) {
            return this.U.N();
        } else {
            return this;
        }
    },

    actualize: function(doc) {
        var actualNode = this.X(doc);

        var curChild = this.firstChild;

        while(curChild) {
            actualNode.appendChild(curChild.actualize(doc));
            curChild = curChild.nextSibling;
        }

        if (this.Y === 1) {
            var elHandler = specialElHandlers[this.Z];
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

var VNode_1 = VNode;

var copyProps = function copyProps(from, to) {
    Object.getOwnPropertyNames(from).forEach(function(name) {
        var descriptor = Object.getOwnPropertyDescriptor(from, name);
        Object.defineProperty(to, name, descriptor);
    });
};

function inherit(ctor, superCtor, shouldCopyProps) {
    var oldProto = ctor.prototype;
    var newProto = ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
            value: ctor,
            writable: true,
            configurable: true
        }
    });
    if (oldProto && shouldCopyProps !== false) {
        copyProps(oldProto, newProto);
    }
    ctor.$super = superCtor;
    ctor.prototype = newProto;
    return ctor;
}


var inherit_1 = inherit;
inherit._inherit = inherit;

function VComment$1(value) {
    this.P(-1 /* no children */);
    this.nodeValue = value;
}

VComment$1.prototype = {
    Y: 8,

    X: function(doc) {
        return doc.createComment(this.nodeValue);
    },

    D: function() {
        return new VComment$1(this.nodeValue);
    }
};

inherit_1(VComment$1, VNode_1);

var VComment_1 = VComment$1;

var extend = function extend(target, source) { //A simple function to copy properties from one object to another
    if (!target) { //Check if a target was provided, otherwise create a new empty object to return
        target = {};
    }

    if (source) {
        for (var propName in source) {
            if (source.hasOwnProperty(propName)) { //Only look at source properties that are not inherited
                target[propName] = source[propName]; //Copy the property
            }
        }
    }

    return target;
};

function VDocumentFragmentClone(other) {
    extend(this, other);
    this.U = null;
    this.V = null;
}

function VDocumentFragment$1(documentFragment) {
    this.P(null /* childCount */);
    this.namespaceURI = null;
}

VDocumentFragment$1.prototype = {
    Y: 11,

    W: true,

    D: function() {
        return new VDocumentFragmentClone(this);
    },

    X: function(doc) {
        return doc.createDocumentFragment();
    }
};

inherit_1(VDocumentFragment$1, VNode_1);

VDocumentFragmentClone.prototype = VDocumentFragment$1.prototype;

var VDocumentFragment_1 = VDocumentFragment$1;

var NS_XLINK = 'http://www.w3.org/1999/xlink';
var ATTR_XLINK_HREF = 'xlink:href';
var toString = String;

var FLAG_IS_SVG = 1;
var FLAG_IS_TEXTAREA$1 = 2;
var FLAG_SIMPLE_ATTRS = 4;

var defineProperty = Object.defineProperty;

var ATTR_HREF = 'href';
var EMPTY_OBJECT = Object.freeze({});

function convertAttrValue(type, value) {
    if (value === true) {
        return '';
    } else if (type == 'object') {
        return JSON.stringify(value);
    } else {
        return toString(value);
    }
}

function setAttribute(el, namespaceURI, name, value) {
    if (namespaceURI === null) {
        el.setAttribute(name, value);
    } else {
        el.setAttributeNS(namespaceURI, name, value);
    }
}

function removeAttribute(el, namespaceURI, name) {
    if (namespaceURI === null) {
        el.removeAttribute(name);
    } else {
        el.removeAttributeNS(namespaceURI, name);
    }
}

function VElementClone(other) {
    this.S = other.S;
    this.U = null;
    this.V = null;

    this._a = other._a;
    this._b = other._b;
    this.K = other.K;
    this.Z = other.Z;
    this.u = other.u;
    this.M = other.M;
    this._c = other._c;
}

function VElement$1(tagName, attrs, childCount, flags, props) {
    this.P(childCount);

    var constId;

    if (props) {
        constId = props.c;
    }

    var namespaceURI;

    if ((this.u = flags || 0)) {
        if (flags & FLAG_IS_SVG) {
            namespaceURI = 'http://www.w3.org/2000/svg';
        }
    }

    this._a = attrs || EMPTY_OBJECT;
    this._b = props || EMPTY_OBJECT;
    this.K = namespaceURI;
    this.Z = tagName;
    this.M = null;
    this._c = constId;
}

VElement$1.prototype = {
    f: true,

    Y: 1,

    D: function() {
        return new VElementClone(this);
    },

    /**
     * Shorthand method for creating and appending an HTML element
     *
     * @param  {String} tagName    The tag name (e.g. "div")
     * @param  {int|null} attrCount  The number of attributes (or `null` if not known)
     * @param  {int|null} childCount The number of child nodes (or `null` if not known)
     */
    e: function(tagName, attrs, childCount, flags, props) {
        var child = this.C(new VElement$1(tagName, attrs, childCount, flags, props));

        if (childCount === 0) {
            return this.N();
        } else {
            return child;
        }
    },

    /**
     * Shorthand method for creating and appending a static node. The provided node is automatically cloned
     * using a shallow clone since it will be mutated as a result of setting `nextSibling` and `parentNode`.
     *
     * @param  {String} value The value for the new Comment node
     */
    n: function(node) {
        this.C(node.D());
        return this.N();
    },

    X: function(doc) {
        var namespaceURI = this.K;
        var tagName = this.Z;

        var attributes = this._a;
        var flags = this.u;

        var el = namespaceURI !== undefined ?
            doc.createElementNS(namespaceURI, tagName) :
            doc.createElement(tagName);

        for (var attrName in attributes) {
            var attrValue = attributes[attrName];

            if (attrValue !== false && attrValue != null) {
                var type = typeof attrValue;

                if (type !== 'string') {
                    // Special attributes aren't copied to the real DOM. They are only
                    // kept in the virtual attributes map
                    attrValue = convertAttrValue(type, attrValue);
                }

                if (attrName == ATTR_XLINK_HREF) {
                    setAttribute(el, NS_XLINK, ATTR_HREF, attrValue);
                } else {
                    el.setAttribute(attrName, attrValue);
                }
            }
        }

        if (flags & FLAG_IS_TEXTAREA$1) {
            el.value = this.M;
        }

        el._vattrs = attributes;
        el._vprops = this._b;
        el._vflags = flags;

        return el;
    },

    __: function(name) {
        // We don't care about the namespaces since the there
        // is no chance that attributes with the same name will have
        // different namespaces
        var value = this._a[name];
        return value != null && value !== false;
    },
};

inherit_1(VElement$1, VNode_1);

var proto$1 = VElementClone.prototype = VElement$1.prototype;

['checked', 'selected', 'disabled'].forEach(function(name) {
    defineProperty(proto$1, name, {
        get: function () {
            var value = this._a[name];
            return value !== false && value != null;
        }
    });
});

defineProperty(proto$1, 'id', {
    get: function () {
        return this._a.id;
    }
});

defineProperty(proto$1, 'value', {
    get: function () {
        var value = this.M;
        if (value == null) {
            value = this._a.value;
        }
        return value != null ? toString(value) : '';
    }
});

defineProperty(proto$1, 'L', {
    get: function () {
        return this.u & FLAG_IS_TEXTAREA$1;
    }
});

VElement$1._d = function(attrs) {
    // By default this static method is a no-op, but if there are any
    // compiled components that have "no-update" attributes then
    // `preserve-attrs.js` will be imported and this method will be replaced
    // with a method that actually does something
    return attrs;
};

VElement$1._e = function(fromEl, toEl) {

    var removePreservedAttributes = VElement$1._d;

    var attrs = toEl._a;
    var props = toEl._b;

    var attrName;
    var i;

    // We use expando properties to associate the previous HTML
    // attributes provided as part of the VDOM node with the
    // real VElement DOM node. When diffing attributes,
    // we only use our internal representation of the attributes.
    // When diffing for the first time it's possible that the
    // real VElement node will not have the expando property
    // so we build the attribute map from the expando property

    var oldAttrs = fromEl._vattrs;

    if (oldAttrs) {
        if (oldAttrs == attrs) {
            // For constant attributes the same object will be provided
            // every render and we can use that to our advantage to
            // not waste time diffing a constant, immutable attribute
            // map.
            return;
        } else {
            oldAttrs = removePreservedAttributes(oldAttrs, props, true);
        }
    } else {
        // We need to build the attribute map from the real attributes
        oldAttrs = {};

        var oldAttributesList = fromEl.attributes;
        for (i = oldAttributesList.length - 1; i >= 0; --i) {
            var attr = oldAttributesList[i];

            if (attr.specified !== false) {
                attrName = attr.name;
                if (attrName !== 'data-marko') {
                    var attrNamespaceURI = attr.namespaceURI;
                    if (attrNamespaceURI === NS_XLINK) {
                        oldAttrs[ATTR_XLINK_HREF] = attr.value;
                    } else {
                        oldAttrs[attrName] = attr.value;
                    }
                }
            }
        }

        // We don't want preserved attributes to show up in either the old
        // or new attribute map.
        removePreservedAttributes(oldAttrs, props, false);
    }

    fromEl._vattrs = attrs;
    fromEl._vprops = props;

    var attrValue;

    var flags = toEl.u;
    var oldFlags;

    if (flags & FLAG_SIMPLE_ATTRS && ((oldFlags = fromEl._vflags) & FLAG_SIMPLE_ATTRS)) {
        if (oldAttrs['class'] !== (attrValue = attrs['class'])) {
            fromEl.className = attrValue;
        }
        if (oldAttrs.id !== (attrValue = attrs.id)) {
            fromEl.id = attrValue;
        }
        if (oldAttrs.style !== (attrValue = attrs.style)) {
            fromEl.style.cssText = attrValue;
        }
        return;
    }

    // In some cases we only want to set an attribute value for the first
    // render or we don't want certain attributes to be touched. To support
    // that use case we delete out all of the preserved attributes
    // so it's as if they never existed.
    attrs = removePreservedAttributes(attrs, props, true);

    var namespaceURI;

    // Loop over all of the attributes in the attribute map and compare
    // them to the value in the old map. However, if the value is
    // null/undefined/false then we want to remove the attribute
    for (attrName in attrs) {
        attrValue = attrs[attrName];
        namespaceURI = null;

        if (attrName === ATTR_XLINK_HREF) {
            namespaceURI = NS_XLINK;
            attrName = ATTR_HREF;
        }

        if (attrValue == null || attrValue === false) {
            removeAttribute(fromEl, namespaceURI, attrName);
        } else if (oldAttrs[attrName] !== attrValue) {
            var type = typeof attrValue;

            if (type !== 'string') {
                attrValue = convertAttrValue(type, attrValue);
            }

            setAttribute(fromEl, namespaceURI, attrName, attrValue);
        }
    }

    // If there are any old attributes that are not in the new set of attributes
    // then we need to remove those attributes from the target node
    for (attrName in oldAttrs) {
        if (!(attrName in attrs)) {
            if (attrName === ATTR_XLINK_HREF) {
                fromEl.removeAttributeNS(ATTR_XLINK_HREF, ATTR_HREF);
            } else {
                fromEl.removeAttribute(attrName);
            }
        }
    }
};

var VElement_1 = VElement$1;

function VText$1(value) {
    this.P(-1 /* no children */);
    this.nodeValue = value;
}

VText$1.prototype = {
    E: true,

    Y: 3,

    X: function(doc) {
        return doc.createTextNode(this.nodeValue);
    },

    D: function() {
        return new VText$1(this.nodeValue);
    }
};

inherit_1(VText$1, VNode_1);

var VText_1 = VText$1;

var FLAG_IS_TEXTAREA = 2;
var defaultDocument$1 = typeof document != 'undefined' && document;
var specialHtmlRegexp = /[&<]/;
var xmlnsRegExp = /^xmlns(:|$)/;

function virtualizeChildNodes(node, vdomParent) {
    var curChild = node.firstChild;
    while(curChild) {
        vdomParent.C(virtualize(curChild));
        curChild = curChild.nextSibling;
    }
}

function virtualize(node) {
    switch(node.nodeType) {
        case 1:
            var attributes = node.attributes;
            var attrCount = attributes.length;

            var attrs;

            if (attrCount) {
                attrs = {};
                for (var i=0; i<attrCount; i++) {
                    var attr = attributes[i];
                    var attrName = attr.name;
                    if (!xmlnsRegExp.test(attrName)) {
                        attrs[attrName] = attr.value;
                    }
                }
            }

            var flags = 0;

            var tagName = node.nodeName;
            if (tagName === 'TEXTAREA') {
                flags |= FLAG_IS_TEXTAREA;
            }

            var vdomEl = new VElement_1(tagName, attrs, null, flags);
            if (node.namespaceURI !== 'http://www.w3.org/1999/xhtml') {
                vdomEl.K = node.namespaceURI;
            }

            if (vdomEl.L) {
                vdomEl.M = node.value;
            } else {
                virtualizeChildNodes(node, vdomEl);
            }

            return vdomEl;
        case 3:
            return new VText_1(node.nodeValue);
        case 8:
            return new VComment_1(node.nodeValue);
        case 11:
            var vdomDocFragment = new VDocumentFragment_1();
            virtualizeChildNodes(node, vdomDocFragment);
            return vdomDocFragment;
    }
}

function virtualizeHTML$1(html, doc) {
    if (!specialHtmlRegexp.test(html)) {
        return new VText_1(html);
    }

    var container = doc.createElement('body');
    container.innerHTML = html;
    var vdomFragment = new VDocumentFragment_1();

    var curChild = container.firstChild;
    while(curChild) {
        vdomFragment.C(virtualize(curChild));
        curChild = curChild.nextSibling;
    }

    return vdomFragment;
}

var Node_prototype = VNode_1.prototype;

/**
 * Shorthand method for creating and appending a Text node with a given value
 * @param  {String} value The text value for the new Text node
 */
Node_prototype.t = function(value) {
    var type = typeof value;
    var vdomNode;

    if (type !== 'string') {
        if (value == null) {
            value = '';
        } else if (type === 'object') {
            if (value.toHTML) {
                vdomNode = virtualizeHTML$1(value.toHTML(), document);
            }
        }
    }

    this.C(vdomNode || new VText_1(value.toString()));
    return this.N();
};

/**
 * Shorthand method for creating and appending a Comment node with a given value
 * @param  {String} value The value for the new Comment node
 */
Node_prototype.c = function(value) {
    this.C(new VComment_1(value));
    return this.N();
};

Node_prototype.G = function() {
    return this.C(new VDocumentFragment_1());
};

var i = VComment_1;
var g = VDocumentFragment_1;
var f = VElement_1;
var j = VText_1;
var O = virtualize;
var k = virtualizeHTML$1;
var l = defaultDocument$1;

var vdom$2 = {
	i: i,
	g: g,
	f: f,
	j: j,
	O: O,
	k: k,
	l: l
};

var markoGlobal = window.$MG || (window.$MG = {
    uid: 0
});

var runtimeId = markoGlobal.uid++;

var componentLookup = {};

var defaultDocument$2 = document;
var EMPTY_OBJECT$1 = {};

function getComponentForEl(el, doc) {
    if (el) {
        var node = typeof el == 'string' ? (doc || defaultDocument$2).getElementById(el) : el;
        if (node) {
            var component = node._w;

            while(component) {
                var rootFor = component._l;
                if (rootFor)  {
                    component = rootFor;
                } else {
                    break;
                }
            }

            return component;
        }
    }
}

var lifecycleEventMethods = {};

[
    'create',
    'render',
    'update',
    'mount',
    'destroy',
].forEach(function(eventName) {
    lifecycleEventMethods[eventName] = 'on' + eventName[0].toUpperCase() + eventName.substring(1);
});

/**
 * This method handles invoking a component's event handler method
 * (if present) while also emitting the event through
 * the standard EventEmitter.prototype.emit method.
 *
 * Special events and their corresponding handler methods
 * include the following:
 *
 * beforeDestroy --> onBeforeDestroy
 * destroy       --> onDestroy
 * beforeUpdate  --> onBeforeUpdate
 * update        --> onUpdate
 * render        --> onRender
 */
function emitLifecycleEvent(component, eventType, eventArg1, eventArg2) {
    var listenerMethod = component[lifecycleEventMethods[eventType]];

    if (listenerMethod !== undefined) {
        listenerMethod.call(component, eventArg1, eventArg2);
    }

    component.emit(eventType, eventArg1, eventArg2);
}

function destroyComponentForEl$1(el) {
    var componentToDestroy = el._w;
    if (componentToDestroy) {
        componentToDestroy._m();
        el._w = null;

        while ((componentToDestroy = componentToDestroy._l)) {
            componentToDestroy._l = null;
            componentToDestroy._m();
        }
    }
}
function destroyElRecursive$1(el) {
    var curChild = el.firstChild;
    while(curChild) {
        if (curChild.nodeType === 1) {
            destroyComponentForEl$1(curChild);
            destroyElRecursive$1(curChild);
        }
        curChild = curChild.nextSibling;
    }
}

function nextComponentId() {
    // Each component will get an ID that is unique across all loaded
    // marko runtimes. This allows multiple instances of marko to be
    // loaded in the same window and they should all place nice
    // together
    return 'b' + ((markoGlobal.uid)++);
}

function getElementById(doc, id) {
    return doc.getElementById(id);
}

function attachBubblingEvent(componentDef, handlerMethodName, extraArgs) {
    if (handlerMethodName) {
        var id = componentDef.id;

        return extraArgs ?
            [handlerMethodName, id, extraArgs] :
            [handlerMethodName, id];
    }
}

function getMarkoPropsFromEl(el) {
    var virtualProps = el._vprops;
    if (virtualProps === undefined) {
        virtualProps = el.getAttribute('data-marko');
        if (virtualProps) {
            virtualProps = JSON.parse(virtualProps);
        }
        el._vprops = virtualProps = virtualProps || EMPTY_OBJECT$1;
    }

    return virtualProps;
}

var _n = runtimeId;
var _o = componentLookup;
var _p = getComponentForEl;
var _q = emitLifecycleEvent;
var _j = destroyComponentForEl$1;
var _k = destroyElRecursive$1;
var _r = nextComponentId;
var _s = getElementById;
var _t = attachBubblingEvent;
var _u = getMarkoPropsFromEl;

var utilBrowser = {
	_n: _n,
	_o: _o,
	_p: _p,
	_q: _q,
	_j: _j,
	_k: _k,
	_r: _r,
	_s: _s,
	_t: _t,
	_u: _u
};

var destroyComponentForEl = utilBrowser._j;
var destroyElRecursive = utilBrowser._k;

function resolveEl(el) {
    if (typeof el == 'string') {
        var elId = el;
        el = document.getElementById(elId);
        if (!el) {
            throw Error('Not found: ' + elId);
        }
    }
    return el;
}

function beforeRemove(referenceEl) {
    destroyElRecursive(referenceEl);
    destroyComponentForEl(referenceEl);
}

var domInsert = function(target, getEl, afterInsert) {
    extend(target, {
        appendTo: function(referenceEl) {
            referenceEl = resolveEl(referenceEl);
            var el = getEl(this, referenceEl);
            referenceEl.appendChild(el);
            return afterInsert(this, referenceEl);
        },
        prependTo: function(referenceEl) {
            referenceEl = resolveEl(referenceEl);
            var el = getEl(this, referenceEl);
            referenceEl.insertBefore(el, referenceEl.firstChild || null);
            return afterInsert(this, referenceEl);
        },
        replace: function(referenceEl) {
            referenceEl = resolveEl(referenceEl);
            var el = getEl(this, referenceEl);
            beforeRemove(referenceEl);
            referenceEl.parentNode.replaceChild(el, referenceEl);
            return afterInsert(this, referenceEl);
        },
        replaceChildrenOf: function(referenceEl) {
            referenceEl = resolveEl(referenceEl);
            var el = getEl(this, referenceEl);

            var curChild = referenceEl.firstChild;
            while(curChild) {
                var nextSibling = curChild.nextSibling; // Just in case the DOM changes while removing
                if (curChild.nodeType == 1) {
                    beforeRemove(curChild);
                }
                curChild = nextSibling;
            }

            referenceEl.innerHTML = '';
            referenceEl.appendChild(el);
            return afterInsert(this, referenceEl);
        },
        insertBefore: function(referenceEl) {
            referenceEl = resolveEl(referenceEl);
            var el = getEl(this, referenceEl);
            referenceEl.parentNode.insertBefore(el, referenceEl);
            return afterInsert(this, referenceEl);
        },
        insertAfter: function(referenceEl) {
            referenceEl = resolveEl(referenceEl);
            var el = getEl(this, referenceEl);
            el = el;
            var nextSibling = referenceEl.nextSibling;
            var parentNode = referenceEl.parentNode;
            if (nextSibling) {
                parentNode.insertBefore(el, nextSibling);
            } else {
                parentNode.appendChild(el);
            }
            return afterInsert(this, referenceEl);
        }
    });
};

var EMPTY_ARRAY = [];


function getComponentDefs(result) {
    var componentDefs = result._f;

    if (!componentDefs.length) {
        throw Error('No component');
    }
    return componentDefs;
}

function RenderResult(out) {
   this.out = this._g = out;
   this._f = undefined;
}

var RenderResult_1 = RenderResult;

var proto$2 = RenderResult.prototype = {
    getComponent: function() {
        return this.getComponents()[0];
    },
    getComponents: function(selector) {
        if (!this._f) {
            throw Error('Not added to DOM');
        }

        var componentDefs = getComponentDefs(this);

        var components = [];

        componentDefs.forEach(function(componentDef) {
            var component = componentDef._h;
            if (!selector || selector(component)) {
                components.push(component);
            }
        });

        return components;
    },

    afterInsert: function(doc) {
        var out = this._g;
        var componentsContext = out.global.components;
        if (componentsContext) {
            this._f = componentsContext._f;
            componentsContext._i(doc);
        } else {
            this._f = EMPTY_ARRAY;
        }

        return this;
    },
    getNode: function(doc) {
        return this._g.J(doc);
    },
    getOutput: function() {
        return this._g.H();
    },
    toString: function() {
        return this._g.toString();
    },
    document: typeof document != 'undefined' && document
};

// Add all of the following DOM methods to Component.prototype:
// - appendTo(referenceEl)
// - replace(referenceEl)
// - replaceChildrenOf(referenceEl)
// - insertBefore(referenceEl)
// - insertAfter(referenceEl)
// - prependTo(referenceEl)
domInsert(
    proto$2,
    function getEl(renderResult, referenceEl) {
        return renderResult.getNode(referenceEl.ownerDocument);
    },
    function afterInsert(renderResult, referenceEl) {
        return renderResult.afterInsert(referenceEl.ownerDocument);
    });

var VElement = vdom$2.f;
var VDocumentFragment = vdom$2.g;
var VComment = vdom$2.i;
var VText = vdom$2.j;
var virtualizeHTML = vdom$2.k;

var defaultDocument = vdom$2.l;

var FLAG_FINISHED = 1;
var FLAG_LAST_FIRED = 2;

var EVENT_UPDATE = 'update';
var EVENT_FINISH = 'finish';

function State(tree) {
    this.m = 1;
    this.o = new index$4();
    this.p = tree;
    this.q = null;
    this.s = 0;
    this.u = 0;
}

function AsyncVDOMBuilder(globalData, parentNode, state) {
    if (!parentNode) {
        parentNode = new VDocumentFragment();
    }

    if (state) {
        state.m++;
    } else {
        state = new State(parentNode);
    }

    this.data = {};
    this.v = state;
    this.w = parentNode;
    this.global = globalData || {};
    this.x = [parentNode];
    this.y = false;
    this.z = undefined;
    this.$c = null; // Component args
}

var proto = AsyncVDOMBuilder.prototype = {
    A: true,
    B: defaultDocument,

    element: function(name, attrs, childCount, flags, constId) {
        var element = new VElement(name, attrs, childCount, flags, constId);

        var parent = this.w;

        if (parent !== undefined) {
            parent.C(element);
        }

        return childCount === 0 ? this : element;
    },

    n: function(node) {
        // NOTE: We do a shallow clone since we assume the node is being reused
        //       and a node can only have one parent node.
        return this.node(node.D());
    },

    node: function(node) {
        var parent = this.w;
        if (parent !== undefined) {
            parent.C(node);
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

        var parent = this.w;
        if (parent !== undefined) {
            var lastChild = parent.lastChild;
            if (lastChild && lastChild.E) {
                lastChild.nodeValue += text;
            } else {
                parent.C(new VText(text));
            }
        }
        return this;
    },

    comment: function(comment) {
        return this.node(new VComment(comment));
    },

    html: function(html) {
        if (html != null) {
            var vdomNode = virtualizeHTML(html, this.B);
            this.node(vdomNode);
        }

        return this;
    },

    beginElement: function(name, attrs, childCount, flags, constId) {
        var element = new VElement(name, attrs, childCount, flags, constId);
        var parent = this.w;
        if (parent !== undefined) {
            parent.C(element);
            this.x.push(element);
            this.w = element;
        }
        return this;
    },

    endElement: function() {
        var stack = this.x;
        stack.pop();
        this.w = stack[stack.length-1];
    },

    end: function() {
        var state = this.v;

        this.w = undefined;

        var remaining = --state.m;

        if (!(state.u & FLAG_LAST_FIRED) && (remaining - state.s === 0)) {
            state.u |= FLAG_LAST_FIRED;
            state.s = 0;
            state.o.emit('last');
        }

        if (remaining === 0) {
            state.u |= FLAG_FINISHED;
            state.o.emit(EVENT_FINISH, this.F());
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
        if (this.y) {
            throw Error('Not allowed');
        }

        var state = this.v;

        if (options) {
            if (options.last) {
                state.s++;
            }
        }

        var documentFragment = this.w.G();
        var asyncOut = new AsyncVDOMBuilder(this.global, documentFragment, state);

        state.o.emit('beginAsync', {
           out: asyncOut,
           parentOut: this
       });

       return asyncOut;
    },

    createOut: function(callback) {
        return new AsyncVDOMBuilder(this.global);
    },

    flush: function() {
        var events = this.v.o;

        if (events.listenerCount(EVENT_UPDATE)) {
            events.emit(EVENT_UPDATE, new RenderResult_1(this));
        }
    },

    H: function() {
        return this.v.p;
    },

    F: function() {
        return this.I || (this.I = new RenderResult_1(this));
    },

    on: function(event, callback) {
        var state = this.v;

        if (event === EVENT_FINISH && (state.u & FLAG_FINISHED)) {
            callback(this.F());
        } else {
            state.o.on(event, callback);
        }

        return this;
    },

    once: function(event, callback) {
        var state = this.v;

        if (event === EVENT_FINISH && (state.u & FLAG_FINISHED)) {
            callback(this.F());
            return this;
        }

        state.o.once(event, callback);
        return this;
    },

    emit: function(type, arg) {
        var events = this.v.o;
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
        var events = this.v.o;
        events.removeListener.apply(events, arguments);
        return this;
    },

    sync: function() {
        this.y = true;
    },

    isSync: function() {
        return this.y;
    },

    onLast: function(callback) {
        var state = this.v;

        var lastArray = state.q;

        if (!lastArray) {
            lastArray = state.q = [];
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

    J: function(doc) {
        var node = this.z;
        if (!node) {
            var vdomTree = this.H();

            node = this.z = vdomTree.actualize(doc || this.B);
        }
        return node;
    },

    toString: function() {
        return this.J().outerHTML;
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

var AsyncVDOMBuilder_1 = AsyncVDOMBuilder;

var actualCreateOut;

function setCreateOut(createOutFunc) {
    actualCreateOut = createOutFunc;
}

function createOut$1(globalData) {
    return actualCreateOut(globalData);
}

createOut$1.a = setCreateOut;

var createOut_1 = createOut$1;

function safeRender(renderFunc, finalData, finalOut, shouldEnd) {
    try {
        renderFunc(finalData, finalOut);

        if (shouldEnd) {
            finalOut.end();
        }
    } catch(err) {
        var actualEnd = finalOut.end;
        finalOut.end = function() {};

        setTimeout(function() {
            finalOut.end = actualEnd;
            finalOut.error(err);
        }, 0);
    }
    return finalOut;
}

var renderable = function(target, renderer) {
    var renderFunc = renderer && (renderer.renderer || renderer.render || renderer);
    var createOut = target.createOut || renderer.createOut || createOut_1;

    return extend(target, {
        createOut: createOut,

        renderToString: function(data, callback) {
            var localData = data || {};
            var render = renderFunc || this._;
            var globalData = localData.$global;
            var out = createOut(globalData);

            out.global.template = this;

            if (globalData) {
                localData.$global = undefined;
            }

            if (callback) {
                out.on('finish', function() {
                       callback(null, out.toString(), out);
                   })
                   .once('error', callback);

                return safeRender(render, localData, out, true);
            } else {
                out.sync();
                render(localData, out);
                return out.toString();
            }
        },

        renderSync: function(data) {
            var localData = data || {};
            var render = renderFunc || this._;
            var globalData = localData.$global;
            var out = createOut(globalData);
            out.sync();

            out.global.template = this;

            if (globalData) {
                localData.$global = undefined;
            }

            render(localData, out);
            return out.F();
        },

        /**
         * Renders a template to either a stream (if the last
         * argument is a Stream instance) or
         * provides the output to a callback function (if the last
         * argument is a Function).
         *
         * Supported signatures:
         *
         * render(data)
         * render(data, out)
         * render(data, stream)
         * render(data, callback)
         *
         * @param  {Object} data The view model data for the template
         * @param  {AsyncStream/AsyncVDOMBuilder} out A Stream, an AsyncStream/AsyncVDOMBuilder instance, or a callback function
         * @return {AsyncStream/AsyncVDOMBuilder} Returns the AsyncStream/AsyncVDOMBuilder instance that the template is rendered to
         */
        render: function(data, out) {
            var callback;
            var finalOut;
            var finalData;
            var globalData;
            var render = renderFunc || this._;
            var shouldBuffer = this._v;
            var shouldEnd = true;

            if (data) {
                finalData = data;
                if ((globalData = data.$global)) {
                    finalData.$global = undefined;
                }
            } else {
                finalData = {};
            }

            if (out && out.A) {
                finalOut = out;
                shouldEnd = false;
                extend(out.global, globalData);
            } else if (typeof out == 'function') {
                finalOut = createOut(globalData);
                callback = out;
            } else {
                finalOut = createOut(
                    globalData, // global
                    out, // writer(AsyncStream) or parentNode(AsyncVDOMBuilder)
                    null, // state
                    shouldBuffer // ignored by AsyncVDOMBuilder
                );
            }

            if (callback) {
                finalOut
                    .on('finish', function() {
                        callback(null, finalOut.F());
                    })
                    .once('error', callback);
            }

            globalData = finalOut.global;

            globalData.template = globalData.template || this;

            return safeRender(render, finalData, finalOut, shouldEnd);
        }
    });
};

// helpers provide a core set of various utility methods
// that are available in every template



/**
 * Method is for internal usage only. This method
 * is invoked by code in a compiled Marko template and
 * it is used to create a new Template instance.
 * @private
 */
var t = function createTemplate(path) {
     return new Template(path);
};

function Template(path, func) {
    this.path = path;
    this._ = func;
    this.meta = undefined;
}

function createOut(globalData, parent, state) {
    return new AsyncVDOMBuilder_1(globalData, parent, state);
}

var Template_prototype = Template.prototype = {
    createOut: createOut
};

renderable(Template_prototype);

var Template_1 = Template;
var _ = createOut;

createOut_1.a(createOut);

var index$2 = {
	t: t,
	Template: Template_1,
	_: _
};

var vdom = index$2;

var events = new index$4();

var indexBrowser$2 = function load(templatePath) {
    throw Error('Not found: ' + templatePath);
};

// no-op in the browser, but enables extra features on the server

var createOut$2 = createOut_1;
var load = indexBrowser$2;
var events$2 = events;

var index$6 = {
	createOut: createOut$2,
	load: load,
	events: events$2
};

var listenerTracker = createCommonjsModule(function (module, exports) {
var INDEX_EVENT = 0;
var INDEX_USER_LISTENER = 1;
var INDEX_WRAPPED_LISTENER = 2;
var DESTROY = "destroy";

function isNonEventEmitter(target) {
  return !target.once;
}

function EventEmitterWrapper(target) {
    this._ = target;
    this.a = [];
    this.b = null;
}

EventEmitterWrapper.prototype = {
    c: function(test, testWrapped) {
        var target = this._;
        var listeners = this.a;

        this.a = listeners.filter(function(curListener) {
            var curEvent = curListener[INDEX_EVENT];
            var curListenerFunc = curListener[INDEX_USER_LISTENER];
            var curWrappedListenerFunc = curListener[INDEX_WRAPPED_LISTENER];

            if (testWrapped) {
                // If the user used `once` to attach an event listener then we had to
                // wrap their listener function with a new function that does some extra
                // cleanup to avoid a memory leak. If the `testWrapped` flag is set to true
                // then we are attempting to remove based on a function that we had to
                // wrap (not the user listener function)
                if (curWrappedListenerFunc && test(curEvent, curWrappedListenerFunc)) {
                    target.removeListener(curEvent, curWrappedListenerFunc);

                    return false;
                }
            } else if (test(curEvent, curListenerFunc)) {
                // If the listener function was wrapped due to it being a `once` listener
                // then we should remove from the target EventEmitter using wrapped
                // listener function. Otherwise, we remove the listener using the user-provided
                // listener function.
                target.removeListener(curEvent, curWrappedListenerFunc || curListenerFunc);

                return false;
            }

            return true;
        });

        // Fixes https://github.com/raptorjs/listener-tracker/issues/2
        // If all of the listeners stored with a wrapped EventEmitter
        // have been removed then we should unregister the wrapped
        // EventEmitter in the parent SubscriptionTracker
        var subscribeTo = this.b;

        if (!this.a.length && subscribeTo) {
            var self = this;
            var subscribeToList = subscribeTo.d;
            subscribeTo.d = subscribeToList.filter(function(cur) {
                return cur !== self;
            });
        }
    },

    on: function(event, listener) {
        this._.on(event, listener);
        this.a.push([event, listener]);
        return this;
    },

    once: function(event, listener) {
        var self = this;

        // Handling a `once` event listener is a little tricky since we need to also
        // do our own cleanup if the `once` event is emitted. Therefore, we need
        // to wrap the user's listener function with our own listener function.
        var wrappedListener = function() {
            self.c(function(event, listenerFunc) {
                return wrappedListener === listenerFunc;
            }, true /* We are removing the wrapped listener */);

            listener.apply(this, arguments);
        };

        this._.once(event, wrappedListener);
        this.a.push([event, listener, wrappedListener]);
        return this;
    },

    removeListener: function(event, listener) {
        if (typeof event === 'function') {
            listener = event;
            event = null;
        }

        if (listener && event) {
            this.c(function(curEvent, curListener) {
                return event === curEvent && listener === curListener;
            });
        } else if (listener) {
            this.c(function(curEvent, curListener) {
                return listener === curListener;
            });
        } else if (event) {
            this.removeAllListeners(event);
        }

        return this;
    },

    removeAllListeners: function(event) {

        var listeners = this.a;
        var target = this._;

        if (event) {
            this.c(function(curEvent, curListener) {
                return event === curEvent;
            });
        } else {
            for (var i = listeners.length - 1; i >= 0; i--) {
                var cur = listeners[i];
                target.removeListener(cur[INDEX_EVENT], cur[INDEX_USER_LISTENER]);
            }
            this.a.length = 0;
        }

        return this;
    }
};

function EventEmitterAdapter(target) {
    this._ = target;
}

EventEmitterAdapter.prototype = {
    on: function(event, listener) {
        this._.addEventListener(event, listener);
        return this;
    },

    once: function(event, listener) {
        var self = this;

        // need to save this so we can remove it below
        var onceListener = function() {
          self._.removeEventListener(event, onceListener);
          listener();
        };
        this._.addEventListener(event, onceListener);
        return this;
    },

    removeListener: function(event, listener) {
        this._.removeEventListener(event, listener);
        return this;
    }
};

function SubscriptionTracker() {
    this.d = [];
}

SubscriptionTracker.prototype = {

    subscribeTo: function(target, options) {
        var addDestroyListener = !options || options.addDestroyListener !== false;
        var wrapper;
        var nonEE;
        var subscribeToList = this.d;

        for (var i=0, len=subscribeToList.length; i<len; i++) {
            var cur = subscribeToList[i];
            if (cur._ === target) {
                wrapper = cur;
                break;
            }
        }

        if (!wrapper) {
            if (isNonEventEmitter(target)) {
              nonEE = new EventEmitterAdapter(target);
            }

            wrapper = new EventEmitterWrapper(nonEE || target);
            if (addDestroyListener && !nonEE) {
                wrapper.once(DESTROY, function() {
                    wrapper.removeAllListeners();

                    for (var i = subscribeToList.length - 1; i >= 0; i--) {
                        if (subscribeToList[i]._ === target) {
                            subscribeToList.splice(i, 1);
                            break;
                        }
                    }
                });
            }

            // Store a reference to the parent SubscriptionTracker so that we can do cleanup
            // if the EventEmitterWrapper instance becomes empty (i.e., no active listeners)
            wrapper.b = this;
            subscribeToList.push(wrapper);
        }

        return wrapper;
    },

    removeAllListeners: function(target, event) {
        var subscribeToList = this.d;
        var i;

        if (target) {
            for (i = subscribeToList.length - 1; i >= 0; i--) {
                var cur = subscribeToList[i];
                if (cur._ === target) {
                    cur.removeAllListeners(event);

                    if (!cur.a.length) {
                        // Do some cleanup if we removed all
                        // listeners for the target event emitter
                        subscribeToList.splice(i, 1);
                    }

                    break;
                }
            }
        } else {
            for (i = subscribeToList.length - 1; i >= 0; i--) {
                subscribeToList[i].removeAllListeners();
            }
            subscribeToList.length = 0;
        }
    }
};

exports = module.exports = SubscriptionTracker;

exports.wrap = function(targetEventEmitter) {
    var nonEE;
    var wrapper;

    if (isNonEventEmitter(targetEventEmitter)) {
      nonEE = new EventEmitterAdapter(targetEventEmitter);
    }

    wrapper = new EventEmitterWrapper(nonEE || targetEventEmitter);
    if (!nonEE) {
      // we don't set this for non EE types
      targetEventEmitter.once(DESTROY, function() {
          wrapper.a.length = 0;
      });
    }

    return wrapper;
};

exports.createTracker = function() {
    return new SubscriptionTracker();
};
});

var updatesScheduled = false;
var batchStack = []; // A stack of batched updates
var unbatchedQueue = []; // Used for scheduled batched updates

var win = window;
var setImmediate = win.setImmediate;

if (!setImmediate) {
    if (win.postMessage) {
        var queue = [];
        var messageName = 'si';
        win.addEventListener('message', function (event) {
            var source = event.source;
            if (source == win || !source && event.data === messageName) {
                event.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        setImmediate = function(fn) {
            queue.push(fn);
            win.postMessage(messageName, '*');
        };
    } else {
        setImmediate = setTimeout;
    }
}

/**
 * This function is called when we schedule the update of "unbatched"
 * updates to components.
 */
function updateUnbatchedComponents() {
    if (unbatchedQueue.length) {
        try {
            updateComponents(unbatchedQueue);
        } finally {
            // Reset the flag now that this scheduled batch update
            // is complete so that we can later schedule another
            // batched update if needed
            updatesScheduled = false;
        }
    }
}

function scheduleUpdates() {
    if (updatesScheduled) {
        // We have already scheduled a batched update for the
        // process.nextTick so nothing to do
        return;
    }

    updatesScheduled = true;

    setImmediate(updateUnbatchedComponents);
}

function updateComponents(queue) {
    // Loop over the components in the queue and update them.
    // NOTE: It is okay if the queue grows during the iteration
    //       since we will still get to them at the end
    for (var i=0; i<queue.length; i++) {
        var component = queue[i];
        component.am(); // Do the actual component update
    }

    // Clear out the queue by setting the length to zero
    queue.length = 0;
}

function batchUpdate(func) {
    // If the batched update stack is empty then this
    // is the outer batched update. After the outer
    // batched update completes we invoke the "afterUpdate"
    // event listeners.
    var batch = {
        an: null
    };

    batchStack.push(batch);

    try {
        func();
    } finally {
        try {
            // Update all of the components that where queued up
            // in this batch (if any)
            if (batch.an) {
                updateComponents(batch.an);
            }
        } finally {
            // Now that we have completed the update of all the components
            // in this batch we need to remove it off the top of the stack
            batchStack.length--;
        }
    }
}

function queueComponentUpdate(component) {
    var batchStackLen = batchStack.length;

    if (batchStackLen) {
        // When a batch update is started we push a new batch on to a stack.
        // If the stack has a non-zero length then we know that a batch has
        // been started so we can just queue the component on the top batch. When
        // the batch is ended this component will be updated.
        var batch = batchStack[batchStackLen-1];

        // We default the batch queue to null to avoid creating an Array instance
        // unnecessarily. If it is null then we create a new Array, otherwise
        // we push it onto the existing Array queue
        if (batch.an) {
            batch.an.push(component);
        } else {
            batch.an = [component];
        }
    } else {
        // We are not within a batched update. We need to schedule a batch update
        // for the process.nextTick (if that hasn't been done already) and we will
        // add the component to the unbatched queued
        scheduleUpdates();
        unbatchedQueue.push(component);
    }
}

var aa = queueComponentUpdate;
var ah = batchUpdate;

var updateManager = {
	aa: aa,
	ah: ah
};

var defaultDoc = typeof document == 'undefined' ? undefined : document;


var morphAttrs = VElement_1._e;

var ELEMENT_NODE = 1;
var TEXT_NODE = 3;
var COMMENT_NODE = 8;

function compareNodeNames(fromEl, toEl) {
    return fromEl.nodeName === toEl.Z;
}


function getElementById$2(doc, id) {
    return doc.getElementById(id);
}

function morphdom(
        fromNode,
        toNode,
        context,
        onNodeAdded,
        onBeforeElUpdated,
        onBeforeNodeDiscarded,
        onNodeDiscarded,
        onBeforeElChildrenUpdated
    ) {

    var doc = fromNode.ownerDocument || defaultDoc;

    // This object is used as a lookup to quickly find all keyed elements in the original DOM tree.
    var removalList = [];
    var foundKeys = {};

    function walkDiscardedChildNodes(node) {
        onNodeDiscarded(node);
        var curChild = node.firstChild;

        while (curChild) {
            walkDiscardedChildNodes(curChild);
            curChild = curChild.nextSibling;
        }
    }


    function addVirtualNode(vEl, parentEl) {
        var realEl = vEl.X(doc);

        if (parentEl) {
            parentEl.appendChild(realEl);
        }

        onNodeAdded(realEl, context);

        var vCurChild = vEl.firstChild;
        while (vCurChild) {
            var realCurChild = null;

            var key = vCurChild.id;
            if (key) {
                var unmatchedFromEl = getElementById$2(doc, key);
                if (unmatchedFromEl && compareNodeNames(vCurChild, unmatchedFromEl)) {
                    morphEl(unmatchedFromEl, vCurChild, false);
                    realEl.appendChild(realCurChild = unmatchedFromEl);
                }
            }

            if (!realCurChild) {
                addVirtualNode(vCurChild, realEl);
            }

            vCurChild = vCurChild.nextSibling;
        }

        if (vEl.Y === 1) {
            var elHandler = specialElHandlers[vEl.nodeName];
            if (elHandler !== undefined) {
                elHandler(realEl, vEl);
            }
        }

        return realEl;
    }

    function morphEl(fromEl, toEl, childrenOnly) {
        var toElKey = toEl.id;
        var nodeName = toEl.Z;

        if (childrenOnly === false) {
            if (toElKey) {
                // If an element with an ID is being morphed then it is will be in the final
                // DOM so clear it out of the saved elements collection
                foundKeys[toElKey] = true;
            }

            var constId = toEl._c;
            if (constId !== undefined) {
                var otherProps = fromEl._vprops;
                if (otherProps !== undefined && constId === otherProps.c) {
                    return;
                }
            }

            if (onBeforeElUpdated(fromEl, toElKey, context) === true) {
                return;
            }

            morphAttrs(fromEl, toEl);
        }


        if (onBeforeElChildrenUpdated(fromEl, toElKey, context) === true) {
            return;
        }

        if (nodeName !== 'TEXTAREA') {
            var curToNodeChild = toEl.firstChild;
            var curFromNodeChild = fromEl.firstChild;
            var curToNodeKey;
            var curFromNodeKey;

            var fromNextSibling;
            var toNextSibling;
            var matchingFromEl;

            outer: while (curToNodeChild) {
                toNextSibling = curToNodeChild.nextSibling;
                curToNodeKey = curToNodeChild.id;

                while (curFromNodeChild) {
                    fromNextSibling = curFromNodeChild.nextSibling;

                    curFromNodeKey = curFromNodeChild.id;

                    var curFromNodeType = curFromNodeChild.nodeType;

                    var isCompatible = undefined;

                    if (curFromNodeType === curToNodeChild.Y) {
                        if (curFromNodeType === ELEMENT_NODE) {
                            // Both nodes being compared are Element nodes

                            if (curToNodeKey) {
                                // The target node has a key so we want to match it up with the correct element
                                // in the original DOM tree
                                if (curToNodeKey !== curFromNodeKey) {
                                    // The current element in the original DOM tree does not have a matching key so
                                    // let's check our lookup to see if there is a matching element in the original
                                    // DOM tree
                                    if ((matchingFromEl = getElementById$2(doc, curToNodeKey))) {
                                        if (curFromNodeChild.nextSibling === matchingFromEl) {
                                            // Special case for single element removals. To avoid removing the original
                                            // DOM node out of the tree (since that can break CSS transitions, etc.),
                                            // we will instead discard the current node and wait until the next
                                            // iteration to properly match up the keyed target element with its matching
                                            // element in the original tree
                                            isCompatible = false;
                                        } else {
                                            // We found a matching keyed element somewhere in the original DOM tree.
                                            // Let's moving the original DOM node into the current position and morph
                                            // it.

                                            // NOTE: We use insertBefore instead of replaceChild because we want to go through
                                            // the `removeNode()` function for the node that is being discarded so that
                                            // all lifecycle hooks are correctly invoked


                                            fromEl.insertBefore(matchingFromEl, curFromNodeChild);

                                            var curToNodeChildNextSibling = curToNodeChild.nextSibling;
                                            if (curToNodeChildNextSibling && curToNodeChildNextSibling.id === curFromNodeKey) {
                                                fromNextSibling = curFromNodeChild;
                                            } else {
                                                fromNextSibling = curFromNodeChild.nextSibling;
                                                removalList.push(curFromNodeChild);
                                            }

                                            curFromNodeChild = matchingFromEl;
                                        }
                                    } else {
                                        // The nodes are not compatible since the "to" node has a key and there
                                        // is no matching keyed node in the source tree
                                        isCompatible = false;
                                    }
                                }
                            } else if (curFromNodeKey) {
                                // The original has a key
                                isCompatible = false;
                            }

                            isCompatible = isCompatible !== false && compareNodeNames(curFromNodeChild, curToNodeChild) === true;

                            if (isCompatible === true) {
                                // We found compatible DOM elements so transform
                                // the current "from" node to match the current
                                // target DOM node.
                                morphEl(curFromNodeChild, curToNodeChild, false);
                            }

                        } else if (curFromNodeType === TEXT_NODE || curFromNodeType === COMMENT_NODE) {
                            // Both nodes being compared are Text or Comment nodes
                            isCompatible = true;
                            // Simply update nodeValue on the original node to
                            // change the text value
                            curFromNodeChild.nodeValue = curToNodeChild.nodeValue;
                        }
                    }

                    if (isCompatible === true) {
                        // Advance both the "to" child and the "from" child since we found a match
                        curToNodeChild = toNextSibling;
                        curFromNodeChild = fromNextSibling;
                        continue outer;
                    }

                    // No compatible match so remove the old node from the DOM and continue trying to find a
                    // match in the original DOM. However, we only do this if the from node is not keyed
                    // since it is possible that a keyed node might match up with a node somewhere else in the
                    // target tree and we don't want to discard it just yet since it still might find a
                    // home in the final DOM tree. After everything is done we will remove any keyed nodes
                    // that didn't find a home
                    removalList.push(curFromNodeChild);

                    curFromNodeChild = fromNextSibling;
                }

                // If we got this far then we did not find a candidate match for
                // our "to node" and we exhausted all of the children "from"
                // nodes. Therefore, we will just append the current "to" node
                // to the end
                if (curToNodeKey && (matchingFromEl = getElementById$2(doc, curToNodeKey)) && compareNodeNames(matchingFromEl, curToNodeChild)) {
                    fromEl.appendChild(matchingFromEl);
                    morphEl(matchingFromEl, curToNodeChild, false);
                } else {
                    addVirtualNode(curToNodeChild, fromEl);
                }

                curToNodeChild = toNextSibling;
                curFromNodeChild = fromNextSibling;
            }

            // We have processed all of the "to nodes". If curFromNodeChild is
            // non-null then we still have some from nodes left over that need
            // to be removed
            while (curFromNodeChild) {
                removalList.push(curFromNodeChild);
                curFromNodeChild = curFromNodeChild.nextSibling;
            }
        }

        var specialElHandler = specialElHandlers[nodeName];
        if (specialElHandler) {
            specialElHandler(fromEl, toEl);
        }
    } // END: morphEl(...)

    var morphedNode = fromNode;
    var fromNodeType = morphedNode.nodeType;
    var toNodeType = toNode.Y;
    var morphChildrenOnly = false;
    var shouldMorphEl = true;
    var newNode;

    // Handle the case where we are given two DOM nodes that are not
    // compatible (e.g. <div> --> <span> or <div> --> TEXT)
    if (fromNodeType == ELEMENT_NODE) {
        if (toNodeType == ELEMENT_NODE) {
            if (!compareNodeNames(fromNode, toNode)) {
                newNode = toNode.X(doc);
                morphChildrenOnly = true;
                removalList.push(fromNode);
            }
        } else {
            // Going from an element node to a text or comment node
            removalList.push(fromNode);
            newNode = toNode.X(doc);
            shouldMorphEl = false;
        }
    } else if (fromNodeType == TEXT_NODE || fromNodeType == COMMENT_NODE) { // Text or comment node
        if (toNodeType == fromNodeType) {
            morphedNode.nodeValue = toNode.nodeValue;
            return morphedNode;
        } else {
            // Text node to something else
            removalList.push(fromNode);
            newNode = addVirtualNode(toNode);
            shouldMorphEl = false;
        }
    }

    if (shouldMorphEl === true) {
        morphEl(newNode || morphedNode, toNode, morphChildrenOnly);
    }

    if (newNode) {
        if (fromNode.parentNode) {
            fromNode.parentNode.replaceChild(newNode, fromNode);
        }
    }

    // We now need to loop over any keyed nodes that might need to be
    // removed. We only do the removal if we know that the keyed node
    // never found a match. When a keyed node is matched up we remove
    // it out of fromNodesLookup and we use fromNodesLookup to determine
    // if a keyed node has been matched up or not
    for (var i=0, len=removalList.length; i<len; i++) {
        var node = removalList[i];
        var key = node.id;
        if (!key || foundKeys[key] === undefined) {
            if (onBeforeNodeDiscarded(node) == false) {
                continue;
            }

            var parentNode = node.parentNode;
            if (parentNode) {
                parentNode.removeChild(node);
            }

            walkDiscardedChildNodes(node);
        }
    }

    return newNode || morphedNode;
}

var index$8 = morphdom;

var bubble = [
    /* Mouse Events */
    'click',
    'dblclick',
    'mousedown',
    'mouseup',
    // 'mouseover',
    // 'mousemove',
    // 'mouseout',
    'dragstart',
    'drag',
    // 'dragenter',
    // 'dragleave',
    // 'dragover',
    'drop',
    'dragend',

    /* Keyboard Events */
    'keydown',
    'keypress',
    'keyup',

    /* Form Events */
    'select',
    'change',
    'submit',
    'reset',
    'input',

    'attach', // Pseudo event supported by Marko
    'detach'  // Pseudo event supported by Marko

    // 'focus', <-- Does not bubble
    // 'blur', <-- Does not bubble
    // 'focusin', <-- Not supported in all browsers
    // 'focusout' <-- Not supported in all browsers
];

var runtimeId$1 = utilBrowser._n;
var componentLookup$2 = utilBrowser._o;
var getMarkoPropsFromEl$1 = utilBrowser._u;

var isArray = Array.isArray;

// We make our best effort to allow multiple marko runtimes to be loaded in the
// same window. Each marko runtime will get its own unique runtime ID.
var listenersAttachedKey = '$MED' + runtimeId$1;

function getEventFromEl(el, eventName) {
    var virtualProps = getMarkoPropsFromEl$1(el);
    var eventInfo = virtualProps[eventName];
    if (typeof eventInfo === 'string') {
        eventInfo = eventInfo.split(' ');
        if (eventInfo.length == 3) {
            eventInfo[2] = parseInt(eventInfo[2], 10);
        }
    }

    return eventInfo;
}

function delegateEvent(node, target, event) {
    var targetMethod = target[0];
    var targetComponentId = target[1];
    var extraArgs = target[2];

    var targetComponent = componentLookup$2[targetComponentId];

    if (!targetComponent) {
        return;
    }

    var targetFunc = targetComponent[targetMethod];
    if (!targetFunc) {
        throw Error('Method not found: ' + targetMethod);
    }

    if (extraArgs != null) {
        if (typeof extraArgs === 'number') {
            extraArgs = targetComponent._K[extraArgs];
            if (!isArray(extraArgs)) {
                extraArgs = [extraArgs];
            }
        }
    }

    // Invoke the component method
    if (extraArgs) {
        targetFunc.apply(targetComponent, extraArgs.concat(event, node));
    } else {
        targetFunc.call(targetComponent, event, node);
    }
}

function attachBubbleEventListeners(doc) {
    var body = doc.body;
    // Here's where we handle event delegation using our own mechanism
    // for delegating events. For each event that we have white-listed
    // as supporting bubble, we will attach a listener to the root
    // document.body element. When we get notified of a triggered event,
    // we again walk up the tree starting at the target associated
    // with the event to find any mappings for event. Each mapping
    // is from a DOM event type to a method of a component.
    bubble.forEach(function addBubbleHandler(eventType) {
        body.addEventListener(eventType, function(event) {
            var propagationStopped = false;

            // Monkey-patch to fix #97
            var oldStopPropagation = event.stopPropagation;

            event.stopPropagation = function() {
                oldStopPropagation.call(event);
                propagationStopped = true;
            };

            var curNode = event.target;
            if (!curNode) {
                return;
            }

            // Search up the tree looking DOM events mapped to target
            // component methods
            var propName = 'on' + eventType;
            var target;

            // Attributes will have the following form:
            // on<event_type>("<target_method>|<component_id>")

            do {
                if ((target = getEventFromEl(curNode, propName))) {
                    delegateEvent(curNode, target, event);

                    if (propagationStopped) {
                        break;
                    }
                }
            } while((curNode = curNode.parentNode) && curNode.getAttribute);
        });
    });
}

function noop() {}

var _G = noop;
var _D = noop;
var ao = delegateEvent;
var ap = getEventFromEl;

var aq = function(doc) {
    if (!doc[listenersAttachedKey]) {
        doc[listenersAttachedKey] = true;
        attachBubbleEventListeners(doc);
    }
};

var eventDelegation = {
	_G: _G,
	_D: _D,
	ao: ao,
	ap: ap,
	aq: aq
};

/* jshint newcap:false */




var componentLookup$1 = utilBrowser._o;
var emitLifecycleEvent$1 = utilBrowser._q;
var destroyComponentForEl$2 = utilBrowser._j;
var destroyElRecursive$2 = utilBrowser._k;
var getElementById$1 = utilBrowser._s;








var slice$1 = Array.prototype.slice;

var MORPHDOM_SKIP = true;

var COMPONENT_SUBSCRIBE_TO_OPTIONS;
var NON_COMPONENT_SUBSCRIBE_TO_OPTIONS = {
    addDestroyListener: false
};

var emit = index$4.prototype.emit;

function removeListener(removeEventListenerHandle) {
    removeEventListenerHandle();
}

function checkCompatibleComponent(componentsContext, el) {
    var component = el._w;
    while(component) {
        var id = component.id;
        var newComponentDef = componentsContext._z[id];
        if (newComponentDef && component._A == newComponentDef._h._A) {
            break;
        }

        var rootFor = component._l;
        if (rootFor)  {
            component = rootFor;
        } else {
            component._m();
            break;
        }
    }
}

function handleCustomEventWithMethodListener(component, targetMethodName, args, extraArgs) {
    // Remove the "eventType" argument
    args.push(component);

    if (extraArgs) {
        args = extraArgs.concat(args);
    }


    var targetComponent = componentLookup$1[component._B];
    var targetMethod = targetComponent[targetMethodName];
    if (!targetMethod) {
        throw Error('Method not found: ' + targetMethodName);
    }

    targetMethod.apply(targetComponent, args);
}

function getElIdHelper(component, componentElId, index) {
    var id = component.id;

    var elId = componentElId != null ? id + '-' + componentElId : id;

    if (index != null) {
        elId += '[' + index + ']';
    }

    return elId;
}

/**
 * This method is used to process "update_<stateName>" handler functions.
 * If all of the modified state properties have a user provided update handler
 * then a rerender will be bypassed and, instead, the DOM will be updated
 * looping over and invoking the custom update handlers.
 * @return {boolean} Returns true if if the DOM was updated. False, otherwise.
 */
function processUpdateHandlers(component, stateChanges, oldState) {
    var handlerMethod;
    var handlers;

    for (var propName in stateChanges) {
        if (stateChanges.hasOwnProperty(propName)) {
            var handlerMethodName = 'update_' + propName;

            handlerMethod = component[handlerMethodName];
            if (handlerMethod) {
                (handlers || (handlers=[])).push([propName, handlerMethod]);
            } else {
                // This state change does not have a state handler so return false
                // to force a rerender
                return;
            }
        }
    }

    // If we got here then all of the changed state properties have
    // an update handler or there are no state properties that actually
    // changed.
    if (handlers) {
        // Otherwise, there are handlers for all of the changed properties
        // so apply the updates using those handlers

        handlers.forEach(function(handler, i) {
            var propertyName = handler[0];
            handlerMethod = handler[1];

            var newValue = stateChanges[propertyName];
            var oldValue = oldState[propertyName];
            handlerMethod.call(component, newValue, oldValue);
        });

        emitLifecycleEvent$1(component, 'update');

        component._C();
    }

    return true;
}

function checkInputChanged(existingComponent, oldInput, newInput) {
    if (oldInput != newInput) {
        if (oldInput == null || newInput == null) {
            return true;
        }

        var oldKeys = Object.keys(oldInput);
        var newKeys = Object.keys(newInput);
        var len = oldKeys.length;
        if (len !== newKeys.length) {
            return true;
        }

        for (var i=0; i<len; i++) {
            var key = oldKeys[i];
            if (oldInput[key] !== newInput[key]) {
                return true;
            }
        }
    }

    return false;
}

function onNodeDiscarded(node) {
    if (node.nodeType === 1) {
        destroyComponentForEl$2(node);
    }
}

function onBeforeNodeDiscarded(node) {
    return eventDelegation._D(node);
}

function onBeforeElUpdated(fromEl, key, componentsContext) {
    if (componentsContext && key) {
        var preserved = componentsContext._E[key];

        if (preserved === true) {
            // Don't morph elements that are associated with components that are being
            // reused or elements that are being preserved. For components being reused,
            // the morphing will take place when the reused component updates.
            return MORPHDOM_SKIP;
        } else {
            // We may need to destroy a Component associated with the current element
            // if a new UI component was rendered to the same element and the types
            // do not match
            checkCompatibleComponent(componentsContext, fromEl);
        }
    }
}

function onBeforeElChildrenUpdated(el, key, componentsContext) {
    if (componentsContext && key) {
        var preserved = componentsContext._F[key];
        if (preserved === true) {
            // Don't morph the children since they are preserved
            return MORPHDOM_SKIP;
        }
    }
}

function onNodeAdded(node, componentsContext) {
    eventDelegation._G(node, componentsContext._g);
}

var componentProto;

/**
 * Base component type.
 *
 * NOTE: Any methods that are prefixed with an underscore should be considered private!
 */
function Component(id) {
    index$4.call(this);
    this.id = id;
    this.el = null;
    this.v = null;
    this._H = null;
    this._I = null;
    this._J = null;
    this._K = null;
    this._L = null;
    this._B = null;
    this._M = null;
    this._N = undefined;

    this._O = false;
    this._P = false;
    this._Q = false;
    this._R = false;

    this.B = undefined;
}

Component.prototype = componentProto = {
    _S: true,

    subscribeTo: function(target) {
        if (!target) {
            throw TypeError();
        }

        var subscriptions = this._I || (this._I = new listenerTracker());

        var subscribeToOptions = target._S ?
            COMPONENT_SUBSCRIBE_TO_OPTIONS :
            NON_COMPONENT_SUBSCRIBE_TO_OPTIONS;

        return subscriptions.subscribeTo(target, subscribeToOptions);
    },

    emit: function(eventType) {
        var customEvents = this._L;
        var target;

        if (customEvents && (target = customEvents[eventType])) {
            var targetMethodName = target[0];
            var extraArgs = target[1];
            var args = slice$1.call(arguments, 1);

            handleCustomEventWithMethodListener(this, targetMethodName, args, extraArgs);
        }

        if (this.listenerCount(eventType)) {
            return emit.apply(this, arguments);
        }
    },
    getElId: function (componentElId, index) {
        return getElIdHelper(this, componentElId, index);
    },
    getEl: function (componentElId, index) {
        var doc = this.B;

        if (componentElId != null) {
            return getElementById$1(doc, getElIdHelper(this, componentElId, index));
        } else {
            return this.el || getElementById$1(doc, getElIdHelper(this));
        }
    },
    getEls: function(id) {
        var els = [];
        var i = 0;
        var el;
        while((el = this.getEl(id, i))) {
            els.push(el);
            i++;
        }
        return els;
    },
    getComponent: function(id, index) {
        return componentLookup$1[getElIdHelper(this, id, index)];
    },
    getComponents: function(id) {
        var components = [];
        var i = 0;
        var component;
        while((component = componentLookup$1[getElIdHelper(this, id, i)])) {
            components.push(component);
            i++;
        }
        return components;
    },
    destroy: function() {
        if (this._O) {
            return;
        }

        var els = this.els;

        this._m();

        var rootComponents = this._T;
        if (rootComponents) {
            rootComponents.forEach(function(rootComponent) {
                rootComponent._U();
            });
        }

        els.forEach(function(el) {
            destroyElRecursive$2(el);

            var parentNode = el.parentNode;
            if (parentNode) {
                parentNode.removeChild(el);
            }
        });
    },

    _m: function() {
        if (this._O) {
            return;
        }

        emitLifecycleEvent$1(this, 'destroy');
        this._O = true;

        this.el = null;

        // Unsubscribe from all DOM events
        this._V();

        var subscriptions = this._I;
        if (subscriptions) {
            subscriptions.removeAllListeners();
            this._I = null;
        }

        delete componentLookup$1[this.id];
    },

    isDestroyed: function() {
        return this._O;
    },
    get state() {
        return this.v;
    },
    set state(newState) {
        var state = this.v;
        if (!state && !newState) {
            return;
        }

        if (!state) {
            state = this.v = new this._W(this);
        }

        state._X(newState || {});

        if (state._Q) {
            this._Y();
        }

        if (!newState) {
            this.v = null;
        }
    },
    setState: function(name, value) {
        var state = this.v;

        if (typeof name == 'object') {
            // Merge in the new state with the old state
            var newState = name;
            for (var k in newState) {
                if (newState.hasOwnProperty(k)) {
                    state._Z(k, newState[k], true /* ensure:true */);
                }
            }
        } else {
            state._Z(name, value, true /* ensure:true */);
        }
    },

    setStateDirty: function(name, value) {
        var state = this.v;

        if (arguments.length == 1) {
            value = state[name];
        }

        state._Z(name, value, true /* ensure:true */, true /* forceDirty:true */);
    },

    replaceState: function(newState) {
        this.v._X(newState);
    },

    get input() {
        return this._N;
    },
    set input(newInput) {
        if (this._R) {
            this._N = newInput;
        } else {
            this.a_(newInput);
        }
    },

    a_: function(newInput, onInput, out) {
        onInput = onInput || this.onInput;
        var updatedInput;

        var oldInput = this._N;
        this._N = undefined;

        if (onInput) {
            // We need to set a flag to preview `this.input = foo` inside
            // onInput causing infinite recursion
            this._R = true;
            updatedInput = onInput.call(this, newInput || {}, out);
            this._R = false;
        }

        newInput = this._M = updatedInput || newInput;

        if ((this._Q = checkInputChanged(this, oldInput, newInput))) {
            this._Y();
        }

        if (this._N === undefined) {
            this._N = newInput;
        }

        return newInput;
    },

    forceUpdate: function() {
        this._Q = true;
        this._Y();
    },

    _Y: function() {
        if (!this._P) {
            updateManager.aa(this);
        }
    },

    update: function() {
        if (this._O === true || this.ab === false) {
            return;
        }

        var input = this._N;
        var state = this.v;

        if (this._Q === false && state !== null && state._Q === true) {
            if (processUpdateHandlers(this, state.ac, state.ad, state)) {
                state._Q = false;
            }
        }

        if (this.ab === true) {
            // The UI component is still dirty after process state handlers
            // then we should rerender

            if (this.shouldUpdate(input, state) !== false) {
                this.ae();
            }
        }

        this._C();
    },


    get ab() {
        return this._Q === true || (this.v !== null && this.v._Q === true);
    },

    _C: function() {
        this._Q = false;
        this._P = false;
        this._M = null;
        var state = this.v;
        if (state) {
            state._C();
        }
    },

    shouldUpdate: function(newState, newProps) {
        return true;
    },

    _q: function(eventType, eventArg1, eventArg2) {
        emitLifecycleEvent$1(this, eventType, eventArg1, eventArg2);
    },

    ae: function(input) {
        if (input) {
            this.input = input;
        }

        var self = this;
        var renderer = self.af;

        if (!renderer) {
            throw TypeError();
        }

        var globalData = {
            $w: self
        };

        var fromEls = self.ag({});
        var doc = self.B;
        input = this._M || this._N;

        updateManager.ah(function() {
            var createOut = renderer.createOut || index$6.createOut;
            var out = createOut(globalData);
            out.sync();
            out.B = self.B;
            renderer(input, out);
            var result = new RenderResult_1(out);
            var targetNode = out.H();

            var componentsContext = out.global.components;

            var fromEl;

            var targetEl = targetNode.firstChild;
            while(targetEl) {
                var id = targetEl.id;

                if (id) {
                    fromEl = fromEls[id];
                    if (fromEl) {
                        index$8(
                            fromEl,
                            targetEl,
                            componentsContext,
                            onNodeAdded,
                            onBeforeElUpdated,
                            onBeforeNodeDiscarded,
                            onNodeDiscarded,
                            onBeforeElChildrenUpdated);
                    }
                }

                targetEl = targetEl.nextSibling;
            }

            result.afterInsert(doc);

            out.emit('ai');
        });

        this._C();
    },

    ag: function(rootEls) {
        var i, len;

        var componentEls = this.els;

        for (i=0, len=componentEls.length; i<len; i++) {
            var componentEl = componentEls[i];
            rootEls[componentEl.id] = componentEl;
        }

        var rootComponents = this._T;
        if (rootComponents) {
            for (i=0, len=rootComponents.length; i<len; i++) {
                var rootComponent = rootComponents[i];
                rootComponent.ag(rootEls);
            }
        }

        return rootEls;
    },

    _V: function() {
        var eventListenerHandles = this._J;
        if (eventListenerHandles) {
            eventListenerHandles.forEach(removeListener);
            this._J = null;
        }
    },

    get aj() {
        var state = this.v;
        return state && state.ak;
    },

    al: function(customEvents, scope) {
        var finalCustomEvents = this._L = {};
        this._B = scope;

        customEvents.forEach(function(customEvent) {
            var eventType = customEvent[0];
            var targetMethodName = customEvent[1];
            var extraArgs = customEvent[2];

            finalCustomEvents[eventType] = [targetMethodName, extraArgs];
        });
    }
};

componentProto.elId = componentProto.getElId;
componentProto.am = componentProto.update;
componentProto._U = componentProto.destroy;

// Add all of the following DOM methods to Component.prototype:
// - appendTo(referenceEl)
// - replace(referenceEl)
// - replaceChildrenOf(referenceEl)
// - insertBefore(referenceEl)
// - insertAfter(referenceEl)
// - prependTo(referenceEl)
domInsert(
    componentProto,
    function getEl(component) {
        var els = this.els;
        var elCount = els.length;
        if (elCount > 1) {
            var fragment = component.B.createDocumentFragment();
            els.forEach(function(el) {
                fragment.appendChild(el);
            });
            return fragment;
        } else {
            return els[0];
        }
    },
    function afterInsert(component) {
        return component;
    });

inherit_1(Component, index$4);

var Component_1 = Component;

var isArray$1 = Array.isArray;

function resolve(object, path, len) {
    var current = object;
    for (var i=0; i<len; i++) {
        current = current[path[i]];
    }

    return current;
}

function resolveType(info) {
    if (info.type === 'Date') {
        return new Date(info.value);
    } else {
        throw new Error('Bad type');
    }
}

var finalize$2 = function finalize(outer) {
    if (!outer) {
        return outer;
    }

    var assignments = outer.$$;
    if (assignments) {
        var object = outer.o;
        var len;

        if (assignments && (len=assignments.length)) {
            for (var i=0; i<len; i++) {
                var assignment = assignments[i];

                var rhs = assignment.r;
                var rhsValue;

                if (isArray$1(rhs)) {
                    rhsValue = resolve(object, rhs, rhs.length);
                } else {
                    rhsValue = resolveType(rhs);
                }

                var lhs = assignment.l;
                var lhsLast = lhs.length-1;

                if (lhsLast === -1) {
                    object = outer.o = rhsValue;
                    break;
                } else {
                    var lhsParent = resolve(object, lhs, lhsLast);
                    lhsParent[lhs[lhsLast]] = rhsValue;
                }
            }
        }

        assignments.length = 0; // Assignments have been applied, do not reapply

        return object == null ? null : object;
    } else {
        return outer;
    }

};

var finalize = finalize$2;

var REPEATED_ID_KEY = '$rep';

var nextRepeatedId = function nextRepeatedId(out, parentId, id) {
    var nextIdLookup = out.global[REPEATED_ID_KEY] || (out.global[REPEATED_ID_KEY] = {});

    var indexLookupKey = parentId + '-' + id;
    var currentIndex = nextIdLookup[indexLookupKey];
    if (currentIndex == null) {
        currentIndex = nextIdLookup[indexLookupKey] = 0;
    } else {
        currentIndex = ++nextIdLookup[indexLookupKey];
    }

    return indexLookupKey.slice(0, -2) + '[' + currentIndex + ']';
};

var loadComponent = function load(typeName) {
    throw new Error('Not found: ' + typeName);
};

function ensure(state, propertyName) {
    var proto = state.constructor.prototype;
    if (!(propertyName in proto)) {
        Object.defineProperty(proto, propertyName, {
            get: function() {
                return this.ak[propertyName];
            },
            set: function(value) {
                this._Z(propertyName, value, false /* ensure:false */);
            }
        });
    }
}

function State$1(component) {
    this._h = component;
    this.ak = {};

    this._Q = false;
    this.ad = null;
    this.ac = null;
    this.aD = null; // An object that we use to keep tracking of state properties that were forced to be dirty

    Object.seal(this);
}

State$1.prototype = {
    _C: function() {
        var self = this;

        self._Q = false;
        self.ad = null;
        self.ac = null;
        self.aD = null;
    },

    _X: function(newState) {
        var state = this;
        var key;

        var rawState = this.ak;

        for (key in rawState) {
            if (!(key in newState)) {
                state._Z(key, undefined, false /* ensure:false */, false /* forceDirty:false */);
            }
        }

        for (key in newState) {
            state._Z(key, newState[key], true /* ensure:true */, false /* forceDirty:false */);
        }
    },
    _Z: function(name, value, shouldEnsure, forceDirty) {
        var rawState = this.ak;

        if (shouldEnsure) {
            ensure(this, name);
        }

        if (forceDirty) {
            var forcedDirtyState = this.aD || (this.aD = {});
            forcedDirtyState[name] = true;
        } else if (rawState[name] === value) {
            return;
        }

        if (!this._Q) {
            // This is the first time we are modifying the component state
            // so introduce some properties to do some tracking of
            // changes to the state
            this._Q = true; // Mark the component state as dirty (i.e. modified)
            this.ad = rawState;
            this.ak = rawState = extend({}, rawState);
            this.ac = {};
            this._h._Y();
        }

        this.ac[name] = value;

        if (value === undefined) {
            // Don't store state properties with an undefined or null value
            delete rawState[name];
        } else {
            // Otherwise, store the new value in the component state
            rawState[name] = value;
        }
    },
    toJSON: function() {
        return this.ak;
    }
};

var State_1 = State$1;

/* jshint newcap:false */





var defineComponent = function defineComponent(def, renderer) {
    if (def._S) {
        return def;
    }

    var ComponentClass;
    var proto;

    var type = typeof def;

    if (type == 'function') {
        ComponentClass = def;
        proto = ComponentClass.prototype;
    } else if (type == 'object') {
        ComponentClass = function() {};
        proto = ComponentClass.prototype = def;
    } else {
        throw TypeError();
    }

    // We don't use the constructor provided by the user
    // since we don't invoke their constructor until
    // we have had a chance to do our own initialization.
    // Instead, we store their constructor in the "initComponent"
    // property and that method gets called later inside
    // init-components-browser.js
    function Component(id) {
        Component_1.call(this, id);
    }

    if (!proto._S) {
        // Inherit from Component if they didn't already
        inherit_1(ComponentClass, Component_1);
    }

    // The same prototype will be used by our constructor after
    // we he have set up the prototype chain using the inherit function
    proto = Component.prototype = ComponentClass.prototype;

    // proto.constructor = def.constructor = Component;

    // Set a flag on the constructor function to make it clear this is
    // a component so that we can short-circuit this work later
    Component._S = true;

    function State(component) { State_1.call(this, component); }
    inherit_1(State, State_1);
    proto._W = State;
    proto.af = renderer;

    return Component;
};

var registered = {};
var loaded = {};
var componentTypes = {};

function register(typeName, def) {
    // We do this to kick off registering of nested components
    // but we don't use the return value just yet since there
    // is a good chance that it resulted in a circular dependency
    def();

    registered[typeName] = def;
    delete loaded[typeName];
    delete componentTypes[typeName];
    return typeName;
}

function load$1(typeName) {
    var target = loaded[typeName];
    if (!target) {
        target = registered[typeName];

        if (target) {
            target = target();
        } else {
            target = loadComponent(typeName); // Assume the typeName has been fully resolved already
        }

        if (!target) {
            throw Error('Not found: ' + typeName);
        }

        loaded[typeName] = target;
    }

    return target;
}

function getComponentClass(typeName) {
    var ComponentClass = componentTypes[typeName];

    if (ComponentClass) {
        return ComponentClass;
    }

    ComponentClass = load$1(typeName);

    ComponentClass = ComponentClass.Component || ComponentClass;

    if (!ComponentClass._S) {
        ComponentClass = defineComponent(ComponentClass, ComponentClass.renderer);
    }

    // Make the component "type" accessible on each component instance
    ComponentClass.prototype._A = typeName;

    componentTypes[typeName] = ComponentClass;

    return ComponentClass;
}

function createComponent(typeName, id) {
    var ComponentClass = getComponentClass(typeName);
    return new ComponentClass(id);
}

var _x = register;
var aC = createComponent;

var registryBrowser = {
	_x: _x,
	aC: aC
};

var repeatedRegExp = /\[\]$/;

var nextComponentId$1 = utilBrowser._r;
var attachBubblingEvent$1 = utilBrowser._t;




/**
 * A ComponentDef is used to hold the metadata collected at runtime for
 * a single component and this information is used to instantiate the component
 * later (after the rendered HTML has been added to the DOM)
 */
function ComponentDef(component, componentId, out, componentStack, componentStackLen) {
    this._g = out; // The AsyncWriter that this component is associated with
    this.aw = componentStack;
    this.ax = componentStackLen;
    this._h = component;
    this.id = componentId;

    this._H =  null;            // IDs of root elements if there are multiple root elements
    this.at = null;          // An array of nested ComponentDef instances
    this.ar = null;         // An array of DOM events that need to be added (in sets of three)
    this._K = null; // Used to keep track of bubbling DOM events for components rendered on the server

    this.as = false;

    this.ay = 0; // The unique integer to use for the next scoped ID
}

ComponentDef.prototype = {
    az: function() {
        this.aw.length = this.ax;
    },

    /**
     * Register a nested component for this component. We maintain a tree of components
     * so that we can instantiate nested components before their parents.
     */
    aA: function (componentDef) {
        var children = this.at;

        if (children) {
            children.push(componentDef);
        } else {
            this.at = [componentDef];
        }
    },
    /**
     * This helper method generates a unique and fully qualified DOM element ID
     * that is unique within the scope of the current component. This method prefixes
     * the the nestedId with the ID of the current component. If nestedId ends
     * with `[]` then it is treated as a repeated ID and we will generate
     * an ID with the current index for the current nestedId.
     * (e.g. "myParentId-foo[0]", "myParentId-foo[1]", etc.)
     */
    elId: function (nestedId) {
        var id = this.id;
        if (nestedId == null) {
            return id;
        } else {
            if (typeof nestedId == 'string' && repeatedRegExp.test(nestedId)) {
                return nextRepeatedId(this._g, id, nestedId);
            } else {
                return id + '-' + nestedId;
            }
        }
    },
    /**
     * Registers a DOM event for a nested HTML element associated with the
     * component. This is only done for non-bubbling events that require
     * direct event listeners to be added.
     * @param  {String} type The DOM event type ("mouseover", "mousemove", etc.)
     * @param  {String} targetMethod The name of the method to invoke on the scoped component
     * @param  {String} elId The DOM element ID of the DOM element that the event listener needs to be added too
     */
     e: function(type, targetMethod, elId, extraArgs) {
        if (targetMethod) {
            // The event handler method is allowed to be conditional. At render time if the target
            // method is null then we do not attach any direct event listeners.
            (this.ar || (this.ar = [])).push([
                type,
                targetMethod,
                elId,
                extraArgs]);
        }
    },
    /**
     * Returns the next auto generated unique ID for a nested DOM element or nested DOM component
     */
    aB: function() {
        var id = this.id;

        return id ?
            id + '-c' + (this.ay++) :
            nextComponentId$1(this._g);
    },

    d: function(handlerMethodName, extraArgs) {
        return attachBubblingEvent$1(this, handlerMethodName, extraArgs);
    }
};

ComponentDef.au = function(o, types) {
    var id        = o[0];
    var typeName  = types[o[1]];
    var input     = o[2];
    var extra     = o[3];

    var state = extra.s;
    var componentProps = extra.w;

    var component = typeName /* legacy */ && registryBrowser.aC(typeName, id);

    if (extra.b) {
        component._K = extra.b;
    }

    // Preview newly created component from being queued for update since we area
    // just building it from the server info
    component._P = true;

    if (state) {
        var undefinedPropNames = extra.u;
        if (undefinedPropNames) {
            undefinedPropNames.forEach(function(undefinedPropName) {
                state[undefinedPropName] = undefined;
            });
        }
        // We go through the setter here so that we convert the state object
        // to an instance of `State`
        component.state = state;
    }

    component._N = input;

    if (componentProps) {
        extend(component, componentProps);
    }

    var scope = extra.p;
    var customEvents = extra.e;
    if (customEvents) {
        component.al(customEvents, scope);
    }

    return {
        _h: component,
        _H: extra.r,
        ar: extra.d
    };
};

var ComponentDef_1 = ComponentDef;

var win$1 = window;
var defaultDocument$3 = document;


var componentLookup$3 = utilBrowser._o;
var getElementById$3 = utilBrowser._s;

// var extend = require('raptor-util/extend');
// var registry = require('./registry');

function invokeComponentEventHandler(component, targetMethodName, args) {
    var method = component[targetMethodName];
    if (!method) {
        throw Error('Method not found: ' + targetMethodName);
    }

    method.apply(component, args);
}

function addEventListenerHelper(el, eventType, listener) {
    el.addEventListener(eventType, listener, false);
    return function remove() {
        el.removeEventListener(eventType, listener);
    };
}

function addDOMEventListeners(component, el, eventType, targetMethodName, extraArgs, handles) {
    var removeListener = addEventListenerHelper(el, eventType, function(event) {
        var args = [event, el];
        if (extraArgs) {
            args = extraArgs.concat(args);
        }

        invokeComponentEventHandler(component, targetMethodName, args);
    });
    handles.push(removeListener);
}

function initComponent(componentDef, doc) {
    var component = componentDef._h;

    if (!component || !component._S) {
        return; // legacy
    }

    var domEvents = componentDef.ar;

    component._C();
    component.B = doc;

    var isExisting = componentDef.as;
    var id = component.id;

    var rootIds = componentDef._H;

    if (rootIds) {
        var rootComponents;

        var els = [];

        rootIds.forEach(function(rootId) {
            var nestedId = id + '-' + rootId;
            var rootComponent = componentLookup$3[nestedId];
            if (rootComponent) {
                rootComponent._l = component;
                if (rootComponents) {
                    rootComponents.push(rootComponent);
                } else {
                    rootComponents = component._T = [rootComponent];
                }
            } else {
                var rootEl = getElementById$3(doc, nestedId);
                if (rootEl) {
                    rootEl._w = component;
                    els.push(rootEl);
                }
            }
        });

        component.el = els[0];
        component.els = els;
        componentLookup$3[id] = component;
    } else if (!isExisting) {
        var el = getElementById$3(doc, id);
        el._w = component;
        component.el = el;
        component.els = [el];
        componentLookup$3[id] = component;
    }

    if (isExisting) {
        component._V();
    }

    if (domEvents) {
        var eventListenerHandles = [];

        domEvents.forEach(function(domEventArgs) {
            // The event mapping is for a direct DOM event (not a custom event and not for bubblign dom events)

            var eventType = domEventArgs[0];
            var targetMethodName = domEventArgs[1];
            var eventEl = getElementById$3(doc, domEventArgs[2]);
            var extraArgs = domEventArgs[3];

            addDOMEventListeners(component, eventEl, eventType, targetMethodName, extraArgs, eventListenerHandles);
        });

        if (eventListenerHandles.length) {
            component._J = eventListenerHandles;
        }
    }

    if (isExisting) {
        component._q('update');
    } else {
        events.emit('mountComponent', component);
        component._q('mount');
    }
}

/**
 * This method is used to initialized components associated with UI components
 * rendered in the browser. While rendering UI components a "components context"
 * is added to the rendering context to keep up with which components are rendered.
 * When ready, the components can then be initialized by walking the component tree
 * in the components context (nested components are initialized before ancestor components).
 * @param  {Array<marko-components/lib/ComponentDef>} componentDefs An array of ComponentDef instances
 */
function initClientRendered(componentDefs, doc) {
    // Ensure that event handlers to handle delegating events are
    // always attached before initializing any components
    eventDelegation.aq(doc);

    doc = doc || defaultDocument$3;
    for (var i=0,len=componentDefs.length; i<len; i++) {
        var componentDef = componentDefs[i];

        if (componentDef.at) {
            initClientRendered(componentDef.at, doc);
        }

        initComponent(
            componentDef,
            doc);
    }
}

/**
 * This method initializes all components that were rendered on the server by iterating over all
 * of the component IDs.
 */
function initServerRendered(renderedComponents, doc) {
    if (!renderedComponents) {
        renderedComponents = win$1.$components;

        if (renderedComponents) {
            if (renderedComponents.forEach) {
                renderedComponents.forEach(function(renderedComponent) {
                    initServerRendered(renderedComponent, doc);
                });
            }
        } else {
            win$1.$components = {
                concat: initServerRendered
            };
        }
        return;
    }
    // Ensure that event handlers to handle delegating events are
    // always attached before initializing any components
    eventDelegation.aq(doc || defaultDocument$3);

    renderedComponents = finalize(renderedComponents);

    var componentDefs = renderedComponents.w;
    var typesArray = renderedComponents.t;

    componentDefs.forEach(function(componentDef) {
        componentDef = ComponentDef_1.au(componentDef, typesArray);
        initComponent(componentDef, doc || defaultDocument$3);
    });
}

var av = initClientRendered;
var _w = initServerRendered;

var initComponentsBrowser = {
	av: av,
	_w: _w
};

var EMPTY_OBJECT$2 = {};

function ComponentsContext(out, root) {
    if (!root) {
        root = new ComponentDef_1(null, null, out);
    }

    this._g = out;
    this.aw = [root];
    this._E = EMPTY_OBJECT$2;
    this._F = EMPTY_OBJECT$2;
    this._z = {};
}

ComponentsContext.prototype = {
    get _f() {
        return this.aw[0].at;
    },

    aI: function(component) {
        var self = this;
        var componentStack = self.aw;
        var origLength = componentStack.length;
        var parent = componentStack[origLength - 1];

        var componentId = component.id;

        if (!componentId) {
            componentId = component.id = parent.aB();
        }

        var componentDef = new ComponentDef_1(component, componentId, this._g, componentStack, origLength);
        this._z[componentId] = componentDef;
        parent.aA(componentDef);
        componentStack.push(componentDef);

        return componentDef;
    },
    aM: function () {
        this.aw = [new ComponentDef_1(null /* id */, this._g)];
    },
    _i: function (doc) {
        var componentDefs = this._f;
        if (componentDefs) {
            initComponentsBrowser.av(componentDefs, doc);
            this.aM();
        }
    },
    _r: function() {
        var componentStack = this.aw;
        var parent = componentStack[componentStack.length - 1];
        return parent.aB();
    },
    aE: function(elId, bodyOnly) {
        var preserved = bodyOnly === true ? this._F : this._E;
        if (preserved === EMPTY_OBJECT$2) {
            if (bodyOnly === true) {
                preserved = this._F = {};
            } else {
                preserved = this._E = {};
            }
        }
        preserved[elId] = true;
    }
};

ComponentsContext.aF = function (out) {
    var global = out.global;

    return out.data.components ||
        global.components ||
        (global.components = new ComponentsContext(out));
};

var ComponentsContext_1 = ComponentsContext;

var componentLookup$4 = utilBrowser._o;
var emitLifecycleEvent$2 = utilBrowser._q;

var repeatedRegExp$1 = /\[\]$/;




var COMPONENT_BEGIN_ASYNC_ADDED_KEY = '$wa';

function resolveComponentKey(out, key, scope) {
    if (key[0] == '#') {
        return key.substring(1);
    } else {
        var resolvedId;

        if (repeatedRegExp$1.test(key)) {
            resolvedId = nextRepeatedId(out, scope, key);
        } else {
            resolvedId = scope + '-' + key;
        }

        return resolvedId;
    }
}

function preserveComponentEls(existingComponent, out, componentsContext) {
    var rootEls = existingComponent.ag({});

    for (var elId in rootEls) {
        var el = rootEls[elId];

        // We put a placeholder element in the output stream to ensure that the existing
        // DOM node is matched up correctly when using morphdom.
        out.element(el.tagName, { id: elId });

        componentsContext.aE(elId); // Mark the element as being preserved (for morphdom)
    }

    existingComponent._C(); // The component is no longer dirty so reset internal flags
    return true;
}

function handleBeginAsync(event) {
    var parentOut = event.parentOut;
    var asyncOut = event.out;
    var componentsContext = asyncOut.global.components;
    var componentStack;

    if (componentsContext && (componentStack = componentsContext.aw)) {
        // All of the components in this async block should be
        // initialized after the components in the parent. Therefore,
        // we will create a new ComponentsContext for the nested
        // async block and will create a new component stack where the current
        // component in the parent block is the only component in the nested
        // stack (to begin with). This will result in top-level components
        // of the async block being added as children of the component in the
        // parent block.
        var nestedComponentsContext = new ComponentsContext_1(asyncOut, componentStack[componentStack.length-1]);
        asyncOut.data.components = nestedComponentsContext;
    }
    asyncOut.$c = parentOut.$c;
}

function createRendererFunc(templateRenderFunc, componentProps, renderingLogic) {
    renderingLogic = renderingLogic || {};
    var onInput = renderingLogic.onInput;
    var typeName = componentProps.type;
    var roots = componentProps.roots;
    var assignedId = componentProps.id;
    var split = componentProps.split;

    return function renderer(input, out) {
        var outGlobal = out.global;

        if (!out.isSync()) {
            if (!outGlobal[COMPONENT_BEGIN_ASYNC_ADDED_KEY]) {
                outGlobal[COMPONENT_BEGIN_ASYNC_ADDED_KEY] = true;
                out.on('beginAsync', handleBeginAsync);
            }
        }

        var component = outGlobal.$w;
        var isRerender = component !== undefined;
        var id = assignedId;
        var isExisting;
        var customEvents;
        var scope;

        if (component) {
            id = component.id;
            isExisting = true;
            outGlobal.$w = null;
        } else {
            var componentArgs = out.$c;

            if (componentArgs) {
                out.$c = null;

                scope = componentArgs[0];

                if (scope) {
                    scope = scope.id;
                }

                var key = componentArgs[1];
                if (key != null) {
                    key = key.toString();
                }
                id = id || resolveComponentKey(out, key, scope);
                customEvents = componentArgs[2];
            }
        }

        var componentsContext = ComponentsContext_1.aF(out);
        id = id || componentsContext._r();

        if (registryBrowser.aG) {
            component = registryBrowser.aC(
                renderingLogic,
                id,
                input,
                out,
                typeName,
                customEvents,
                scope);
            input = component.aH;
            component.aH = undefined; // We don't want aH to be serialized to the browser
        } else {
            if (!component) {
                if (isRerender) {
                    // Look in in the DOM to see if a component with the same ID and type already exists.
                    component = componentLookup$4[id];
                    if (component && component._A !== typeName) {
                        component = undefined;
                    }
                }

                if (component) {
                    isExisting = true;
                } else {
                    isExisting = false;
                    // We need to create a new instance of the component
                    component = registryBrowser.aC(typeName, id);

                    if (split) {
                        split = false;

                        var renderingLogicProps = typeof renderingLogic == 'function' ?
                            renderingLogic.prototype :
                            renderingLogic;

                        copyProps(renderingLogicProps, component.constructor.prototype);
                    }
                }

                // Set this flag to prevent the component from being queued for update
                // based on the new input. The component is about to be rerendered
                // so we don't want to queue it up as a result of calling `setInput()`
                component._P = true;

                if (customEvents !== undefined) {
                    component.al(customEvents, scope);
                }


                if (isExisting === false) {
                    emitLifecycleEvent$2(component, 'create', input, out);
                }

                input = component.a_(input, onInput, out);

                if (isExisting === true) {
                    if (component.ab === false || component.shouldUpdate(input, component.v) === false) {
                        preserveComponentEls(component, out, componentsContext);
                        return;
                    }
                }
            }

            emitLifecycleEvent$2(component, 'render', out);
        }

        var componentDef = componentsContext.aI(component);
        componentDef._H = roots;
        componentDef.as = isExisting;

        // Render the template associated with the component using the final template
        // data that we constructed
        templateRenderFunc(input, out, componentDef, component, component.aj);

        componentDef.az();
    };
}

var renderer = createRendererFunc;

// exports used by the legacy renderer
createRendererFunc.aJ = resolveComponentKey;
createRendererFunc.aK = preserveComponentEls;
createRendererFunc.aL = handleBeginAsync;

var indexBrowser = createCommonjsModule(function (module, exports) {
function onInitComponent(listener) {
    events.on('initComponent', listener);
}

exports.onInitComponent = onInitComponent;
exports.Component = Component_1;
exports.getComponentForEl = utilBrowser._p;
exports.init = initComponentsBrowser._w;

exports.c = defineComponent; // Referenced by compiled templates
exports.r = renderer; // Referenced by compiled templates
exports.rc = registryBrowser._x;  // Referenced by compiled templates

window._y = exports; // Helpful when debugging... WARNING: DO NOT USE IN REAL CODE!
});

var isArray$2 = Array.isArray;

/**
 * Internal helper method for looping over the properties of any object
 * @private
 */
var helperForEachProperty = function forEachPropertyHelper(o, func) {
    if (!o) {
        return;
    }

    if (isArray$2(o)) {
        for (var i=0; i<o.length; i++) {
            func(i, o[i]);
        }
    } else if (typeof Map && o instanceof Map) {
        o.forEach(function(v, k) {
            func(k, v);
        });
    } else {
        for (var k in o) {
            if (o.hasOwnProperty(k)) {
                func(k, o[k]);
            }
        }
    }
};

var isArray$3 = Array.isArray;

function isFunction$1(arg) {
    return typeof arg == 'function';
}

function classList(arg, classNames) {
    var len;

    if (arg) {
        if (typeof arg == 'string') {
            if (arg) {
                classNames.push(arg);
            }
        } else if (typeof (len = arg.length) == 'number') {
            for (var i=0; i<len; i++) {
                classList(arg[i], classNames);
            }
        } else if (typeof arg == 'object') {
            for (var name in arg) {
                if (arg.hasOwnProperty(name)) {
                    var value = arg[name];
                    if (value) {
                        classNames.push(name);
                    }
                }
            }
        }
    }
}

function createDeferredRenderer(handler) {
    function deferredRenderer(input, out) {
        deferredRenderer.renderer(input, out);
    }

    // This is the initial function that will do the rendering. We replace
    // the renderer with the actual renderer func on the first render
    deferredRenderer.renderer = function(input, out) {
        var rendererFunc = handler.renderer || handler._ || handler.render;
        if (!isFunction$1(rendererFunc)) {
            throw Error('Invalid renderer');
        }
        // Use the actual renderer from now on
        deferredRenderer.renderer = rendererFunc;
        rendererFunc(input, out);
    };

    return deferredRenderer;
}

function resolveRenderer(handler) {
    var renderer = handler.renderer || handler._;

    if (renderer) {
        return renderer;
    }

    if (isFunction$1(handler)) {
        return handler;
    }

    // If the user code has a circular function then the renderer function
    // may not be available on the module. Since we can't get a reference
    // to the actual renderer(input, out) function right now we lazily
    // try to get access to it later.
    return createDeferredRenderer(handler);
}

/**
 * Internal helper method to prevent null/undefined from being written out
 * when writing text that resolves to null/undefined
 * @private
 */
var s = function strHelper(str) {
    return (str == null) ? '' : str.toString();
};

/**
 * Internal helper method to handle loops without a status variable
 * @private
 */
var f$1 = function forEachHelper(array, callback) {
    if (isArray$3(array)) {
        for (var i=0; i<array.length; i++) {
            callback(array[i]);
        }
    } else if (isFunction$1(array)) {
        // Also allow the first argument to be a custom iterator function
        array(callback);
    }
};

/**
 * Helper to load a custom tag
 */
var t$1 = function loadTagHelper(renderer, targetProperty, isRepeated) {
    if (renderer) {
        renderer = resolveRenderer(renderer);
    }

    return renderer;
};

/**
 * classList(a, b, c, ...)
 * Joines a list of class names with spaces. Empty class names are omitted.
 *
 * classList('a', undefined, 'b') --> 'a b'
 *
 */
var cl = function classListHelper() {
    var classNames = [];
    classList(arguments, classNames);
    return classNames.join(' ');
};

var helpers$2 = {
	s: s,
	f: f$1,
	t: t$1,
	cl: cl
};

var helpers = createCommonjsModule(function (module, exports) {
'use strict';


var VElement = vdom$2.f;
var VText = vdom$2.j;




var classList = helpers$2.cl;

exports.e = function(tagName, attrs, childCount, flags, props) {
    return new VElement(tagName, attrs, childCount, flags, props);
};

exports.t = function(value) {
    return new VText(value);
};

exports.const = function(id) {
    var i=0;
    return function() {
        return id + (i++);
    };
};

/**
 * Internal helper method to handle the "class" attribute. The value can either
 * be a string, an array or an object. For example:
 *
 * ca('foo bar') ==> ' class="foo bar"'
 * ca({foo: true, bar: false, baz: true}) ==> ' class="foo baz"'
 * ca(['foo', 'bar']) ==> ' class="foo bar"'
 */
exports.ca = function(classNames) {
    if (!classNames) {
        return null;
    }

    if (typeof classNames === 'string') {
        return classNames;
    } else {
        return classList(classNames);
    }
};

extend(exports, helpers$2);
});

var dashedNames = {};

/**
 * Helper for generating the string for a style attribute
 * @param  {[type]} style [description]
 * @return {[type]}       [description]
 */
var helperStyleAttr = function(style) {
    if (!style) {
        return null;
    }

    if (typeof style === 'string') {
        return style;
    } else if (typeof style === 'object') {
        var styles = '';
        for (var name in style) {
            var value = style[name];
            if (value) {
                var nameDashed = dashedNames[name];
                if (!nameDashed) {
                    nameDashed = dashedNames[name] = name.replace(/([A-Z])/g, '-$1').toLowerCase();
                }
                styles += nameDashed + ':' + value + ';';
            }
        }
        return styles || null;
    } else {
        return null;
    }
};

var index = createCommonjsModule(function (module) {
'use strict';
var marko_template = module.exports = vdom.t(), marko_component = {
        onCreate: function () {
            this.state = { selectedColorIndex: 0 };
        },
        onMount: function () {
            window.onMount();
        },
        handleColorClick: function (colorIndex) {
            this.state.selectedColorIndex = colorIndex;
        }
    }, marko_registerComponent = indexBrowser.rc, marko_componentType = marko_registerComponent('/isomorphic-ui-benchmarks$1.0.0/benchmarks/color-picker/marko/components/app/index.marko', function () {
        return module.exports;
    }), marko_classAttr = helpers.ca, marko_createElement = helpers.e, marko_const = helpers.const, marko_const_nextId = marko_const('2dd73d'), marko_node0 = marko_createElement('H1', null, 1, 0, { c: marko_const_nextId() }).t('Choose your favorite color:'), marko_attrs0 = { 'class': 'colors' }, marko_node1 = marko_createElement('DIV', null, 1, 0, { c: marko_const_nextId() }).t('No colors!'), marko_attrs1 = { 'class': 'chosen-color' };
function render(input, out, __component, component, state) {
    var data = input;
    var colors = input.colors;
    var selectedColorIndex = state.selectedColorIndex;
    var selectedColor = colors[selectedColorIndex];
    out.be('DIV', {
        'class': 'colors',
        id: __component.id
    }, null, 4);
    out.n(marko_node0);
    out.be('DIV', marko_attrs0);
    if (colors.length) {
        out.be('UL');
        helperForEachProperty(colors, function (i, color) {
            var className = 'color';
            if (selectedColorIndex === i) {
                className += ' selected';
            }
            out.e('LI', {
                'class': marko_classAttr(className),
                style: helperStyleAttr('background-color:' + color.hex)
            }, 1, 4, { onclick: __component.d('handleColorClick', [i]) }).t(color.name);
        });
        out.ee();
    } else {
        out.n(marko_node1);
    }
    out.ee();
    out.e('DIV', null, 2).t('You chose: ').e('DIV', marko_attrs1, 1).t(selectedColor.name);
    out.ee();
}
marko_template._ = indexBrowser.r(render, { type: marko_componentType }, marko_component);
marko_template.Component = indexBrowser.c(marko_component, marko_template._);
});

indexBrowser.init();

window.addBench('marko', function(el, colors) {

    var component = index.renderSync({ colors: colors })
        .appendTo(el)
        .getComponent();

    var selectedColorIndex = 0;

    return function(done) {
        component.state.selectedColorIndex = (++selectedColorIndex) % colors.length;
        component.update();
        done();
    };
});

var client = {

};

return client;

}());
