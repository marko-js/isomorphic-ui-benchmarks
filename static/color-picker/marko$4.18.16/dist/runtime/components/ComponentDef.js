$_mod.def("/marko$4.18.16/dist/runtime/components/ComponentDef", function(require, exports, module, __filename, __dirname) { "use strict";

var complain;
var componentUtil = require('/marko$4.18.16/dist/runtime/components/util-browser'/*"./util"*/);
var attachBubblingEvent = componentUtil._y_;
var addDelegatedEventHandler = require('/marko$4.18.16/dist/runtime/components/event-delegation'/*"./event-delegation"*/)._z_;
var extend = require('/raptor-util$3.2.0/extend'/*"raptor-util/extend"*/);
var KeySequence = require('/marko$4.18.16/dist/runtime/components/KeySequence'/*"./KeySequence"*/);

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
        var keySequence = this.Y_ || (this.Y_ = new KeySequence());
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
        addDelegatedEventHandler(eventName);
        return attachBubblingEvent(this, handlerMethodName, isOnce, extraArgs);
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

module.exports = ComponentDef;
});