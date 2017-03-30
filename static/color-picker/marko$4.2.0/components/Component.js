$_mod.def("/marko$4.2.0/components/Component", function(require, exports, module, __filename, __dirname) { 'use strict';
/* jshint newcap:false */

var domInsert = require('/marko$4.2.0/runtime/dom-insert'/*'../runtime/dom-insert'*/);
var marko = require('/marko$4.2.0/runtime/index'/*'../'*/);
var componentsUtil = require('/marko$4.2.0/components/util-browser'/*'./util'*/);
var componentLookup = componentsUtil.P;
var emitLifecycleEvent = componentsUtil._l;
var destroyComponentForEl = componentsUtil._m;
var destroyElRecursive = componentsUtil._n;
var getElementById = componentsUtil._o;
var EventEmitter = require('/events-light$1.0.5/src/index'/*'events-light'*/);
var RenderResult = require('/marko$4.2.0/runtime/RenderResult'/*'../runtime/RenderResult'*/);
var SubscriptionTracker = require('/listener-tracker$2.0.0/lib/listener-tracker'/*'listener-tracker'*/);
var inherit = require('/raptor-util$3.2.0/inherit'/*'raptor-util/inherit'*/);
var updateManager = require('/marko$4.2.0/components/update-manager'/*'./update-manager'*/);
var morphdom = require('/marko$4.2.0/morphdom/index'/*'../morphdom'*/);
var eventDelegation = require('/marko$4.2.0/components/event-delegation'/*'./event-delegation'*/);

var slice = Array.prototype.slice;

var MORPHDOM_SKIP = true;

var COMPONENT_SUBSCRIBE_TO_OPTIONS;
var NON_COMPONENT_SUBSCRIBE_TO_OPTIONS = {
    addDestroyListener: false
};

var emit = EventEmitter.prototype.emit;

function removeListener(removeEventListenerHandle) {
    removeEventListenerHandle();
}

function checkCompatibleComponent(componentsContext, el) {
    var component = el._w;
    while(component) {
        var id = component.id;
        var newComponentDef = componentsContext._p[id];
        if (newComponentDef && component._q == newComponentDef.Z._q) {
            break;
        }

        var rootFor = component._r;
        if (rootFor)  {
            component = rootFor;
        } else {
            component._s();
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


    var targetComponent = componentLookup[component._t];
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

        emitLifecycleEvent(component, 'update');

        component._d();
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
        destroyComponentForEl(node);
    }
}

function onBeforeNodeDiscarded(node) {
    return eventDelegation.T(node);
}

function onBeforeElUpdated(fromEl, key, componentsContext) {
    if (componentsContext && key) {
        var preserved = componentsContext._u[key];

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
        var preserved = componentsContext._v[key];
        if (preserved === true) {
            // Don't morph the children since they are preserved
            return MORPHDOM_SKIP;
        }
    }
}

function onNodeAdded(node, componentsContext) {
    eventDelegation.S(node, componentsContext._w);
}

var componentProto;

/**
 * Base component type.
 *
 * NOTE: Any methods that are prefixed with an underscore should be considered private!
 */
function Component(id) {
    EventEmitter.call(this);
    this.id = id;
    this.el = null;
    this._x = null;
    this._y = null;
    this._z = null;
    this._A = null;
    this.R = null;
    this._B = null;
    this._t = null;
    this._C = null;
    this._D = undefined;

    this._E = false;
    this._F = false;
    this.__ = false;
    this._G = false;

    this._H = undefined;
}

Component.prototype = componentProto = {
    _I: true,

    subscribeTo: function(target) {
        if (!target) {
            throw TypeError();
        }

        var subscriptions = this._z || (this._z = new SubscriptionTracker());

        var subscribeToOptions = target._I ?
            COMPONENT_SUBSCRIBE_TO_OPTIONS :
            NON_COMPONENT_SUBSCRIBE_TO_OPTIONS;

        return subscriptions.subscribeTo(target, subscribeToOptions);
    },

    emit: function(eventType) {
        var customEvents = this._B;
        var target;

        if (customEvents && (target = customEvents[eventType])) {
            var targetMethodName = target[0];
            var extraArgs = target[1];
            var args = slice.call(arguments, 1);

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
        var doc = this._H;

        if (componentElId != null) {
            return getElementById(doc, getElIdHelper(this, componentElId, index));
        } else {
            return this.el || getElementById(doc, getElIdHelper(this));
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
        return componentLookup[getElIdHelper(this, id, index)];
    },
    getComponents: function(id) {
        var components = [];
        var i = 0;
        var component;
        while((component = componentLookup[getElIdHelper(this, id, i)])) {
            components.push(component);
            i++;
        }
        return components;
    },
    destroy: function() {
        if (this._E) {
            return;
        }

        var els = this.els;

        this._s();

        var rootComponents = this._J;
        if (rootComponents) {
            rootComponents.forEach(function(rootComponent) {
                rootComponent._K();
            });
        }

        els.forEach(function(el) {
            destroyElRecursive(el);

            var parentNode = el.parentNode;
            if (parentNode) {
                parentNode.removeChild(el);
            }
        });
    },

    _s: function() {
        if (this._E) {
            return;
        }

        emitLifecycleEvent(this, 'destroy');
        this._E = true;

        this.el = null;

        // Unsubscribe from all DOM events
        this._L();

        var subscriptions = this._z;
        if (subscriptions) {
            subscriptions.removeAllListeners();
            this._z = null;
        }

        delete componentLookup[this.id];
    },

    isDestroyed: function() {
        return this._E;
    },
    get state() {
        return this._x;
    },
    set state(newState) {
        var state = this._x;
        if (!state && !newState) {
            return;
        }

        if (!state) {
            state = this._x = new this._M(this);
        }

        state._e(newState || {});

        if (state.__) {
            this._f();
        }

        if (!newState) {
            this._x = null;
        }
    },
    setState: function(name, value) {
        var state = this._x;

        if (typeof name == 'object') {
            // Merge in the new state with the old state
            var newState = name;
            for (var k in newState) {
                if (newState.hasOwnProperty(k)) {
                    state.Y(k, newState[k], true /* ensure:true */);
                }
            }
        } else {
            state.Y(name, value, true /* ensure:true */);
        }
    },

    setStateDirty: function(name, value) {
        var state = this._x;

        if (arguments.length == 1) {
            value = state[name];
        }

        state.Y(name, value, true /* ensure:true */, true /* forceDirty:true */);
    },

    replaceState: function(newState) {
        this._x._e(newState);
    },

    get input() {
        return this._D;
    },
    set input(newInput) {
        if (this._G) {
            this._D = newInput;
        } else {
            this._N(newInput);
        }
    },

    _N: function(newInput, onInput, out) {
        onInput = onInput || this.onInput;
        var updatedInput;

        var oldInput = this._D;
        this._D = undefined;

        if (onInput) {
            // We need to set a flag to preview `this.input = foo` inside
            // onInput causing infinite recursion
            this._G = true;
            updatedInput = onInput.call(this, newInput || {}, out);
            this._G = false;
        }

        newInput = this._C = updatedInput || newInput;

        if ((this.__ = checkInputChanged(this, oldInput, newInput))) {
            this._f();
        }

        if (this._D === undefined) {
            this._D = newInput;
        }

        return newInput;
    },

    forceUpdate: function() {
        this.__ = true;
        this._f();
    },

    _f: function() {
        if (!this._F) {
            updateManager._j(this);
        }
    },

    update: function() {
        if (this._E === true || this._O === false) {
            return;
        }

        var input = this._D;
        var state = this._x;

        if (this.__ === false && state !== null && state.__ === true) {
            if (processUpdateHandlers(this, state._b, state._a, state)) {
                state.__ = false;
            }
        }

        if (this._O === true) {
            // The UI component is still dirty after process state handlers
            // then we should rerender

            if (this.shouldUpdate(input, state) !== false) {
                this._P();
            }
        }

        this._d();
    },


    get _O() {
        return this.__ === true || (this._x !== null && this._x.__ === true);
    },

    _d: function() {
        this.__ = false;
        this._F = false;
        this._C = null;
        var state = this._x;
        if (state) {
            state._d();
        }
    },

    shouldUpdate: function(newState, newProps) {
        return true;
    },

    _l: function(eventType, eventArg1, eventArg2) {
        emitLifecycleEvent(this, eventType, eventArg1, eventArg2);
    },

    _P: function(input) {
        if (input) {
            this.input = input;
        }

        var self = this;
        var renderer = self._Q;

        if (!renderer) {
            throw TypeError();
        }

        var globalData = {
            $w: self
        };

        var fromEls = self._R({});
        var doc = self._H;
        input = this._C || this._D;

        updateManager._k(function() {
            var createOut = renderer.createOut || marko.createOut;
            var out = createOut(globalData);
            out.sync();
            out._H = self._H;
            renderer(input, out);
            var result = new RenderResult(out);
            var targetNode = out._S();

            var componentsContext = out.global.components;

            var fromEl;

            var targetEl = targetNode.firstChild;
            while(targetEl) {
                var id = targetEl.id;

                if (id) {
                    fromEl = fromEls[id];
                    if (fromEl) {
                        morphdom(
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

            out.emit('_T');
        });

        this._d();
    },

    _R: function(rootEls) {
        var i, len;

        var componentEls = this.els;

        for (i=0, len=componentEls.length; i<len; i++) {
            var componentEl = componentEls[i];
            rootEls[componentEl.id] = componentEl;
        }

        var rootComponents = this._J;
        if (rootComponents) {
            for (i=0, len=rootComponents.length; i<len; i++) {
                var rootComponent = rootComponents[i];
                rootComponent._R(rootEls);
            }
        }

        return rootEls;
    },

    _L: function() {
        var eventListenerHandles = this._A;
        if (eventListenerHandles) {
            eventListenerHandles.forEach(removeListener);
            this._A = null;
        }
    },

    get _U() {
        var state = this._x;
        return state && state.X;
    },

    _V: function(customEvents, scope) {
        var finalCustomEvents = this._B = {};
        this._t = scope;

        customEvents.forEach(function(customEvent) {
            var eventType = customEvent[0];
            var targetMethodName = customEvent[1];
            var extraArgs = customEvent[2];

            finalCustomEvents[eventType] = [targetMethodName, extraArgs];
        });
    }
};

componentProto.elId = componentProto.getElId;
componentProto._h = componentProto.update;
componentProto._K = componentProto.destroy;

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
            var fragment = component._H.createDocumentFragment();
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

inherit(Component, EventEmitter);

module.exports = Component;

});