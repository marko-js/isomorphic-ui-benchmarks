$_mod.def("/marko$4.18.16/dist/runtime/vdom/VElement", function(require, exports, module, __filename, __dirname) { /* jshint newcap:false */
var domData = require('/marko$4.18.16/dist/runtime/components/dom-data'/*"../components/dom-data"*/);
var vElementByDOMNode = domData._Z_;
var VNode = require('/marko$4.18.16/dist/runtime/vdom/VNode'/*"./VNode"*/);
var inherit = require('/raptor-util$3.2.0/inherit'/*"raptor-util/inherit"*/);
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

inherit(VElement, VNode);

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

module.exports = VElement;
});