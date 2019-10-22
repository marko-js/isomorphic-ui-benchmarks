$_mod.def("/marko$4.18.16/dist/runtime/components/util-browser", function(require, exports, module, __filename, __dirname) { var domData = require('/marko$4.18.16/dist/runtime/components/dom-data'/*"./dom-data"*/);
var componentsByDOMNode = domData.G_;
var keysByDOMNode = domData.aa_;
var vElementsByDOMNode = domData._Z_;
var vPropsByDOMNode = domData._Y_;
var markoUID = window.$MUID || (window.$MUID = { i: 0 });
var runtimeId = markoUID.i++;

var componentLookup = {};

var defaultDocument = document;
var EMPTY_OBJECT = {};

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
        var node = typeof el == "string" ? (doc || defaultDocument).getElementById(el) : el;
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

        if (component && (key = keysByDOMNode.get(node))) {
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
            vPropsByDOMNode.set(el, virtualProps = virtualProps ? JSON.parse(virtualProps) : EMPTY_OBJECT);
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

exports.ab_ = runtimeId;
exports.h_ = componentLookup;
exports.af_ = getComponentForEl;
exports.E_ = emitLifecycleEvent;
exports.aE_ = destroyComponentForNode;
exports.F_ = destroyNodeRecursive;
exports._O_ = nextComponentIdProvider;
exports._y_ = attachBubblingEvent;
exports.ac_ = getMarkoPropsFromEl;
exports.aj_ = addComponentRootToKeyedElements;
exports.aF_ = normalizeComponentKey;
});