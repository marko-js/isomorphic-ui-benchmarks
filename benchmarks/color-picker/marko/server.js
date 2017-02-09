var app = require('./components/app');

module.exports = function(colors) {
    return function benchFn() {
        var html = app.renderToString({
            colors: colors
        });

        return html;
    };
};