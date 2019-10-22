$_mod.def("/marko$4.18.16/dist/runtime/components/State", function(require, exports, module, __filename, __dirname) { var extend = require('/raptor-util$3.2.0/extend'/*"raptor-util/extend"*/);

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

function State(component) {
    this.k_ = component;
    this._u_ = {};

    this.V_ = false;
    this._l_ = null;
    this._k_ = null;
    this._T_ = null; // An object that we use to keep tracking of state properties that were forced to be dirty

    Object.seal(this);
}

State.prototype = {
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

module.exports = State;
});