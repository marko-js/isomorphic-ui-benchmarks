$_mod.def("/marko$4.2.0/components/State", function(require, exports, module, __filename, __dirname) { var extend = require('/raptor-util$3.2.0/extend'/*'raptor-util/extend'*/);

function ensure(state, propertyName) {
    var proto = state.constructor.prototype;
    if (!(propertyName in proto)) {
        Object.defineProperty(proto, propertyName, {
            get: function() {
                return this.X[propertyName];
            },
            set: function(value) {
                this.Y(propertyName, value, false /* ensure:false */);
            }
        });
    }
}

function State(component) {
    this.Z = component;
    this.X = {};

    this.__ = false;
    this._a = null;
    this._b = null;
    this._c = null; // An object that we use to keep tracking of state properties that were forced to be dirty

    Object.seal(this);
}

State.prototype = {
    _d: function() {
        var self = this;

        self.__ = false;
        self._a = null;
        self._b = null;
        self._c = null;
    },

    _e: function(newState) {
        var state = this;
        var key;

        var rawState = this.X;

        for (key in rawState) {
            if (!(key in newState)) {
                state.Y(key, undefined, false /* ensure:false */, false /* forceDirty:false */);
            }
        }

        for (key in newState) {
            state.Y(key, newState[key], true /* ensure:true */, false /* forceDirty:false */);
        }
    },
    Y: function(name, value, shouldEnsure, forceDirty) {
        var rawState = this.X;

        if (shouldEnsure) {
            ensure(this, name);
        }

        if (forceDirty) {
            var forcedDirtyState = this._c || (this._c = {});
            forcedDirtyState[name] = true;
        } else if (rawState[name] === value) {
            return;
        }

        if (!this.__) {
            // This is the first time we are modifying the component state
            // so introduce some properties to do some tracking of
            // changes to the state
            this.__ = true; // Mark the component state as dirty (i.e. modified)
            this._a = rawState;
            this.X = rawState = extend({}, rawState);
            this._b = {};
            this.Z._f();
        }

        this._b[name] = value;

        if (value === undefined) {
            // Don't store state properties with an undefined or null value
            delete rawState[name];
        } else {
            // Otherwise, store the new value in the component state
            rawState[name] = value;
        }
    },
    toJSON: function() {
        return this.X;
    }
};

module.exports = State;

});