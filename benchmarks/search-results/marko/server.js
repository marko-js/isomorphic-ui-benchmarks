var app = require('./components/app');

module.exports = function(getNextSearchResults) {
    return function benchFn() {
        var html = app.renderToString(getNextSearchResults());
        return html;
    };
};