$_mod.def("/marko$4.18.16/dist/runtime/components/Component", function(require, exports, module, __filename, __dirname) { "use strict";
/* jshint newcap:false */

var complain;

var domInsert = require('/marko$4.18.16/dist/runtime/dom-insert'/*"../dom-insert"*/);
var defaultCreateOut = require('/marko$4.18.16/dist/runtime/createOut'/*"../createOut"*/);
var getComponentsContext = require('/marko$4.18.16/dist/runtime/components/ComponentsContext'/*"./ComponentsContext"*/).D_;
var componentsUtil = require('/marko$4.18.16/dist/runtime/components/util-browser'/*"./util"*/);
var componentLookup = componentsUtil.h_;
var emitLifecycleEvent = componentsUtil.E_;
var destroyNodeRecursive = componentsUtil.F_;
var EventEmitter = require('/events-light$1.0.5/src/index'/*"events-light"*/);
var RenderResult = require('/marko$4.18.16/dist/runtime/RenderResult'/*"../RenderResult"*/);
var SubscriptionTracker = require('/listener-tracker$2.0.0/lib/listener-tracker'/*"listener-tracker"*/);
var inherit = require('/raptor-util$3.2.0/inherit'/*"raptor-util/inherit"*/);
var updateManager = require('/marko$4.18.16/dist/runtime/components/update-manager'/*"./update-manager"*/);
var morphdom = require('/marko$4.18.16/dist/runtime/vdom/morphdom/index'/*"../vdom/morphdom"*/);
var eventDelegation = require('/marko$4.18.16/dist/runtime/components/event-delegation'/*"./event-delegation"*/);
var domData = require('/marko$4.18.16/dist/runtime/components/dom-data'/*"./dom-data"*/);
var componentsByDOMNode = domData.G_;
var CONTEXT_KEY = "__subtree_context__";

var slice = Array.prototype.slice;

var COMPONENT_SUBSCRIBE_TO_OPTIONS;
var NON_COMPONENT_SUBSCRIBE_TO_OPTIONS = {
    addDestroyListener: false
};

var emit = EventEmitter.prototype.emit;
var ELEMENT_NODE = 1;

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

    var targetComponent = componentLookup[component.H_];
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

        emitLifecycleEvent(component, "update");

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
    EventEmitter.call(this);
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

        var subscriptions = this.L_ || (this.L_ = new SubscriptionTracker());

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
            var args = slice.call(arguments, 1);

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
        return rootNode && componentsByDOMNode.get(rootNode);
    },
    getComponents: function (key) {
        var lookup = this.m_[key + "[]"];
        return lookup ? Object.keys(lookup).map(function (key) {
            return componentsByDOMNode.get(lookup[key]);
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
            destroyNodeRecursive(node);

            if (eventDelegation._a_(node) !== false) {
                node.parentNode.removeChild(node);
            }
        });

        root.detached = true;

        delete componentLookup[this.id];
        this.m_ = {};
    },

    ___: function () {
        if (this.T_) {
            return;
        }

        emitLifecycleEvent(this, "destroy");
        this.T_ = true;

        componentsByDOMNode.set(this.K_, undefined);

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
            if (processUpdateHandlers(this, state._k_, state._l_, state)) {
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
        emitLifecycleEvent(this, eventType, eventArg1, eventArg2);
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
        var createOut = renderer.createOut || defaultCreateOut;
        var out = createOut(globalData);
        out.sync();
        out.X_ = this.X_;
        out[CONTEXT_KEY] = this._h_;

        var componentsContext = getComponentsContext(out);
        var globalComponentsContext = componentsContext.l_;
        globalComponentsContext._q_ = this;
        globalComponentsContext._r_ = isHydrate;

        renderer(input, out);

        var result = new RenderResult(out);

        var targetNode = out.C_().a_;

        morphdom(rootNode, targetNode, doc, componentsContext);

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
            return el.nodeType === ELEMENT_NODE;
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

inherit(Component, EventEmitter);

module.exports = Component;
});