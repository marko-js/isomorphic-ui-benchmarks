var app = (function () {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function commonjsRequire () {
		throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var actualCreateOut;

	function setCreateOut(createOutFunc) {
	    actualCreateOut = createOutFunc;
	}

	function createOut(globalData) {
	    return actualCreateOut(globalData);
	}

	createOut.aG_ = setCreateOut;

	var createOut_1 = createOut;

	var indexBrowser = function load(templatePath) {
	    // We make the assumption that the template path is a
	    // fully resolved module path and that the module exists
	    // as a CommonJS module
	    // eslint-disable-next-line no-undef
	    if (typeof __webpack_require__ !== "undefined") {
	        // In webpack we can accept paths from `require.resolve`.
	        // eslint-disable-next-line no-undef
	        return __webpack_require__(templatePath);
	    } else {
	        return commonjsRequire();
	    }
	};

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

	var src = EventEmitter;

	/* jshint newcap:false */
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

	inherit_1(VComment, VNode_1);

	var VComment_1 = VComment;

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
	    this.bx_ = null;
	    this.by_ = null;
	}

	function VDocumentFragment(out) {
	    this.bs_(null /* childCount */);
	    this.z_ = out;
	}

	VDocumentFragment.prototype = {
	    bu_: 11,

	    bz_: true,

	    __: function () {
	        return new VDocumentFragmentClone(this);
	    },

	    br_: function (doc) {
	        return doc.createDocumentFragment();
	    }
	};

	inherit_1(VDocumentFragment, VNode_1);

	VDocumentFragmentClone.prototype = VDocumentFragment.prototype;

	var VDocumentFragment_1 = VDocumentFragment;

	var counter = 0;
	var seed = "M" + Date.now();
	var WeakMap = commonjsGlobal.WeakMap || function WeakMap() {
	    var id = seed + counter++;
	    return {
	        get: function (ref) {
	            return ref[id];
	        },
	        set: function (ref, value) {
	            ref[id] = value;
	        }
	    };
	};

	var domData = {
	    _Y_: new WeakMap(),
	    _Z_: new WeakMap(),
	    G_: new WeakMap(),
	    a__: new WeakMap(),
	    aa_: new WeakMap()
	};

	/* jshint newcap:false */

	var vElementByDOMNode = domData._Z_;


	var ATTR_XLINK_HREF = "xlink:href";
	var xmlnsRegExp = /^xmlns(:|$)/;
	var NS_XLINK = "http://www.w3.org/1999/xlink";
	var NS_HTML = "http://www.w3.org/1999/xhtml";
	var NS_MATH = "http://www.w3.org/1998/Math/MathML";
	var NS_SVG = "http://www.w3.org/2000/svg";
	var DEFAULT_NS = {
	    svg: NS_SVG,
	    math: NS_MATH
	};

	var toString = String;

	var FLAG_SIMPLE_ATTRS = 1;
	// var FLAG_PRESERVE = 2;
	var FLAG_CUSTOM_ELEMENT = 4;

	var defineProperty = Object.defineProperty;

	var ATTR_HREF = "href";
	var EMPTY_OBJECT = Object.freeze({});

	function convertAttrValue(type, value) {
	    if (value === true) {
	        return "";
	    } else if (type == "object") {
	        return value instanceof RegExp ? value.source : JSON.stringify(value);
	    } else {
	        return toString(value);
	    }
	}

	function assign(a, b) {
	    for (var key in b) {
	        if (b.hasOwnProperty(key)) {
	            a[key] = b[key];
	        }
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
	    this.bA_ = other.bA_;
	    this.bx_ = null;
	    this.by_ = null;

	    this.bv_ = other.bv_;
	    this.bB_ = other.bB_;
	    this.aD_ = other.aD_;
	    this.bC_ = other.bC_;
	    this.g_ = other.g_;
	    this.bD_ = other.bD_;
	    this.bE_ = other.bE_;
	}

	function VElement(tagName, attrs, key, ownerComponent, childCount, flags, props) {
	    this.bs_(childCount);

	    var constId;

	    if (props) {
	        constId = props.i;
	    }

	    this.bv_ = key;
	    this.g_ = flags || 0;
	    this.aC_ = ownerComponent;
	    this.bB_ = attrs || EMPTY_OBJECT;
	    this.aD_ = props || EMPTY_OBJECT;
	    this.bC_ = tagName;
	    this.bD_ = null;
	    this.bE_ = constId;
	}

	VElement.prototype = {
	    bu_: 1,

	    __: function () {
	        return new VElementClone(this);
	    },

	    /**
	     * Shorthand method for creating and appending an HTML element
	     *
	     * @param  {String} tagName    The tag name (e.g. "div")
	     * @param  {int|null} attrCount  The number of attributes (or `null` if not known)
	     * @param  {int|null} childCount The number of child nodes (or `null` if not known)
	     */
	    e: function (tagName, attrs, key, ownerComponent, childCount, flags, props) {
	        var child = this.bl_(new VElement(tagName, attrs, key, ownerComponent, childCount, flags, props));

	        if (childCount === 0) {
	            return this.bF_();
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
	    n: function (node, ownerComponent) {
	        node = node.__();
	        node.aC_ = ownerComponent;
	        this.bl_(node);
	        return this.bF_();
	    },

	    br_: function (doc, parentNamespaceURI) {
	        var tagName = this.bC_;
	        var attributes = this.bB_;
	        var namespaceURI = DEFAULT_NS[tagName] || parentNamespaceURI || NS_HTML;

	        var flags = this.g_;
	        var el = doc.createElementNS(namespaceURI, tagName);

	        if (flags & FLAG_CUSTOM_ELEMENT) {
	            assign(el, attributes);
	        } else {
	            for (var attrName in attributes) {
	                var attrValue = attributes[attrName];

	                if (attrValue !== false && attrValue != null) {
	                    var type = typeof attrValue;

	                    if (type !== "string") {
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

	            if (tagName === "textarea") {
	                el.value = this.r_;
	            }
	        }

	        vElementByDOMNode.set(el, this);

	        return el;
	    },

	    bG_: function (name) {
	        // We don't care about the namespaces since the there
	        // is no chance that attributes with the same name will have
	        // different namespaces
	        var value = this.bB_[name];
	        return value != null && value !== false;
	    }
	};

	inherit_1(VElement, VNode_1);

	var proto = VElementClone.prototype = VElement.prototype;

	["checked", "selected", "disabled"].forEach(function (name) {
	    defineProperty(proto, name, {
	        get: function () {
	            var value = this.bB_[name];
	            return value !== false && value != null;
	        }
	    });
	});

	defineProperty(proto, "r_", {
	    get: function () {
	        var value = this.bD_;
	        if (value == null) {
	            value = this.bB_.value;
	        }
	        return value != null && value !== false ? toString(value) : this.bB_.type === "checkbox" || this.bB_.type === "radio" ? "on" : "";
	    }
	});

	VElement.bH_ = function (attrs) {
	    // By default this static method is a no-op, but if there are any
	    // compiled components that have "no-update" attributes then
	    // `preserve-attrs.js` will be imported and this method will be replaced
	    // with a method that actually does something
	    return attrs;
	};

	function virtualizeElement(node, virtualizeChildNodes) {
	    var attributes = node.attributes;
	    var attrCount = attributes.length;

	    var attrs;

	    if (attrCount) {
	        attrs = {};
	        for (var i = 0; i < attrCount; i++) {
	            var attr = attributes[i];
	            var attrName = attr.name;
	            if (!xmlnsRegExp.test(attrName) && attrName !== "data-marko") {
	                var attrNamespaceURI = attr.namespaceURI;
	                if (attrNamespaceURI === NS_XLINK) {
	                    attrs[ATTR_XLINK_HREF] = attr.value;
	                } else {
	                    attrs[attrName] = attr.value;
	                }
	            }
	        }
	    }

	    var tagName = node.nodeName;

	    if (node.namespaceURI === NS_HTML) {
	        tagName = tagName.toLowerCase();
	    }

	    var vdomEl = new VElement(tagName, attrs, null /*key*/
	    , null /*ownerComponent*/
	    , 0 /*child count*/
	    , 0 /*flags*/
	    , null /*props*/
	    );

	    if (vdomEl.bC_ === "textarea") {
	        vdomEl.bD_ = node.value;
	    } else if (virtualizeChildNodes) {
	        virtualizeChildNodes(node, vdomEl);
	    }

	    return vdomEl;
	}

	VElement.bI_ = virtualizeElement;

	VElement.bJ_ = function (fromEl, vFromEl, toEl) {
	    var removePreservedAttributes = VElement.bH_;

	    var fromFlags = vFromEl.g_;
	    var toFlags = toEl.g_;

	    vElementByDOMNode.set(fromEl, toEl);

	    var attrs = toEl.bB_;
	    var props = toEl.aD_;

	    if (toFlags & FLAG_CUSTOM_ELEMENT) {
	        return assign(fromEl, attrs);
	    }

	    var attrName;

	    // We use expando properties to associate the previous HTML
	    // attributes provided as part of the VDOM node with the
	    // real VElement DOM node. When diffing attributes,
	    // we only use our internal representation of the attributes.
	    // When diffing for the first time it's possible that the
	    // real VElement node will not have the expando property
	    // so we build the attribute map from the expando property

	    var oldAttrs = vFromEl.bB_;

	    if (oldAttrs) {
	        if (oldAttrs === attrs) {
	            // For constant attributes the same object will be provided
	            // every render and we can use that to our advantage to
	            // not waste time diffing a constant, immutable attribute
	            // map.
	            return;
	        } else {
	            oldAttrs = removePreservedAttributes(oldAttrs, props);
	        }
	    }

	    var attrValue;

	    if (toFlags & FLAG_SIMPLE_ATTRS && fromFlags & FLAG_SIMPLE_ATTRS) {
	        if (oldAttrs["class"] !== (attrValue = attrs["class"])) {
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

	            if (type !== "string") {
	                attrValue = convertAttrValue(type, attrValue);
	            }

	            setAttribute(fromEl, namespaceURI, attrName, attrValue);
	        }
	    }

	    // If there are any old attributes that are not in the new set of attributes
	    // then we need to remove those attributes from the target node
	    //
	    // NOTE: We can skip this if the the element is keyed because if the element
	    //       is keyed then we know we already processed all of the attributes for
	    //       both the target and original element since target VElement nodes will
	    //       have all attributes declared. However, we can only skip if the node
	    //       was not a virtualized node (i.e., a node that was not rendered by a
	    //       Marko template, but rather a node that was created from an HTML
	    //       string or a real DOM node).
	    if (toEl.bv_ === null) {
	        for (attrName in oldAttrs) {
	            if (!(attrName in attrs)) {
	                if (attrName === ATTR_XLINK_HREF) {
	                    fromEl.removeAttributeNS(ATTR_XLINK_HREF, ATTR_HREF);
	                } else {
	                    fromEl.removeAttribute(attrName);
	                }
	            }
	        }
	    }
	};

	var VElement_1 = VElement;

	function VText(value) {
	    this.bs_(-1 /* no children */);
	    this.bt_ = value;
	}

	VText.prototype = {
	    bN_: true,

	    bu_: 3,

	    br_: function (doc) {
	        return doc.createTextNode(this.bt_);
	    },

	    __: function () {
	        return new VText(this.bt_);
	    }
	};

	inherit_1(VText, VNode_1);

	var VText_1 = VText;

	function VComponent(component, key, ownerComponent, preserve) {
	    this.bs_(null /* childCount */);
	    this.bv_ = key;
	    this.k_ = component;
	    this.aC_ = ownerComponent;
	    this.bw_ = preserve;
	}

	VComponent.prototype = {
	    bu_: 2
	};

	inherit_1(VComponent, VNode_1);

	var VComponent_1 = VComponent;

	function insertBefore(node, referenceNode, parentNode) {
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

	var aH_ = insertBefore;
	var aI_ = insertAfter;
	var b_ = nextSibling;
	var a_ = firstChild;
	var aJ_ = removeChild;

	var helpers = {
		aH_: aH_,
		aI_: aI_,
		b_: b_,
		a_: a_,
		aJ_: aJ_
	};

	var insertBefore$1 = helpers.aH_;

	var fragmentPrototype = {
	    nodeType: 12,
	    get firstChild() {
	        var firstChild = this.startNode.nextSibling;
	        return firstChild === this.endNode ? undefined : firstChild;
	    },
	    get lastChild() {
	        var lastChild = this.endNode.previousSibling;
	        return lastChild === this.startNode ? undefined : lastChild;
	    },
	    get parentNode() {
	        var parentNode = this.startNode.parentNode;
	        return parentNode === this.detachedContainer ? undefined : parentNode;
	    },
	    get namespaceURI() {
	        return this.startNode.parentNode.namespaceURI;
	    },
	    get nextSibling() {
	        return this.endNode.nextSibling;
	    },
	    get nodes() {
	        var nodes = [];
	        var current = this.startNode;
	        while (current !== this.endNode) {
	            nodes.push(current);
	            current = current.nextSibling;
	        }
	        nodes.push(current);
	        return nodes;
	    },
	    insertBefore: function (newChildNode, referenceNode) {
	        var actualReference = referenceNode == null ? this.endNode : referenceNode;
	        return insertBefore$1(newChildNode, actualReference, this.startNode.parentNode);
	    },
	    insertInto: function (newParentNode, referenceNode) {
	        this.nodes.forEach(function (node) {
	            insertBefore$1(node, referenceNode, newParentNode);
	        }, this);
	        return this;
	    },
	    remove: function () {
	        this.nodes.forEach(function (node) {
	            this.detachedContainer.appendChild(node);
	        }, this);
	    }
	};

	function createFragmentNode(startNode, nextNode, parentNode) {
	    var fragment = Object.create(fragmentPrototype);
	    var isRoot = startNode && startNode.ownerDocument === startNode.parentNode;
	    fragment.startNode = isRoot ? document.createComment("") : document.createTextNode("");
	    fragment.endNode = isRoot ? document.createComment("") : document.createTextNode("");
	    fragment.startNode.fragment = fragment;
	    fragment.endNode.fragment = fragment;
	    var detachedContainer = fragment.detachedContainer = document.createDocumentFragment();
	    parentNode = parentNode || startNode && startNode.parentNode || detachedContainer;
	    insertBefore$1(fragment.startNode, startNode, parentNode);
	    insertBefore$1(fragment.endNode, nextNode, parentNode);
	    return fragment;
	}

	function beginFragmentNode(startNode, parentNode) {
	    var fragment = createFragmentNode(startNode, null, parentNode);
	    fragment.bO_ = function (nextNode) {
	        fragment.bO_ = null;
	        insertBefore$1(fragment.endNode, nextNode, parentNode || startNode.parentNode);
	    };
	    return fragment;
	}

	var ai_ = createFragmentNode;
	var bP_ = beginFragmentNode;

	var fragment = {
		ai_: ai_,
		bP_: bP_
	};

	var keysByDOMNode = domData.aa_;
	var vElementByDOMNode$1 = domData._Z_;


	var createFragmentNode$1 = fragment.ai_;

	function VFragment(key, ownerComponent, preserve) {
	    this.bs_(null /* childCount */);
	    this.bv_ = key;
	    this.aC_ = ownerComponent;
	    this.bw_ = preserve;
	}

	VFragment.prototype = {
	    bu_: 12,
	    br_: function () {
	        var fragment = createFragmentNode$1();
	        keysByDOMNode.set(fragment, this.bv_);
	        vElementByDOMNode$1.set(fragment, this);
	        return fragment;
	    }
	};

	inherit_1(VFragment, VNode_1);

	var VFragment_1 = VFragment;

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
	            return VElement_1.bI_(node, virtualizeChildNodes);
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

	function virtualizeHTML(html, doc) {
	    if (!specialHtmlRegexp.test(html)) {
	        return new VText_1(html);
	    }

	    var container = doc.createElement("body");
	    container.innerHTML = html;
	    var vdomFragment = new VDocumentFragment_1();

	    var curChild = container.firstChild;
	    while (curChild) {
	        vdomFragment.bl_(virtualize(curChild));
	        curChild = curChild.nextSibling;
	    }

	    return vdomFragment;
	}

	var Node_prototype = VNode_1.prototype;

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

	    this.bl_(vdomNode || new VText_1(value.toString()));
	    return this.bF_();
	};

	/**
	 * Shorthand method for creating and appending a Comment node with a given value
	 * @param  {String} value The value for the new Comment node
	 */
	Node_prototype.c = function (value) {
	    this.bl_(new VComment_1(value));
	    return this.bF_();
	};

	Node_prototype.bp_ = function () {
	    return this.bl_(new VDocumentFragment_1());
	};

	var aV_ = VComment_1;
	var aU_ = VDocumentFragment_1;
	var aT_ = VElement_1;
	var aW_ = VText_1;
	var aX_ = VComponent_1;
	var aY_ = VFragment_1;
	var bI_ = virtualize;
	var aZ_ = virtualizeHTML;
	var b__ = defaultDocument;

	var vdom = {
		aV_: aV_,
		aU_: aU_,
		aT_: aT_,
		aW_: aW_,
		aX_: aX_,
		aY_: aY_,
		bI_: bI_,
		aZ_: aZ_,
		b__: b__
	};

	var componentsByDOMNode = domData.G_;
	var keysByDOMNode$1 = domData.aa_;
	var vElementsByDOMNode = domData._Z_;
	var vPropsByDOMNode = domData._Y_;
	var markoUID = window.$MUID || (window.$MUID = { i: 0 });
	var runtimeId = markoUID.i++;

	var componentLookup = {};

	var defaultDocument$1 = document;
	var EMPTY_OBJECT$1 = {};

	function getParentComponentForEl(node) {
	    while (node && !componentsByDOMNode.get(node)) {
	        node = node.previousSibling || node.parentNode;
	        if (node.fragment) {
	            if (node === node.fragment.endNode) {
	                node = node.fragment.previousSibling || node.parentNode;
	            } else {
	                node = node.fragment;
	            }
	        }
	    }
	    return node && componentsByDOMNode.get(node);
	}

	function getComponentForEl(el, doc) {
	    if (el) {
	        var node = typeof el == "string" ? (doc || defaultDocument$1).getElementById(el) : el;
	        if (node) {
	            var vElement = vElementsByDOMNode.get(node);
	            return vElement ? vElement.aC_ : getParentComponentForEl(node);
	        }
	    }
	}

	var lifecycleEventMethods = {};

	["create", "render", "update", "mount", "destroy"].forEach(function (eventName) {
	    lifecycleEventMethods[eventName] = "on" + eventName[0].toUpperCase() + eventName.substring(1);
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

	function destroyComponentForNode(node) {
	    var componentToDestroy = componentsByDOMNode.get(node.fragment || node);
	    if (componentToDestroy) {
	        componentToDestroy.___();
	        delete componentLookup[componentToDestroy.id];
	    }
	}
	function destroyNodeRecursive(node, component) {
	    destroyComponentForNode(node);
	    if (node.nodeType === 1 || node.nodeType === 12) {
	        var key;

	        if (component && (key = keysByDOMNode$1.get(node))) {
	            if (node === component.m_[key]) {
	                if (componentsByDOMNode.get(node) && /\[\]$/.test(key)) {
	                    delete component.m_[key][componentsByDOMNode.get(node).id];
	                } else {
	                    delete component.m_[key];
	                }
	            }
	        }

	        var curChild = node.firstChild;
	        while (curChild && curChild !== node.endNode) {
	            destroyNodeRecursive(curChild, component);
	            curChild = curChild.nextSibling;
	        }
	    }
	}

	function nextComponentId() {
	    // Each component will get an ID that is unique across all loaded
	    // marko runtimes. This allows multiple instances of marko to be
	    // loaded in the same window and they should all place nice
	    // together
	    return "c" + markoUID.i++;
	}

	function nextComponentIdProvider() {
	    return nextComponentId;
	}

	function attachBubblingEvent(componentDef, handlerMethodName, isOnce, extraArgs) {
	    if (handlerMethodName) {
	        var componentId = componentDef.id;
	        if (extraArgs) {
	            return [handlerMethodName, componentId, isOnce, extraArgs];
	        } else {
	            return [handlerMethodName, componentId, isOnce];
	        }
	    }
	}

	function getMarkoPropsFromEl(el) {
	    var vElement = vElementsByDOMNode.get(el);
	    var virtualProps;

	    if (vElement) {
	        virtualProps = vElement.aD_;
	    } else {
	        virtualProps = vPropsByDOMNode.get(el);
	        if (!virtualProps) {
	            virtualProps = el.getAttribute("data-marko");
	            vPropsByDOMNode.set(el, virtualProps = virtualProps ? JSON.parse(virtualProps) : EMPTY_OBJECT$1);
	        }
	    }

	    return virtualProps;
	}

	function normalizeComponentKey(key, parentId) {
	    if (key[0] === "#") {
	        key = key.replace("#" + parentId + "-", "");
	    }
	    return key;
	}

	function addComponentRootToKeyedElements(keyedElements, key, rootNode, componentId) {
	    if (/\[\]$/.test(key)) {
	        var repeatedElementsForKey = keyedElements[key] = keyedElements[key] || {};
	        repeatedElementsForKey[componentId] = rootNode;
	    } else {
	        keyedElements[key] = rootNode;
	    }
	}

	var ab_ = runtimeId;
	var h_ = componentLookup;
	var af_ = getComponentForEl;
	var E_ = emitLifecycleEvent;
	var aE_ = destroyComponentForNode;
	var F_ = destroyNodeRecursive;
	var _O_ = nextComponentIdProvider;
	var _y_ = attachBubblingEvent;
	var ac_ = getMarkoPropsFromEl;
	var aj_ = addComponentRootToKeyedElements;
	var aF_ = normalizeComponentKey;

	var utilBrowser = {
		ab_: ab_,
		h_: h_,
		af_: af_,
		E_: E_,
		aE_: aE_,
		F_: F_,
		_O_: _O_,
		_y_: _y_,
		ac_: ac_,
		aj_: aj_,
		aF_: aF_
	};

	var destroyComponentForNode$1 = utilBrowser.aE_;
	var destroyNodeRecursive$1 = utilBrowser.F_;


	var insertBefore$2 = helpers.aH_;
	var insertAfter$1 = helpers.aI_;
	var removeChild$1 = helpers.aJ_;

	function resolveEl(el) {
	    if (typeof el == "string") {
	        var elId = el;
	        el = document.getElementById(elId);
	        if (!el) {
	            throw Error("Not found: " + elId);
	        }
	    }
	    return el;
	}

	function beforeRemove(referenceEl) {
	    destroyNodeRecursive$1(referenceEl);
	    destroyComponentForNode$1(referenceEl);
	}

	var domInsert = function (target, getEl, afterInsert) {
	    extend(target, {
	        appendTo: function (referenceEl) {
	            referenceEl = resolveEl(referenceEl);
	            var el = getEl(this, referenceEl);
	            insertBefore$2(el, null, referenceEl);
	            return afterInsert(this, referenceEl);
	        },
	        prependTo: function (referenceEl) {
	            referenceEl = resolveEl(referenceEl);
	            var el = getEl(this, referenceEl);
	            insertBefore$2(el, referenceEl.firstChild || null, referenceEl);
	            return afterInsert(this, referenceEl);
	        },
	        replace: function (referenceEl) {
	            referenceEl = resolveEl(referenceEl);
	            var el = getEl(this, referenceEl);
	            beforeRemove(referenceEl);
	            insertBefore$2(el, referenceEl, referenceEl.parentNode);
	            removeChild$1(referenceEl);
	            return afterInsert(this, referenceEl);
	        },
	        replaceChildrenOf: function (referenceEl) {
	            referenceEl = resolveEl(referenceEl);
	            var el = getEl(this, referenceEl);

	            var curChild = referenceEl.firstChild;
	            while (curChild) {
	                var nextSibling = curChild.nextSibling; // Just in case the DOM changes while removing
	                beforeRemove(curChild);
	                curChild = nextSibling;
	            }

	            referenceEl.innerHTML = "";
	            insertBefore$2(el, null, referenceEl);
	            return afterInsert(this, referenceEl);
	        },
	        insertBefore: function (referenceEl) {
	            referenceEl = resolveEl(referenceEl);
	            var el = getEl(this, referenceEl);
	            insertBefore$2(el, referenceEl, referenceEl.parentNode);
	            return afterInsert(this, referenceEl);
	        },
	        insertAfter: function (referenceEl) {
	            referenceEl = resolveEl(referenceEl);
	            var el = getEl(this, referenceEl);
	            insertAfter$1(el, referenceEl, referenceEl.parentNode);
	            return afterInsert(this, referenceEl);
	        }
	    });
	};

	function getComponentDefs(result) {
	    var componentDefs = result.i_;

	    if (!componentDefs) {
	        throw Error("No component");
	    }
	    return componentDefs;
	}

	function RenderResult(out) {
	    this.out = this.z_ = out;
	    this.i_ = undefined;
	}

	var RenderResult_1 = RenderResult;

	var proto$1 = RenderResult.prototype = {
	    getComponent: function () {
	        return this.getComponents()[0];
	    },
	    getComponents: function (selector) {
	        if (this.i_ === undefined) {
	            throw Error("Not added to DOM");
	        }

	        var componentDefs = getComponentDefs(this);

	        var components = [];

	        componentDefs.forEach(function (componentDef) {
	            var component = componentDef.k_;
	            if (!selector || selector(component)) {
	                components.push(component);
	            }
	        });

	        return components;
	    },

	    afterInsert: function (doc) {
	        var out = this.z_;
	        var componentsContext = out.i_;
	        if (componentsContext) {
	            this.i_ = componentsContext.A_(doc);
	        } else {
	            this.i_ = null;
	        }

	        return this;
	    },
	    getNode: function (doc) {
	        return this.z_.B_(doc);
	    },
	    getOutput: function () {
	        return this.z_.C_();
	    },
	    toString: function () {
	        return this.z_.toString();
	    },
	    document: typeof document != "undefined" && document
	};

	// Add all of the following DOM methods to Component.prototype:
	// - appendTo(referenceEl)
	// - replace(referenceEl)
	// - replaceChildrenOf(referenceEl)
	// - insertBefore(referenceEl)
	// - insertAfter(referenceEl)
	// - prependTo(referenceEl)
	domInsert(proto$1, function getEl(renderResult, referenceEl) {
	    return renderResult.getNode(referenceEl.ownerDocument);
	}, function afterInsert(renderResult, referenceEl) {
	    var isShadow = typeof ShadowRoot === "function" && referenceEl instanceof ShadowRoot;
	    return renderResult.afterInsert(isShadow ? referenceEl : referenceEl.ownerDocument);
	});

	function syncBooleanAttrProp(fromEl, toEl, name) {
	    if (fromEl[name] !== toEl[name]) {
	        fromEl[name] = toEl[name];
	        if (fromEl[name]) {
	            fromEl.setAttribute(name, "");
	        } else {
	            fromEl.removeAttribute(name, "");
	        }
	    }
	}

	function forEachOption(el, fn, i) {
	    var curChild = el.a_;

	    while (curChild) {
	        if (curChild.bC_ === "option") {
	            fn(curChild, ++i);
	        } else {
	            i = forEachOption(curChild, fn, i);
	        }

	        curChild = curChild.b_;
	    }

	    return i;
	}

	// We use a JavaScript class to benefit from fast property lookup
	function SpecialElHandlers() {}
	SpecialElHandlers.prototype = {
	    /**
	     * Needed for IE. Apparently IE doesn't think that "selected" is an
	     * attribute when reading over the attributes using selectEl.attributes
	     */
	    option: function (fromEl, toEl) {
	        syncBooleanAttrProp(fromEl, toEl, "selected");
	    },
	    button: function (fromEl, toEl) {
	        syncBooleanAttrProp(fromEl, toEl, "disabled");
	    },
	    /**
	     * The "value" attribute is special for the <input> element since it sets
	     * the initial value. Changing the "value" attribute without changing the
	     * "value" property will have no effect since it is only used to the set the
	     * initial value.  Similar for the "checked" attribute, and "disabled".
	     */
	    input: function (fromEl, toEl) {
	        syncBooleanAttrProp(fromEl, toEl, "checked");
	        syncBooleanAttrProp(fromEl, toEl, "disabled");

	        if (fromEl.value != toEl.r_) {
	            fromEl.value = toEl.r_;
	        }

	        if (fromEl.hasAttribute("value") && !toEl.bG_("value")) {
	            fromEl.removeAttribute("value");
	        }
	    },

	    textarea: function (fromEl, toEl) {
	        var newValue = toEl.r_;
	        if (fromEl.value != newValue) {
	            fromEl.value = newValue;
	        }

	        var firstChild = fromEl.firstChild;
	        if (firstChild) {
	            // Needed for IE. Apparently IE sets the placeholder as the
	            // node value and vise versa. This ignores an empty update.
	            var oldValue = firstChild.nodeValue;

	            if (oldValue == newValue || !newValue && oldValue == fromEl.placeholder) {
	                return;
	            }

	            firstChild.nodeValue = newValue;
	        }
	    },
	    select: function (fromEl, toEl) {
	        if (!toEl.bG_("multiple")) {
	            var selected = 0;
	            forEachOption(toEl, function (option, i) {
	                if (option.bG_("selected")) {
	                    selected = i;
	                }
	            }, -1);

	            if (fromEl.selectedIndex !== selected) {
	                fromEl.selectedIndex = selected;
	            }
	        }
	    }
	};

	var specialElHandlers = new SpecialElHandlers();

	var runtimeId$1 = utilBrowser.ab_;
	var componentLookup$1 = utilBrowser.h_;
	var getMarkoPropsFromEl$1 = utilBrowser.ac_;

	// We make our best effort to allow multiple marko runtimes to be loaded in the
	// same window. Each marko runtime will get its own unique runtime ID.
	var listenersAttachedKey = "$MDE" + runtimeId$1;
	var delegatedEvents = {};

	function getEventFromEl(el, eventName) {
	    var virtualProps = getMarkoPropsFromEl$1(el);
	    var eventInfo = virtualProps[eventName];

	    if (typeof eventInfo === "string") {
	        eventInfo = eventInfo.split(" ");
	        if (eventInfo[2]) {
	            eventInfo[2] = eventInfo[2] === "true";
	        }
	        if (eventInfo.length == 4) {
	            eventInfo[3] = parseInt(eventInfo[3], 10);
	        }
	    }

	    return eventInfo;
	}

	function delegateEvent(node, eventName, target, event) {
	    var targetMethod = target[0];
	    var targetComponentId = target[1];
	    var isOnce = target[2];
	    var extraArgs = target[3];

	    if (isOnce) {
	        var virtualProps = getMarkoPropsFromEl$1(node);
	        delete virtualProps[eventName];
	    }

	    var targetComponent = componentLookup$1[targetComponentId];

	    if (!targetComponent) {
	        return;
	    }

	    var targetFunc = typeof targetMethod === "function" ? targetMethod : targetComponent[targetMethod];
	    if (!targetFunc) {
	        throw Error("Method not found: " + targetMethod);
	    }

	    if (extraArgs != null) {
	        if (typeof extraArgs === "number") {
	            extraArgs = targetComponent.N_[extraArgs];
	        }
	    }

	    // Invoke the component method
	    if (extraArgs) {
	        targetFunc.apply(targetComponent, extraArgs.concat(event, node));
	    } else {
	        targetFunc.call(targetComponent, event, node);
	    }
	}

	function addDelegatedEventHandler(eventType) {
	    if (!delegatedEvents[eventType]) {
	        delegatedEvents[eventType] = true;
	    }
	}

	function addDelegatedEventHandlerToDoc(eventType, doc) {
	    var body = doc.body || doc;
	    var listeners = doc[listenersAttachedKey] = doc[listenersAttachedKey] || {};
	    if (!listeners[eventType]) {
	        body.addEventListener(eventType, listeners[eventType] = function (event) {
	            var propagationStopped = false;

	            // Monkey-patch to fix #97
	            var oldStopPropagation = event.stopPropagation;

	            event.stopPropagation = function () {
	                oldStopPropagation.call(event);
	                propagationStopped = true;
	            };

	            var curNode = event.target;
	            if (!curNode) {
	                return;
	            }

	            // event.target of an SVGElementInstance does not have a
	            // `getAttribute` function in IE 11.
	            // See https://github.com/marko-js/marko/issues/796
	            curNode = curNode.correspondingUseElement || curNode;

	            // Search up the tree looking DOM events mapped to target
	            // component methods
	            var propName = "on" + eventType;
	            var target;

	            // Attributes will have the following form:
	            // on<event_type>("<target_method>|<component_id>")

	            do {
	                if (target = getEventFromEl(curNode, propName)) {
	                    delegateEvent(curNode, propName, target, event);

	                    if (propagationStopped) {
	                        break;
	                    }
	                }
	            } while ((curNode = curNode.parentNode) && curNode.getAttribute);
	        }, true);
	    }
	}

	function noop() {}

	var _X_ = noop;
	var _a_ = noop;
	var _U_ = delegateEvent;
	var _V_ = getEventFromEl;
	var _z_ = addDelegatedEventHandler;
	var ad_ = function (doc) {
	    Object.keys(delegatedEvents).forEach(function (eventType) {
	        addDelegatedEventHandlerToDoc(eventType, doc);
	    });
	};

	var eventDelegation = {
		_X_: _X_,
		_a_: _a_,
		_U_: _U_,
		_V_: _V_,
		_z_: _z_,
		ad_: ad_
	};

	var existingComponentLookup = utilBrowser.h_;
	var destroyNodeRecursive$2 = utilBrowser.F_;
	var addComponentRootToKeyedElements$1 = utilBrowser.aj_;
	var normalizeComponentKey$1 = utilBrowser.aF_;
	var VElement$1 = vdom.aT_;
	var virtualizeElement$1 = VElement$1.bI_;
	var morphAttrs = VElement$1.bJ_;




	var keysByDOMNode$2 = domData.aa_;
	var componentByDOMNode = domData.G_;
	var vElementByDOMNode$2 = domData._Z_;
	var detachedByDOMNode = domData.a__;

	var insertBefore$3 = helpers.aH_;
	var insertAfter$2 = helpers.aI_;
	var nextSibling$1 = helpers.b_;
	var firstChild$1 = helpers.a_;
	var removeChild$2 = helpers.aJ_;
	var createFragmentNode$2 = fragment.ai_;
	var beginFragmentNode$1 = fragment.bP_;

	var ELEMENT_NODE = 1;
	var TEXT_NODE = 3;
	var COMMENT_NODE = 8;
	var COMPONENT_NODE = 2;
	var FRAGMENT_NODE = 12;
	var DOCTYPE_NODE = 10;

	// var FLAG_SIMPLE_ATTRS = 1;
	var FLAG_PRESERVE = 2;
	// var FLAG_CUSTOM_ELEMENT = 4;

	function isAutoKey(key) {
	    return !/^@/.test(key);
	}

	function compareNodeNames(fromEl, toEl) {
	    return fromEl.bC_ === toEl.bC_;
	}

	function caseInsensitiveCompare(a, b) {
	    return a.toLowerCase() === b.toLowerCase();
	}

	function onNodeAdded(node, componentsContext) {
	    if (node.nodeType === 1) ;
	}

	function morphdom(fromNode, toNode, doc, componentsContext) {
	    var globalComponentsContext;
	    var isHydrate = false;
	    var keySequences = {};

	    if (componentsContext) {
	        globalComponentsContext = componentsContext.l_;
	        isHydrate = globalComponentsContext._r_;
	    }

	    function insertVirtualNodeBefore(vNode, key, referenceEl, parentEl, ownerComponent, parentComponent) {
	        var realNode = vNode.br_(doc, parentEl.namespaceURI);
	        insertBefore$3(realNode, referenceEl, parentEl);

	        if (vNode.bu_ === ELEMENT_NODE || vNode.bu_ === FRAGMENT_NODE) {
	            if (key) {
	                keysByDOMNode$2.set(realNode, key);
	                (isAutoKey(key) ? parentComponent : ownerComponent).m_[key] = realNode;
	            }

	            morphChildren(realNode, vNode, parentComponent);
	        }

	        onNodeAdded(realNode);
	    }

	    function insertVirtualComponentBefore(vComponent, referenceNode, referenceNodeParentEl, component, key, ownerComponent, parentComponent) {
	        var rootNode = component.K_ = insertBefore$3(createFragmentNode$2(), referenceNode, referenceNodeParentEl);
	        componentByDOMNode.set(rootNode, component);

	        if (key && ownerComponent) {
	            key = normalizeComponentKey$1(key, parentComponent.id);
	            addComponentRootToKeyedElements$1(ownerComponent.m_, key, rootNode, component.id);
	            keysByDOMNode$2.set(rootNode, key);
	        }

	        morphComponent(component, vComponent);
	    }

	    function morphComponent(component, vComponent) {
	        morphChildren(component.K_, vComponent, component);
	    }

	    var detachedNodes = [];

	    function detachNode(node, parentNode, ownerComponent) {
	        if (node.nodeType === ELEMENT_NODE || node.nodeType === FRAGMENT_NODE) {
	            detachedNodes.push(node);
	            detachedByDOMNode.set(node, ownerComponent || true);
	        } else {
	            destroyNodeRecursive$2(node);
	            removeChild$2(node);
	        }
	    }

	    function destroyComponent(component) {
	        component.destroy();
	    }

	    function morphChildren(fromNode, toNode, parentComponent) {
	        var curFromNodeChild = firstChild$1(fromNode);
	        var curToNodeChild = toNode.a_;

	        var curToNodeKey;
	        var curFromNodeKey;
	        var curToNodeType;

	        var fromNextSibling;
	        var toNextSibling;
	        var matchingFromEl;
	        var matchingFromComponent;
	        var curVFromNodeChild;
	        var fromComponent;

	        outer: while (curToNodeChild) {
	            toNextSibling = curToNodeChild.b_;
	            curToNodeType = curToNodeChild.bu_;
	            curToNodeKey = curToNodeChild.bv_;

	            // Skip <!doctype>
	            if (curFromNodeChild && curFromNodeChild.nodeType === DOCTYPE_NODE) {
	                curFromNodeChild = nextSibling$1(curFromNodeChild);
	            }

	            var ownerComponent = curToNodeChild.aC_ || parentComponent;
	            var referenceComponent;

	            if (curToNodeType === COMPONENT_NODE) {
	                var component = curToNodeChild.k_;
	                if ((matchingFromComponent = existingComponentLookup[component.id]) === undefined) {
	                    if (isHydrate === true) {
	                        var rootNode = beginFragmentNode$1(curFromNodeChild, fromNode);
	                        component.K_ = rootNode;
	                        componentByDOMNode.set(rootNode, component);

	                        if (ownerComponent && curToNodeKey) {
	                            curToNodeKey = normalizeComponentKey$1(curToNodeKey, parentComponent.id);
	                            addComponentRootToKeyedElements$1(ownerComponent.m_, curToNodeKey, rootNode, component.id);

	                            keysByDOMNode$2.set(rootNode, curToNodeKey);
	                        }

	                        morphComponent(component, curToNodeChild);

	                        curFromNodeChild = nextSibling$1(rootNode);
	                    } else {
	                        insertVirtualComponentBefore(curToNodeChild, curFromNodeChild, fromNode, component, curToNodeKey, ownerComponent, parentComponent);
	                    }
	                } else {
	                    if (matchingFromComponent.K_ !== curFromNodeChild) {
	                        if (curFromNodeChild && (fromComponent = componentByDOMNode.get(curFromNodeChild)) && globalComponentsContext.q_[fromComponent.id] === undefined) {
	                            // The component associated with the current real DOM node was not rendered
	                            // so we should just remove it out of the real DOM by destroying it
	                            curFromNodeChild = nextSibling$1(fromComponent.K_);
	                            destroyComponent(fromComponent);
	                            continue;
	                        }

	                        // We need to move the existing component into
	                        // the correct location
	                        insertBefore$3(matchingFromComponent.K_, curFromNodeChild, fromNode);
	                    } else {
	                        curFromNodeChild = curFromNodeChild && nextSibling$1(curFromNodeChild);
	                    }

	                    if (!curToNodeChild.bw_) {
	                        morphComponent(component, curToNodeChild);
	                    }
	                }

	                curToNodeChild = toNextSibling;
	                continue;
	            } else if (curToNodeKey) {
	                curVFromNodeChild = undefined;
	                curFromNodeKey = undefined;
	                var curToNodeKeyOriginal = curToNodeKey;

	                if (isAutoKey(curToNodeKey)) {
	                    if (ownerComponent !== parentComponent) {
	                        curToNodeKey += ":" + ownerComponent.id;
	                    }
	                    referenceComponent = parentComponent;
	                } else {
	                    referenceComponent = ownerComponent;
	                }

	                var keySequence = keySequences[referenceComponent.id] || (keySequences[referenceComponent.id] = globalComponentsContext._P_());

	                // We have a keyed element. This is the fast path for matching
	                // up elements
	                curToNodeKey = keySequence.c_(curToNodeKey);

	                if (curFromNodeChild) {
	                    curFromNodeKey = keysByDOMNode$2.get(curFromNodeChild);
	                    curVFromNodeChild = vElementByDOMNode$2.get(curFromNodeChild);
	                    fromNextSibling = nextSibling$1(curFromNodeChild);
	                }

	                if (curFromNodeKey === curToNodeKey) {
	                    // Elements line up. Now we just have to make sure they are compatible
	                    if ((curToNodeChild.g_ & FLAG_PRESERVE) === 0 && !curToNodeChild.bw_) {
	                        // We just skip over the fromNode if it is preserved

	                        if (compareNodeNames(curToNodeChild, curVFromNodeChild)) {
	                            morphEl(curFromNodeChild, curVFromNodeChild, curToNodeChild, curToNodeKey, ownerComponent, parentComponent);
	                        } else {
	                            // Remove the old node
	                            detachNode(curFromNodeChild, fromNode, ownerComponent);

	                            // Incompatible nodes. Just move the target VNode into the DOM at this position
	                            insertVirtualNodeBefore(curToNodeChild, curToNodeKey, curFromNodeChild, fromNode, ownerComponent, parentComponent);
	                        }
	                    }
	                } else {
	                    if ((matchingFromEl = referenceComponent.m_[curToNodeKey]) === undefined) {
	                        if (isHydrate === true && curFromNodeChild) {
	                            if (curFromNodeChild.nodeType === ELEMENT_NODE && caseInsensitiveCompare(curFromNodeChild.nodeName, curToNodeChild.bC_ || "")) {
	                                curVFromNodeChild = virtualizeElement$1(curFromNodeChild);
	                                curVFromNodeChild.bC_ = curToNodeChild.bC_;
	                                keysByDOMNode$2.set(curFromNodeChild, curToNodeKey);
	                                morphEl(curFromNodeChild, curVFromNodeChild, curToNodeChild, curToNodeKey, ownerComponent, parentComponent);
	                                curToNodeChild = toNextSibling;
	                                curFromNodeChild = fromNextSibling;
	                                continue;
	                            } else if (curToNodeChild.bu_ === FRAGMENT_NODE && curFromNodeChild.nodeType === COMMENT_NODE) {
	                                var content = curFromNodeChild.nodeValue;
	                                if (content == "F#" + curToNodeKeyOriginal) {
	                                    var endNode = curFromNodeChild.nextSibling;
	                                    var depth = 0;
	                                    var nodeValue;

	                                    // eslint-disable-next-line no-constant-condition
	                                    while (true) {
	                                        if (endNode.nodeType === COMMENT_NODE) {
	                                            nodeValue = endNode.nodeValue;
	                                            if (nodeValue === "F/") {
	                                                if (depth === 0) {
	                                                    break;
	                                                } else {
	                                                    depth--;
	                                                }
	                                            } else if (nodeValue.indexOf("F#") === 0) {
	                                                depth++;
	                                            }
	                                        }
	                                        endNode = endNode.nextSibling;
	                                    }

	                                    var fragment = createFragmentNode$2(curFromNodeChild, endNode.nextSibling, fromNode);
	                                    keysByDOMNode$2.set(fragment, curToNodeKey);
	                                    vElementByDOMNode$2.set(fragment, curToNodeChild);
	                                    referenceComponent.m_[curToNodeKey] = fragment;
	                                    removeChild$2(curFromNodeChild);
	                                    removeChild$2(endNode);

	                                    if (!curToNodeChild.bw_) {
	                                        morphChildren(fragment, curToNodeChild, parentComponent);
	                                    }

	                                    curToNodeChild = toNextSibling;
	                                    curFromNodeChild = fragment.nextSibling;
	                                    continue;
	                                }
	                            }
	                        }

	                        insertVirtualNodeBefore(curToNodeChild, curToNodeKey, curFromNodeChild, fromNode, ownerComponent, parentComponent);
	                        fromNextSibling = curFromNodeChild;
	                    } else {
	                        if (detachedByDOMNode.get(matchingFromEl) !== undefined) {
	                            detachedByDOMNode.set(matchingFromEl, undefined);
	                        }

	                        if ((curToNodeChild.g_ & FLAG_PRESERVE) === 0 && !curToNodeChild.bw_) {
	                            curVFromNodeChild = vElementByDOMNode$2.get(matchingFromEl);

	                            if (compareNodeNames(curVFromNodeChild, curToNodeChild)) {
	                                if (fromNextSibling === matchingFromEl) {
	                                    // Single element removal:
	                                    // A <-> A
	                                    // B <-> C <-- We are here
	                                    // C     D
	                                    // D
	                                    //
	                                    // Single element swap:
	                                    // A <-> A
	                                    // B <-> C <-- We are here
	                                    // C     B

	                                    if (toNextSibling && toNextSibling.bv_ === curFromNodeKey) {
	                                        // Single element swap

	                                        // We want to stay on the current real DOM node
	                                        fromNextSibling = curFromNodeChild;

	                                        // But move the matching element into place
	                                        insertBefore$3(matchingFromEl, curFromNodeChild, fromNode);
	                                    } else {
	                                        // Single element removal

	                                        // We need to remove the current real DOM node
	                                        // and the matching real DOM node will fall into
	                                        // place. We will continue diffing with next sibling
	                                        // after the real DOM node that just fell into place
	                                        fromNextSibling = nextSibling$1(fromNextSibling);

	                                        if (curFromNodeChild) {
	                                            detachNode(curFromNodeChild, fromNode, ownerComponent);
	                                        }
	                                    }
	                                } else {
	                                    // A <-> A
	                                    // B <-> D <-- We are here
	                                    // C
	                                    // D

	                                    // We need to move the matching node into place
	                                    insertAfter$2(matchingFromEl, curFromNodeChild, fromNode);

	                                    if (curFromNodeChild) {
	                                        detachNode(curFromNodeChild, fromNode, ownerComponent);
	                                    }
	                                }

	                                if ((curToNodeChild.g_ & FLAG_PRESERVE) === 0) {
	                                    morphEl(matchingFromEl, curVFromNodeChild, curToNodeChild, curToNodeKey, ownerComponent, parentComponent);
	                                }
	                            } else {
	                                insertVirtualNodeBefore(curToNodeChild, curToNodeKey, curFromNodeChild, fromNode, ownerComponent, parentComponent);
	                                detachNode(matchingFromEl, fromNode, ownerComponent);
	                            }
	                        } else {
	                            // preserve the node
	                            // but still we need to diff the current from node
	                            insertBefore$3(matchingFromEl, curFromNodeChild, fromNode);
	                            fromNextSibling = curFromNodeChild;
	                        }
	                    }
	                }

	                curToNodeChild = toNextSibling;
	                curFromNodeChild = fromNextSibling;
	                continue;
	            }

	            // The know the target node is not a VComponent node and we know
	            // it is also not a preserve node. Let's now match up the HTML
	            // element, text node, comment, etc.
	            while (curFromNodeChild) {
	                fromNextSibling = nextSibling$1(curFromNodeChild);

	                if (fromComponent = componentByDOMNode.get(curFromNodeChild)) {
	                    // The current "to" element is not associated with a component,
	                    // but the current "from" element is associated with a component

	                    // Even if we destroy the current component in the original
	                    // DOM or not, we still need to skip over it since it is
	                    // not compatible with the current "to" node
	                    curFromNodeChild = fromNextSibling;

	                    if (!globalComponentsContext.q_[fromComponent.id]) {
	                        destroyComponent(fromComponent);
	                    }

	                    continue; // Move to the next "from" node
	                }

	                var curFromNodeType = curFromNodeChild.nodeType;

	                var isCompatible = undefined;

	                if (curFromNodeType === curToNodeType) {
	                    if (curFromNodeType === ELEMENT_NODE) {
	                        // Both nodes being compared are Element nodes
	                        curVFromNodeChild = vElementByDOMNode$2.get(curFromNodeChild);
	                        if (curVFromNodeChild === undefined) {
	                            if (isHydrate === true) {
	                                curVFromNodeChild = virtualizeElement$1(curFromNodeChild);

	                                if (caseInsensitiveCompare(curVFromNodeChild.bC_, curToNodeChild.bC_)) {
	                                    curVFromNodeChild.bC_ = curToNodeChild.bC_;
	                                }
	                            } else {
	                                // Skip over nodes that don't look like ours...
	                                curFromNodeChild = fromNextSibling;
	                                continue;
	                            }
	                        } else if (curFromNodeKey = curVFromNodeChild.bv_) {
	                            // We have a keyed element here but our target VDOM node
	                            // is not keyed so this not doesn't belong
	                            isCompatible = false;
	                        }

	                        isCompatible = isCompatible !== false && compareNodeNames(curVFromNodeChild, curToNodeChild) === true;

	                        if (isCompatible === true) {
	                            // We found compatible DOM elements so transform
	                            // the current "from" node to match the current
	                            // target DOM node.
	                            morphEl(curFromNodeChild, curVFromNodeChild, curToNodeChild, curToNodeKey, ownerComponent, parentComponent);
	                        }
	                    } else if (curFromNodeType === TEXT_NODE || curFromNodeType === COMMENT_NODE) {
	                        // Both nodes being compared are Text or Comment nodes
	                        isCompatible = true;
	                        // Simply update nodeValue on the original node to
	                        // change the text value
	                        if (curFromNodeChild.nodeValue !== curToNodeChild.bt_) {
	                            curFromNodeChild.nodeValue = curToNodeChild.bt_;
	                        }
	                    }
	                }

	                if (isCompatible === true) {
	                    // Advance both the "to" child and the "from" child since we found a match
	                    curToNodeChild = toNextSibling;
	                    curFromNodeChild = fromNextSibling;
	                    continue outer;
	                }

	                if (curFromNodeKey) {
	                    if (globalComponentsContext.o_[parentComponent.id + "-" + curFromNodeKey] === undefined) {
	                        detachNode(curFromNodeChild, fromNode, ownerComponent);
	                    }
	                } else {
	                    detachNode(curFromNodeChild, fromNode, ownerComponent);
	                }

	                curFromNodeChild = fromNextSibling;
	            } // END: while (curFromNodeChild)

	            // If we got this far then we did not find a candidate match for
	            // our "to node" and we exhausted all of the children "from"
	            // nodes. Therefore, we will just append the current "to" node
	            // to the end
	            insertVirtualNodeBefore(curToNodeChild, curToNodeKey, curFromNodeChild, fromNode, ownerComponent, parentComponent);

	            curToNodeChild = toNextSibling;
	            curFromNodeChild = fromNextSibling;
	        }

	        // We have processed all of the "to nodes".
	        if (fromNode.bO_) {
	            // If we are in an unfinished fragment, we have reached the end of the nodes
	            // we were matching up and need to end the fragment
	            fromNode.bO_(curFromNodeChild);
	        } else {
	            // If curFromNodeChild is non-null then we still have some from nodes
	            // left over that need to be removed
	            var fragmentBoundary = fromNode.nodeType === FRAGMENT_NODE ? fromNode.endNode : null;

	            while (curFromNodeChild && curFromNodeChild !== fragmentBoundary) {
	                fromNextSibling = nextSibling$1(curFromNodeChild);

	                if (fromComponent = componentByDOMNode.get(curFromNodeChild)) {
	                    curFromNodeChild = fromNextSibling;
	                    if (!globalComponentsContext.q_[fromComponent.id]) {
	                        destroyComponent(fromComponent);
	                    }
	                    continue;
	                }

	                curVFromNodeChild = vElementByDOMNode$2.get(curFromNodeChild);

	                // For transcluded content, we need to check if the element belongs to a different component
	                // context than the current component and ensure it gets removed from its key index.
	                if (isAutoKey(keysByDOMNode$2.get(fromNode))) {
	                    referenceComponent = parentComponent;
	                } else {
	                    referenceComponent = curVFromNodeChild && curVFromNodeChild.aC_;
	                }

	                detachNode(curFromNodeChild, fromNode, referenceComponent);

	                curFromNodeChild = fromNextSibling;
	            }
	        }
	    }

	    function morphEl(fromEl, vFromEl, toEl, toElKey, ownerComponent, parentComponent) {
	        var nodeName = toEl.bC_;

	        if (isHydrate === true && toElKey) {
	            ownerComponent.m_[toElKey] = fromEl;
	        }

	        var constId = toEl.bE_;
	        if (constId !== undefined && vFromEl.bE_ === constId) {
	            return;
	        }

	        morphAttrs(fromEl, vFromEl, toEl);

	        if (toElKey && globalComponentsContext.n_[parentComponent.id + "-" + toElKey] === true) {
	            // Don't morph the children since they are preserved
	            return;
	        }

	        if (nodeName !== "textarea") {
	            morphChildren(fromEl, toEl, parentComponent);
	        }

	        var specialElHandler = specialElHandlers[nodeName];
	        if (specialElHandler !== undefined) {
	            specialElHandler(fromEl, toEl);
	        }
	    } // END: morphEl(...)

	    morphChildren(fromNode, toNode, toNode.k_);

	    detachedNodes.forEach(function (node) {
	        var detachedFromComponent = detachedByDOMNode.get(node);

	        if (detachedFromComponent !== undefined) {
	            detachedByDOMNode.set(node, undefined);

	            var componentToDestroy = componentByDOMNode.get(node);
	            if (componentToDestroy) {
	                componentToDestroy.destroy();
	            } else if (node.parentNode) {
	                destroyNodeRecursive$2(node, detachedFromComponent !== true && detachedFromComponent);

	                if (eventDelegation._a_(node) != false) {
	                    removeChild$2(node);
	                }
	            }
	        }
	    });
	}

	var morphdom_1 = morphdom;

	var dashedNames = {};

	/**
	 * Helper for generating the string for a style attribute
	 * @param  {[type]} style [description]
	 * @return {[type]}       [description]
	 */
	var helperStyleAttr = function styleHelper(style) {
	    if (!style) {
	        return null;
	    }

	    var type = typeof style;

	    if (type !== "string") {
	        var styles = "";

	        if (Array.isArray(style)) {
	            for (var i = 0, len = style.length; i < len; i++) {
	                var next = styleHelper(style[i]);
	                if (next) styles += next + (next[next.length - 1] !== ";" ? ";" : "");
	            }
	        } else if (type === "object") {
	            for (var name in style) {
	                var value = style[name];
	                if (value != null) {
	                    if (typeof value === "number" && value) {
	                        value += "px";
	                    }

	                    var nameDashed = dashedNames[name];
	                    if (!nameDashed) {
	                        nameDashed = dashedNames[name] = name.replace(/([A-Z])/g, "-$1").toLowerCase();
	                    }
	                    styles += nameDashed + ":" + value + ";";
	                }
	            }
	        }

	        return styles || null;
	    }

	    return style;
	};

	var removeDashes = function removeDashes(str) {
	    return str.replace(/-([a-z])/g, function (match, lower) {
	        return lower.toUpperCase();
	    });
	};

	function KeySequence() {
	    this._Q_ = {};
	}

	KeySequence.prototype = {
	    c_: function (key) {
	        // var len = key.length;
	        // var lastChar = key[len-1];
	        // if (lastChar === ']') {
	        //     key = key.substring(0, len-2);
	        // }
	        var lookup = this._Q_;

	        var currentIndex = lookup[key]++;
	        if (!currentIndex) {
	            lookup[key] = 1;
	            currentIndex = 0;
	            return key;
	        } else {
	            return key + "_" + currentIndex;
	        }
	    }
	};

	var KeySequence_1 = KeySequence;

	var nextComponentIdProvider$1 = utilBrowser._O_;


	function GlobalComponentsContext(out) {
	    this.o_ = {};
	    this.n_ = {};
	    this.q_ = {};
	    this._q_ = undefined;
	    this._H_ = nextComponentIdProvider$1(out);
	}

	GlobalComponentsContext.prototype = {
	    _P_: function () {
	        return new KeySequence_1();
	    }
	};

	var GlobalComponentsContext_1 = GlobalComponentsContext;

	var ComponentsContext_1 = createCommonjsModule(function (module, exports) {



	function ComponentsContext(out, parentComponentsContext) {
	    var globalComponentsContext;
	    var componentDef;

	    if (parentComponentsContext) {
	        globalComponentsContext = parentComponentsContext.l_;
	        componentDef = parentComponentsContext.j_;

	        var nestedContextsForParent;
	        if (!(nestedContextsForParent = parentComponentsContext._L_)) {
	            nestedContextsForParent = parentComponentsContext._L_ = [];
	        }

	        nestedContextsForParent.push(this);
	    } else {
	        globalComponentsContext = out.global.i_;
	        if (globalComponentsContext === undefined) {
	            out.global.i_ = globalComponentsContext = new GlobalComponentsContext_1(out);
	        }
	    }

	    this.l_ = globalComponentsContext;
	    this.i_ = [];
	    this.z_ = out;
	    this.j_ = componentDef;
	    this._L_ = undefined;
	}

	ComponentsContext.prototype = {
	    A_: function (doc) {
	        var componentDefs = this.i_;

	        ComponentsContext._M_(componentDefs, doc);

	        this.z_.emit("_N_");

	        // Reset things stored in global since global is retained for
	        // future renders
	        this.z_.global.i_ = undefined;

	        return componentDefs;
	    }
	};

	function getComponentsContext(out) {
	    return out.i_ || (out.i_ = new ComponentsContext(out));
	}

	module.exports = exports = ComponentsContext;

	exports.D_ = getComponentsContext;
	});
	var ComponentsContext_2 = ComponentsContext_1.D_;

	var attachBubblingEvent$1 = utilBrowser._y_;
	var addDelegatedEventHandler$1 = eventDelegation._z_;



	var FLAG_WILL_RERENDER_IN_BROWSER = 1;
	// var FLAG_HAS_BODY_EL = 2;
	// var FLAG_HAS_HEAD_EL = 4;
	var FLAG_OLD_HYDRATE_NO_CREATE = 8;

	/**
	 * A ComponentDef is used to hold the metadata collected at runtime for
	 * a single component and this information is used to instantiate the component
	 * later (after the rendered HTML has been added to the DOM)
	 */
	function ComponentDef(component, componentId, globalComponentsContext) {
	    this._A_ = globalComponentsContext; // The AsyncWriter that this component is associated with
	    this.k_ = component;
	    this.id = componentId;

	    this._B_ = undefined; // An array of DOM events that need to be added (in sets of three)

	    this._C_ = false;

	    this._D_ = false;
	    this.g_ = 0;

	    this._E_ = 0; // The unique integer to use for the next scoped ID

	    this.Y_ = null;

	    this._F_ = null;
	}

	ComponentDef.prototype = {
	    c_: function (key) {
	        var keySequence = this.Y_ || (this.Y_ = new KeySequence_1());
	        return keySequence.c_(key);
	    },

	    _G_: function (key, bodyOnly) {
	        var lookup = this._F_ || (this._F_ = {});
	        lookup[key] = bodyOnly ? 2 : 1;
	    },

	    /**
	     * This helper method generates a unique and fully qualified DOM element ID
	     * that is unique within the scope of the current component.
	     */
	    elId: function (nestedId) {
	        var id = this.id;

	        if (nestedId == null) {
	            return id;
	        } else {
	            if (typeof nestedId !== "string") {

	                nestedId = String(nestedId);
	                // eslint-disable-next-line no-constant-condition
	            }

	            if (nestedId.indexOf("#") === 0) {
	                id = "#" + id;
	                nestedId = nestedId.substring(1);
	            }

	            return id + "-" + nestedId;
	        }
	    },
	    /**
	     * Returns the next auto generated unique ID for a nested DOM element or nested DOM component
	     */
	    _H_: function () {
	        return this.id + "-c" + this._E_++;
	    },

	    d: function (eventName, handlerMethodName, isOnce, extraArgs) {
	        addDelegatedEventHandler$1(eventName);
	        return attachBubblingEvent$1(this, handlerMethodName, isOnce, extraArgs);
	    },

	    get f_() {
	        return this.k_.f_;
	    }
	};

	ComponentDef._I_ = function (o, types, global, registry) {
	    var id = o[0];
	    var typeName = types[o[1]];
	    var input = o[2];
	    var extra = o[3];

	    var isLegacy = extra.l;
	    var state = extra.s;
	    var componentProps = extra.w;
	    var flags = extra.f;

	    var component = typeName /* legacy */ && registry._J_(typeName, id, isLegacy);

	    // Prevent newly created component from being queued for update since we area
	    // just building it from the server info
	    component.U_ = true;

	    if (!isLegacy && flags & FLAG_WILL_RERENDER_IN_BROWSER && !(flags & FLAG_OLD_HYDRATE_NO_CREATE)) {
	        if (component.onCreate) {
	            component.onCreate(input, { global: global });
	        }
	        if (component.onInput) {
	            input = component.onInput(input, { global: global }) || input;
	        }
	    } else {
	        if (state) {
	            var undefinedPropNames = extra.u;
	            if (undefinedPropNames) {
	                undefinedPropNames.forEach(function (undefinedPropName) {
	                    state[undefinedPropName] = undefined;
	                });
	            }
	            // We go through the setter here so that we convert the state object
	            // to an instance of `State`
	            component.state = state;
	        }

	        if (componentProps) {
	            extend(component, componentProps);
	        }
	    }

	    component.Q_ = input;

	    if (extra.b) {
	        component.N_ = extra.b;
	    }

	    var scope = extra.p;
	    var customEvents = extra.e;
	    if (customEvents) {
	        component._v_(customEvents, scope);
	    }

	    component.S_ = global;

	    return {
	        id: id,
	        k_: component,
	        _K_: extra.r,
	        _B_: extra.d,
	        g_: extra.f || 0
	    };
	};

	var ComponentDef_1 = ComponentDef;

	var win = typeof window !== "undefined" ? window : commonjsGlobal;
	var NOOP = win.$W10NOOP = win.$W10NOOP || function () {};

	var constants = {
		NOOP: NOOP
	};

	var constants$1 = constants;

	var getComponentsContext = ComponentsContext_1.D_;

	var w10NOOP = constants$1.NOOP;
	var isArray = Array.isArray;
	var RENDER_BODY_TO_JSON = function () {
	    return w10NOOP;
	};
	var FLAG_WILL_RERENDER_IN_BROWSER$1 = 1;
	var IS_SERVER = typeof window === "undefined";

	function isFunction$1(arg) {
	    return typeof arg == "function";
	}

	function classList(arg, classNames) {
	    var len;

	    if (arg) {
	        if (typeof arg == "string") {
	            if (arg) {
	                classNames.push(arg);
	            }
	        } else if (typeof (len = arg.length) == "number") {
	            for (var i = 0; i < len; i++) {
	                classList(arg[i], classNames);
	            }
	        } else if (typeof arg == "object") {
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
	    deferredRenderer.renderer = function (input, out) {
	        var rendererFunc = handler.renderer || handler._ || handler.render;
	        if (!isFunction$1(rendererFunc)) {
	            throw Error("Invalid renderer");
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

	var helpers$1 = {
	    /**
	     * Internal helper method to prevent null/undefined from being written out
	     * when writing text that resolves to null/undefined
	     * @private
	     */
	    s: function strHelper(str) {
	        return str == null ? "" : str.toString();
	    },

	    /**
	     * Internal helper method to handle loops without a status variable
	     * @private
	     */
	    f: function forEachHelper(array, callback) {
	        var i;

	        if (array == null) ; else if (isArray(array)) {
	            for (i = 0; i < array.length; i++) {
	                callback(array[i], i, array);
	            }
	            // eslint-disable-next-line no-constant-condition
	        } else if (typeof array.forEach === "function") {
	            array.forEach(callback);
	        } else if (typeof array.next === "function") {
	            i = 0;
	            do {
	                var result = array.next();
	                callback(result.value, i++, array);
	            } while (!result.done);
	        } else if (isFunction$1(array)) {
	            // Also allow the first argument to be a custom iterator function
	            array(callback);
	            // eslint-disable-next-line no-constant-condition
	        }
	    },

	    /**
	     * Helper to render a dynamic tag
	     */
	    d: function dynamicTag(out, tag, getAttrs, renderBody, args, props, componentDef, key, customEvents) {
	        if (tag) {
	            var attrs = getAttrs && getAttrs();
	            var component = componentDef && componentDef.k_;
	            if (typeof tag === "string") {
	                if (customEvents) {
	                    if (!props) {
	                        props = {};
	                    }

	                    customEvents.forEach(function (eventArray) {
	                        props["on" + eventArray[0]] = componentDef.d(eventArray[0], eventArray[1], eventArray[2], eventArray[3]);
	                    });
	                }

	                if (renderBody) {
	                    out.aK_(tag, attrs, key, component, 0, 0, props);
	                    renderBody(out);
	                    out.aL_();
	                } else {
	                    out.aM_(tag, attrs, key, component, 0, 0, props);
	                }
	            } else {
	                var defaultAttrs = renderBody ? { renderBody: renderBody } : {};
	                if (attrs == null) {
	                    attrs = defaultAttrs;
	                } else if (typeof attrs === "object") {
	                    attrs = Object.keys(attrs).reduce(function (r, key) {
	                        r[removeDashes(key)] = attrs[key];
	                        return r;
	                    }, defaultAttrs);
	                }

	                if (tag._ || tag.renderer || tag.render) {
	                    var renderer = tag._ || tag.renderer || tag.render;
	                    out.c(componentDef, key, customEvents);
	                    renderer(attrs, out);
	                    out.ax_ = null;
	                } else {
	                    var render = tag && tag.renderBody || tag;
	                    var isFn = typeof render === "function";

	                    if (render.safeHTML) {

	                        out.write(tag.safeHTML);
	                        // eslint-disable-next-line no-constant-condition

	                        return;
	                    }

	                    if (isFn) {
	                        var flags = componentDef ? componentDef.g_ : 0;
	                        var willRerender = flags & FLAG_WILL_RERENDER_IN_BROWSER$1;
	                        var isW10NOOP = render === w10NOOP;
	                        var preserve = IS_SERVER ? willRerender : isW10NOOP;
	                        out.aN_(key, component, preserve);
	                        if (!isW10NOOP && isFn) {
	                            var componentsContext = getComponentsContext(out);
	                            var parentComponentDef = componentsContext.j_;
	                            var globalContext = componentsContext.l_;
	                            componentsContext.j_ = new ComponentDef_1(component, parentComponentDef.id + "-" + parentComponentDef.c_(key), globalContext);
	                            render.toJSON = RENDER_BODY_TO_JSON;

	                            if (args) {
	                                render.apply(null, [out].concat(args, attrs));
	                            } else {
	                                render(out, attrs);
	                            }

	                            componentsContext.j_ = parentComponentDef;
	                        }
	                        out.aO_();
	                    } else {
	                        out.error("Invalid dynamic tag value");
	                    }
	                }
	            }
	        } else if (renderBody) {
	            var compFlags = componentDef ? componentDef.g_ : 0;
	            out.aN_(key, component, IS_SERVER ? compFlags & FLAG_WILL_RERENDER_IN_BROWSER$1 : render === w10NOOP);
	            renderBody(out);
	            out.aO_();
	        }
	    },

	    /**
	     * Helper to load a custom tag
	     */
	    t: function loadTagHelper(renderer) {
	        if (renderer) {
	            renderer = resolveRenderer(renderer);
	        }

	        return function wrappedRenderer(input, out, componentDef, key, customEvents) {
	            out.c(componentDef, key, customEvents);
	            renderer(input, out);
	            out.ax_ = null;
	        };
	    },

	    /**
	     * classList(a, b, c, ...)
	     * Joines a list of class names with spaces. Empty class names are omitted.
	     *
	     * classList('a', undefined, 'b') --> 'a b'
	     *
	     */
	    cl: function classListHelper() {
	        var classNames = [];
	        classList(arguments, classNames);
	        return classNames.join(" ");
	    }
	};

	var helpers_1 = helpers$1;

	var VElement$2 = vdom.aT_;
	var VText$1 = vdom.aW_;




	var classList$1 = helpers_1.cl;

	var helpers$2 = extend({
	    e: function (tagName, attrs, key, component, childCount, flags, props) {
	        return new VElement$2(tagName, attrs, key, component, childCount, flags, props);
	    },

	    t: function (value) {
	        return new VText$1(value);
	    },

	    const: function (id) {
	        var i = 0;
	        return function () {
	            return id + i++;
	        };
	    },

	    /**
	     * Internal helper method to handle the "class" attribute. The value can either
	     * be a string, an array or an object. For example:
	     *
	     * ca('foo bar') ==> ' class="foo bar"'
	     * ca({foo: true, bar: false, baz: true}) ==> ' class="foo baz"'
	     * ca(['foo', 'bar']) ==> ' class="foo bar"'
	     */
	    ca: function (classNames) {
	        if (!classNames) {
	            return null;
	        }

	        if (typeof classNames === "string") {
	            return classNames;
	        } else {
	            return classList$1(classNames);
	        }
	    },

	    as: helperAttrs
	}, helpers_1);

	var helpers_1$1 = helpers$2;

	/**
	 * Helper for processing dynamic attributes
	 */
	var helperAttrs = function (attributes) {
	    if (typeof attributes === "string") {
	        return parseAttrs(attributes);
	        // eslint-disable-next-line no-constant-condition
	    }

	    if (attributes && (attributes.style || attributes.class)) {
	        var newAttributes = {};
	        Object.keys(attributes).forEach(function (name) {
	            if (name === "class") {
	                newAttributes[name] = classAttr(attributes[name]);
	            } else if (name === "style") {
	                newAttributes[name] = helperStyleAttr(attributes[name]);
	            } else {
	                newAttributes[name] = attributes[name];
	            }
	        });
	        return newAttributes;
	    }
	    return attributes;
	};


	var classAttr = helpers_1$1.ca;
	var parseContainer;
	function parseAttrs(str) {
	    if (str === "") {
	        return {};
	    }

	    parseContainer = parseContainer || document.createElement("div");
	    parseContainer.innerHTML = "<a " + str + ">";
	    var attrs = parseContainer.firstChild.attributes;
	    var result = {};
	    var attr;

	    for (var len = attrs.length, i = 0; i < len; i++) {
	        attr = attrs[i];
	        result[attr.name] = attr.value;
	    }

	    return result;
	}

	var VElement$3 = vdom.aT_;
	var VDocumentFragment$1 = vdom.aU_;
	var VComment$1 = vdom.aV_;
	var VText$2 = vdom.aW_;
	var VComponent$1 = vdom.aX_;
	var VFragment$1 = vdom.aY_;
	var virtualizeHTML$1 = vdom.aZ_;

	var defaultDocument$2 = vdom.b__;



	var EVENT_UPDATE = "update";
	var EVENT_FINISH = "finish";

	function State(tree) {
	    this.ba_ = new src();
	    this.bb_ = tree;
	    this.bc_ = false;
	}

	function AsyncVDOMBuilder(globalData, parentNode, parentOut) {
	    if (!parentNode) {
	        parentNode = new VDocumentFragment$1();
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

	var proto$2 = AsyncVDOMBuilder.prototype = {
	    aP_: true,
	    X_: defaultDocument$2,

	    bc: function (component, key, ownerComponent) {
	        var vComponent = new VComponent$1(component, key, ownerComponent);
	        return this.bk_(vComponent, 0, true);
	    },

	    p_: function (component, key, ownerComponent) {
	        var vComponent = new VComponent$1(component, key, ownerComponent, true);
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
	        var element = new VElement$3(tagName, attrs, key, component, childCount, flags, props);
	        return this.bk_(element, childCount);
	    },

	    aM_: function (tagName, attrs, key, component, childCount, flags, props) {
	        return this.element(tagName, helperAttrs(attrs), key, component, childCount, flags, props);
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

	        this.aA_.bl_(new VText$2(text));
	        return this;
	    },

	    comment: function (comment) {
	        return this.node(new VComment$1(comment));
	    },

	    html: function (html) {
	        if (html != null) {
	            var vdomNode = virtualizeHTML$1(html, this.X_ || document);
	            this.node(vdomNode);
	        }

	        return this;
	    },

	    beginElement: function (tagName, attrs, key, component, childCount, flags, props) {
	        var element = new VElement$3(tagName, attrs, key, component, childCount, flags, props);
	        this.bk_(element, childCount, true);
	        return this;
	    },

	    aK_: function (tagName, attrs, key, component, childCount, flags, props) {
	        return this.beginElement(tagName, helperAttrs(attrs), key, component, childCount, flags, props);
	    },

	    aN_: function (key, component, preserve) {
	        var fragment = new VFragment$1(key, component, preserve);
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
	            events.emit(EVENT_UPDATE, new RenderResult_1(this));
	        }
	    },

	    C_: function () {
	        return this.J_.bb_;
	    },

	    aQ_: function () {
	        return this.bq_ || (this.bq_ = new RenderResult_1(this));
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
	            morphdom_1(node, vdomTree, doc, this.i_);
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

	proto$2.e = proto$2.element;
	proto$2.be = proto$2.beginElement;
	proto$2.ee = proto$2.aL_ = proto$2.endElement;
	proto$2.t = proto$2.text;
	proto$2.h = proto$2.w = proto$2.write = proto$2.html;

	var AsyncVDOMBuilder_1 = AsyncVDOMBuilder;

	function safeRender(renderFunc, finalData, finalOut, shouldEnd) {
	    try {
	        renderFunc(finalData, finalOut);

	        if (shouldEnd) {
	            finalOut.end();
	        }
	    } catch (err) {
	        var actualEnd = finalOut.end;
	        finalOut.end = function () {};

	        setTimeout(function () {
	            finalOut.end = actualEnd;
	            finalOut.error(err);
	        }, 0);
	    }
	    return finalOut;
	}

	var renderable = function (target, renderer) {
	    var renderFunc = renderer && (renderer.renderer || renderer.render || renderer);
	    var createOut = target.createOut || renderer.createOut || createOut_1;

	    return extend(target, {
	        createOut: createOut,

	        renderToString: function (data, callback) {
	            var localData = data || {};
	            var render = renderFunc || this._;
	            var globalData = localData.$global;
	            var out = createOut(globalData);

	            out.global.template = this;

	            if (globalData) {
	                localData.$global = undefined;
	            }

	            if (callback) {
	                out.on("finish", function () {
	                    callback(null, out.toString(), out);
	                }).once("error", callback);

	                return safeRender(render, localData, out, true);
	            } else {
	                out.sync();
	                render(localData, out);
	                return out.toString();
	            }
	        },

	        renderSync: function (data) {
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
	            return out.aQ_();
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
	        render: function (data, out) {
	            var callback;
	            var finalOut;
	            var finalData;
	            var globalData;
	            var render = renderFunc || this._;
	            var shouldBuffer = this.aR_;
	            var shouldEnd = true;

	            if (data) {
	                finalData = data;
	                if (globalData = data.$global) {
	                    finalData.$global = undefined;
	                }
	            } else {
	                finalData = {};
	            }

	            if (out && out.aP_) {
	                finalOut = out;
	                shouldEnd = false;
	                extend(out.global, globalData);
	            } else if (typeof out == "function") {
	                finalOut = createOut(globalData);
	                callback = out;
	            } else {
	                finalOut = createOut(globalData, // global
	                out, // writer(AsyncStream) or parentNode(AsyncVDOMBuilder)
	                undefined, // parentOut
	                shouldBuffer // ignored by AsyncVDOMBuilder
	                );
	            }

	            if (callback) {
	                finalOut.on("finish", function () {
	                    callback(null, finalOut.aQ_());
	                }).once("error", callback);
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

	function createOut$1(globalData, parent, parentOut) {
	    return new AsyncVDOMBuilder_1(globalData, parent, parentOut);
	}

	var Template_prototype = Template.prototype = {
	    createOut: createOut$1
	};

	renderable(Template_prototype);

	var Template_1 = Template;
	var aS_ = createOut$1;

	createOut_1.aG_(createOut$1);

	var vdom$1 = {
		t: t,
		Template: Template_1,
		aS_: aS_
	};

	var vdom$2 = vdom$1;

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
	    } else if (info.type === 'NOOP') {
	        return constants.NOOP;
	    } else {
	        throw new Error('Bad type');
	    }
	}

	var finalize = function finalize(outer) {
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

	var finalize$1 = finalize;

	function ensure(state, propertyName) {
	    var proto = state.constructor.prototype;
	    if (!(propertyName in proto)) {
	        Object.defineProperty(proto, propertyName, {
	            get: function () {
	                return this._u_[propertyName];
	            },
	            set: function (value) {
	                this._f_(propertyName, value, false /* ensure:false */);
	            }
	        });
	    }
	}

	function State$1(component) {
	    this.k_ = component;
	    this._u_ = {};

	    this.V_ = false;
	    this._l_ = null;
	    this._k_ = null;
	    this._T_ = null; // An object that we use to keep tracking of state properties that were forced to be dirty

	    Object.seal(this);
	}

	State$1.prototype = {
	    I_: function () {
	        var self = this;

	        self.V_ = false;
	        self._l_ = null;
	        self._k_ = null;
	        self._T_ = null;
	    },

	    _d_: function (newState) {
	        var state = this;
	        var key;

	        var rawState = this._u_;

	        for (key in rawState) {
	            if (!(key in newState)) {
	                state._f_(key, undefined, false /* ensure:false */
	                , false /* forceDirty:false */
	                );
	            }
	        }

	        for (key in newState) {
	            state._f_(key, newState[key], true /* ensure:true */
	            , false /* forceDirty:false */
	            );
	        }
	    },
	    _f_: function (name, value, shouldEnsure, forceDirty) {
	        var rawState = this._u_;

	        if (shouldEnsure) {
	            ensure(this, name);
	        }

	        if (forceDirty) {
	            var forcedDirtyState = this._T_ || (this._T_ = {});
	            forcedDirtyState[name] = true;
	        } else if (rawState[name] === value) {
	            return;
	        }

	        if (!this.V_) {
	            // This is the first time we are modifying the component state
	            // so introduce some properties to do some tracking of
	            // changes to the state
	            this.V_ = true; // Mark the component state as dirty (i.e. modified)
	            this._l_ = rawState;
	            this._u_ = rawState = extend({}, rawState);
	            this._k_ = {};
	            this.k_._e_();
	        }

	        this._k_[name] = value;

	        if (value === undefined) {
	            // Don't store state properties with an undefined or null value
	            delete rawState[name];
	        } else {
	            // Otherwise, store the new value in the component state
	            rawState[name] = value;
	        }
	    },
	    toJSON: function () {
	        return this._u_;
	    }
	};

	var State_1 = State$1;

	var listenerTracker = createCommonjsModule(function (module, exports) {
	var INDEX_EVENT = 0;
	var INDEX_USER_LISTENER = 1;
	var INDEX_WRAPPED_LISTENER = 2;
	var DESTROY = "destroy";

	function isNonEventEmitter(target) {
	  return !target.once;
	}

	function EventEmitterWrapper(target) {
	    this.$__target = target;
	    this.$__listeners = [];
	    this.$__subscribeTo = null;
	}

	EventEmitterWrapper.prototype = {
	    $__remove: function(test, testWrapped) {
	        var target = this.$__target;
	        var listeners = this.$__listeners;

	        this.$__listeners = listeners.filter(function(curListener) {
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
	        var subscribeTo = this.$__subscribeTo;

	        if (!this.$__listeners.length && subscribeTo) {
	            var self = this;
	            var subscribeToList = subscribeTo.$__subscribeToList;
	            subscribeTo.$__subscribeToList = subscribeToList.filter(function(cur) {
	                return cur !== self;
	            });
	        }
	    },

	    on: function(event, listener) {
	        this.$__target.on(event, listener);
	        this.$__listeners.push([event, listener]);
	        return this;
	    },

	    once: function(event, listener) {
	        var self = this;

	        // Handling a `once` event listener is a little tricky since we need to also
	        // do our own cleanup if the `once` event is emitted. Therefore, we need
	        // to wrap the user's listener function with our own listener function.
	        var wrappedListener = function() {
	            self.$__remove(function(event, listenerFunc) {
	                return wrappedListener === listenerFunc;
	            }, true /* We are removing the wrapped listener */);

	            listener.apply(this, arguments);
	        };

	        this.$__target.once(event, wrappedListener);
	        this.$__listeners.push([event, listener, wrappedListener]);
	        return this;
	    },

	    removeListener: function(event, listener) {
	        if (typeof event === 'function') {
	            listener = event;
	            event = null;
	        }

	        if (listener && event) {
	            this.$__remove(function(curEvent, curListener) {
	                return event === curEvent && listener === curListener;
	            });
	        } else if (listener) {
	            this.$__remove(function(curEvent, curListener) {
	                return listener === curListener;
	            });
	        } else if (event) {
	            this.removeAllListeners(event);
	        }

	        return this;
	    },

	    removeAllListeners: function(event) {

	        var listeners = this.$__listeners;
	        var target = this.$__target;

	        if (event) {
	            this.$__remove(function(curEvent, curListener) {
	                return event === curEvent;
	            });
	        } else {
	            for (var i = listeners.length - 1; i >= 0; i--) {
	                var cur = listeners[i];
	                target.removeListener(cur[INDEX_EVENT], cur[INDEX_USER_LISTENER]);
	            }
	            this.$__listeners.length = 0;
	        }

	        return this;
	    }
	};

	function EventEmitterAdapter(target) {
	    this.$__target = target;
	}

	EventEmitterAdapter.prototype = {
	    on: function(event, listener) {
	        this.$__target.addEventListener(event, listener);
	        return this;
	    },

	    once: function(event, listener) {
	        var self = this;

	        // need to save this so we can remove it below
	        var onceListener = function() {
	          self.$__target.removeEventListener(event, onceListener);
	          listener();
	        };
	        this.$__target.addEventListener(event, onceListener);
	        return this;
	    },

	    removeListener: function(event, listener) {
	        this.$__target.removeEventListener(event, listener);
	        return this;
	    }
	};

	function SubscriptionTracker() {
	    this.$__subscribeToList = [];
	}

	SubscriptionTracker.prototype = {

	    subscribeTo: function(target, options) {
	        var addDestroyListener = !options || options.addDestroyListener !== false;
	        var wrapper;
	        var nonEE;
	        var subscribeToList = this.$__subscribeToList;

	        for (var i=0, len=subscribeToList.length; i<len; i++) {
	            var cur = subscribeToList[i];
	            if (cur.$__target === target) {
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
	                        if (subscribeToList[i].$__target === target) {
	                            subscribeToList.splice(i, 1);
	                            break;
	                        }
	                    }
	                });
	            }

	            // Store a reference to the parent SubscriptionTracker so that we can do cleanup
	            // if the EventEmitterWrapper instance becomes empty (i.e., no active listeners)
	            wrapper.$__subscribeTo = this;
	            subscribeToList.push(wrapper);
	        }

	        return wrapper;
	    },

	    removeAllListeners: function(target, event) {
	        var subscribeToList = this.$__subscribeToList;
	        var i;

	        if (target) {
	            for (i = subscribeToList.length - 1; i >= 0; i--) {
	                var cur = subscribeToList[i];
	                if (cur.$__target === target) {
	                    cur.removeAllListeners(event);

	                    if (!cur.$__listeners.length) {
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
	          wrapper.$__listeners.length = 0;
	      });
	    }

	    return wrapper;
	};

	exports.createTracker = function() {
	    return new SubscriptionTracker();
	};
	});
	var listenerTracker_1 = listenerTracker.wrap;
	var listenerTracker_2 = listenerTracker.createTracker;

	/* globals window */

	var win$1 = window;
	var setImmediate = win$1.setImmediate;

	if (!setImmediate) {
	    if (win$1.postMessage) {
	        var queue = [];
	        var messageName = "si";
	        win$1.addEventListener("message", function (event) {
	            var source = event.source;
	            if (source == win$1 || !source && event.data === messageName) {
	                event.stopPropagation();
	                if (queue.length > 0) {
	                    var fn = queue.shift();
	                    fn();
	                }
	            }
	        }, true);

	        setImmediate = function (fn) {
	            queue.push(fn);
	            win$1.postMessage(messageName, "*");
	        };
	    } else {
	        setImmediate = setTimeout;
	    }
	}

	var nextTickBrowser = setImmediate;

	var updatesScheduled = false;
	var batchStack = []; // A stack of batched updates
	var unbatchedQueue = []; // Used for scheduled batched updates



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

	    nextTickBrowser(updateUnbatchedComponents);
	}

	function updateComponents(queue) {
	    // Loop over the components in the queue and update them.
	    // NOTE: It is okay if the queue grows during the iteration
	    //       since we will still get to them at the end
	    for (var i = 0; i < queue.length; i++) {
	        var component = queue[i];
	        component._w_(); // Do the actual component update
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
	        aB_: null
	    };

	    batchStack.push(batch);

	    try {
	        func();
	    } finally {
	        try {
	            // Update all of the components that where queued up
	            // in this batch (if any)
	            if (batch.aB_) {
	                updateComponents(batch.aB_);
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
	        var batch = batchStack[batchStackLen - 1];

	        // We default the batch queue to null to avoid creating an Array instance
	        // unnecessarily. If it is null then we create a new Array, otherwise
	        // we push it onto the existing Array queue
	        if (batch.aB_) {
	            batch.aB_.push(component);
	        } else {
	            batch.aB_ = [component];
	        }
	    } else {
	        // We are not within a batched update. We need to schedule a batch update
	        // for the process.nextTick (if that hasn't been done already) and we will
	        // add the component to the unbatched queued
	        scheduleUpdates();
	        unbatchedQueue.push(component);
	    }
	}

	var _i_ = queueComponentUpdate;
	var _o_ = batchUpdate;

	var updateManager = {
		_i_: _i_,
		_o_: _o_
	};

	var getComponentsContext$1 = ComponentsContext_1.D_;

	var componentLookup$2 = utilBrowser.h_;
	var emitLifecycleEvent$1 = utilBrowser.E_;
	var destroyNodeRecursive$3 = utilBrowser.F_;








	var componentsByDOMNode$1 = domData.G_;
	var CONTEXT_KEY = "__subtree_context__";

	var slice$1 = Array.prototype.slice;

	var COMPONENT_SUBSCRIBE_TO_OPTIONS;
	var NON_COMPONENT_SUBSCRIBE_TO_OPTIONS = {
	    addDestroyListener: false
	};

	var emit = src.prototype.emit;
	var ELEMENT_NODE$1 = 1;

	function removeListener(removeEventListenerHandle) {
	    removeEventListenerHandle();
	}

	function walkFragments(fragment) {
	    var node;

	    while (fragment) {
	        node = fragment.firstChild;

	        if (!node) {
	            break;
	        }

	        fragment = node.fragment;
	    }

	    return node;
	}

	function handleCustomEventWithMethodListener(component, targetMethodName, args, extraArgs) {
	    // Remove the "eventType" argument
	    args.push(component);

	    if (extraArgs) {
	        args = extraArgs.concat(args);
	    }

	    var targetComponent = componentLookup$2[component.H_];
	    var targetMethod = typeof targetMethodName === "function" ? targetMethodName : targetComponent[targetMethodName];
	    if (!targetMethod) {
	        throw Error("Method not found: " + targetMethodName);
	    }

	    targetMethod.apply(targetComponent, args);
	}

	function resolveKeyHelper(key, index) {
	    return index ? key + "_" + index : key;
	}

	function resolveComponentIdHelper(component, key, index) {
	    return component.id + "-" + resolveKeyHelper(key, index);
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
	            var handlerMethodName = "update_" + propName;

	            handlerMethod = component[handlerMethodName];
	            if (handlerMethod) {
	                (handlers || (handlers = [])).push([propName, handlerMethod]);
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

	        handlers.forEach(function (handler) {
	            var propertyName = handler[0];
	            handlerMethod = handler[1];

	            var newValue = stateChanges[propertyName];
	            var oldValue = oldState[propertyName];
	            handlerMethod.call(component, newValue, oldValue);
	        });

	        emitLifecycleEvent$1(component, "update");

	        component.I_();
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

	        for (var i = 0; i < len; i++) {
	            var key = oldKeys[i];
	            if (oldInput[key] !== newInput[key]) {
	                return true;
	            }
	        }
	    }

	    return false;
	}

	var componentProto;

	/**
	 * Base component type.
	 *
	 * NOTE: Any methods that are prefixed with an underscore should be considered private!
	 */
	function Component(id) {
	    src.call(this);
	    this.id = id;
	    this.J_ = null;
	    this.K_ = null;
	    this.L_ = null;
	    this.M_ = null;
	    this.N_ = null; // Used to keep track of bubbling DOM events for components rendered on the server
	    this.O_ = null;
	    this.H_ = null;
	    this.P_ = null;
	    this.Q_ = undefined;
	    this.R_ = false;
	    this.S_ = undefined;

	    this.T_ = false;
	    this.U_ = false;
	    this.V_ = false;
	    this.W_ = false;

	    this.X_ = undefined;

	    this.m_ = {};
	    this.Y_ = undefined;
	}

	Component.prototype = componentProto = {
	    Z_: true,

	    subscribeTo: function (target) {
	        if (!target) {
	            throw TypeError();
	        }

	        var subscriptions = this.L_ || (this.L_ = new listenerTracker());

	        var subscribeToOptions = target.Z_ ? COMPONENT_SUBSCRIBE_TO_OPTIONS : NON_COMPONENT_SUBSCRIBE_TO_OPTIONS;

	        return subscriptions.subscribeTo(target, subscribeToOptions);
	    },

	    emit: function (eventType) {
	        var customEvents = this.O_;
	        var target;

	        if (customEvents && (target = customEvents[eventType])) {
	            var targetMethodName = target[0];
	            var isOnce = target[1];
	            var extraArgs = target[2];
	            var args = slice$1.call(arguments, 1);

	            handleCustomEventWithMethodListener(this, targetMethodName, args, extraArgs);

	            if (isOnce) {
	                delete customEvents[eventType];
	            }
	        }

	        if (this.listenerCount(eventType)) {
	            return emit.apply(this, arguments);
	        }
	    },
	    getElId: function (key, index) {
	        return resolveComponentIdHelper(this, key, index);
	    },
	    getEl: function (key, index) {
	        if (key) {
	            var resolvedKey = resolveKeyHelper(key, index);
	            var keyedElement = this.m_["@" + resolvedKey];

	            if (!keyedElement) {
	                var keyedComponent = this.getComponent(resolvedKey);

	                if (keyedComponent) {

	                    return walkFragments(keyedComponent.K_);
	                    // eslint-disable-next-line no-constant-condition
	                }
	            }

	            return keyedElement;
	        } else {
	            return this.el;
	        }
	    },
	    getEls: function (key) {
	        key = key + "[]";

	        var els = [];
	        var i = 0;
	        var el;
	        while (el = this.getEl(key, i)) {
	            els.push(el);
	            i++;
	        }
	        return els;
	    },
	    getComponent: function (key, index) {
	        var rootNode = this.m_[resolveKeyHelper(key, index)];
	        if (/\[\]$/.test(key)) {
	            rootNode = rootNode && rootNode[Object.keys(rootNode)[0]];
	            // eslint-disable-next-line no-constant-condition
	        }
	        return rootNode && componentsByDOMNode$1.get(rootNode);
	    },
	    getComponents: function (key) {
	        var lookup = this.m_[key + "[]"];
	        return lookup ? Object.keys(lookup).map(function (key) {
	            return componentsByDOMNode$1.get(lookup[key]);
	        }).filter(Boolean) : [];
	    },
	    destroy: function () {
	        if (this.T_) {
	            return;
	        }

	        var root = this.K_;

	        this.___();

	        var nodes = root.nodes;

	        nodes.forEach(function (node) {
	            destroyNodeRecursive$3(node);

	            if (eventDelegation._a_(node) !== false) {
	                node.parentNode.removeChild(node);
	            }
	        });

	        root.detached = true;

	        delete componentLookup$2[this.id];
	        this.m_ = {};
	    },

	    ___: function () {
	        if (this.T_) {
	            return;
	        }

	        emitLifecycleEvent$1(this, "destroy");
	        this.T_ = true;

	        componentsByDOMNode$1.set(this.K_, undefined);

	        this.K_ = null;

	        // Unsubscribe from all DOM events
	        this._b_();

	        var subscriptions = this.L_;
	        if (subscriptions) {
	            subscriptions.removeAllListeners();
	            this.L_ = null;
	        }
	    },

	    isDestroyed: function () {
	        return this.T_;
	    },
	    get state() {
	        return this.J_;
	    },
	    set state(newState) {
	        var state = this.J_;
	        if (!state && !newState) {
	            return;
	        }

	        if (!state) {
	            state = this.J_ = new this._c_(this);
	        }

	        state._d_(newState || {});

	        if (state.V_) {
	            this._e_();
	        }

	        if (!newState) {
	            this.J_ = null;
	        }
	    },
	    setState: function (name, value) {
	        var state = this.J_;

	        if (typeof name == "object") {
	            // Merge in the new state with the old state
	            var newState = name;
	            for (var k in newState) {
	                if (newState.hasOwnProperty(k)) {
	                    state._f_(k, newState[k], true /* ensure:true */);
	                }
	            }
	        } else {
	            state._f_(name, value, true /* ensure:true */);
	        }
	    },

	    setStateDirty: function (name, value) {
	        var state = this.J_;

	        if (arguments.length == 1) {
	            value = state[name];
	        }

	        state._f_(name, value, true /* ensure:true */
	        , true /* forceDirty:true */
	        );
	    },

	    replaceState: function (newState) {
	        this.J_._d_(newState);
	    },

	    get input() {
	        return this.Q_;
	    },
	    set input(newInput) {
	        if (this.W_) {
	            this.Q_ = newInput;
	        } else {
	            this._g_(newInput);
	        }
	    },

	    _g_: function (newInput, onInput, out) {
	        onInput = onInput || this.onInput;
	        var updatedInput;

	        var oldInput = this.Q_;
	        this.Q_ = undefined;
	        this._h_ = out && out[CONTEXT_KEY] || this._h_;

	        if (onInput) {
	            // We need to set a flag to preview `this.input = foo` inside
	            // onInput causing infinite recursion
	            this.W_ = true;
	            updatedInput = onInput.call(this, newInput || {}, out);
	            this.W_ = false;
	        }

	        newInput = this.P_ = updatedInput || newInput;

	        if (this.V_ = checkInputChanged(this, oldInput, newInput)) {
	            this._e_();
	        }

	        if (this.Q_ === undefined) {
	            this.Q_ = newInput;
	            if (newInput && newInput.$global) {
	                this.S_ = newInput.$global;
	            }
	        }

	        return newInput;
	    },

	    forceUpdate: function () {
	        this.V_ = true;
	        this._e_();
	    },

	    _e_: function () {
	        if (!this.U_) {
	            this.U_ = true;
	            updateManager._i_(this);
	        }
	    },

	    update: function () {
	        if (this.T_ === true || this._j_ === false) {
	            return;
	        }

	        var input = this.Q_;
	        var state = this.J_;

	        if (this.V_ === false && state !== null && state.V_ === true) {
	            if (processUpdateHandlers(this, state._k_, state._l_)) {
	                state.V_ = false;
	            }
	        }

	        if (this._j_ === true) {
	            // The UI component is still dirty after process state handlers
	            // then we should rerender

	            if (this.shouldUpdate(input, state) !== false) {
	                this._m_();
	            }
	        }

	        this.I_();
	    },

	    get _j_() {
	        return this.V_ === true || this.J_ !== null && this.J_.V_ === true;
	    },

	    I_: function () {
	        this.V_ = false;
	        this.U_ = false;
	        this.P_ = null;
	        var state = this.J_;
	        if (state) {
	            state.I_();
	        }
	    },

	    shouldUpdate: function () {
	        return true;
	    },

	    E_: function (eventType, eventArg1, eventArg2) {
	        emitLifecycleEvent$1(this, eventType, eventArg1, eventArg2);
	    },

	    _m_: function () {
	        var self = this;
	        var renderer = self._n_;

	        if (!renderer) {
	            throw TypeError();
	        }

	        var input = this.P_ || this.Q_;

	        updateManager._o_(function () {
	            self._p_(input, false).afterInsert(self.X_);
	        });

	        this.I_();
	    },

	    _p_: function (input, isHydrate) {
	        var doc = this.X_;
	        var globalData = this.S_;
	        var rootNode = this.K_;
	        var renderer = this._n_;
	        var createOut = renderer.createOut || createOut_1;
	        var out = createOut(globalData);
	        out.sync();
	        out.X_ = this.X_;
	        out[CONTEXT_KEY] = this._h_;

	        var componentsContext = getComponentsContext$1(out);
	        var globalComponentsContext = componentsContext.l_;
	        globalComponentsContext._q_ = this;
	        globalComponentsContext._r_ = isHydrate;

	        renderer(input, out);

	        var result = new RenderResult_1(out);

	        var targetNode = out.C_().a_;

	        morphdom_1(rootNode, targetNode, doc, componentsContext);

	        return result;
	    },

	    _s_: function () {
	        var root = this.K_;
	        root.remove();
	        return root;
	    },

	    _b_: function () {
	        var eventListenerHandles = this.M_;
	        if (eventListenerHandles) {
	            eventListenerHandles.forEach(removeListener);
	            this.M_ = null;
	        }
	    },

	    get _t_() {
	        var state = this.J_;
	        return state && state._u_;
	    },

	    _v_: function (customEvents, scope) {
	        var finalCustomEvents = this.O_ = {};
	        this.H_ = scope;

	        customEvents.forEach(function (customEvent) {
	            var eventType = customEvent[0];
	            var targetMethodName = customEvent[1];
	            var isOnce = customEvent[2];
	            var extraArgs = customEvent[3];

	            finalCustomEvents[eventType] = [targetMethodName, isOnce, extraArgs];
	        });
	    },

	    get el() {
	        return walkFragments(this.K_);
	    },

	    get els() {
	        return (this.K_ ? this.K_.nodes : []).filter(function (el) {
	            return el.nodeType === ELEMENT_NODE$1;
	        });
	        // eslint-disable-next-line no-constant-condition
	    }
	};

	componentProto.elId = componentProto.getElId;
	componentProto._w_ = componentProto.update;
	componentProto._x_ = componentProto.destroy;

	// Add all of the following DOM methods to Component.prototype:
	// - appendTo(referenceEl)
	// - replace(referenceEl)
	// - replaceChildrenOf(referenceEl)
	// - insertBefore(referenceEl)
	// - insertAfter(referenceEl)
	// - prependTo(referenceEl)
	domInsert(componentProto, function getEl(component) {
	    return component._s_();
	}, function afterInsert(component) {
	    return component;
	});

	inherit_1(Component, src);

	var Component_1 = Component;

	/* jshint newcap:false */





	var defineComponent = function defineComponent(def, renderer) {
	    if (def.Z_) {
	        return def;
	    }

	    var ComponentClass = function () {};
	    var proto;

	    var type = typeof def;

	    if (type == "function") {
	        proto = def.prototype;
	    } else if (type == "object") {
	        proto = def;
	    } else {
	        throw TypeError();
	    }

	    ComponentClass.prototype = proto;

	    // We don't use the constructor provided by the user
	    // since we don't invoke their constructor until
	    // we have had a chance to do our own initialization.
	    // Instead, we store their constructor in the "initComponent"
	    // property and that method gets called later inside
	    // init-components-browser.js
	    function Component(id) {
	        Component_1.call(this, id);
	    }

	    if (!proto.Z_) {
	        // Inherit from Component if they didn't already
	        inherit_1(ComponentClass, Component_1);
	    }

	    // The same prototype will be used by our constructor after
	    // we he have set up the prototype chain using the inherit function
	    proto = Component.prototype = ComponentClass.prototype;

	    // proto.constructor = def.constructor = Component;

	    // Set a flag on the constructor function to make it clear this is
	    // a component so that we can short-circuit this work later
	    Component.Z_ = true;

	    function State(component) {
	        State_1.call(this, component);
	    }
	    inherit_1(State, State_1);
	    proto._c_ = State;
	    proto._n_ = renderer;

	    return Component;
	};

	var registered = {};
	var loaded = {};
	var componentTypes = {};

	function register(componentId, def) {
	    registered[componentId] = def;
	    delete loaded[componentId];
	    delete componentTypes[componentId];
	    return componentId;
	}

	function load(typeName, isLegacy) {
	    var target = loaded[typeName];
	    if (!target) {
	        target = registered[typeName];

	        if (target) {
	            target = target();
	        } else if (isLegacy) {
	            target = window.$markoLegacy.load(typeName);
	        } else {
	            target = indexBrowser(typeName);
	            // eslint-disable-next-line no-constant-condition
	        }

	        if (!target) {
	            throw Error("Component not found: " + typeName);
	        }

	        loaded[typeName] = target;
	    }

	    return target;
	}

	function getComponentClass(typeName, isLegacy) {
	    var ComponentClass = componentTypes[typeName];

	    if (ComponentClass) {
	        return ComponentClass;
	    }

	    ComponentClass = load(typeName, isLegacy);

	    ComponentClass = ComponentClass.Component || ComponentClass;

	    if (!ComponentClass.Z_) {
	        ComponentClass = defineComponent(ComponentClass, ComponentClass.renderer);
	    }

	    // Make the component "type" accessible on each component instance
	    ComponentClass.prototype.f_ = typeName;

	    // eslint-disable-next-line no-constant-condition


	    componentTypes[typeName] = ComponentClass;

	    return ComponentClass;
	}

	function createComponent(typeName, id, isLegacy) {
	    var ComponentClass = getComponentClass(typeName, isLegacy);
	    return new ComponentClass(id);
	}

	var ae_ = register;
	var _J_ = createComponent;

	var registryBrowser = {
		ae_: ae_,
		_J_: _J_
	};

	var win$2 = window;
	var defaultDocument$3 = document;
	var createFragmentNode$3 = fragment.ai_;

	var componentLookup$3 = utilBrowser.h_;
	var addComponentRootToKeyedElements$2 = utilBrowser.aj_;



	var componentsByDOMNode$2 = domData.G_;
	var serverRenderedGlobals = {};
	var serverComponentRootNodes = {};
	var keyedElementsByComponentId = {};

	var FLAG_WILL_RERENDER_IN_BROWSER$2 = 1;

	function indexServerComponentBoundaries(node, runtimeId, stack) {
	    var componentId;
	    var ownerId;
	    var ownerComponent;
	    var keyedElements;
	    var nextSibling;
	    var runtimeLength = runtimeId.length;
	    stack = stack || [];

	    node = node.firstChild;
	    while (node) {
	        nextSibling = node.nextSibling;
	        if (node.nodeType === 8) {
	            // Comment node
	            var commentValue = node.nodeValue;
	            if (commentValue.slice(0, runtimeLength) === runtimeId) {
	                var firstChar = commentValue[runtimeLength];

	                if (firstChar === "^" || firstChar === "#") {
	                    stack.push(node);
	                } else if (firstChar === "/") {
	                    var endNode = node;
	                    var startNode = stack.pop();
	                    var rootNode;

	                    if (startNode.parentNode === endNode.parentNode) {
	                        rootNode = createFragmentNode$3(startNode.nextSibling, endNode);
	                    } else {
	                        rootNode = createFragmentNode$3(endNode.parentNode.firstChild, endNode);
	                    }

	                    componentId = startNode.nodeValue.substring(runtimeLength + 1);
	                    firstChar = startNode.nodeValue[runtimeLength];

	                    if (firstChar === "^") {
	                        var parts = componentId.split(/ /g);
	                        var key = parts[2];
	                        ownerId = parts[1];
	                        componentId = parts[0];
	                        if (ownerComponent = componentLookup$3[ownerId]) {
	                            keyedElements = ownerComponent.m_;
	                        } else {
	                            keyedElements = keyedElementsByComponentId[ownerId] || (keyedElementsByComponentId[ownerId] = {});
	                        }
	                        addComponentRootToKeyedElements$2(keyedElements, key, rootNode, componentId);
	                    }

	                    serverComponentRootNodes[componentId] = rootNode;

	                    startNode.parentNode.removeChild(startNode);
	                    endNode.parentNode.removeChild(endNode);
	                }
	            }
	        } else if (node.nodeType === 1) {
	            // HTML element node
	            var markoKey = node.getAttribute("data-marko-key");
	            var markoProps = node.getAttribute("data-marko");
	            if (markoKey) {
	                var separatorIndex = markoKey.indexOf(" ");
	                ownerId = markoKey.substring(separatorIndex + 1);
	                markoKey = markoKey.substring(0, separatorIndex);
	                if (ownerComponent = componentLookup$3[ownerId]) {
	                    keyedElements = ownerComponent.m_;
	                } else {
	                    keyedElements = keyedElementsByComponentId[ownerId] || (keyedElementsByComponentId[ownerId] = {});
	                }
	                keyedElements[markoKey] = node;
	            }
	            if (markoProps) {
	                markoProps = JSON.parse(markoProps);
	                Object.keys(markoProps).forEach(function (key) {
	                    if (key.slice(0, 2) === "on") {
	                        eventDelegation._z_(key.slice(2));
	                    }
	                });
	            }
	            indexServerComponentBoundaries(node, runtimeId, stack);
	        }

	        node = nextSibling;
	    }
	}

	function invokeComponentEventHandler(component, targetMethodName, args) {
	    var method = component[targetMethodName];
	    if (!method) {
	        throw Error("Method not found: " + targetMethodName);
	    }

	    method.apply(component, args);
	}

	function addEventListenerHelper(el, eventType, isOnce, listener) {
	    var eventListener = listener;
	    if (isOnce) {
	        eventListener = function (event) {
	            listener(event);
	            el.removeEventListener(eventType, eventListener);
	        };
	    }

	    el.addEventListener(eventType, eventListener, false);

	    return function remove() {
	        el.removeEventListener(eventType, eventListener);
	    };
	}

	function addDOMEventListeners(component, el, eventType, targetMethodName, isOnce, extraArgs, handles) {
	    var removeListener = addEventListenerHelper(el, eventType, isOnce, function (event) {
	        var args = [event, el];
	        if (extraArgs) {
	            args = extraArgs.concat(args);
	        }

	        invokeComponentEventHandler(component, targetMethodName, args);
	    });
	    handles.push(removeListener);
	}

	function initComponent(componentDef, doc) {
	    var component = componentDef.k_;

	    if (!component || !component.Z_) {
	        return; // legacy
	    }

	    component.I_();
	    component.X_ = doc;

	    var isExisting = componentDef._C_;

	    if (isExisting) {
	        component._b_();
	    }

	    var domEvents = componentDef._B_;
	    if (domEvents) {
	        var eventListenerHandles = [];

	        domEvents.forEach(function (domEventArgs) {
	            // The event mapping is for a direct DOM event (not a custom event and not for bubblign dom events)

	            var eventType = domEventArgs[0];
	            var targetMethodName = domEventArgs[1];
	            var eventEl = component.m_[domEventArgs[2]];
	            var isOnce = domEventArgs[3];
	            var extraArgs = domEventArgs[4];

	            addDOMEventListeners(component, eventEl, eventType, targetMethodName, isOnce, extraArgs, eventListenerHandles);
	        });

	        if (eventListenerHandles.length) {
	            component.M_ = eventListenerHandles;
	        }
	    }

	    if (component.R_) {
	        component.E_("update");
	    } else {
	        component.R_ = true;
	        component.E_("mount");
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
	    eventDelegation.ad_(doc);

	    doc = doc || defaultDocument$3;
	    var len = componentDefs.length;
	    var componentDef;
	    var i;

	    for (i = len; i--;) {
	        componentDef = componentDefs[i];
	        trackComponent(componentDef);
	    }

	    for (i = len; i--;) {
	        componentDef = componentDefs[i];
	        initComponent(componentDef, doc);
	    }
	}

	/**
	 * This method initializes all components that were rendered on the server by iterating over all
	 * of the component IDs.
	 */
	function initServerRendered(renderedComponents, doc) {
	    var type = typeof renderedComponents;
	    var runtimeId;

	    if (type !== "object") {
	        var componentsKey = "$" + (type === "string" ? renderedComponents + "_components" : "components");
	        renderedComponents = win$2[componentsKey];

	        if (renderedComponents && renderedComponents.forEach) {
	            renderedComponents.forEach(function (renderedComponent) {
	                initServerRendered(renderedComponent, doc);
	            });
	        }

	        win$2[componentsKey] = {
	            concat: initServerRendered
	        };

	        return;
	    }

	    doc = doc || defaultDocument$3;

	    renderedComponents = finalize$1(renderedComponents);

	    runtimeId = renderedComponents.r;
	    var componentDefs = renderedComponents.w;
	    var typesArray = renderedComponents.t;
	    var markoGlobalsKey = "$" + runtimeId + "G";

	    // Ensure that event handlers to handle delegating events are
	    // always attached before initializing any components
	    indexServerComponentBoundaries(doc, runtimeId);
	    eventDelegation.ad_(doc);

	    var globals = win$2[markoGlobalsKey];
	    if (globals) {
	        serverRenderedGlobals = finalize$1(globals);
	        delete win$2[markoGlobalsKey];
	    }

	    // hydrate components top down (leaf nodes last)
	    // and return an array of functions to mount these components
	    var componentMountFns = componentDefs.map(function (componentDef) {
	        componentDef = ComponentDef_1._I_(componentDef, typesArray, serverRenderedGlobals, registryBrowser);

	        var mount = hydrateComponentAndGetMount(componentDef, doc);

	        if (!mount) {
	            // hydrateComponentAndGetMount will return false if there is not rootNode
	            // for the component.  If this is the case, we'll wait until the
	            // DOM has fully loaded to attempt to init the component again.
	            doc.addEventListener("DOMContentLoaded", function () {
	                mount = hydrateComponentAndGetMount(componentDef, doc);

	                if (!mount) {
	                    indexServerComponentBoundaries(doc, runtimeId);
	                    mount = hydrateComponentAndGetMount(componentDef, doc);
	                }

	                mount();
	            });
	        }

	        return mount;
	    });

	    // mount components bottom up (leaf nodes first)
	    componentMountFns.reverse().forEach(function (mount) {
	        if (mount) mount();
	    });
	}

	function hydrateComponentAndGetMount(componentDef, doc) {
	    var componentId = componentDef.id;
	    var component = componentDef.k_;
	    var rootNode = serverComponentRootNodes[componentId];
	    var renderResult;

	    if (rootNode) {
	        delete serverComponentRootNodes[componentId];

	        component.K_ = rootNode;
	        componentsByDOMNode$2.set(rootNode, component);
	        component.m_ = keyedElementsByComponentId[componentId] || {};

	        delete keyedElementsByComponentId[componentId];

	        if (componentDef.g_ & FLAG_WILL_RERENDER_IN_BROWSER$2) {
	            component.X_ = doc;
	            renderResult = component._p_(component.Q_, true);
	            trackComponent(componentDef);
	            return function mount() {
	                renderResult.afterInsert(doc);
	            };
	        } else {
	            trackComponent(componentDef);
	        }

	        return function mount() {
	            initComponent(componentDef, doc);
	        };
	    }
	}

	function trackComponent(componentDef) {
	    var component = componentDef.k_;
	    if (component) {
	        componentLookup$3[component.id] = component;
	    }
	}

	var _M_ = initClientRendered;
	var ag_ = initServerRendered;

	var initComponentsBrowser = {
		_M_: _M_,
		ag_: ag_
	};

	ComponentsContext_1._M_ = initComponentsBrowser._M_;

	var getComponentForEl$1 = utilBrowser.af_;
	var init = window.$initComponents = initComponentsBrowser.ag_;

	var register$1 = function (id, component) {
	    registryBrowser.ae_(id, function () {
	        return component;
	    });
	};

	var indexBrowser$1 = {
		getComponentForEl: getComponentForEl$1,
		init: init,
		register: register$1
	};

	var beginComponentBrowser = function beginComponent(componentsContext, component, key, ownerComponentDef) {
	    var componentId = component.id;

	    var globalContext = componentsContext.l_;
	    var componentDef = componentsContext.j_ = new ComponentDef_1(component, componentId, globalContext);
	    globalContext.q_[componentId] = true;
	    componentsContext.i_.push(componentDef);

	    var out = componentsContext.z_;
	    out.bc(component, key, ownerComponentDef && ownerComponentDef.k_);
	    return componentDef;
	};

	var endComponentBrowser = function endComponent(out) {
	    out.ee(); // endElement() (also works for VComponent nodes pushed on to the stack)
	};

	var componentLookup$4 = utilBrowser.h_;
	var emitLifecycleEvent$2 = utilBrowser.E_;


	var getComponentsContext$2 = ComponentsContext_1.D_;



	var COMPONENT_BEGIN_ASYNC_ADDED_KEY = "$wa";

	function resolveComponentKey(key, parentComponentDef) {
	    if (key[0] === "#") {
	        return key.substring(1);
	    } else {
	        return parentComponentDef.id + "-" + parentComponentDef.c_(key);
	    }
	}

	function trackAsyncComponents(out) {
	    if (out.isSync() || out.global[COMPONENT_BEGIN_ASYNC_ADDED_KEY]) {
	        return;
	    }

	    out.on("beginAsync", handleBeginAsync);
	    out.on("beginDetachedAsync", handleBeginDetachedAsync);
	    out.global[COMPONENT_BEGIN_ASYNC_ADDED_KEY] = true;
	}

	function handleBeginAsync(event) {
	    var parentOut = event.parentOut;
	    var asyncOut = event.out;
	    var componentsContext = parentOut.i_;

	    if (componentsContext !== undefined) {
	        // We are going to start a nested ComponentsContext
	        asyncOut.i_ = new ComponentsContext_1(asyncOut, componentsContext);
	    }
	    // Carry along the component arguments
	    asyncOut.c(parentOut.ax_, parentOut.an_, parentOut.ay_);
	}

	function handleBeginDetachedAsync(event) {
	    var asyncOut = event.out;
	    handleBeginAsync(event);
	    asyncOut.on("beginAsync", handleBeginAsync);
	    asyncOut.on("beginDetachedAsync", handleBeginDetachedAsync);
	}

	function createRendererFunc(templateRenderFunc, componentProps, renderingLogic) {
	    renderingLogic = renderingLogic || {};
	    var onInput = renderingLogic.onInput;
	    var typeName = componentProps.f_;
	    var isSplit = componentProps.d_ === true;
	    var isImplicitComponent = componentProps.e_ === true;

	    var shouldApplySplitMixins = isSplit;

	    return function renderer(input, out) {
	        trackAsyncComponents(out);

	        var componentsContext = getComponentsContext$2(out);
	        var globalComponentsContext = componentsContext.l_;

	        var component = globalComponentsContext._q_;
	        var isRerender = component !== undefined;
	        var id;
	        var isExisting;
	        var customEvents;
	        var parentComponentDef = componentsContext.j_;
	        var ownerComponentDef = out.ax_;
	        var ownerComponentId = ownerComponentDef && ownerComponentDef.id;
	        var key = out.an_;

	        if (component) {
	            // If component is provided then we are currently rendering
	            // the top-level UI component as part of a re-render
	            id = component.id; // We will use the ID of the component being re-rendered
	            isExisting = true; // This is a re-render so we know the component is already in the DOM
	            globalComponentsContext._q_ = null;
	        } else {
	            // Otherwise, we are rendering a nested UI component. We will need
	            // to match up the UI component with the component already in the
	            // DOM (if any) so we will need to resolve the component ID from
	            // the assigned key. We also need to handle any custom event bindings
	            // that were provided.
	            if (parentComponentDef) {
	                // console.log('componentArgs:', componentArgs);
	                customEvents = out.ay_;

	                if (key != null) {
	                    id = resolveComponentKey(key.toString(), parentComponentDef);
	                } else {
	                    id = parentComponentDef._H_();
	                }
	            } else {
	                id = globalComponentsContext._H_();
	            }
	        }

	        {
	            if (!component) {
	                if (isRerender && (component = componentLookup$4[id]) && component.f_ !== typeName) {
	                    // Destroy the existing component since
	                    component.destroy();
	                    component = undefined;
	                }

	                if (component) {
	                    isExisting = true;
	                } else {
	                    isExisting = false;
	                    // We need to create a new instance of the component
	                    component = registryBrowser._J_(typeName, id);

	                    if (shouldApplySplitMixins === true) {
	                        shouldApplySplitMixins = false;

	                        var renderingLogicProps = typeof renderingLogic == "function" ? renderingLogic.prototype : renderingLogic;

	                        copyProps(renderingLogicProps, component.constructor.prototype);
	                    }
	                }

	                // Set this flag to prevent the component from being queued for update
	                // based on the new input. The component is about to be rerendered
	                // so we don't want to queue it up as a result of calling `setInput()`
	                component.U_ = true;

	                if (customEvents !== undefined) {
	                    component._v_(customEvents, ownerComponentId);
	                }

	                if (isExisting === false) {
	                    emitLifecycleEvent$2(component, "create", input, out);
	                }

	                input = component._g_(input, onInput, out);

	                if (isExisting === true) {
	                    if (component._j_ === false || component.shouldUpdate(input, component.J_) === false) {
	                        // We put a placeholder element in the output stream to ensure that the existing
	                        // DOM node is matched up correctly when using morphdom. We flag the VElement
	                        // node to track that it is a preserve marker
	                        out.p_(component);
	                        globalComponentsContext.q_[id] = true;
	                        component.I_(); // The component is no longer dirty so reset internal flags
	                        return;
	                    }
	                }
	            }

	            component.S_ = out.global;

	            emitLifecycleEvent$2(component, "render", out);
	        }

	        var componentDef = beginComponentBrowser(componentsContext, component, key, ownerComponentDef);

	        componentDef._C_ = isExisting;

	        // Render the template associated with the component using the final template
	        // data that we constructed
	        templateRenderFunc(input, out, componentDef, component, component._t_);

	        endComponentBrowser(out);
	        componentsContext.j_ = parentComponentDef;
	    };
	}

	var renderer = createRendererFunc;

	// exports used by the legacy renderer
	createRendererFunc.ak_ = resolveComponentKey;
	createRendererFunc.aw_ = trackAsyncComponents;

	var c = defineComponent; // Referenced by compiled templates
	var r = renderer; // Referenced by compiled templates
	var rc = registryBrowser.ae_; // Referenced by compiled templates

	var helpersBrowser = {
		c: c,
		r: r,
		rc: rc
	};

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
	        for (var i = 0; i < o.length; i++) {
	            func(i, o[i]);
	        }
	    } else if (typeof Map !== "undefined" && o instanceof Map) {
	        o.forEach(function (v, k) {
	            func(k, v);
	        });
	        // eslint-disable-next-line no-constant-condition
	    } else {
	        for (var k in o) {
	            if (o.hasOwnProperty(k)) {
	                func(k, o[k]);
	            }
	        }
	    }
	};

	var app = createCommonjsModule(function (module) {

	var marko_template = module.exports = vdom$2.t(),
	    marko_component = {
	        onCreate: function() {
	          this.state = {
	              selectedColorIndex: 0
	            };
	        },
	        onMount: function() {
	          window.onMount();
	        },
	        handleColorClick: function(colorIndex) {
	          this.state.selectedColorIndex = colorIndex;
	        }
	      },
	    marko_registerComponent = helpersBrowser.rc,
	    marko_componentType = marko_registerComponent("/isomorphic-ui-benchmarks$1.0.0/benchmarks/color-picker/marko/components/app/index.marko", function() {
	      return module.exports;
	    }),
	    marko_renderer = helpersBrowser.r,
	    marko_defineComponent = helpersBrowser.c,
	    marko_classAttr = helpers_1$1.ca,
	    marko_attrs0 = {
	        "class": "colors"
	      },
	    marko_createElement = helpers_1$1.e,
	    marko_const = helpers_1$1.const,
	    marko_const_nextId = marko_const("750d05"),
	    marko_node0 = marko_createElement("h1", null, "1", null, 1, 0, {
	        i: marko_const_nextId()
	      })
	      .t("Choose your favorite color:"),
	    marko_attrs1 = {
	        "class": "colors"
	      },
	    marko_node1 = marko_createElement("div", null, "5", null, 1, 0, {
	        i: marko_const_nextId()
	      })
	      .t("No colors!"),
	    marko_attrs2 = {
	        "class": "chosen-color"
	      };

	function render(input, out, __component, component, state) {

	  var colors = input.colors;

	  var selectedColorIndex = state.selectedColorIndex;

	  var selectedColor = colors[selectedColorIndex];

	  out.be("div", marko_attrs0, "0", component);

	  out.n(marko_node0, component);

	  out.be("div", marko_attrs1, "2", component);

	  if (colors.length) {
	    out.be("ul", null, "3", component);

	    var $for$0 = 0;

	    helperForEachProperty(colors, function(i, color) {
	      var className = "color";
	                          if (selectedColorIndex === i) {
	                              className += " selected";
	                          }

	      var $keyScope$0 = "[" + (($for$0++) + "]");

	      out.e("li", {
	          "class": marko_classAttr(className),
	          style: helperStyleAttr("background-color:" + color.hex)
	        }, "4" + $keyScope$0, component, 1, 1, {
	          onclick: __component.d("click", "handleColorClick", false, [
	              i
	            ])
	        })
	        .t(color.name);
	    });

	    out.ee();
	  } else {
	    out.n(marko_node1, component);
	  }

	  out.ee();

	  out.e("div", null, "6", component, 2)
	    .t("You chose: ")
	    .e("div", marko_attrs2, "7", component, 1)
	      .t(selectedColor.name);

	  out.ee();
	}

	marko_template._ = marko_renderer(render, {
	    f_: marko_componentType
	  }, marko_component);

	marko_template.Component = marko_defineComponent(marko_component, marko_template._);
	});

	var componentsBrowser = indexBrowser$1;

	componentsBrowser.init();

	window.addBench("marko", function(el, colors) {
	  var component = app
	    .renderSync({ colors: colors })
	    .appendTo(el)
	    .getComponent();

	  var selectedColorIndex = 0;

	  return function(done) {
	    component.state.selectedColorIndex = ++selectedColorIndex % colors.length;
	    component.update();
	    done();
	  };
	});

	var client = {

	};

	return client;

}());
