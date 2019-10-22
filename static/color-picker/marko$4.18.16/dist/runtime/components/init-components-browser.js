$_mod.def("/marko$4.18.16/dist/runtime/components/init-components-browser", function(require, exports, module, __filename, __dirname) { "use strict";

var warp10Finalize = require('/warp10$2.0.1/finalize'/*"warp10/finalize"*/);
var eventDelegation = require('/marko$4.18.16/dist/runtime/components/event-delegation'/*"./event-delegation"*/);
var win = window;
var defaultDocument = document;
var createFragmentNode = require('/marko$4.18.16/dist/runtime/vdom/morphdom/fragment'/*"../vdom/morphdom/fragment"*/).ai_;
var componentsUtil = require('/marko$4.18.16/dist/runtime/components/util-browser'/*"./util"*/);
var componentLookup = componentsUtil.h_;
var addComponentRootToKeyedElements = componentsUtil.aj_;
var ComponentDef = require('/marko$4.18.16/dist/runtime/components/ComponentDef'/*"./ComponentDef"*/);
var registry = require('/marko$4.18.16/dist/runtime/components/registry-browser'/*"./registry"*/);
var domData = require('/marko$4.18.16/dist/runtime/components/dom-data'/*"./dom-data"*/);
var componentsByDOMNode = domData.G_;
var serverRenderedGlobals = {};
var serverComponentRootNodes = {};
var keyedElementsByComponentId = {};

var FLAG_WILL_RERENDER_IN_BROWSER = 1;

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
                        rootNode = createFragmentNode(startNode.nextSibling, endNode);
                    } else {
                        rootNode = createFragmentNode(endNode.parentNode.firstChild, endNode);
                    }

                    componentId = startNode.nodeValue.substring(runtimeLength + 1);
                    firstChar = startNode.nodeValue[runtimeLength];

                    if (firstChar === "^") {
                        var parts = componentId.split(/ /g);
                        var key = parts[2];
                        ownerId = parts[1];
                        componentId = parts[0];
                        if (ownerComponent = componentLookup[ownerId]) {
                            keyedElements = ownerComponent.m_;
                        } else {
                            keyedElements = keyedElementsByComponentId[ownerId] || (keyedElementsByComponentId[ownerId] = {});
                        }
                        addComponentRootToKeyedElements(keyedElements, key, rootNode, componentId);
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
                if (ownerComponent = componentLookup[ownerId]) {
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

    doc = doc || defaultDocument;
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
        renderedComponents = win[componentsKey];

        if (renderedComponents && renderedComponents.forEach) {
            renderedComponents.forEach(function (renderedComponent) {
                initServerRendered(renderedComponent, doc);
            });
        }

        win[componentsKey] = {
            concat: initServerRendered
        };

        return;
    }

    doc = doc || defaultDocument;

    renderedComponents = warp10Finalize(renderedComponents);

    runtimeId = renderedComponents.r;
    var componentDefs = renderedComponents.w;
    var typesArray = renderedComponents.t;
    var markoGlobalsKey = "$" + runtimeId + "G";

    // Ensure that event handlers to handle delegating events are
    // always attached before initializing any components
    indexServerComponentBoundaries(doc, runtimeId);
    eventDelegation.ad_(doc);

    var globals = win[markoGlobalsKey];
    if (globals) {
        serverRenderedGlobals = warp10Finalize(globals);
        delete win[markoGlobalsKey];
    }

    // hydrate components top down (leaf nodes last)
    // and return an array of functions to mount these components
    var componentMountFns = componentDefs.map(function (componentDef) {
        componentDef = ComponentDef._I_(componentDef, typesArray, serverRenderedGlobals, registry);

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
        componentsByDOMNode.set(rootNode, component);
        component.m_ = keyedElementsByComponentId[componentId] || {};

        delete keyedElementsByComponentId[componentId];

        if (componentDef.g_ & FLAG_WILL_RERENDER_IN_BROWSER) {
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
        componentLookup[component.id] = component;
    }
}

exports._M_ = initClientRendered;
exports.ag_ = initServerRendered;
});