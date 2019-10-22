$_mod.def("/marko$4.18.16/dist/runtime/components/GlobalComponentsContext", function(require, exports, module, __filename, __dirname) { var nextComponentIdProvider = require('/marko$4.18.16/dist/runtime/components/util-browser'/*"./util"*/)._O_;
var KeySequence = require('/marko$4.18.16/dist/runtime/components/KeySequence'/*"./KeySequence"*/);

function GlobalComponentsContext(out) {
    this.o_ = {};
    this.n_ = {};
    this.q_ = {};
    this._q_ = undefined;
    this._H_ = nextComponentIdProvider(out);
}

GlobalComponentsContext.prototype = {
    _P_: function () {
        return new KeySequence();
    }
};

module.exports = GlobalComponentsContext;
});