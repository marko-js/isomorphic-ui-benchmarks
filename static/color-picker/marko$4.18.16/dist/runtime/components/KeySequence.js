$_mod.def("/marko$4.18.16/dist/runtime/components/KeySequence", function(require, exports, module, __filename, __dirname) { function KeySequence() {
    this._Q_ = {};
}

KeySequence.prototype = {
    c_: function (key) {
        // var len = key.length;
        // var lastChar = key[len-1];
        // if (lastChar === ']') {
        //     key = key.substring(0, len-2);
        // }
        var lookup = this._Q_;

        var currentIndex = lookup[key]++;
        if (!currentIndex) {
            lookup[key] = 1;
            currentIndex = 0;
            return key;
        } else {
            return key + "_" + currentIndex;
        }
    }
};

module.exports = KeySequence;
});