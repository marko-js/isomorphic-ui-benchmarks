$_mod.def("/marko$4.2.0/components/init-components-browser", function(require, exports, module, __filename, __dirname) { 'use strict';
var warp10Finalize = require('/warp10$1.3.4/finalize'/*'warp10/finalize'*/);
var eventDelegation = require('/marko$4.2.0/components/event-delegation'/*'./event-delegation'*/);
var win = window;
var defaultDocument = document;
var events = require('/marko$4.2.0/runtime/events'/*'../runtime/events'*/);
var componentsUtil = require('/marko$4.2.0/components/util-browser'/*'./util'*/);
var componentLookup = componentsUtil.P;
var getElementById = componentsUtil._o;
var ComponentDef = require('/marko$4.2.0/components/ComponentDef'/*'./ComponentDef'*/);
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
    var component = componentDef.Z;

    if (!component || !component._I) {
        return; // legacy
    }

    var domEvents = componentDef.ac;

    component._d();
    component._H = doc;

    var isExisting = componentDef.ad;
    var id = component.id;

    var rootIds = componentDef._y;

    if (rootIds) {
        var rootComponents;

        var els = [];

        rootIds.forEach(function(rootId) {
            var nestedId = id + '-' + rootId;
            var rootComponent = componentLookup[nestedId];
            if (rootComponent) {
                rootComponent._r = component;
                if (rootComponents) {
                    rootComponents.push(rootComponent);
                } else {
                    rootComponents = component._J = [rootComponent];
                }
            } else {
                var rootEl = getElementById(doc, nestedId);
                if (rootEl) {
                    rootEl._w = component;
                    els.push(rootEl);
                }
            }
        });

        component.el = els[0];
        component.els = els;
        componentLookup[id] = component;
    } else if (!isExisting) {
        var el = getElementById(doc, id);
        el._w = component;
        component.el = el;
        component.els = [el];
        componentLookup[id] = component;
    }

    if (isExisting) {
        component._L();
    }

    if (domEvents) {
        var eventListenerHandles = [];

        domEvents.forEach(function(domEventArgs) {
            // The event mapping is for a direct DOM event (not a custom event and not for bubblign dom events)

            var eventType = domEventArgs[0];
            var targetMethodName = domEventArgs[1];
            var eventEl = getElementById(doc, domEventArgs[2]);
            var extraArgs = domEventArgs[3];

            addDOMEventListeners(component, eventEl, eventType, targetMethodName, extraArgs, eventListenerHandles);
        });

        if (eventListenerHandles.length) {
            component._A = eventListenerHandles;
        }
    }

    if (isExisting) {
        component._l('update');
    } else {
        events.emit('mountComponent', component);
        component._l('mount');
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
    eventDelegation.W(doc);

    doc = doc || defaultDocument;
    for (var i=0,len=componentDefs.length; i<len; i++) {
        var componentDef = componentDefs[i];

        if (componentDef.ab) {
            initClientRendered(componentDef.ab, doc);
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
        renderedComponents = win.$components;

        if (renderedComponents) {
            if (renderedComponents.forEach) {
                renderedComponents.forEach(function(renderedComponent) {
                    initServerRendered(renderedComponent, doc);
                });
            }
        } else {
            win.$components = {
                concat: initServerRendered
            };
        }
        return;
    }
    // Ensure that event handlers to handle delegating events are
    // always attached before initializing any components
    eventDelegation.W(doc || defaultDocument);

    renderedComponents = warp10Finalize(renderedComponents);

    var componentDefs = renderedComponents.w;
    var typesArray = renderedComponents.t;

    componentDefs.forEach(function(componentDef) {
        componentDef = ComponentDef.ai(componentDef, typesArray);
        initComponent(componentDef, doc || defaultDocument);
    });
}

exports.aj = initClientRendered;
exports.ak = initServerRendered;
});