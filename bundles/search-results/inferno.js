var app = (function () {
'use strict';

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var index$6 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NO_OP = '$NO_OP';
exports.ERROR_MSG = 'a runtime error occured! Use Inferno in development environment to find the error.';
// This should be boolean and not reference to window.document
exports.isBrowser = !!(typeof window !== 'undefined' && window.document);
function toArray(children) {
    return exports.isArray(children) ? children : (children ? [children] : children);
}
exports.toArray = toArray;
// this is MUCH faster than .constructor === Array and instanceof Array
// in Node 7 and the later versions of V8, slower in older versions though
exports.isArray = Array.isArray;
function isStatefulComponent(o) {
    return !isUndefined(o.prototype) && !isUndefined(o.prototype.render);
}
exports.isStatefulComponent = isStatefulComponent;
function isStringOrNumber(obj) {
    var type = typeof obj;
    return type === 'string' || type === 'number';
}
exports.isStringOrNumber = isStringOrNumber;
function isNullOrUndef(obj) {
    return isUndefined(obj) || isNull(obj);
}
exports.isNullOrUndef = isNullOrUndef;
function isInvalid(obj) {
    return isNull(obj) || obj === false || isTrue(obj) || isUndefined(obj);
}
exports.isInvalid = isInvalid;
function isFunction(obj) {
    return typeof obj === 'function';
}
exports.isFunction = isFunction;
function isString(obj) {
    return typeof obj === 'string';
}
exports.isString = isString;
function isNumber(obj) {
    return typeof obj === 'number';
}
exports.isNumber = isNumber;
function isNull(obj) {
    return obj === null;
}
exports.isNull = isNull;
function isTrue(obj) {
    return obj === true;
}
exports.isTrue = isTrue;
function isUndefined(obj) {
    return obj === undefined;
}
exports.isUndefined = isUndefined;
function isObject(o) {
    return typeof o === 'object';
}
exports.isObject = isObject;
function throwError(message) {
    if (!message) {
        message = exports.ERROR_MSG;
    }
    throw new Error("Inferno Error: " + message);
}
exports.throwError = throwError;
function warning(message) {
    console.warn(message);
}
exports.warning = warning;
function combineFrom(first, second) {
    var obj = {};
    var key;
    if (first) {
        for (key in first) {
            obj[key] = first[key];
        }
    }
    if (second) {
        for (key in second) {
            obj[key] = second[key];
        }
    }
    return obj;
}
exports.combineFrom = combineFrom;
function Lifecycle() {
    this.listeners = [];
}
exports.Lifecycle = Lifecycle;
Lifecycle.prototype.addListener = function addListener(callback) {
    this.listeners.push(callback);
};
Lifecycle.prototype.trigger = function trigger() {
    var listeners = this.listeners;
    for (var i = 0, len = listeners.length; i < len; i++) {
        listeners[i]();
    }
};
});

var index$4 = createCommonjsModule(function (module) {
module.exports = index$6;
module.exports.default = module.exports;
});

var normalization = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


function applyKey(key, vNode) {
    vNode.key = key;
    return vNode;
}
function applyKeyIfMissing(key, vNode) {
    if (index$4.isNumber(key)) {
        key = "." + key;
    }
    if (index$4.isNull(vNode.key) || vNode.key[0] === '.') {
        return applyKey(key, vNode);
    }
    return vNode;
}
function applyKeyPrefix(key, vNode) {
    vNode.key = key + vNode.key;
    return vNode;
}
function _normalizeVNodes(nodes, result, index, currentKey) {
    for (var len = nodes.length; index < len; index++) {
        var n = nodes[index];
        var key = currentKey + "." + index;
        if (!index$4.isInvalid(n)) {
            if (index$4.isArray(n)) {
                _normalizeVNodes(n, result, 0, key);
            }
            else {
                if (index$4.isStringOrNumber(n)) {
                    n = VNodes.createTextVNode(n, null);
                }
                else if (VNodes.isVNode(n) && n.dom || (n.key && n.key[0] === '.')) {
                    n = VNodes.directClone(n);
                }
                if (index$4.isNull(n.key) || n.key[0] === '.') {
                    n = applyKey(key, n);
                }
                else {
                    n = applyKeyPrefix(currentKey, n);
                }
                result.push(n);
            }
        }
    }
}
function normalizeVNodes(nodes) {
    var newNodes;
    // we assign $ which basically means we've flagged this array for future note
    // if it comes back again, we need to clone it, as people are using it
    // in an immutable way
    // tslint:disable
    if (nodes['$']) {
        nodes = nodes.slice();
    }
    else {
        nodes['$'] = true;
    }
    // tslint:enable
    for (var i = 0, len = nodes.length; i < len; i++) {
        var n = nodes[i];
        if (index$4.isInvalid(n) || index$4.isArray(n)) {
            var result = (newNodes || nodes).slice(0, i);
            _normalizeVNodes(nodes, result, i, "");
            return result;
        }
        else if (index$4.isStringOrNumber(n)) {
            if (!newNodes) {
                newNodes = nodes.slice(0, i);
            }
            newNodes.push(applyKeyIfMissing(i, VNodes.createTextVNode(n, null)));
        }
        else if ((VNodes.isVNode(n) && n.dom) || (index$4.isNull(n.key) && !(n.flags & 64 /* HasNonKeyedChildren */))) {
            if (!newNodes) {
                newNodes = nodes.slice(0, i);
            }
            newNodes.push(applyKeyIfMissing(i, VNodes.directClone(n)));
        }
        else if (newNodes) {
            newNodes.push(applyKeyIfMissing(i, VNodes.directClone(n)));
        }
    }
    return newNodes || nodes;
}
exports.normalizeVNodes = normalizeVNodes;
function normalizeChildren(children) {
    if (index$4.isArray(children)) {
        return normalizeVNodes(children);
    }
    else if (VNodes.isVNode(children) && children.dom) {
        return VNodes.directClone(children);
    }
    return children;
}
function normalizeProps(vNode, props, children) {
    if (!(vNode.flags & 28 /* Component */)) {
        if (index$4.isNullOrUndef(children) && !index$4.isNullOrUndef(props.children)) {
            vNode.children = props.children;
        }
        if (props.className) {
            vNode.className = props.className;
            delete props.className;
        }
    }
    if (props.ref) {
        vNode.ref = props.ref;
        delete props.ref;
    }
    if (!index$4.isNullOrUndef(props.key)) {
        vNode.key = props.key;
        delete props.key;
    }
}
function normalizeElement(type, vNode) {
    if (type === 'svg') {
        vNode.flags = 128 /* SvgElement */;
    }
    else if (type === 'input') {
        vNode.flags = 512 /* InputElement */;
    }
    else if (type === 'select') {
        vNode.flags = 2048 /* SelectElement */;
    }
    else if (type === 'textarea') {
        vNode.flags = 1024 /* TextareaElement */;
    }
    else if (type === 'media') {
        vNode.flags = 256 /* MediaElement */;
    }
    else {
        vNode.flags = 2 /* HtmlElement */;
    }
}
function normalize(vNode) {
    var props = vNode.props;
    var children = vNode.children;
    // convert a wrongly created type back to element
    // Primitive node doesn't have defaultProps, only Component
    if (vNode.flags & 28 /* Component */) {
        // set default props
        var type = vNode.type;
        var defaultProps = type.defaultProps;
        if (!index$4.isNullOrUndef(defaultProps)) {
            if (!props) {
                props = vNode.props = defaultProps; // Create new object if only defaultProps given
            }
            else {
                for (var prop in defaultProps) {
                    if (index$4.isUndefined(props[prop])) {
                        props[prop] = defaultProps[prop];
                    }
                }
            }
        }
        if (index$4.isString(type)) {
            normalizeElement(type, vNode);
            if (props && props.children) {
                vNode.children = props.children;
                children = props.children;
            }
        }
    }
    if (props) {
        normalizeProps(vNode, props, children);
    }
    if (!index$4.isInvalid(children)) {
        vNode.children = normalizeChildren(children);
    }
    if (props && !index$4.isInvalid(props.children)) {
        props.children = normalizeChildren(props.children);
    }
    
}
exports.normalize = normalize;
});

var options = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    recyclingEnabled: false,
    findDOMNodeEnabled: false,
    roots: null,
    createVNode: null,
    beforeRender: null,
    afterRender: null,
    afterMount: null,
    afterUpdate: null,
    beforeUnmount: null
};
});

var constants = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.xlinkNS = 'http://www.w3.org/1999/xlink';
exports.xmlNS = 'http://www.w3.org/XML/1998/namespace';
exports.svgNS = 'http://www.w3.org/2000/svg';
var TRUE = true;
exports.strictProps = Object.create(null);
exports.strictProps.volume = TRUE;
exports.strictProps.defaultChecked = TRUE;
Object.freeze(exports.strictProps);
exports.booleanProps = Object.create(null);
exports.booleanProps.muted = TRUE;
exports.booleanProps.scoped = TRUE;
exports.booleanProps.loop = TRUE;
exports.booleanProps.open = TRUE;
exports.booleanProps.checked = TRUE;
exports.booleanProps.default = TRUE;
exports.booleanProps.capture = TRUE;
exports.booleanProps.disabled = TRUE;
exports.booleanProps.readOnly = TRUE;
exports.booleanProps.required = TRUE;
exports.booleanProps.autoplay = TRUE;
exports.booleanProps.controls = TRUE;
exports.booleanProps.seamless = TRUE;
exports.booleanProps.reversed = TRUE;
exports.booleanProps.allowfullscreen = TRUE;
exports.booleanProps.novalidate = TRUE;
exports.booleanProps.hidden = TRUE;
exports.booleanProps.autoFocus = TRUE;
Object.freeze(exports.booleanProps);
exports.namespaces = Object.create(null);
exports.namespaces['xlink:href'] = exports.xlinkNS;
exports.namespaces['xlink:arcrole'] = exports.xlinkNS;
exports.namespaces['xlink:actuate'] = exports.xlinkNS;
exports.namespaces['xlink:show'] = exports.xlinkNS;
exports.namespaces['xlink:role'] = exports.xlinkNS;
exports.namespaces['xlink:title'] = exports.xlinkNS;
exports.namespaces['xlink:type'] = exports.xlinkNS;
exports.namespaces['xml:base'] = exports.xmlNS;
exports.namespaces['xml:lang'] = exports.xmlNS;
exports.namespaces['xml:space'] = exports.xmlNS;
Object.freeze(exports.namespaces);
exports.isUnitlessNumber = Object.create(null);
exports.isUnitlessNumber.animationIterationCount = TRUE;
exports.isUnitlessNumber.borderImageOutset = TRUE;
exports.isUnitlessNumber.borderImageSlice = TRUE;
exports.isUnitlessNumber.borderImageWidth = TRUE;
exports.isUnitlessNumber.boxFlex = TRUE;
exports.isUnitlessNumber.boxFlexGroup = TRUE;
exports.isUnitlessNumber.boxOrdinalGroup = TRUE;
exports.isUnitlessNumber.columnCount = TRUE;
exports.isUnitlessNumber.flex = TRUE;
exports.isUnitlessNumber.flexGrow = TRUE;
exports.isUnitlessNumber.flexPositive = TRUE;
exports.isUnitlessNumber.flexShrink = TRUE;
exports.isUnitlessNumber.flexNegative = TRUE;
exports.isUnitlessNumber.flexOrder = TRUE;
exports.isUnitlessNumber.gridRow = TRUE;
exports.isUnitlessNumber.gridColumn = TRUE;
exports.isUnitlessNumber.fontWeight = TRUE;
exports.isUnitlessNumber.lineClamp = TRUE;
exports.isUnitlessNumber.lineHeight = TRUE;
exports.isUnitlessNumber.opacity = TRUE;
exports.isUnitlessNumber.order = TRUE;
exports.isUnitlessNumber.orphans = TRUE;
exports.isUnitlessNumber.tabSize = TRUE;
exports.isUnitlessNumber.widows = TRUE;
exports.isUnitlessNumber.zIndex = TRUE;
exports.isUnitlessNumber.zoom = TRUE;
exports.isUnitlessNumber.fillOpacity = TRUE;
exports.isUnitlessNumber.floodOpacity = TRUE;
exports.isUnitlessNumber.stopOpacity = TRUE;
exports.isUnitlessNumber.strokeDasharray = TRUE;
exports.isUnitlessNumber.strokeDashoffset = TRUE;
exports.isUnitlessNumber.strokeMiterlimit = TRUE;
exports.isUnitlessNumber.strokeOpacity = TRUE;
exports.isUnitlessNumber.strokeWidth = TRUE;
Object.freeze(exports.isUnitlessNumber);
exports.skipProps = Object.create(null);
exports.skipProps.children = TRUE;
exports.skipProps.childrenType = TRUE;
exports.skipProps.defaultValue = TRUE;
exports.skipProps.ref = TRUE;
exports.skipProps.key = TRUE;
exports.skipProps.selected = TRUE;
exports.skipProps.checked = TRUE;
exports.skipProps.multiple = TRUE;
Object.freeze(exports.skipProps);
exports.delegatedEvents = Object.create(null);
exports.delegatedEvents.onClick = TRUE;
exports.delegatedEvents.onMouseDown = TRUE;
exports.delegatedEvents.onMouseUp = TRUE;
exports.delegatedEvents.onMouseMove = TRUE;
exports.delegatedEvents.onSubmit = TRUE;
exports.delegatedEvents.onDblClick = TRUE;
exports.delegatedEvents.onKeyDown = TRUE;
exports.delegatedEvents.onKeyUp = TRUE;
exports.delegatedEvents.onKeyPress = TRUE;
Object.freeze(exports.delegatedEvents);
});

var delegation = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

var isiOS = index$4.isBrowser && !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
var delegatedEvents = new Map();
function handleEvent(name, lastEvent, nextEvent, dom) {
    var delegatedRoots = delegatedEvents.get(name);
    if (nextEvent) {
        if (!delegatedRoots) {
            delegatedRoots = { items: new Map(), count: 0, docEvent: null };
            delegatedRoots.docEvent = attachEventToDocument(name, delegatedRoots);
            delegatedEvents.set(name, delegatedRoots);
        }
        if (!lastEvent) {
            delegatedRoots.count++;
            if (isiOS && name === 'onClick') {
                trapClickOnNonInteractiveElement(dom);
            }
        }
        delegatedRoots.items.set(dom, nextEvent);
    }
    else if (delegatedRoots) {
        delegatedRoots.count--;
        delegatedRoots.items.delete(dom);
        if (delegatedRoots.count === 0) {
            document.removeEventListener(normalizeEventName(name), delegatedRoots.docEvent);
            delegatedEvents.delete(name);
        }
    }
}
exports.handleEvent = handleEvent;
function dispatchEvent(event, target, items, count, dom, isClick) {
    var eventsToTrigger = items.get(target);
    if (eventsToTrigger) {
        count--;
        // linkEvent object
        dom = target;
        if (eventsToTrigger.event) {
            eventsToTrigger.event(eventsToTrigger.data, event);
        }
        else {
            eventsToTrigger(event);
        }
        if (event.cancelBubble) {
            return;
        }
    }
    if (count > 0) {
        var parentDom = target.parentNode;
        // Html Nodes can be nested fe: span inside button in that scenario browser does not handle disabled attribute on parent,
        // because the event listener is on document.body
        // Don't process clicks on disabled elements
        if (parentDom === null || (isClick && parentDom.nodeType === 1 && parentDom.disabled)) {
            return;
        }
        dispatchEvent(event, parentDom, items, count, dom, isClick);
    }
}
function normalizeEventName(name) {
    return name.substr(2).toLowerCase();
}
function stopPropagation() {
    this.cancelBubble = true;
    this.stopImmediatePropagation();
}
function attachEventToDocument(name, delegatedRoots) {
    var docEvent = function (event) {
        var count = delegatedRoots.count;
        if (count > 0) {
            event.stopPropagation = stopPropagation;
            dispatchEvent(event, event.target, delegatedRoots.items, count, document, event.type === 'click');
        }
    };
    document.addEventListener(normalizeEventName(name), docEvent);
    return docEvent;
}
function emptyFn() { }
function trapClickOnNonInteractiveElement(dom) {
    // Mobile Safari does not fire properly bubble click events on
    // non-interactive elements, which means delegated click listeners do not
    // fire. The workaround for this bug involves attaching an empty click
    // listener on the target node.
    // http://www.quirksmode.org/blog/archives/2010/09/click_event_del.html
    // Just set it using the onclick property so that we don't have to manage any
    // bookkeeping for it. Not sure if we need to clear it when the listener is
    // removed.
    // TODO: Only do this for the relevant Safaris maybe?
    dom.onclick = emptyFn;
}
});

var InputWrapper = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });



function isCheckedType(type) {
    return type === 'checkbox' || type === 'radio';
}
function isControlled(props) {
    var usesChecked = isCheckedType(props.type);
    return usesChecked ? !index$4.isNullOrUndef(props.checked) : !index$4.isNullOrUndef(props.value);
}
function onTextInputChange(e) {
    var vNode = this.vNode;
    var props = vNode.props || utils.EMPTY_OBJ;
    var dom = vNode.dom;
    var previousValue = props.value;
    if (props.onInput) {
        var event_1 = props.onInput;
        if (event_1.event) {
            event_1.event(event_1.data, e);
        }
        else {
            event_1(e);
        }
    }
    else if (props.oninput) {
        props.oninput(e);
    }
    // the user may have updated the vNode from the above onInput events syncronously
    // so we need to get it from the context of `this` again
    var newVNode = this.vNode;
    var newProps = newVNode.props || utils.EMPTY_OBJ;
    // If render is going async there is no value change yet, it will come back to process input soon
    if (previousValue !== newProps.value) {
        // When this happens we need to store current cursor position and restore it, to avoid jumping
        applyValue(newVNode, dom);
    }
}
function wrappedOnChange(e) {
    var vNode = this.vNode;
    var props = vNode.props || utils.EMPTY_OBJ;
    var event = props.onChange;
    if (event.event) {
        event.event(event.data, e);
    }
    else {
        event(e);
    }
}
function onCheckboxChange(e) {
    var vNode = this.vNode;
    var props = vNode.props || utils.EMPTY_OBJ;
    var dom = vNode.dom;
    var previousValue = props.value;
    if (props.onClick) {
        var event_2 = props.onClick;
        if (event_2.event) {
            event_2.event(event_2.data, e);
        }
        else {
            event_2(e);
        }
    }
    else if (props.onclick) {
        props.onclick(e);
    }
    // the user may have updated the vNode from the above onInput events syncronously
    // so we need to get it from the context of `this` again
    var newVNode = this.vNode;
    var newProps = newVNode.props || utils.EMPTY_OBJ;
    // If render is going async there is no value change yet, it will come back to process input soon
    if (previousValue !== newProps.value) {
        // When this happens we need to store current cursor position and restore it, to avoid jumping
        applyValue(newVNode, dom);
    }
}
function handleAssociatedRadioInputs(name) {
    var inputs = document.querySelectorAll("input[type=\"radio\"][name=\"" + name + "\"]");
    [].forEach.call(inputs, function (dom) {
        var inputWrapper = processElement_1.wrappers.get(dom);
        if (inputWrapper) {
            var props = inputWrapper.vNode.props;
            if (props) {
                dom.checked = inputWrapper.vNode.props.checked;
            }
        }
    });
}
function processInput(vNode, dom) {
    var props = vNode.props || utils.EMPTY_OBJ;
    applyValue(vNode, dom);
    if (isControlled(props)) {
        var inputWrapper = processElement_1.wrappers.get(dom);
        if (!inputWrapper) {
            inputWrapper = {
                vNode: vNode
            };
            if (isCheckedType(props.type)) {
                dom.onclick = onCheckboxChange.bind(inputWrapper);
                dom.onclick.wrapped = true;
            }
            else {
                dom.oninput = onTextInputChange.bind(inputWrapper);
                dom.oninput.wrapped = true;
            }
            if (props.onChange) {
                dom.onchange = wrappedOnChange.bind(inputWrapper);
                dom.onchange.wrapped = true;
            }
            processElement_1.wrappers.set(dom, inputWrapper);
        }
        inputWrapper.vNode = vNode;
        return true;
    }
    return false;
}
exports.processInput = processInput;
function applyValue(vNode, dom) {
    var props = vNode.props || utils.EMPTY_OBJ;
    var type = props.type;
    var value = props.value;
    var checked = props.checked;
    var multiple = props.multiple;
    var defaultValue = props.defaultValue;
    var hasValue = !index$4.isNullOrUndef(value);
    if (type && type !== dom.type) {
        dom.setAttribute('type', type);
    }
    if (multiple && multiple !== dom.multiple) {
        dom.multiple = multiple;
    }
    if (!index$4.isNullOrUndef(defaultValue) && !hasValue) {
        dom.defaultValue = defaultValue + '';
    }
    if (isCheckedType(type)) {
        if (hasValue) {
            dom.value = value;
        }
        if (!index$4.isNullOrUndef(checked)) {
            dom.checked = checked;
        }
        if (type === 'radio' && props.name) {
            handleAssociatedRadioInputs(props.name);
        }
    }
    else {
        if (hasValue && dom.value !== value) {
            dom.value = value;
        }
        else if (!index$4.isNullOrUndef(checked)) {
            dom.checked = checked;
        }
    }
}
exports.applyValue = applyValue;
});

var SelectWrapper = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });




function isControlled(props) {
    return !index$4.isNullOrUndef(props.value);
}
function updateChildOptionGroup(vNode, value) {
    var type = vNode.type;
    if (type === 'optgroup') {
        var children = vNode.children;
        if (index$4.isArray(children)) {
            for (var i = 0, len = children.length; i < len; i++) {
                updateChildOption(children[i], value);
            }
        }
        else if (VNodes.isVNode(children)) {
            updateChildOption(children, value);
        }
    }
    else {
        updateChildOption(vNode, value);
    }
}
function updateChildOption(vNode, value) {
    var props = vNode.props || utils.EMPTY_OBJ;
    var dom = vNode.dom;
    // we do this as multiple may have changed
    dom.value = props.value;
    if ((index$4.isArray(value) && value.indexOf(props.value) !== -1) || props.value === value) {
        dom.selected = true;
    }
    else if (!index$4.isNullOrUndef(value) || !index$4.isNullOrUndef(props.selected)) {
        dom.selected = props.selected || false;
    }
}
function onSelectChange(e) {
    var vNode = this.vNode;
    var props = vNode.props || utils.EMPTY_OBJ;
    var dom = vNode.dom;
    if (props.onChange) {
        var event_1 = props.onChange;
        if (event_1.event) {
            event_1.event(event_1.data, e);
        }
        else {
            event_1(e);
        }
    }
    else if (props.onchange) {
        props.onchange(e);
    }
    // the user may have updated the vNode from the above onChange events
    // so we need to get it from the context of `this` again
    applyValue(this.vNode, dom, false);
}
function processSelect(vNode, dom, mounting) {
    var props = vNode.props || utils.EMPTY_OBJ;
    applyValue(vNode, dom, mounting);
    if (isControlled(props)) {
        var selectWrapper = processElement_1.wrappers.get(dom);
        if (!selectWrapper) {
            selectWrapper = {
                vNode: vNode
            };
            dom.onchange = onSelectChange.bind(selectWrapper);
            dom.onchange.wrapped = true;
            processElement_1.wrappers.set(dom, selectWrapper);
        }
        selectWrapper.vNode = vNode;
        return true;
    }
    return false;
}
exports.processSelect = processSelect;
function applyValue(vNode, dom, mounting) {
    var props = vNode.props || utils.EMPTY_OBJ;
    if (props.multiple !== dom.multiple) {
        dom.multiple = props.multiple;
    }
    var children = vNode.children;
    if (!index$4.isInvalid(children)) {
        var value = props.value;
        if (mounting && index$4.isNullOrUndef(value)) {
            value = props.defaultValue;
        }
        if (index$4.isArray(children)) {
            for (var i = 0, len = children.length; i < len; i++) {
                updateChildOptionGroup(children[i], value);
            }
        }
        else if (VNodes.isVNode(children)) {
            updateChildOptionGroup(children, value);
        }
    }
}
exports.applyValue = applyValue;
});

var TextareaWrapper = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });



function isControlled(props) {
    return !index$4.isNullOrUndef(props.value);
}
function wrappedOnChange(e) {
    var vNode = this.vNode;
    var props = vNode.props || utils.EMPTY_OBJ;
    var event = props.onChange;
    if (event.event) {
        event.event(event.data, e);
    }
    else {
        event(e);
    }
}
function onTextareaInputChange(e) {
    var vNode = this.vNode;
    var props = vNode.props || utils.EMPTY_OBJ;
    var dom = vNode.dom;
    var previousValue = props.value;
    if (props.onInput) {
        var event_1 = props.onInput;
        if (event_1.event) {
            event_1.event(event_1.data, e);
        }
        else {
            event_1(e);
        }
    }
    else if (props.oninput) {
        props.oninput(e);
    }
    // the user may have updated the vNode from the above onInput events syncronously
    // so we need to get it from the context of `this` again
    var newVNode = this.vNode;
    var newProps = newVNode.props || utils.EMPTY_OBJ;
    // If render is going async there is no value change yet, it will come back to process input soon
    if (previousValue !== newProps.value) {
        // When this happens we need to store current cursor position and restore it, to avoid jumping
        applyValue(newVNode, dom, false);
    }
}
function processTextarea(vNode, dom, mounting) {
    var props = vNode.props || utils.EMPTY_OBJ;
    applyValue(vNode, dom, mounting);
    var textareaWrapper = processElement_1.wrappers.get(dom);
    if (isControlled(props)) {
        if (!textareaWrapper) {
            textareaWrapper = {
                vNode: vNode
            };
            dom.oninput = onTextareaInputChange.bind(textareaWrapper);
            dom.oninput.wrapped = true;
            if (props.onChange) {
                dom.onchange = wrappedOnChange.bind(textareaWrapper);
                dom.onchange.wrapped = true;
            }
            processElement_1.wrappers.set(dom, textareaWrapper);
        }
        textareaWrapper.vNode = vNode;
        return true;
    }
    return false;
}
exports.processTextarea = processTextarea;
function applyValue(vNode, dom, mounting) {
    var props = vNode.props || utils.EMPTY_OBJ;
    var value = props.value;
    var domValue = dom.value;
    if (index$4.isNullOrUndef(value)) {
        if (mounting) {
            var defaultValue = props.defaultValue;
            if (!index$4.isNullOrUndef(defaultValue)) {
                if (defaultValue !== domValue) {
                    dom.value = defaultValue;
                }
            }
            else if (domValue !== '') {
                dom.value = '';
            }
        }
    }
    else {
        /* There is value so keep it controlled */
        if (domValue !== value) {
            dom.value = value;
        }
    }
}
exports.applyValue = applyValue;
});

var processElement_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });



exports.wrappers = new Map();
function processElement(flags, vNode, dom, mounting) {
    if (flags & 512 /* InputElement */) {
        return InputWrapper.processInput(vNode, dom);
    }
    if (flags & 2048 /* SelectElement */) {
        return SelectWrapper.processSelect(vNode, dom, mounting);
    }
    if (flags & 1024 /* TextareaElement */) {
        return TextareaWrapper.processTextarea(vNode, dom, mounting);
    }
    return false;
}
exports.default = processElement;
});

var hydration = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });








function normalizeChildNodes(parentDom) {
    var dom = parentDom.firstChild;
    while (dom) {
        if (dom.nodeType === 8) {
            if (dom.data === '!') {
                var placeholder = document.createTextNode('');
                parentDom.replaceChild(placeholder, dom);
                dom = dom.nextSibling;
            }
            else {
                var lastDom = dom.previousSibling;
                parentDom.removeChild(dom);
                dom = lastDom || parentDom.firstChild;
            }
        }
        else {
            dom = dom.nextSibling;
        }
    }
}
exports.normalizeChildNodes = normalizeChildNodes;
function hydrateComponent(vNode, dom, lifecycle, context, isSVG, isClass) {
    var type = vNode.type;
    var ref = vNode.ref;
    vNode.dom = dom;
    var props = vNode.props || utils.EMPTY_OBJ;
    if (isClass) {
        var _isSVG = dom.namespaceURI === constants.svgNS;
        var instance = utils.createClassComponentInstance(vNode, type, props, context, _isSVG, lifecycle);
        var input = instance._lastInput;
        instance._vComponent = vNode;
        instance._vNode = vNode;
        hydrate(input, dom, lifecycle, instance._childContext, _isSVG);
        mounting.mountClassComponentCallbacks(vNode, ref, instance, lifecycle);
        options.default.findDOMNodeEnabled && rendering.componentToDOMNodeMap.set(instance, dom);
        vNode.children = instance;
    }
    else {
        var input = utils.createFunctionalComponentInput(vNode, type, props, context);
        hydrate(input, dom, lifecycle, context, isSVG);
        vNode.children = input;
        vNode.dom = input.dom;
        mounting.mountFunctionalComponentCallbacks(ref, dom, lifecycle);
    }
    return dom;
}
function hydrateElement(vNode, dom, lifecycle, context, isSVG) {
    var children = vNode.children;
    var props = vNode.props;
    var className = vNode.className;
    var flags = vNode.flags;
    var ref = vNode.ref;
    if (isSVG || (flags & 128 /* SvgElement */)) {
        isSVG = true;
    }
    if (dom.nodeType !== 1 || dom.tagName.toLowerCase() !== vNode.type) {
        var newDom = mounting.mountElement(vNode, null, lifecycle, context, isSVG);
        vNode.dom = newDom;
        utils.replaceChild(dom.parentNode, newDom, dom);
        return newDom;
    }
    vNode.dom = dom;
    if (children) {
        hydrateChildren(children, dom, lifecycle, context, isSVG);
    }
    var hasControlledValue = false;
    if (!(flags & 2 /* HtmlElement */)) {
        hasControlledValue = processElement_1.default(flags, vNode, dom, false);
    }
    if (props) {
        for (var prop in props) {
            patching.patchProp(prop, null, props[prop], dom, isSVG, hasControlledValue);
        }
    }
    if (index$4.isNullOrUndef(className)) {
        dom.removeAttribute('class');
    }
    else {
        if (isSVG) {
            dom.setAttribute('class', className);
        }
        else {
            dom.className = className;
        }
    }
    if (ref) {
        mounting.mountRef(dom, ref, lifecycle);
    }
    return dom;
}
function hydrateChildren(children, parentDom, lifecycle, context, isSVG) {
    normalizeChildNodes(parentDom);
    var dom = parentDom.firstChild;
    if (index$4.isArray(children)) {
        for (var i = 0, len = children.length; i < len; i++) {
            var child = children[i];
            if (!index$4.isNull(child) && index$4.isObject(child)) {
                if (dom) {
                    dom = hydrate(child, dom, lifecycle, context, isSVG);
                    dom = dom.nextSibling;
                }
                else {
                    mounting.mount(child, parentDom, lifecycle, context, isSVG);
                }
            }
        }
    }
    else if (index$4.isStringOrNumber(children)) {
        if (dom && dom.nodeType === 3) {
            if (dom.nodeValue !== children) {
                dom.nodeValue = children;
            }
        }
        else if (children) {
            parentDom.textContent = children;
        }
        dom = dom.nextSibling;
    }
    else if (index$4.isObject(children)) {
        hydrate(children, dom, lifecycle, context, isSVG);
        dom = dom.nextSibling;
    }
    // clear any other DOM nodes, there should be only a single entry for the root
    while (dom) {
        var nextSibling = dom.nextSibling;
        parentDom.removeChild(dom);
        dom = nextSibling;
    }
}
function hydrateText(vNode, dom) {
    if (dom.nodeType !== 3) {
        var newDom = mounting.mountText(vNode, null);
        vNode.dom = newDom;
        utils.replaceChild(dom.parentNode, newDom, dom);
        return newDom;
    }
    var text = vNode.children;
    if (dom.nodeValue !== text) {
        dom.nodeValue = text;
    }
    vNode.dom = dom;
    return dom;
}
function hydrateVoid(vNode, dom) {
    vNode.dom = dom;
    return dom;
}
function hydrate(vNode, dom, lifecycle, context, isSVG) {
    var flags = vNode.flags;
    if (flags & 28 /* Component */) {
        return hydrateComponent(vNode, dom, lifecycle, context, isSVG, flags & 4 /* ComponentClass */);
    }
    else if (flags & 3970 /* Element */) {
        return hydrateElement(vNode, dom, lifecycle, context, isSVG);
    }
    else if (flags & 1 /* Text */) {
        return hydrateText(vNode, dom);
    }
    else if (flags & 4096 /* Void */) {
        return hydrateVoid(vNode, dom);
    }
    else {
        index$4.throwError();
    }
}
function hydrateRoot(input, parentDom, lifecycle) {
    var dom = parentDom && parentDom.firstChild;
    if (dom) {
        hydrate(input, dom, lifecycle, utils.EMPTY_OBJ, false);
        dom = parentDom.firstChild;
        // clear any other DOM nodes, there should be only a single entry for the root
        while (dom = dom.nextSibling) {
            parentDom.removeChild(dom);
        }
        return true;
    }
    return false;
}
exports.default = hydrateRoot;
});

var recycling = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


var componentPools = new Map();
var elementPools = new Map();
function recycleElement(vNode, lifecycle, context, isSVG) {
    var tag = vNode.type;
    var pools = elementPools.get(tag);
    if (!index$4.isUndefined(pools)) {
        var key = vNode.key;
        var pool = key === null ? pools.nonKeyed : pools.keyed.get(key);
        if (!index$4.isUndefined(pool)) {
            var recycledVNode = pool.pop();
            if (!index$4.isUndefined(recycledVNode)) {
                patching.patchElement(recycledVNode, vNode, null, lifecycle, context, isSVG, true);
                return vNode.dom;
            }
        }
    }
    return null;
}
exports.recycleElement = recycleElement;
function poolElement(vNode) {
    var tag = vNode.type;
    var key = vNode.key;
    var pools = elementPools.get(tag);
    if (index$4.isUndefined(pools)) {
        pools = {
            nonKeyed: [],
            keyed: new Map()
        };
        elementPools.set(tag, pools);
    }
    if (index$4.isNull(key)) {
        pools.nonKeyed.push(vNode);
    }
    else {
        var pool = pools.keyed.get(key);
        if (index$4.isUndefined(pool)) {
            pool = [];
            pools.keyed.set(key, pool);
        }
        pool.push(vNode);
    }
}
exports.poolElement = poolElement;
function recycleComponent(vNode, lifecycle, context, isSVG) {
    var type = vNode.type;
    var pools = componentPools.get(type);
    if (!index$4.isUndefined(pools)) {
        var key = vNode.key;
        var pool = key === null ? pools.nonKeyed : pools.keyed.get(key);
        if (!index$4.isUndefined(pool)) {
            var recycledVNode = pool.pop();
            if (!index$4.isUndefined(recycledVNode)) {
                var flags = vNode.flags;
                var failed = patching.patchComponent(recycledVNode, vNode, null, lifecycle, context, isSVG, flags & 4 /* ComponentClass */, true);
                if (!failed) {
                    return vNode.dom;
                }
            }
        }
    }
    return null;
}
exports.recycleComponent = recycleComponent;
function poolComponent(vNode) {
    var hooks = vNode.ref;
    var nonRecycleHooks = hooks && (hooks.onComponentWillMount ||
        hooks.onComponentWillUnmount ||
        hooks.onComponentDidMount ||
        hooks.onComponentWillUpdate ||
        hooks.onComponentDidUpdate);
    if (nonRecycleHooks) {
        return;
    }
    var type = vNode.type;
    var key = vNode.key;
    var pools = componentPools.get(type);
    if (index$4.isUndefined(pools)) {
        pools = {
            nonKeyed: [],
            keyed: new Map()
        };
        componentPools.set(type, pools);
    }
    if (index$4.isNull(key)) {
        pools.nonKeyed.push(vNode);
    }
    else {
        var pool = pools.keyed.get(key);
        if (index$4.isUndefined(pool)) {
            pool = [];
            pools.keyed.set(key, pool);
        }
        pool.push(vNode);
    }
}
exports.poolComponent = poolComponent;
});

var unmounting = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });






function unmount(vNode, parentDom, lifecycle, canRecycle, isRecycling) {
    var flags = vNode.flags;
    if (flags & 28 /* Component */) {
        unmountComponent(vNode, parentDom, lifecycle, canRecycle, isRecycling);
    }
    else if (flags & 3970 /* Element */) {
        unmountElement(vNode, parentDom, lifecycle, canRecycle, isRecycling);
    }
    else if (flags & (1 /* Text */ | 4096 /* Void */)) {
        unmountVoidOrText(vNode, parentDom);
    }
}
exports.unmount = unmount;
function unmountVoidOrText(vNode, parentDom) {
    if (parentDom) {
        utils.removeChild(parentDom, vNode.dom);
    }
}
function unmountComponent(vNode, parentDom, lifecycle, canRecycle, isRecycling) {
    var instance = vNode.children;
    var flags = vNode.flags;
    var isStatefulComponent = flags & 4;
    var ref = vNode.ref;
    var dom = vNode.dom;
    if (!isRecycling) {
        if (isStatefulComponent) {
            if (!instance._unmounted) {
                instance._blockSetState = true;
                options.default.beforeUnmount && options.default.beforeUnmount(vNode);
                instance.componentWillUnmount && instance.componentWillUnmount();
                if (ref && !isRecycling) {
                    ref(null);
                }
                instance._unmounted = true;
                options.default.findDOMNodeEnabled && rendering.componentToDOMNodeMap.delete(instance);
                unmount(instance._lastInput, null, instance._lifecycle, false, isRecycling);
            }
        }
        else {
            if (!index$4.isNullOrUndef(ref)) {
                if (!index$4.isNullOrUndef(ref.onComponentWillUnmount)) {
                    ref.onComponentWillUnmount(dom);
                }
            }
            unmount(instance, null, lifecycle, false, isRecycling);
        }
    }
    if (parentDom) {
        var lastInput = instance._lastInput;
        if (index$4.isNullOrUndef(lastInput)) {
            lastInput = instance;
        }
        utils.removeChild(parentDom, dom);
    }
    if (options.default.recyclingEnabled && !isStatefulComponent && (parentDom || canRecycle)) {
        recycling.poolComponent(vNode);
    }
}
exports.unmountComponent = unmountComponent;
function unmountElement(vNode, parentDom, lifecycle, canRecycle, isRecycling) {
    var dom = vNode.dom;
    var ref = vNode.ref;
    var props = vNode.props;
    if (ref && !isRecycling) {
        unmountRef(ref);
    }
    var children = vNode.children;
    if (!index$4.isNullOrUndef(children)) {
        unmountChildren(children, lifecycle, isRecycling);
    }
    if (!index$4.isNull(props)) {
        for (var name_1 in props) {
            // do not add a hasOwnProperty check here, it affects performance
            if (props[name_1] !== null && patching.isAttrAnEvent(name_1)) {
                patching.patchEvent(name_1, props[name_1], null, dom);
                // We need to set this null, because same props otherwise come back if SCU returns false and we are recyling
                props[name_1] = null;
            }
        }
    }
    if (parentDom) {
        utils.removeChild(parentDom, dom);
    }
    if (options.default.recyclingEnabled && (parentDom || canRecycle)) {
        recycling.poolElement(vNode);
    }
}
exports.unmountElement = unmountElement;
function unmountChildren(children, lifecycle, isRecycling) {
    if (index$4.isArray(children)) {
        for (var i = 0, len = children.length; i < len; i++) {
            var child = children[i];
            if (!index$4.isInvalid(child) && index$4.isObject(child)) {
                unmount(child, null, lifecycle, false, isRecycling);
            }
        }
    }
    else if (index$4.isObject(children)) {
        unmount(children, null, lifecycle, false, isRecycling);
    }
}
function unmountRef(ref) {
    if (index$4.isFunction(ref)) {
        ref(null);
    }
    else {
        if (index$4.isInvalid(ref)) {
            return;
        }
        index$4.throwError();
    }
}
});

var rendering = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });








// rather than use a Map, like we did before, we can use an array here
// given there shouldn't be THAT many roots on the page, the difference
// in performance is huge: https://esbench.com/bench/5802a691330ab09900a1a2da
exports.roots = [];
exports.componentToDOMNodeMap = new Map();
options.default.roots = exports.roots;
function findDOMNode(ref) {
    if (!options.default.findDOMNodeEnabled) {
        index$4.throwError();
    }
    var dom = ref && ref.nodeType ? ref : null;
    return exports.componentToDOMNodeMap.get(ref) || dom;
}
exports.findDOMNode = findDOMNode;
function getRoot(dom) {
    for (var i = 0, len = exports.roots.length; i < len; i++) {
        var root = exports.roots[i];
        if (root.dom === dom) {
            return root;
        }
    }
    return null;
}
function setRoot(dom, input, lifecycle) {
    var root = {
        dom: dom,
        input: input,
        lifecycle: lifecycle
    };
    exports.roots.push(root);
    return root;
}
function removeRoot(root) {
    for (var i = 0, len = exports.roots.length; i < len; i++) {
        if (exports.roots[i] === root) {
            exports.roots.splice(i, 1);
            return;
        }
    }
}
var documentBody = index$4.isBrowser ? document.body : null;
function render(input, parentDom) {
    if (documentBody === parentDom) {
        index$4.throwError();
    }
    if (input === index$4.NO_OP) {
        return;
    }
    var root = getRoot(parentDom);
    if (index$4.isNull(root)) {
        var lifecycle = new index$4.Lifecycle();
        if (!index$4.isInvalid(input)) {
            if (input.dom) {
                input = VNodes.directClone(input);
            }
            if (!hydration.default(input, parentDom, lifecycle)) {
                mounting.mount(input, parentDom, lifecycle, utils.EMPTY_OBJ, false);
            }
            root = setRoot(parentDom, input, lifecycle);
            lifecycle.trigger();
        }
    }
    else {
        var lifecycle = root.lifecycle;
        lifecycle.listeners = [];
        if (index$4.isNullOrUndef(input)) {
            unmounting.unmount(root.input, parentDom, lifecycle, false, false);
            removeRoot(root);
        }
        else {
            if (input.dom) {
                input = VNodes.directClone(input);
            }
            patching.patch(root.input, input, parentDom, lifecycle, utils.EMPTY_OBJ, false, false);
        }
        lifecycle.trigger();
        root.input = input;
    }
    if (root) {
        var rootInput = root.input;
        if (rootInput && (rootInput.flags & 28 /* Component */)) {
            return rootInput.children;
        }
    }
}
exports.render = render;
function createRenderer(parentDom) {
    return function renderer(lastInput, nextInput) {
        if (!parentDom) {
            parentDom = lastInput;
        }
        render(nextInput, parentDom);
    };
}
exports.createRenderer = createRenderer;
});

var patching = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });










function patch(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling) {
    if (lastVNode !== nextVNode) {
        var lastFlags = lastVNode.flags;
        var nextFlags = nextVNode.flags;
        if (nextFlags & 28 /* Component */) {
            if (lastFlags & 28 /* Component */) {
                patchComponent(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, nextFlags & 4 /* ComponentClass */, isRecycling);
            }
            else {
                utils.replaceVNode(parentDom, mounting.mountComponent(nextVNode, null, lifecycle, context, isSVG, nextFlags & 4 /* ComponentClass */), lastVNode, lifecycle, isRecycling);
            }
        }
        else if (nextFlags & 3970 /* Element */) {
            if (lastFlags & 3970 /* Element */) {
                patchElement(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling);
            }
            else {
                utils.replaceVNode(parentDom, mounting.mountElement(nextVNode, null, lifecycle, context, isSVG), lastVNode, lifecycle, isRecycling);
            }
        }
        else if (nextFlags & 1 /* Text */) {
            if (lastFlags & 1 /* Text */) {
                patchText(lastVNode, nextVNode);
            }
            else {
                utils.replaceVNode(parentDom, mounting.mountText(nextVNode, null), lastVNode, lifecycle, isRecycling);
            }
        }
        else if (nextFlags & 4096 /* Void */) {
            if (lastFlags & 4096 /* Void */) {
                patchVoid(lastVNode, nextVNode);
            }
            else {
                utils.replaceVNode(parentDom, mounting.mountVoid(nextVNode, null), lastVNode, lifecycle, isRecycling);
            }
        }
        else {
            // Error case: mount new one replacing old one
            utils.replaceLastChildAndUnmount(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling);
        }
    }
}
exports.patch = patch;
function unmountChildren(children, dom, lifecycle, isRecycling) {
    if (VNodes.isVNode(children)) {
        unmounting.unmount(children, dom, lifecycle, true, isRecycling);
    }
    else if (index$4.isArray(children)) {
        utils.removeAllChildren(dom, children, lifecycle, isRecycling);
    }
    else {
        dom.textContent = '';
    }
}
function patchElement(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling) {
    var nextTag = nextVNode.type;
    var lastTag = lastVNode.type;
    if (lastTag !== nextTag) {
        utils.replaceWithNewNode(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling);
    }
    else {
        var dom = lastVNode.dom;
        var lastProps = lastVNode.props;
        var nextProps = nextVNode.props;
        var lastChildren = lastVNode.children;
        var nextChildren = nextVNode.children;
        var lastFlags = lastVNode.flags;
        var nextFlags = nextVNode.flags;
        var nextRef = nextVNode.ref;
        var lastClassName = lastVNode.className;
        var nextClassName = nextVNode.className;
        nextVNode.dom = dom;
        if (isSVG || (nextFlags & 128 /* SvgElement */)) {
            isSVG = true;
        }
        if (lastChildren !== nextChildren) {
            patchChildren(lastFlags, nextFlags, lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling);
        }
        var hasControlledValue = false;
        if (!(nextFlags & 2 /* HtmlElement */)) {
            hasControlledValue = processElement_1.default(nextFlags, nextVNode, dom, false);
        }
        // inlined patchProps  -- starts --
        if (lastProps !== nextProps) {
            var lastPropsOrEmpty = lastProps || utils.EMPTY_OBJ;
            var nextPropsOrEmpty = nextProps || utils.EMPTY_OBJ;
            if (nextPropsOrEmpty !== utils.EMPTY_OBJ) {
                for (var prop in nextPropsOrEmpty) {
                    // do not add a hasOwnProperty check here, it affects performance
                    var nextValue = nextPropsOrEmpty[prop];
                    var lastValue = lastPropsOrEmpty[prop];
                    patchProp(prop, lastValue, nextValue, dom, isSVG, hasControlledValue);
                }
            }
            if (lastPropsOrEmpty !== utils.EMPTY_OBJ) {
                for (var prop in lastPropsOrEmpty) {
                    // do not add a hasOwnProperty check here, it affects performance
                    if (index$4.isNullOrUndef(nextPropsOrEmpty[prop])) {
                        removeProp(prop, lastPropsOrEmpty[prop], dom);
                    }
                }
            }
        }
        // inlined patchProps  -- ends --
        if (lastClassName !== nextClassName) {
            if (index$4.isNullOrUndef(nextClassName)) {
                dom.removeAttribute('class');
            }
            else {
                if (isSVG) {
                    dom.setAttribute('class', nextClassName);
                }
                else {
                    dom.className = nextClassName;
                }
            }
        }
        if (nextRef) {
            if (lastVNode.ref !== nextRef || isRecycling) {
                mounting.mountRef(dom, nextRef, lifecycle);
            }
        }
    }
}
exports.patchElement = patchElement;
function patchChildren(lastFlags, nextFlags, lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling) {
    var patchArray = false;
    var patchKeyed = false;
    if (nextFlags & 64 /* HasNonKeyedChildren */) {
        patchArray = true;
    }
    else if ((lastFlags & 32 /* HasKeyedChildren */) && (nextFlags & 32 /* HasKeyedChildren */)) {
        patchKeyed = true;
        patchArray = true;
    }
    else if (index$4.isInvalid(nextChildren)) {
        unmountChildren(lastChildren, dom, lifecycle, isRecycling);
    }
    else if (index$4.isInvalid(lastChildren)) {
        if (index$4.isStringOrNumber(nextChildren)) {
            utils.setTextContent(dom, nextChildren);
        }
        else {
            if (index$4.isArray(nextChildren)) {
                mounting.mountArrayChildren(nextChildren, dom, lifecycle, context, isSVG);
            }
            else {
                mounting.mount(nextChildren, dom, lifecycle, context, isSVG);
            }
        }
    }
    else if (index$4.isStringOrNumber(nextChildren)) {
        if (index$4.isStringOrNumber(lastChildren)) {
            utils.updateTextContent(dom, nextChildren);
        }
        else {
            unmountChildren(lastChildren, dom, lifecycle, isRecycling);
            utils.setTextContent(dom, nextChildren);
        }
    }
    else if (index$4.isArray(nextChildren)) {
        if (index$4.isArray(lastChildren)) {
            patchArray = true;
            if (utils.isKeyed(lastChildren, nextChildren)) {
                patchKeyed = true;
            }
        }
        else {
            unmountChildren(lastChildren, dom, lifecycle, isRecycling);
            mounting.mountArrayChildren(nextChildren, dom, lifecycle, context, isSVG);
        }
    }
    else if (index$4.isArray(lastChildren)) {
        utils.removeAllChildren(dom, lastChildren, lifecycle, isRecycling);
        mounting.mount(nextChildren, dom, lifecycle, context, isSVG);
    }
    else if (VNodes.isVNode(nextChildren)) {
        if (VNodes.isVNode(lastChildren)) {
            patch(lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling);
        }
        else {
            unmountChildren(lastChildren, dom, lifecycle, isRecycling);
            mounting.mount(nextChildren, dom, lifecycle, context, isSVG);
        }
    }
    if (patchArray) {
        if (patchKeyed) {
            patchKeyedChildren(lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling);
        }
        else {
            patchNonKeyedChildren(lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling);
        }
    }
}
function patchComponent(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isClass, isRecycling) {
    var lastType = lastVNode.type;
    var nextType = nextVNode.type;
    var lastKey = lastVNode.key;
    var nextKey = nextVNode.key;
    if (lastType !== nextType || lastKey !== nextKey) {
        utils.replaceWithNewNode(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling);
        return false;
    }
    else {
        var nextProps = nextVNode.props || utils.EMPTY_OBJ;
        if (isClass) {
            var instance = lastVNode.children;
            if (instance._unmounted) {
                if (index$4.isNull(parentDom)) {
                    return true;
                }
                utils.replaceChild(parentDom, mounting.mountComponent(nextVNode, null, lifecycle, context, isSVG, nextVNode.flags & 4 /* ComponentClass */), lastVNode.dom);
            }
            else {
                var lastState = instance.state;
                var nextState = instance.state;
                var lastProps = instance.props;
                var childContext = void 0;
                if (!index$4.isUndefined(instance.getChildContext)) {
                    childContext = instance.getChildContext();
                }
                nextVNode.children = instance;
                instance._isSVG = isSVG;
                if (index$4.isNullOrUndef(childContext)) {
                    childContext = context;
                }
                else {
                    childContext = index$4.combineFrom(context, childContext);
                }
                var lastInput = instance._lastInput;
                var nextInput = instance._updateComponent(lastState, nextState, lastProps, nextProps, context, false, false);
                var didUpdate = true;
                instance._childContext = childContext;
                if (index$4.isInvalid(nextInput)) {
                    nextInput = VNodes.createVoidVNode();
                }
                else if (nextInput === index$4.NO_OP) {
                    nextInput = lastInput;
                    didUpdate = false;
                }
                else if (index$4.isStringOrNumber(nextInput)) {
                    nextInput = VNodes.createTextVNode(nextInput, null);
                }
                else if (index$4.isArray(nextInput)) {
                    index$4.throwError();
                }
                else if (index$4.isObject(nextInput) && nextInput.dom) {
                    nextInput = VNodes.directClone(nextInput);
                }
                if (nextInput.flags & 28 /* Component */) {
                    nextInput.parentVNode = nextVNode;
                }
                else if (lastInput.flags & 28 /* Component */) {
                    lastInput.parentVNode = nextVNode;
                }
                instance._lastInput = nextInput;
                instance._vNode = nextVNode;
                if (didUpdate) {
                    patch(lastInput, nextInput, parentDom, lifecycle, childContext, isSVG, isRecycling);
                    if (!index$4.isUndefined(instance.componentDidUpdate)) {
                        instance.componentDidUpdate(lastProps, lastState);
                    }
                    options.default.afterUpdate && options.default.afterUpdate(nextVNode);
                    options.default.findDOMNodeEnabled && rendering.componentToDOMNodeMap.set(instance, nextInput.dom);
                }
                nextVNode.dom = nextInput.dom;
            }
        }
        else {
            var shouldUpdate = true;
            var lastProps = lastVNode.props;
            var nextHooks = nextVNode.ref;
            var nextHooksDefined = !index$4.isNullOrUndef(nextHooks);
            var lastInput = lastVNode.children;
            var nextInput = lastInput;
            nextVNode.dom = lastVNode.dom;
            nextVNode.children = lastInput;
            if (lastKey !== nextKey) {
                shouldUpdate = true;
            }
            else {
                if (nextHooksDefined && !index$4.isNullOrUndef(nextHooks.onComponentShouldUpdate)) {
                    shouldUpdate = nextHooks.onComponentShouldUpdate(lastProps, nextProps);
                }
            }
            if (shouldUpdate !== false) {
                if (nextHooksDefined && !index$4.isNullOrUndef(nextHooks.onComponentWillUpdate)) {
                    nextHooks.onComponentWillUpdate(lastProps, nextProps);
                }
                nextInput = nextType(nextProps, context);
                if (index$4.isInvalid(nextInput)) {
                    nextInput = VNodes.createVoidVNode();
                }
                else if (index$4.isStringOrNumber(nextInput) && nextInput !== index$4.NO_OP) {
                    nextInput = VNodes.createTextVNode(nextInput, null);
                }
                else if (index$4.isArray(nextInput)) {
                    index$4.throwError();
                }
                else if (index$4.isObject(nextInput) && nextInput.dom) {
                    nextInput = VNodes.directClone(nextInput);
                }
                if (nextInput !== index$4.NO_OP) {
                    patch(lastInput, nextInput, parentDom, lifecycle, context, isSVG, isRecycling);
                    nextVNode.children = nextInput;
                    if (nextHooksDefined && !index$4.isNullOrUndef(nextHooks.onComponentDidUpdate)) {
                        nextHooks.onComponentDidUpdate(lastProps, nextProps);
                    }
                    nextVNode.dom = nextInput.dom;
                }
            }
            if (nextInput.flags & 28 /* Component */) {
                nextInput.parentVNode = nextVNode;
            }
            else if (lastInput.flags & 28 /* Component */) {
                lastInput.parentVNode = nextVNode;
            }
        }
    }
    return false;
}
exports.patchComponent = patchComponent;
function patchText(lastVNode, nextVNode) {
    var nextText = nextVNode.children;
    var dom = lastVNode.dom;
    nextVNode.dom = dom;
    if (lastVNode.children !== nextText) {
        dom.nodeValue = nextText;
    }
}
exports.patchText = patchText;
function patchVoid(lastVNode, nextVNode) {
    nextVNode.dom = lastVNode.dom;
}
exports.patchVoid = patchVoid;
function patchNonKeyedChildren(lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling) {
    var lastChildrenLength = lastChildren.length;
    var nextChildrenLength = nextChildren.length;
    var commonLength = lastChildrenLength > nextChildrenLength ? nextChildrenLength : lastChildrenLength;
    var i = 0;
    for (; i < commonLength; i++) {
        var nextChild = nextChildren[i];
        if (nextChild.dom) {
            nextChild = nextChildren[i] = VNodes.directClone(nextChild);
        }
        patch(lastChildren[i], nextChild, dom, lifecycle, context, isSVG, isRecycling);
    }
    if (lastChildrenLength < nextChildrenLength) {
        for (i = commonLength; i < nextChildrenLength; i++) {
            var nextChild = nextChildren[i];
            if (nextChild.dom) {
                nextChild = nextChildren[i] = VNodes.directClone(nextChild);
            }
            utils.appendChild(dom, mounting.mount(nextChild, null, lifecycle, context, isSVG));
        }
    }
    else if (nextChildrenLength === 0) {
        utils.removeAllChildren(dom, lastChildren, lifecycle, isRecycling);
    }
    else if (lastChildrenLength > nextChildrenLength) {
        for (i = commonLength; i < lastChildrenLength; i++) {
            unmounting.unmount(lastChildren[i], dom, lifecycle, false, isRecycling);
        }
    }
}
exports.patchNonKeyedChildren = patchNonKeyedChildren;
function patchKeyedChildren(a, b, dom, lifecycle, context, isSVG, isRecycling) {
    var aLength = a.length;
    var bLength = b.length;
    var aEnd = aLength - 1;
    var bEnd = bLength - 1;
    var aStart = 0;
    var bStart = 0;
    var i;
    var j;
    var aNode;
    var bNode;
    var nextNode;
    var nextPos;
    var node;
    if (aLength === 0) {
        if (bLength !== 0) {
            mounting.mountArrayChildren(b, dom, lifecycle, context, isSVG);
        }
        return;
    }
    else if (bLength === 0) {
        utils.removeAllChildren(dom, a, lifecycle, isRecycling);
        return;
    }
    var aStartNode = a[aStart];
    var bStartNode = b[bStart];
    var aEndNode = a[aEnd];
    var bEndNode = b[bEnd];
    if (bStartNode.dom) {
        b[bStart] = bStartNode = VNodes.directClone(bStartNode);
    }
    if (bEndNode.dom) {
        b[bEnd] = bEndNode = VNodes.directClone(bEndNode);
    }
    // Step 1
    /* eslint no-constant-condition: 0 */
    outer: while (true) {
        // Sync nodes with the same key at the beginning.
        while (aStartNode.key === bStartNode.key) {
            patch(aStartNode, bStartNode, dom, lifecycle, context, isSVG, isRecycling);
            aStart++;
            bStart++;
            if (aStart > aEnd || bStart > bEnd) {
                break outer;
            }
            aStartNode = a[aStart];
            bStartNode = b[bStart];
            if (bStartNode.dom) {
                b[bStart] = bStartNode = VNodes.directClone(bStartNode);
            }
        }
        // Sync nodes with the same key at the end.
        while (aEndNode.key === bEndNode.key) {
            patch(aEndNode, bEndNode, dom, lifecycle, context, isSVG, isRecycling);
            aEnd--;
            bEnd--;
            if (aStart > aEnd || bStart > bEnd) {
                break outer;
            }
            aEndNode = a[aEnd];
            bEndNode = b[bEnd];
            if (bEndNode.dom) {
                b[bEnd] = bEndNode = VNodes.directClone(bEndNode);
            }
        }
        // Move and sync nodes from right to left.
        if (aEndNode.key === bStartNode.key) {
            patch(aEndNode, bStartNode, dom, lifecycle, context, isSVG, isRecycling);
            utils.insertOrAppend(dom, bStartNode.dom, aStartNode.dom);
            aEnd--;
            bStart++;
            aEndNode = a[aEnd];
            bStartNode = b[bStart];
            if (bStartNode.dom) {
                b[bStart] = bStartNode = VNodes.directClone(bStartNode);
            }
            continue;
        }
        // Move and sync nodes from left to right.
        if (aStartNode.key === bEndNode.key) {
            patch(aStartNode, bEndNode, dom, lifecycle, context, isSVG, isRecycling);
            nextPos = bEnd + 1;
            nextNode = nextPos < b.length ? b[nextPos].dom : null;
            utils.insertOrAppend(dom, bEndNode.dom, nextNode);
            aStart++;
            bEnd--;
            aStartNode = a[aStart];
            bEndNode = b[bEnd];
            if (bEndNode.dom) {
                b[bEnd] = bEndNode = VNodes.directClone(bEndNode);
            }
            continue;
        }
        break;
    }
    if (aStart > aEnd) {
        if (bStart <= bEnd) {
            nextPos = bEnd + 1;
            nextNode = nextPos < b.length ? b[nextPos].dom : null;
            while (bStart <= bEnd) {
                node = b[bStart];
                if (node.dom) {
                    b[bStart] = node = VNodes.directClone(node);
                }
                bStart++;
                utils.insertOrAppend(dom, mounting.mount(node, null, lifecycle, context, isSVG), nextNode);
            }
        }
    }
    else if (bStart > bEnd) {
        while (aStart <= aEnd) {
            unmounting.unmount(a[aStart++], dom, lifecycle, false, isRecycling);
        }
    }
    else {
        aLength = aEnd - aStart + 1;
        bLength = bEnd - bStart + 1;
        var sources = new Array(bLength);
        // Mark all nodes as inserted.
        for (i = 0; i < bLength; i++) {
            sources[i] = -1;
        }
        var moved = false;
        var pos = 0;
        var patched = 0;
        // When sizes are small, just loop them through
        if ((bLength <= 4) || (aLength * bLength <= 16)) {
            for (i = aStart; i <= aEnd; i++) {
                aNode = a[i];
                if (patched < bLength) {
                    for (j = bStart; j <= bEnd; j++) {
                        bNode = b[j];
                        if (aNode.key === bNode.key) {
                            sources[j - bStart] = i;
                            if (pos > j) {
                                moved = true;
                            }
                            else {
                                pos = j;
                            }
                            if (bNode.dom) {
                                b[j] = bNode = VNodes.directClone(bNode);
                            }
                            patch(aNode, bNode, dom, lifecycle, context, isSVG, isRecycling);
                            patched++;
                            a[i] = null;
                            break;
                        }
                    }
                }
            }
        }
        else {
            var keyIndex = new Map();
            // Map keys by their index in array
            for (i = bStart; i <= bEnd; i++) {
                keyIndex.set(b[i].key, i);
            }
            // Try to patch same keys
            for (i = aStart; i <= aEnd; i++) {
                aNode = a[i];
                if (patched < bLength) {
                    j = keyIndex.get(aNode.key);
                    if (!index$4.isUndefined(j)) {
                        bNode = b[j];
                        sources[j - bStart] = i;
                        if (pos > j) {
                            moved = true;
                        }
                        else {
                            pos = j;
                        }
                        if (bNode.dom) {
                            b[j] = bNode = VNodes.directClone(bNode);
                        }
                        patch(aNode, bNode, dom, lifecycle, context, isSVG, isRecycling);
                        patched++;
                        a[i] = null;
                    }
                }
            }
        }
        // fast-path: if nothing patched remove all old and add all new
        if (aLength === a.length && patched === 0) {
            utils.removeAllChildren(dom, a, lifecycle, isRecycling);
            while (bStart < bLength) {
                node = b[bStart];
                if (node.dom) {
                    b[bStart] = node = VNodes.directClone(node);
                }
                bStart++;
                utils.insertOrAppend(dom, mounting.mount(node, null, lifecycle, context, isSVG), null);
            }
        }
        else {
            i = aLength - patched;
            while (i > 0) {
                aNode = a[aStart++];
                if (!index$4.isNull(aNode)) {
                    unmounting.unmount(aNode, dom, lifecycle, true, isRecycling);
                    i--;
                }
            }
            if (moved) {
                var seq = lis_algorithm(sources);
                j = seq.length - 1;
                for (i = bLength - 1; i >= 0; i--) {
                    if (sources[i] === -1) {
                        pos = i + bStart;
                        node = b[pos];
                        if (node.dom) {
                            b[pos] = node = VNodes.directClone(node);
                        }
                        nextPos = pos + 1;
                        nextNode = nextPos < b.length ? b[nextPos].dom : null;
                        utils.insertOrAppend(dom, mounting.mount(node, dom, lifecycle, context, isSVG), nextNode);
                    }
                    else {
                        if (j < 0 || i !== seq[j]) {
                            pos = i + bStart;
                            node = b[pos];
                            nextPos = pos + 1;
                            nextNode = nextPos < b.length ? b[nextPos].dom : null;
                            utils.insertOrAppend(dom, node.dom, nextNode);
                        }
                        else {
                            j--;
                        }
                    }
                }
            }
            else if (patched !== bLength) {
                // when patched count doesn't match b length we need to insert those new ones
                // loop backwards so we can use insertBefore
                for (i = bLength - 1; i >= 0; i--) {
                    if (sources[i] === -1) {
                        pos = i + bStart;
                        node = b[pos];
                        if (node.dom) {
                            b[pos] = node = VNodes.directClone(node);
                        }
                        nextPos = pos + 1;
                        nextNode = nextPos < b.length ? b[nextPos].dom : null;
                        utils.insertOrAppend(dom, mounting.mount(node, null, lifecycle, context, isSVG), nextNode);
                    }
                }
            }
        }
    }
}
exports.patchKeyedChildren = patchKeyedChildren;
// // https://en.wikipedia.org/wiki/Longest_increasing_subsequence
function lis_algorithm(arr) {
    var p = arr.slice(0);
    var result = [0];
    var i;
    var j;
    var u;
    var v;
    var c;
    var len = arr.length;
    for (i = 0; i < len; i++) {
        var arrI = arr[i];
        if (arrI === -1) {
            continue;
        }
        j = result[result.length - 1];
        if (arr[j] < arrI) {
            p[i] = j;
            result.push(i);
            continue;
        }
        u = 0;
        v = result.length - 1;
        while (u < v) {
            c = ((u + v) / 2) | 0;
            if (arr[result[c]] < arrI) {
                u = c + 1;
            }
            else {
                v = c;
            }
        }
        if (arrI < arr[result[u]]) {
            if (u > 0) {
                p[i] = result[u - 1];
            }
            result[u] = i;
        }
    }
    u = result.length;
    v = result[u - 1];
    while (u-- > 0) {
        result[u] = v;
        v = p[v];
    }
    return result;
}
function isAttrAnEvent(attr) {
    return attr[0] === 'o' && attr[1] === 'n';
}
exports.isAttrAnEvent = isAttrAnEvent;
function patchProp(prop, lastValue, nextValue, dom, isSVG, hasControlledValue) {
    if (prop in constants.skipProps || (hasControlledValue && prop === 'value')) {
        return;
    }
    else if (prop in constants.booleanProps) {
        prop = prop === 'autoFocus' ? prop.toLowerCase() : prop;
        dom[prop] = !!nextValue;
    }
    else if (prop in constants.strictProps) {
        var value = index$4.isNullOrUndef(nextValue) ? '' : nextValue;
        if (dom[prop] !== value) {
            dom[prop] = value;
        }
    }
    else if (lastValue !== nextValue) {
        if (isAttrAnEvent(prop)) {
            patchEvent(prop, lastValue, nextValue, dom);
        }
        else if (index$4.isNullOrUndef(nextValue)) {
            dom.removeAttribute(prop);
        }
        else if (prop === 'style') {
            patchStyle(lastValue, nextValue, dom);
        }
        else if (prop === 'dangerouslySetInnerHTML') {
            var lastHtml = lastValue && lastValue.__html;
            var nextHtml = nextValue && nextValue.__html;
            if (lastHtml !== nextHtml) {
                if (!index$4.isNullOrUndef(nextHtml)) {
                    dom.innerHTML = nextHtml;
                }
            }
        }
        else {
            var ns = isSVG ? constants.namespaces[prop] : false;
            if (ns) {
                dom.setAttributeNS(ns, prop, nextValue);
            }
            else {
                dom.setAttribute(prop, nextValue);
            }
        }
    }
}
exports.patchProp = patchProp;
function patchEvent(name, lastValue, nextValue, dom) {
    if (lastValue !== nextValue) {
        if (name in constants.delegatedEvents) {
            delegation.handleEvent(name, lastValue, nextValue, dom);
        }
        else {
            var nameLowerCase = name.toLowerCase();
            var domEvent = dom[nameLowerCase];
            // if the function is wrapped, that means it's been controlled by a wrapper
            if (domEvent && domEvent.wrapped) {
                return;
            }
            if (!index$4.isFunction(nextValue) && !index$4.isNullOrUndef(nextValue)) {
                var linkEvent_1 = nextValue.event;
                if (linkEvent_1 && index$4.isFunction(linkEvent_1)) {
                    if (!dom._data) {
                        dom[nameLowerCase] = function (e) {
                            linkEvent_1(e.currentTarget._data, e);
                        };
                    }
                    dom._data = nextValue.data;
                }
                else {
                    index$4.throwError();
                }
            }
            else {
                dom[nameLowerCase] = nextValue;
            }
        }
    }
}
exports.patchEvent = patchEvent;
// We are assuming here that we come from patchProp routine
// -nextAttrValue cannot be null or undefined
function patchStyle(lastAttrValue, nextAttrValue, dom) {
    var domStyle = dom.style;
    if (index$4.isString(nextAttrValue)) {
        domStyle.cssText = nextAttrValue;
        return;
    }
    for (var style in nextAttrValue) {
        // do not add a hasOwnProperty check here, it affects performance
        var value = nextAttrValue[style];
        if (!index$4.isNumber(value) || style in constants.isUnitlessNumber) {
            domStyle[style] = value;
        }
        else {
            domStyle[style] = value + 'px';
        }
    }
    if (!index$4.isNullOrUndef(lastAttrValue)) {
        for (var style in lastAttrValue) {
            if (index$4.isNullOrUndef(nextAttrValue[style])) {
                domStyle[style] = '';
            }
        }
    }
}
exports.patchStyle = patchStyle;
function removeProp(prop, lastValue, dom) {
    if (prop === 'value') {
        dom.value = '';
    }
    else if (prop === 'style') {
        dom.removeAttribute('style');
    }
    else if (isAttrAnEvent(prop)) {
        delegation.handleEvent(name, lastValue, null, dom);
    }
    else {
        dom.removeAttribute(prop);
    }
}
});

var mounting = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });








function mount(vNode, parentDom, lifecycle, context, isSVG) {
    var flags = vNode.flags;
    if (flags & 3970 /* Element */) {
        return mountElement(vNode, parentDom, lifecycle, context, isSVG);
    }
    else if (flags & 28 /* Component */) {
        return mountComponent(vNode, parentDom, lifecycle, context, isSVG, flags & 4 /* ComponentClass */);
    }
    else if (flags & 4096 /* Void */) {
        return mountVoid(vNode, parentDom);
    }
    else if (flags & 1 /* Text */) {
        return mountText(vNode, parentDom);
    }
    else {
        index$4.throwError();
    }
}
exports.mount = mount;
function mountText(vNode, parentDom) {
    var dom = document.createTextNode(vNode.children);
    vNode.dom = dom;
    if (parentDom) {
        utils.appendChild(parentDom, dom);
    }
    return dom;
}
exports.mountText = mountText;
function mountVoid(vNode, parentDom) {
    var dom = document.createTextNode('');
    vNode.dom = dom;
    if (parentDom) {
        utils.appendChild(parentDom, dom);
    }
    return dom;
}
exports.mountVoid = mountVoid;
function mountElement(vNode, parentDom, lifecycle, context, isSVG) {
    if (options.default.recyclingEnabled) {
        var dom_1 = recycling.recycleElement(vNode, lifecycle, context, isSVG);
        if (!index$4.isNull(dom_1)) {
            if (!index$4.isNull(parentDom)) {
                utils.appendChild(parentDom, dom_1);
            }
            return dom_1;
        }
    }
    var flags = vNode.flags;
    if (isSVG || (flags & 128 /* SvgElement */)) {
        isSVG = true;
    }
    var dom = utils.documentCreateElement(vNode.type, isSVG);
    var children = vNode.children;
    var props = vNode.props;
    var className = vNode.className;
    var ref = vNode.ref;
    vNode.dom = dom;
    if (!index$4.isInvalid(children)) {
        if (index$4.isStringOrNumber(children)) {
            utils.setTextContent(dom, children);
        }
        else if (index$4.isArray(children)) {
            mountArrayChildren(children, dom, lifecycle, context, isSVG);
        }
        else if (VNodes.isVNode(children)) {
            mount(children, dom, lifecycle, context, isSVG);
        }
    }
    var hasControlledValue = false;
    if (!(flags & 2 /* HtmlElement */)) {
        hasControlledValue = processElement_1.default(flags, vNode, dom, true);
    }
    if (!index$4.isNull(props)) {
        for (var prop in props) {
            // do not add a hasOwnProperty check here, it affects performance
            patching.patchProp(prop, null, props[prop], dom, isSVG, hasControlledValue);
        }
    }
    if (index$4.isNullOrUndef(className)) {
        dom.removeAttribute('class');
    }
    else {
        if (isSVG) {
            dom.setAttribute('class', className);
        }
        else {
            dom.className = className;
        }
    }
    if (!index$4.isNull(ref)) {
        mountRef(dom, ref, lifecycle);
    }
    if (!index$4.isNull(parentDom)) {
        utils.appendChild(parentDom, dom);
    }
    return dom;
}
exports.mountElement = mountElement;
function mountArrayChildren(children, dom, lifecycle, context, isSVG) {
    for (var i = 0, len = children.length; i < len; i++) {
        var child = children[i];
        // Verify can string/number be here. might cause de-opt. - Normalization takes care of it.
        if (!index$4.isInvalid(child)) {
            if (child.dom) {
                children[i] = child = VNodes.directClone(child);
            }
            mount(children[i], dom, lifecycle, context, isSVG);
        }
    }
}
exports.mountArrayChildren = mountArrayChildren;
function mountComponent(vNode, parentDom, lifecycle, context, isSVG, isClass) {
    if (options.default.recyclingEnabled) {
        var dom_2 = recycling.recycleComponent(vNode, lifecycle, context, isSVG);
        if (!index$4.isNull(dom_2)) {
            if (!index$4.isNull(parentDom)) {
                utils.appendChild(parentDom, dom_2);
            }
            return dom_2;
        }
    }
    var type = vNode.type;
    var props = vNode.props || utils.EMPTY_OBJ;
    var ref = vNode.ref;
    var dom;
    if (isClass) {
        var instance = utils.createClassComponentInstance(vNode, type, props, context, isSVG, lifecycle);
        var input = instance._lastInput;
        instance._vNode = vNode;
        vNode.dom = dom = mount(input, null, lifecycle, instance._childContext, isSVG);
        if (!index$4.isNull(parentDom)) {
            utils.appendChild(parentDom, dom);
        }
        mountClassComponentCallbacks(vNode, ref, instance, lifecycle);
        options.default.findDOMNodeEnabled && rendering.componentToDOMNodeMap.set(instance, dom);
        vNode.children = instance;
    }
    else {
        var input = utils.createFunctionalComponentInput(vNode, type, props, context);
        vNode.dom = dom = mount(input, null, lifecycle, context, isSVG);
        vNode.children = input;
        mountFunctionalComponentCallbacks(ref, dom, lifecycle);
        if (!index$4.isNull(parentDom)) {
            utils.appendChild(parentDom, dom);
        }
    }
    return dom;
}
exports.mountComponent = mountComponent;
function mountClassComponentCallbacks(vNode, ref, instance, lifecycle) {
    if (ref) {
        if (index$4.isFunction(ref)) {
            ref(instance);
        }
        else {
            index$4.throwError();
        }
    }
    var cDM = instance.componentDidMount;
    var afterMount = options.default.afterMount;
    if (!index$4.isUndefined(cDM) || !index$4.isNull(afterMount)) {
        lifecycle.addListener(function () {
            afterMount && afterMount(vNode);
            cDM && instance.componentDidMount();
        });
    }
}
exports.mountClassComponentCallbacks = mountClassComponentCallbacks;
function mountFunctionalComponentCallbacks(ref, dom, lifecycle) {
    if (ref) {
        if (!index$4.isNullOrUndef(ref.onComponentWillMount)) {
            ref.onComponentWillMount();
        }
        if (!index$4.isNullOrUndef(ref.onComponentDidMount)) {
            lifecycle.addListener(function () { return ref.onComponentDidMount(dom); });
        }
    }
}
exports.mountFunctionalComponentCallbacks = mountFunctionalComponentCallbacks;
function mountRef(dom, value, lifecycle) {
    if (index$4.isFunction(value)) {
        lifecycle.addListener(function () { return value(dom); });
    }
    else {
        if (index$4.isInvalid(value)) {
            return;
        }
        index$4.throwError();
    }
}
exports.mountRef = mountRef;
});

var utils = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });








// We need EMPTY_OBJ defined in one place.
// Its used for comparison so we cant inline it into shared
exports.EMPTY_OBJ = {};
function createClassComponentInstance(vNode, Component, props, context, isSVG, lifecycle) {
    if (index$4.isUndefined(context)) {
        context = exports.EMPTY_OBJ; // Context should not be mutable
    }
    var instance = new Component(props, context);
    instance.context = context;
    if (instance.props === exports.EMPTY_OBJ) {
        instance.props = props;
    }
    instance._patch = patching.patch;
    if (options.default.findDOMNodeEnabled) {
        instance._componentToDOMNodeMap = rendering.componentToDOMNodeMap;
    }
    // setState callbacks must fire after render is done when called from componentWillReceiveProps or componentWillMount
    instance._lifecycle = lifecycle;
    instance._unmounted = false;
    instance._pendingSetState = true;
    instance._isSVG = isSVG;
    if (!index$4.isUndefined(instance.componentWillMount)) {
        instance._blockRender = true;
        instance.componentWillMount();
        instance._blockRender = false;
    }
    var childContext;
    if (!index$4.isUndefined(instance.getChildContext)) {
        childContext = instance.getChildContext();
    }
    if (index$4.isNullOrUndef(childContext)) {
        instance._childContext = context;
    }
    else {
        instance._childContext = index$4.combineFrom(context, childContext);
    }
    options.default.beforeRender && options.default.beforeRender(instance);
    var input = instance.render(props, instance.state, context);
    options.default.afterRender && options.default.afterRender(instance);
    if (index$4.isArray(input)) {
        index$4.throwError();
    }
    else if (index$4.isInvalid(input)) {
        input = VNodes.createVoidVNode();
    }
    else if (index$4.isStringOrNumber(input)) {
        input = VNodes.createTextVNode(input, null);
    }
    else {
        if (input.dom) {
            input = VNodes.directClone(input);
        }
        if (input.flags & 28 /* Component */) {
            // if we have an input that is also a component, we run into a tricky situation
            // where the root vNode needs to always have the correct DOM entry
            // so we break monomorphism on our input and supply it our vNode as parentVNode
            // we can optimise this in the future, but this gets us out of a lot of issues
            input.parentVNode = vNode;
        }
    }
    instance._pendingSetState = false;
    instance._lastInput = input;
    return instance;
}
exports.createClassComponentInstance = createClassComponentInstance;
function replaceLastChildAndUnmount(lastInput, nextInput, parentDom, lifecycle, context, isSVG, isRecycling) {
    replaceVNode(parentDom, mounting.mount(nextInput, null, lifecycle, context, isSVG), lastInput, lifecycle, isRecycling);
}
exports.replaceLastChildAndUnmount = replaceLastChildAndUnmount;
function replaceVNode(parentDom, dom, vNode, lifecycle, isRecycling) {
    unmounting.unmount(vNode, null, lifecycle, false, isRecycling);
    replaceChild(parentDom, dom, vNode.dom);
}
exports.replaceVNode = replaceVNode;
function createFunctionalComponentInput(vNode, component, props, context) {
    var input = component(props, context);
    if (index$4.isArray(input)) {
        index$4.throwError();
    }
    else if (index$4.isInvalid(input)) {
        input = VNodes.createVoidVNode();
    }
    else if (index$4.isStringOrNumber(input)) {
        input = VNodes.createTextVNode(input, null);
    }
    else {
        if (input.dom) {
            input = VNodes.directClone(input);
        }
        if (input.flags & 28 /* Component */) {
            // if we have an input that is also a component, we run into a tricky situation
            // where the root vNode needs to always have the correct DOM entry
            // so we break monomorphism on our input and supply it our vNode as parentVNode
            // we can optimise this in the future, but this gets us out of a lot of issues
            input.parentVNode = vNode;
        }
    }
    return input;
}
exports.createFunctionalComponentInput = createFunctionalComponentInput;
function setTextContent(dom, text) {
    if (text !== '') {
        dom.textContent = text;
    }
    else {
        dom.appendChild(document.createTextNode(''));
    }
}
exports.setTextContent = setTextContent;
function updateTextContent(dom, text) {
    dom.firstChild.nodeValue = text;
}
exports.updateTextContent = updateTextContent;
function appendChild(parentDom, dom) {
    parentDom.appendChild(dom);
}
exports.appendChild = appendChild;
function insertOrAppend(parentDom, newNode, nextNode) {
    if (index$4.isNullOrUndef(nextNode)) {
        appendChild(parentDom, newNode);
    }
    else {
        parentDom.insertBefore(newNode, nextNode);
    }
}
exports.insertOrAppend = insertOrAppend;
function documentCreateElement(tag, isSVG) {
    if (isSVG === true) {
        return document.createElementNS(constants.svgNS, tag);
    }
    else {
        return document.createElement(tag);
    }
}
exports.documentCreateElement = documentCreateElement;
function replaceWithNewNode(lastNode, nextNode, parentDom, lifecycle, context, isSVG, isRecycling) {
    unmounting.unmount(lastNode, null, lifecycle, false, isRecycling);
    var dom = mounting.mount(nextNode, null, lifecycle, context, isSVG);
    nextNode.dom = dom;
    replaceChild(parentDom, dom, lastNode.dom);
}
exports.replaceWithNewNode = replaceWithNewNode;
function replaceChild(parentDom, nextDom, lastDom) {
    if (!parentDom) {
        parentDom = lastDom.parentNode;
    }
    parentDom.replaceChild(nextDom, lastDom);
}
exports.replaceChild = replaceChild;
function removeChild(parentDom, dom) {
    parentDom.removeChild(dom);
}
exports.removeChild = removeChild;
function removeAllChildren(dom, children, lifecycle, isRecycling) {
    dom.textContent = '';
    if (!options.default.recyclingEnabled || (options.default.recyclingEnabled && !isRecycling)) {
        removeChildren(null, children, lifecycle, isRecycling);
    }
}
exports.removeAllChildren = removeAllChildren;
function removeChildren(dom, children, lifecycle, isRecycling) {
    for (var i = 0, len = children.length; i < len; i++) {
        var child = children[i];
        if (!index$4.isInvalid(child)) {
            unmounting.unmount(child, dom, lifecycle, true, isRecycling);
        }
    }
}
exports.removeChildren = removeChildren;
function isKeyed(lastChildren, nextChildren) {
    return nextChildren.length && !index$4.isNullOrUndef(nextChildren[0]) && !index$4.isNullOrUndef(nextChildren[0].key)
        && lastChildren.length && !index$4.isNullOrUndef(lastChildren[0]) && !index$4.isNullOrUndef(lastChildren[0].key);
}
exports.isKeyed = isKeyed;
});

var VNodes = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });




function createVNode(flags, type, className, children, props, key, ref, noNormalise) {
    if (flags & 16 /* ComponentUnknown */) {
        flags = index$4.isStatefulComponent(type) ? 4 /* ComponentClass */ : 8 /* ComponentFunction */;
    }
    var vNode = {
        children: index$4.isUndefined(children) ? null : children,
        className: className,
        dom: null,
        flags: flags,
        key: index$4.isUndefined(key) ? null : key,
        props: props || null,
        ref: ref || null,
        type: type
    };
    if (!noNormalise) {
        normalization.normalize(vNode);
    }
    if (options.default.createVNode) {
        options.default.createVNode(vNode);
    }
    return vNode;
}
exports.createVNode = createVNode;
function directClone(vNodeToClone) {
    var newVNode;
    var flags = vNodeToClone.flags;
    if (flags & 28 /* Component */) {
        var props = void 0;
        var propsToClone = vNodeToClone.props;
        if (!propsToClone) {
            props = utils.EMPTY_OBJ;
        }
        else {
            props = {};
            for (var key in propsToClone) {
                props[key] = propsToClone[key];
            }
        }
        newVNode = createVNode(flags, vNodeToClone.type, vNodeToClone.className, null, props, vNodeToClone.key, vNodeToClone.ref, true);
        var newProps = newVNode.props;
        if (newProps) {
            var newChildren = newProps.children;
            // we need to also clone component children that are in props
            // as the children may also have been hoisted
            if (newChildren) {
                if (index$4.isArray(newChildren)) {
                    var len = newChildren.length;
                    if (len > 0) {
                        var tmpArray = [];
                        for (var i = 0; i < len; i++) {
                            var child = newChildren[i];
                            if (index$4.isStringOrNumber(child)) {
                                tmpArray.push(child);
                            }
                            else if (!index$4.isInvalid(child) && isVNode(child)) {
                                tmpArray.push(directClone(child));
                            }
                        }
                        newProps.children = tmpArray;
                    }
                }
                else if (isVNode(newChildren)) {
                    newProps.children = directClone(newChildren);
                }
            }
        }
        newVNode.children = null;
    }
    else if (flags & 3970 /* Element */) {
        var children = vNodeToClone.children;
        var props = void 0;
        var propsToClone = vNodeToClone.props;
        if (!propsToClone) {
            props = utils.EMPTY_OBJ;
        }
        else {
            props = {};
            for (var key in propsToClone) {
                props[key] = propsToClone[key];
            }
        }
        newVNode = createVNode(flags, vNodeToClone.type, vNodeToClone.className, children, props, vNodeToClone.key, vNodeToClone.ref, !children);
    }
    else if (flags & 1 /* Text */) {
        newVNode = createTextVNode(vNodeToClone.children, vNodeToClone.key);
    }
    return newVNode;
}
exports.directClone = directClone;
/*
 directClone is preferred over cloneVNode and used internally also.
 This function makes Inferno backwards compatible.
 And can be tree-shaked by modern bundlers

 Would be nice to combine this with directClone but could not do it without breaking change
 */
function cloneVNode(vNodeToClone, props) {
    var _children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        _children[_i - 2] = arguments[_i];
    }
    var children = _children;
    var childrenLen = _children.length;
    if (childrenLen > 0 && !index$4.isUndefined(_children[0])) {
        if (!props) {
            props = {};
        }
        if (childrenLen === 1) {
            children = _children[0];
        }
        if (!index$4.isUndefined(children)) {
            props.children = children;
        }
    }
    var newVNode;
    if (index$4.isArray(vNodeToClone)) {
        var tmpArray = [];
        for (var i = 0, len = vNodeToClone.length; i < len; i++) {
            tmpArray.push(directClone(vNodeToClone[i]));
        }
        newVNode = tmpArray;
    }
    else {
        var flags = vNodeToClone.flags;
        var className = vNodeToClone.className || (props && props.className) || null;
        var key = !index$4.isNullOrUndef(vNodeToClone.key) ? vNodeToClone.key : (props ? props.key : null);
        var ref = vNodeToClone.ref || (props ? props.ref : null);
        if (flags & 28 /* Component */) {
            newVNode = createVNode(flags, vNodeToClone.type, className, null, (!vNodeToClone.props && !props) ? utils.EMPTY_OBJ : index$4.combineFrom(vNodeToClone.props, props), key, ref, true);
            var newProps = newVNode.props;
            if (newProps) {
                var newChildren = newProps.children;
                // we need to also clone component children that are in props
                // as the children may also have been hoisted
                if (newChildren) {
                    if (index$4.isArray(newChildren)) {
                        var len = newChildren.length;
                        if (len > 0) {
                            var tmpArray = [];
                            for (var i = 0; i < len; i++) {
                                var child = newChildren[i];
                                if (index$4.isStringOrNumber(child)) {
                                    tmpArray.push(child);
                                }
                                else if (!index$4.isInvalid(child) && isVNode(child)) {
                                    tmpArray.push(directClone(child));
                                }
                            }
                            newProps.children = tmpArray;
                        }
                    }
                    else if (isVNode(newChildren)) {
                        newProps.children = directClone(newChildren);
                    }
                }
            }
            newVNode.children = null;
        }
        else if (flags & 3970 /* Element */) {
            children = (props && !index$4.isUndefined(props.children)) ? props.children : vNodeToClone.children;
            newVNode = createVNode(flags, vNodeToClone.type, className, children, (!vNodeToClone.props && !props) ? utils.EMPTY_OBJ : index$4.combineFrom(vNodeToClone.props, props), key, ref, !children);
        }
        else if (flags & 1 /* Text */) {
            newVNode = createTextVNode(vNodeToClone.children, key);
        }
    }
    return newVNode;
}
exports.cloneVNode = cloneVNode;
function createVoidVNode() {
    return createVNode(4096 /* Void */);
}
exports.createVoidVNode = createVoidVNode;
function createTextVNode(text, key) {
    return createVNode(1 /* Text */, null, null, text, null, key);
}
exports.createTextVNode = createTextVNode;
function isVNode(o) {
    return !!o.flags;
}
exports.isVNode = isVNode;
});

var linkEvent_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function linkEvent(data, event) {
    return { data: data, event: event };
}
exports.default = linkEvent;
});

var index$2 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

exports.NO_OP = index$4.NO_OP;

exports.createVNode = VNodes.createVNode;
exports.cloneVNode = VNodes.cloneVNode;

exports.linkEvent = linkEvent_1.default;

exports.options = options.default;

exports.render = rendering.render;
exports.findDOMNode = rendering.findDOMNode;
exports.createRenderer = rendering.createRenderer;

exports.EMPTY_OBJ = utils.EMPTY_OBJ;
exports.version = '1.5.5';
// we duplicate it so it plays nicely with different module loading systems
exports.default = {
    linkEvent: linkEvent_1.default,
    // core shapes
    createVNode: VNodes.createVNode,
    // cloning
    cloneVNode: VNodes.cloneVNode,
    // used to shared common items between Inferno libs
    NO_OP: index$4.NO_OP,
    EMPTY_OBJ: utils.EMPTY_OBJ,
    // DOM
    render: rendering.render,
    findDOMNode: rendering.findDOMNode,
    createRenderer: rendering.createRenderer,
    options: options.default,
    version: exports.version
};
// Internal stuff that only core inferno-* packages use

exports.internal_isUnitlessNumber = constants.isUnitlessNumber;
// Mainly for testing

exports.internal_normalize = normalization.normalize;
});

var index = createCommonjsModule(function (module) {
module.exports = index$2.default;
module.exports.default = module.exports;
});

var index$10 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Make sure u use EMPTY_OBJ from 'inferno', otherwise it'll be a different reference


var noOp = index$4.ERROR_MSG;
var componentCallbackQueue = new Map();
// when a components root VNode is also a component, we can run into issues
// this will recursively look for vNode.parentNode if the VNode is a component
function updateParentComponentVNodes(vNode, dom) {
    if (vNode.flags & 28 /* Component */) {
        var parentVNode = vNode.parentVNode;
        if (parentVNode) {
            parentVNode.dom = dom;
            updateParentComponentVNodes(parentVNode, dom);
        }
    }
}
var resolvedPromise = Promise.resolve();
function addToQueue(component, force, callback) {
    // TODO this function needs to be revised and improved on
    var queue = componentCallbackQueue.get(component);
    if (!queue) {
        queue = [];
        componentCallbackQueue.set(component, queue);
        resolvedPromise.then(function () {
            componentCallbackQueue.delete(component);
            component._updating = true;
            applyState(component, force, function () {
                for (var i = 0, len = queue.length; i < len; i++) {
                    queue[i]();
                }
            });
            component._updating = false;
        });
    }
    if (callback) {
        queue.push(callback);
    }
}
function queueStateChanges(component, newState, callback, sync) {
    if (index$4.isFunction(newState)) {
        newState = newState(component.state, component.props, component.context);
    }
    for (var stateKey in newState) {
        component._pendingState[stateKey] = newState[stateKey];
    }
    if (index$4.isBrowser && !component._pendingSetState && !component._blockRender) {
        if (sync && !component._updating) {
            component._pendingSetState = true;
            component._updating = true;
            applyState(component, false, callback);
            component._updating = false;
        }
        else {
            addToQueue(component, false, callback);
        }
    }
    else {
        var pending = component._pendingState;
        var state = component.state;
        for (var key in pending) {
            state[key] = pending[key];
        }
        component._pendingState = {};
        if (callback && component._blockRender) {
            component._lifecycle.addListener(callback);
        }
    }
}
function applyState(component, force, callback) {
    if (component._unmounted) {
        return;
    }
    if (force || !component._blockRender) {
        component._pendingSetState = false;
        var pendingState = component._pendingState;
        var prevState = component.state;
        var nextState = index$4.combineFrom(prevState, pendingState);
        var props = component.props;
        var context_1 = component.context;
        component._pendingState = {};
        var nextInput = component._updateComponent(prevState, nextState, props, props, context_1, force, true);
        var didUpdate = true;
        if (index$4.isInvalid(nextInput)) {
            nextInput = index.createVNode(4096 /* Void */);
        }
        else if (nextInput === index$4.NO_OP) {
            nextInput = component._lastInput;
            didUpdate = false;
        }
        else if (index$4.isStringOrNumber(nextInput)) {
            nextInput = index.createVNode(1 /* Text */, null, null, nextInput);
        }
        else if (index$4.isArray(nextInput)) {
            index$4.throwError();
        }
        var lastInput = component._lastInput;
        var vNode = component._vNode;
        var parentDom = (lastInput.dom && lastInput.dom.parentNode) || (lastInput.dom = vNode.dom);
        component._lastInput = nextInput;
        if (didUpdate) {
            var childContext = void 0, subLifecycle = component._lifecycle;
            if (!subLifecycle) {
                subLifecycle = new index$4.Lifecycle();
            }
            else {
                subLifecycle.listeners = [];
            }
            component._lifecycle = subLifecycle;
            if (!index$4.isUndefined(component.getChildContext)) {
                childContext = component.getChildContext();
            }
            if (index$4.isNullOrUndef(childContext)) {
                childContext = component._childContext;
            }
            else {
                childContext = index$4.combineFrom(context_1, childContext);
            }
            component._patch(lastInput, nextInput, parentDom, subLifecycle, childContext, component._isSVG, false);
            subLifecycle.trigger();
            if (!index$4.isUndefined(component.componentDidUpdate)) {
                component.componentDidUpdate(props, prevState, context_1);
            }
            index.options.afterUpdate && index.options.afterUpdate(vNode);
        }
        var dom = vNode.dom = nextInput.dom;
        var componentToDOMNodeMap = component._componentToDOMNodeMap;
        componentToDOMNodeMap && componentToDOMNodeMap.set(component, nextInput.dom);
        updateParentComponentVNodes(vNode, dom);
    }
    else {
        component.state = component._pendingState;
        component._pendingState = {};
    }
    if (!index$4.isNullOrUndef(callback)) {
        callback();
    }
}
var Component = (function () {
    function Component(props, context) {
        this.state = {};
        this._blockRender = false;
        this._blockSetState = false;
        this._pendingSetState = false;
        this._pendingState = {};
        this._lastInput = null;
        this._vNode = null;
        this._unmounted = false;
        this._lifecycle = null;
        this._childContext = null;
        this._patch = null;
        this._isSVG = false;
        this._componentToDOMNodeMap = null;
        this._updating = false;
        /** @type {object} */
        this.props = props || index.EMPTY_OBJ;
        /** @type {object} */
        this.context = context || index.EMPTY_OBJ; // context should not be mutable
    }
    Component.prototype.render = function (nextProps, nextState, nextContext) { };
    Component.prototype.forceUpdate = function (callback) {
        if (this._unmounted || !index$4.isBrowser) {
            return;
        }
        applyState(this, true, callback);
    };
    Component.prototype.setState = function (newState, callback) {
        if (this._unmounted) {
            return;
        }
        if (!this._blockSetState) {
            queueStateChanges(this, newState, callback, false);
        }
        else {
            index$4.throwError();
        }
    };
    Component.prototype.setStateSync = function (newState) {
        if (this._unmounted) {
            return;
        }
        if (!this._blockSetState) {
            queueStateChanges(this, newState, null, true);
        }
        else {
            index$4.throwError();
        }
    };
    Component.prototype._updateComponent = function (prevState, nextState, prevProps, nextProps, context, force, fromSetState) {
        if (this._unmounted === true) {
            index$4.throwError();
        }
        if ((prevProps !== nextProps || nextProps === index.EMPTY_OBJ) || prevState !== nextState || force) {
            if (prevProps !== nextProps || nextProps === index.EMPTY_OBJ) {
                if (!index$4.isUndefined(this.componentWillReceiveProps) && !fromSetState) {
                    this._blockRender = true;
                    this.componentWillReceiveProps(nextProps, context);
                    this._blockRender = false;
                }
                if (this._pendingSetState) {
                    nextState = index$4.combineFrom(nextState, this._pendingState);
                    this._pendingSetState = false;
                    this._pendingState = {};
                }
            }
            /* Update if scu is not defined, or it returns truthy value or force */
            if (index$4.isUndefined(this.shouldComponentUpdate) || this.shouldComponentUpdate(nextProps, nextState, context) || force) {
                if (!index$4.isUndefined(this.componentWillUpdate)) {
                    this._blockSetState = true;
                    this.componentWillUpdate(nextProps, nextState, context);
                    this._blockSetState = false;
                }
                this.props = nextProps;
                this.state = nextState;
                this.context = context;
                if (index.options.beforeRender) {
                    index.options.beforeRender(this);
                }
                var render = this.render(nextProps, nextState, context);
                if (index.options.afterRender) {
                    index.options.afterRender(this);
                }
                return render;
            }
            else {
                this.props = nextProps;
                this.state = nextState;
                this.context = context;
            }
        }
        return index$4.NO_OP;
    };
    return Component;
}());
exports.default = Component;
});

var index$8 = createCommonjsModule(function (module) {
module.exports = index$10.default;
module.exports.default = module.exports;
});

function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$1(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$1(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var linkEvent$1 = index.linkEvent;

function handleBuyButtonClick(instance, event) {
    instance.setState({ 'purchased': true });
}

var createVNode$2 = index.createVNode;
var SearchResultsItem = function (_Component) {
    _inherits$1(_class, _Component);

    function _class(props) {
        _classCallCheck$1(this, _class);

        var _this = _possibleConstructorReturn$1(this, _Component.call(this, props));

        _this.state = {
            purchased: false
        };
        return _this;
    }

    _class.prototype.componentWillReceiveProps = function componentWillReceiveProps(props) {
        this.setState({
            purchased: false
        });
    };

    _class.prototype.render = function render() {
        var item = this.props.item;
        var style = { backgroundColor: this.state.purchased ? '#f1c40f' : '' };

        return createVNode$2(2, 'div', 'search-results-item', [createVNode$2(2, 'h2', null, item.title), createVNode$2(2, 'div', 'lvpic pic img left', createVNode$2(2, 'div', 'lvpicinner full-width picW', createVNode$2(2, 'a', 'img imgWr2', createVNode$2(2, 'img', null, null, {
            'src': item.image,
            'alt': item.title
        }), {
            'href': "/buy/" + item.id
        }))), createVNode$2(2, 'span', 'price', item.price), this.state.purchased ? createVNode$2(2, 'div', 'purchased', 'Purchased!') : createVNode$2(2, 'button', 'buy-now', 'Buy now!', {
            'type': 'button',
            'onClick': linkEvent$1(this, handleBuyButtonClick)
        })], {
            'style': style
        });
    };

    return _class;
}(index$8);

var createVNode$3 = index.createVNode;
var Footer = function () {
  return createVNode$3(2, "footer", "gh-w", createVNode$3(2, "div", null, createVNode$3(2, "div", null, [createVNode$3(2, "div", null, null, {
    "id": "rtm_html_1651"
  }), createVNode$3(2, "h2", "gh-ar-hdn", "Additional site navigation"), createVNode$3(2, "div", "gffoot", createVNode$3(2, "table", "gf-t", createVNode$3(2, "tbody", null, createVNode$3(2, "tr", null, [createVNode$3(2, "td", null, createVNode$3(2, "ul", null, [createVNode$3(2, "li", "gf-li", createVNode$3(2, "h3", "gf-bttl", createVNode$3(2, "a", "gf-bttl thrd", "Buy", {
    "href": "http://www.ebay.com/sch/allcategories/all-categories",
    "_sp": "m571.l3601"
  }))), createVNode$3(2, "li", "gf-li", createVNode$3(2, "a", "thrd", "Registration", {
    "href": "http://pages.ebay.com/help/account/registration.html",
    "_sp": "m571.l2895"
  })), createVNode$3(2, "li", "gf-li", createVNode$3(2, "a", "thrd", "eBay Money Back Guarantee", {
    "href": "http://pages.ebay.com/ebay-money-back-guarantee/",
    "_sp": "m571.l4539"
  })), createVNode$3(2, "li", "gf-li", createVNode$3(2, "a", "thrd", "Bidding & buying help", {
    "href": "http://pages.ebay.com/help/buy/basics.html",
    "_sp": "m571.l2897"
  })), createVNode$3(2, "li", "gf-li", createVNode$3(2, "a", "thrd", "Stores", {
    "href": "http://stores.ebay.com",
    "_sp": "m571.l2899"
  })), createVNode$3(2, "li", "gf-li", createVNode$3(2, "a", "thrd", "eBay Local", {
    "href": "http://www.ebay.com/local",
    "_sp": "m571.l3221"
  })), createVNode$3(2, "li", "gf-li", createVNode$3(2, "a", "thrd", "eBay guides", {
    "href": "http://www.ebay.com/gds",
    "_sp": "m571.l5360"
  }))])), createVNode$3(2, "td", null, createVNode$3(2, "ul", null, [createVNode$3(2, "li", "gf-li", createVNode$3(2, "h3", "gf-bttl", createVNode$3(2, "a", "gf-bttl thrd", "Sell", {
    "href": "http://www.ebay.com/sl/sell",
    "_sp": "m571.l2903"
  }))), createVNode$3(2, "li", "gf-li", createVNode$3(2, "a", "thrd", "Start selling", {
    "href": "http://www.ebay.com/sl/sell",
    "_sp": "m571.l2904"
  })), createVNode$3(2, "li", "gf-li", createVNode$3(2, "a", "thrd", "Learn to sell", {
    "href": "http://pages.ebay.com/sellerinformation/howtosell/sellingbasics.html",
    "_sp": "m571.l2905"
  })), createVNode$3(2, "li", "gf-li", createVNode$3(2, "a", "thrd", "Business sellers", {
    "href": "http://pages.ebay.com/sellerinformation/ebayforbusiness/essentials.html",
    "_sp": "m571.l2906"
  })), createVNode$3(2, "li", "gf-li", createVNode$3(2, "a", "thrd", "Affiliates", {
    "href": "https://www.ebaypartnernetwork.com/files/hub/en-US/index.html",
    "_exsp": "m571.l2921"
  })), createVNode$3(2, "li", "gf-li", createVNode$3(2, "h3", "gf-bttl", "Tools & apps"), {
    "style": "padding-top: 8px"
  }), createVNode$3(2, "li", "gf-li", createVNode$3(2, "a", "thrd", "Mobile apps", {
    "href": "http://anywhere.ebay.com/mobile/",
    "_sp": "m571.l2944"
  })), createVNode$3(2, "li", "gf-li", createVNode$3(2, "a", "thrd", "Downloads", {
    "href": "http://anywhere.ebay.com",
    "_exsp": "m571.l2923"
  })), createVNode$3(2, "li", "gf-li", createVNode$3(2, "a", "thrd", "Developers", {
    "href": "http://developer.ebay.com",
    "_exsp": "m571.l2924"
  })), createVNode$3(2, "li", "gf-li", createVNode$3(2, "a", "thrd", "Security center", {
    "href": "http://pages.ebay.com/securitycenter/index.html",
    "_sp": "m571.l2907"
  })), createVNode$3(2, "li", "gf-li", createVNode$3(2, "a", "thrd", "eBay official time", {
    "href": "http://viv.ebay.com/ws/eBayISAPI.dll?EbayTime",
    "_sp": "m571.l2908"
  })), createVNode$3(2, "li", "gf-li", createVNode$3(2, "a", "thrd", "Site map", {
    "href": "http://pages.ebay.com/sitemap.html",
    "_sp": "m571.l2909"
  }))])), createVNode$3(2, "td", null, [createVNode$3(2, "ul", null, [createVNode$3(2, "li", "gf-li", createVNode$3(2, "h3", "gf-bttl", "eBay companies")), createVNode$3(2, "li", "gf-li", createVNode$3(2, "a", "thrd", "eBay Classifieds", {
    "href": "http://www.ebayclassifiedsgroup.com/",
    "_exsp": "m571.l2927"
  })), createVNode$3(2, "li", "gf-li", createVNode$3(2, "a", "thrd", "StubHub", {
    "href": "http://www.stubhub.com",
    "_exsp": "m571.l3208"
  })), createVNode$3(2, "li", "gf-li", createVNode$3(2, "a", "thrd", "Close5", {
    "href": "https://www.close5.com",
    "_exsp": "m571.l3360"
  })), createVNode$3(2, "li", "gf-li", createVNode$3(2, "a", "thrd", "See all companies", {
    "href": "https://www.ebayinc.com/our-company/our-other-businesses/",
    "_exsp": "m571.l2931"
  })), createVNode$3(2, "li", "gf-li", createVNode$3(2, "h3", "gf-bttl", "Stay connected"), {
    "style": "padding-top: 8px"
  }), createVNode$3(2, "li", "gf-li", createVNode$3(2, "a", "thrd", "eBay's Blogs", {
    "href": "http://www.ebay.com/stories/",
    "_sp": "m571.l2940"
  })), createVNode$3(2, "li", "gf-li", [createVNode$3(2, "a", "thrd gf-i", createVNode$3(2, "i", "gspr icfbg", "Facebook"), {
    "href": "https://www.facebook.com/eBay",
    "_exsp": "m571.l2942"
  }), createVNode$3(2, "i", "gspr icfbg")]), createVNode$3(2, "i", "gspr icfbg", [createVNode$3(2, "li", "gf-li", [createVNode$3(2, "a", "thrd gf-i", createVNode$3(2, "i", "gspr ictwg", "Twitter"), {
    "href": "http://twitter.com/#!/eBay",
    "_exsp": "m571.l2943"
  }), createVNode$3(2, "i", "gspr ictwg")]), createVNode$3(2, "i", "gspr ictwg", [createVNode$3(2, "li", "gf-li", [createVNode$3(2, "a", "thrd gf-i", createVNode$3(2, "i", "gspr icgpg", "Google+"), {
    "href": "https://plus.google.com/+eBay/posts",
    "_exsp": "m571.l3223"
  }), createVNode$3(2, "i", "gspr icgpg")]), createVNode$3(2, "i", "gspr icgpg")])])]), createVNode$3(2, "i", "gspr icfbg", createVNode$3(2, "i", "gspr ictwg", createVNode$3(2, "i", "gspr icgpg")))]), createVNode$3(2, "td", null, createVNode$3(2, "ul", null, [createVNode$3(2, "li", "gf-li", createVNode$3(2, "h3", "gf-bttl", createVNode$3(2, "a", "gf-bttl thrd", "About eBay", {
    "href": "http://www.ebayinc.com",
    "_exsp": "m571.l2932"
  }))), createVNode$3(2, "li", "gf-li", createVNode$3(2, "a", "thrd", "Company info", {
    "href": "https://www.ebayinc.com/our-company/",
    "_exsp": "m571.l2933"
  })), createVNode$3(2, "li", "gf-li", createVNode$3(2, "a", "thrd", "News", {
    "href": "https://www.ebayinc.com/stories/news/",
    "_exsp": "m571.l2934"
  })), createVNode$3(2, "li", "gf-li", createVNode$3(2, "a", "thrd", "Investors", {
    "href": "https://investors.ebayinc.com",
    "_exsp": "m571.l3269"
  })), createVNode$3(2, "li", "gf-li", createVNode$3(2, "a", "thrd", "Careers", {
    "href": "https://careers.ebayinc.com/",
    "_exsp": "m571.l2937"
  })), createVNode$3(2, "li", "gf-li", createVNode$3(2, "a", "thrd", "Government relations", {
    "href": "http://www.ebaymainstreet.com",
    "_exsp": "m571.l2936"
  })), createVNode$3(2, "li", "gf-li", createVNode$3(2, "a", "thrd", "Advertise with us", {
    "href": "http://cc.ebay.com",
    "_exsp": "m571.l2938"
  })), createVNode$3(2, "li", "gf-li", createVNode$3(2, "a", "thrd", "Policies", {
    "href": "http://pages.ebay.com/help/policies/overview.html",
    "_sp": "m571.l2910"
  })), createVNode$3(2, "li", "gf-li", createVNode$3(2, "a", "thrd", "Verified Rights Owner (VeRO) Program", {
    "href": "http://pages.ebay.com/help/policies/programs-vero-ov.html",
    "_sp": "m571.l3418"
  })), createVNode$3(2, "li", "gf-li", createVNode$3(2, "a", "thrd gh-survey", "Tell us what you think", {
    "href": "http://qu.ebay.com/survey?srvName=globalheader+%28footer-US%29",
    "title": "opens in a new window or tab"
  }))])), createVNode$3(2, "td", null, createVNode$3(2, "ul", null, [createVNode$3(2, "li", "gf-li", createVNode$3(2, "h3", "gf-bttl", createVNode$3(2, "a", "gf-bttl thrd", "Help & Contact", {
    "href": "http://ocs.ebay.com/ws/eBayISAPI.dll?CustomerSupport",
    "_sp": "m571.l1545"
  }))), createVNode$3(2, "li", "gf-li", createVNode$3(2, "a", "thrd", "Resolution Center", {
    "href": "http://resolutioncenter.ebay.com/",
    "_sp": "m571.l1619"
  })), createVNode$3(2, "li", "gf-li", createVNode$3(2, "a", "thrd", "Seller Information Center", {
    "href": "http://pages.ebay.com/sellerinformation/index.html",
    "_sp": "m571.l1613"
  })), createVNode$3(2, "li", "gf-li", createVNode$3(2, "a", "thrd", "Contact us", {
    "href": "http://ocsnext.ebay.com/ocs/cuhome",
    "_sp": "m571.l2911"
  })), createVNode$3(2, "li", "gf-li", createVNode$3(2, "h3", "gf-bttl", createVNode$3(2, "a", "gf-bttl thrd", "Community", {
    "href": "http://community.ebay.com",
    "_sp": "m571.l2912"
  })), {
    "style": "padding-top: 8px"
  }), createVNode$3(2, "li", "gf-li", createVNode$3(2, "a", "thrd", "Announcements", {
    "href": "http://announcements.ebay.com",
    "_sp": "m571.l2913"
  })), createVNode$3(2, "li", "gf-li", createVNode$3(2, "a", "thrd", "Answer center", {
    "href": "http://pages.ebay.com/community/answercenter/index.html",
    "_sp": "m571.l2914"
  })), createVNode$3(2, "li", "gf-li", createVNode$3(2, "a", "thrd", "Discussion boards", {
    "href": "http://forums.ebay.com",
    "_exsp": "m571.l2939"
  })), createVNode$3(2, "li", "gf-li", createVNode$3(2, "a", "thrd", "eBay Giving Works", {
    "href": "http://givingworks.ebay.com",
    "_exsp": "m571.l3271"
  })), createVNode$3(2, "li", "gf-li", createVNode$3(2, "a", "thrd", "eBay Celebrity", {
    "href": "http://givingworks.ebay.com/browse/celebrities",
    "_exsp": "m571.l3272"
  })), createVNode$3(2, "li", "gf-li", createVNode$3(2, "a", "thrd", "Groups", {
    "href": "http://groups.ebay.com/groups/EbayGroups/1?redirected=1",
    "_exsp": "m571.l2941"
  })), createVNode$3(2, "li", "gf-li", createVNode$3(2, "a", "thrd", "eBay top shared", {
    "href": "http://www.ebay.com/ets/eBayTopShared",
    "_sp": "m571.l2916"
  })), createVNode$3(2, "li", "gf-li", createVNode$3(2, "h3", "gf-bttl", "eBay Sites"), {
    "style": "padding-top: 8px"
  }), createVNode$3(2, "li", "gf-li", createVNode$3(2, "div", "gf-flags-wpr", [createVNode$3(2, "a", "thrd", ["United States", createVNode$3(2, "b", "gf-if gspr flus"), " ", createVNode$3(2, "b", "gh-sprRetina", null, {
    "id": "gf-fbtn-arr"
  })], {
    "aria-expanded": "false",
    "aria-controls": "gf-f",
    "role": "button",
    "title": "eBay country sites",
    "_sp": "m571.l2586",
    "href": "http://www.ebay.com",
    "id": "gf-fbtn"
  }), createVNode$3(2, "div", null, createVNode$3(2, "ul", "gf-ful", [createVNode$3(2, "li", "gf-f-li0", createVNode$3(2, "a", "gf-if-a", [createVNode$3(2, "b", "flau gf-if gspr"), "Australia"], {
    "href": "http://www.ebay.com.au",
    "title": "eBay Australia"
  })), createVNode$3(2, "li", "gf-f-li0", createVNode$3(2, "a", "gf-if-a", [createVNode$3(2, "b", "flat gf-if gspr"), "Austria"], {
    "href": "http://www.ebay.at",
    "title": "eBay Austria"
  })), createVNode$3(2, "li", "gf-f-li0", createVNode$3(2, "a", "gf-if-a", [createVNode$3(2, "b", "flbe gf-if gspr"), "Belgium"], {
    "href": "http://www.ebay.be",
    "title": "eBay Belgium"
  })), createVNode$3(2, "li", "gf-f-li0", createVNode$3(2, "a", "gf-if-a", [createVNode$3(2, "b", "flca gf-if gspr"), "Canada"], {
    "href": "http://www.ebay.ca",
    "title": "eBay Canada"
  })), createVNode$3(2, "li", "gf-f-li0", createVNode$3(2, "a", "gf-if-a", [createVNode$3(2, "b", "flcn gf-if gspr"), "China"], {
    "href": "http://www.ebay.cn",
    "title": "eBay China"
  })), createVNode$3(2, "li", "gf-f-li0", createVNode$3(2, "a", "gf-if-a", [createVNode$3(2, "b", "flfr gf-if gspr"), "France"], {
    "href": "http://www.ebay.fr",
    "title": "eBay France"
  })), createVNode$3(2, "li", "gf-f-li0", createVNode$3(2, "a", "gf-if-a", [createVNode$3(2, "b", "flde gf-if gspr"), "Germany"], {
    "href": "http://www.ebay.de",
    "title": "eBay Germany"
  })), createVNode$3(2, "li", "gf-f-li1 gf-f-li-top", createVNode$3(2, "a", "gf-if-a", [createVNode$3(2, "b", "flhk gf-if gspr"), "Hong Kong"], {
    "href": "http://www.ebay.com.hk",
    "title": "eBay Hong Kong"
  })), createVNode$3(2, "li", "gf-f-li1", createVNode$3(2, "a", "gf-if-a", [createVNode$3(2, "b", "flin gf-if gspr"), "India"], {
    "href": "http://www.ebay.in",
    "title": "eBay India"
  })), createVNode$3(2, "li", "gf-f-li1", createVNode$3(2, "a", "gf-if-a", [createVNode$3(2, "b", "flie gf-if gspr"), "Ireland"], {
    "href": "http://www.ebay.ie",
    "title": "eBay Ireland"
  })), createVNode$3(2, "li", "gf-f-li1", createVNode$3(2, "a", "gf-if-a", [createVNode$3(2, "b", "flit gf-if gspr"), "Italy"], {
    "href": "http://www.ebay.it",
    "title": "eBay Italy"
  })), createVNode$3(2, "li", "gf-f-li1", createVNode$3(2, "a", "gf-if-a", [createVNode$3(2, "b", "fljp gf-if gspr"), "Japan"], {
    "href": "http://www.ebay.co.jp",
    "title": "eBay Japan"
  })), createVNode$3(2, "li", "gf-f-li1", createVNode$3(2, "a", "gf-if-a", [createVNode$3(2, "b", "flkr gf-if gspr"), "Korea"], {
    "href": "http://global.gmarket.co.kr/Home/Main",
    "title": "eBay Korea"
  })), createVNode$3(2, "li", "gf-f-li1", createVNode$3(2, "a", "gf-if-a", [createVNode$3(2, "b", "flmy gf-if gspr"), "Malaysia"], {
    "href": "http://www.ebay.com.my",
    "title": "eBay Malaysia"
  })), createVNode$3(2, "li", "gf-f-li2 gf-f-li-top", createVNode$3(2, "a", "gf-if-a", [createVNode$3(2, "b", "flnl gf-if gspr"), "Netherlands"], {
    "href": "http://www.ebay.nl",
    "title": "eBay Netherlands"
  })), createVNode$3(2, "li", "gf-f-li2", createVNode$3(2, "a", "gf-if-a", [createVNode$3(2, "b", "flph gf-if gspr"), "Philippines"], {
    "href": "http://www.ebay.ph",
    "title": "eBay Philippines"
  })), createVNode$3(2, "li", "gf-f-li2", createVNode$3(2, "a", "gf-if-a", [createVNode$3(2, "b", "flpl gf-if gspr"), "Poland"], {
    "href": "http://www.ebay.pl",
    "title": "eBay Poland"
  })), createVNode$3(2, "li", "gf-f-li2", createVNode$3(2, "a", "gf-if-a", [createVNode$3(2, "b", "flsg gf-if gspr"), "Singapore"], {
    "href": "http://www.ebay.com.sg",
    "title": "eBay Singapore"
  })), createVNode$3(2, "li", "gf-f-li2", createVNode$3(2, "a", "gf-if-a", [createVNode$3(2, "b", "fles gf-if gspr"), "Spain"], {
    "href": "http://www.ebay.es",
    "title": "eBay Spain"
  })), createVNode$3(2, "li", "gf-f-li2", createVNode$3(2, "a", "gf-if-a", [createVNode$3(2, "b", "flse gf-if gspr"), "Sweden"], {
    "href": "http://www.ebay.se",
    "title": "eBay Sweden"
  })), createVNode$3(2, "li", "gf-f-li2", createVNode$3(2, "a", "gf-if-a", [createVNode$3(2, "b", "flch gf-if gspr"), "Switzerland"], {
    "href": "http://www.ebay.ch",
    "title": "eBay Switzerland"
  })), createVNode$3(2, "li", "gf-f-li3 gf-f-li-top", createVNode$3(2, "a", "gf-if-a", [createVNode$3(2, "b", "fltw gf-if gspr"), "Taiwan"], {
    "href": "http://www.ebay.com.tw",
    "title": "eBay Taiwan"
  })), createVNode$3(2, "li", "gf-f-li3", createVNode$3(2, "a", "gf-if-a", [createVNode$3(2, "b", "flth gf-if gspr"), "Thailand"], {
    "href": "http://www.ebay.co.th",
    "title": "eBay Thailand"
  })), createVNode$3(2, "li", "gf-f-li3", createVNode$3(2, "a", "gf-if-a", [createVNode$3(2, "b", "fltr gf-if gspr"), "Turkey"], {
    "href": "http://www.gittigidiyor.com",
    "title": "eBay Turkey"
  })), createVNode$3(2, "li", "gf-f-li3", createVNode$3(2, "a", "gf-if-a", [createVNode$3(2, "b", "flgb gf-if gspr"), "United Kingdom"], {
    "href": "http://www.ebay.co.uk",
    "title": "eBay United Kingdom"
  })), createVNode$3(2, "li", "gf-f-li3", createVNode$3(2, "a", "gf-if-a", [createVNode$3(2, "b", "flvn gf-if gspr"), "Vietnam"], {
    "href": "http://www.ebay.vn",
    "title": "eBay Vietnam"
  }))], {
    "role": "navigation"
  }), {
    "id": "gf-f",
    "style": { display: 'none' }
  })]))]))]))), {
    "id": "gf-BIG"
  }), createVNode$3(2, "div", null, createVNode$3(2, "table", "gf-t", createVNode$3(2, "tbody", null, [createVNode$3(2, "tr", null, createVNode$3(2, "td", null, createVNode$3(2, "ul", "gf-lb", [createVNode$3(2, "li", "gf-li", createVNode$3(2, "a", "thrd gf-bar-a", "About eBay", {
    "href": "http://www.ebayinc.com",
    "_exsp": "m571.l2602"
  })), createVNode$3(2, "li", "gf-li", createVNode$3(2, "a", "thrd gf-bar-a", "Announcements", {
    "href": "http://announcements.ebay.com",
    "_exsp": "m571.l2935"
  })), createVNode$3(2, "li", "gf-li", createVNode$3(2, "a", "thrd gf-bar-a", "Community", {
    "href": "http://community.ebay.com",
    "_exsp": "m571.l1540"
  })), createVNode$3(2, "li", "gf-li", createVNode$3(2, "a", "thrd gf-bar-a", "Security Center", {
    "href": "http://pages.ebay.com/securitycenter/index.html",
    "_exsp": "m571.l2616"
  })), createVNode$3(2, "li", "gf-li", createVNode$3(2, "a", "thrd gf-bar-a", "Resolution Center", {
    "href": "http://resolutioncenter.ebay.com/",
    "_sp": "m571.l1619"
  })), createVNode$3(2, "li", "gf-li", createVNode$3(2, "a", "thrd gf-bar-a", "Seller Information Center", {
    "href": "http://pages.ebay.com/sellerinformation/index.html",
    "_exsp": "m571.l1613"
  })), createVNode$3(2, "li", "gf-li", createVNode$3(2, "a", "thrd gf-bar-a", "Policies", {
    "href": "http://pages.ebay.com/help/policies/overview.html",
    "_exsp": "m571.l2604"
  })), createVNode$3(2, "li", "gf-li", createVNode$3(2, "a", "thrd gf-bar-a", "Affiliates", {
    "href": "https://www.ebaypartnernetwork.com/files/hub/en-US/index.html",
    "_exsp": "m571.l3947"
  })), createVNode$3(2, "li", "gf-li", createVNode$3(2, "a", "thrd gf-bar-a", "Help & Contact", {
    "href": "http://ocs.ebay.com/ws/eBayISAPI.dll?CustomerSupport",
    "_sp": "m571.l1545"
  })), createVNode$3(2, "li", "gf-li", createVNode$3(2, "a", "thrd gf-bar-a", "Site Map", {
    "href": "http://pages.ebay.com/sitemap.html",
    "_exsp": "m571.l2909"
  }))], {
    "id": "gf-l"
  }), {
    "colSpan": 2
  })), createVNode$3(2, "tr", null, createVNode$3(2, "td", "gf-legal", ["Copyright \xA9 1995-2016 eBay Inc. All Rights Reserved.", createVNode$3(2, "a", null, "User Agreement", {
    "href": "http://pages.ebay.com/help/policies/user-agreement.html"
  }), ",", createVNode$3(2, "a", null, "Privacy", {
    "href": "http://pages.ebay.com/help/policies/privacy-policy.html"
  }), ",", createVNode$3(2, "a", null, "Cookies", {
    "href": "http://pages.ebay.com/help/account/cookies-web-beacons.html"
  }), "and", createVNode$3(2, "a", null, "AdChoice", {
    "href": "http://cgi6.ebay.com/ws/eBayISAPI.dll?AdChoiceLandingPage&partner=0",
    "id": "gf-AdChoice"
  })]), {
    "valign": "top"
  })])), {
    "id": "gf-t-box"
  })], {
    "id": "rtm_html_1650"
  })), {
    "id": "glbfooter",
    "role": "contentinfo"
  });
};

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var createVNode$1 = index.createVNode;
var App = function (_Component) {
    _inherits(_class, _Component);

    function _class() {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    _class.prototype.componentDidMount = function componentDidMount() {
        window.onMount();
    };

    _class.prototype.render = function render() {
        var searchResultsData = this.props.searchResultsData;

        return createVNode$1(2, 'div', 'search-results', [createVNode$1(2, 'div', null, searchResultsData.items.map(function (item, i) {
            return createVNode$1(16, SearchResultsItem, null, null, {
                'item': item
            }, i);
        })), createVNode$1(16, Footer)]);
    };

    return _class;
}(index$8);

var mountNode = document.getElementById("searchResultsMount");

var createVNode = index.createVNode;
if (mountNode) {
    index.render(createVNode(16, App, null, null, {
        'searchResultsData': window.searchResultsData
    }), mountNode);

    console.log('Re-rendering on client completed');
}

window.addBench('inferno', function (el, getNextSearchResults) {
    index.render(createVNode(16, App, null, null, {
        'searchResultsData': getNextSearchResults()
    }), el);

    return function (done) {
        index.render(createVNode(16, App, null, null, {
            'searchResultsData': getNextSearchResults()
        }), el);

        done();
    };
});

var client = {

};

return client;

}());
