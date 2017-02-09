var app = require('./components/app');
require('marko/widgets').initWidgets();

window.addBench('marko', function(el, getNextSearchResults) {

    var widget = app.renderSync(getNextSearchResults())
        .appendTo(el)
        .getWidget();

    return function(done) {
        widget.input = getNextSearchResults();
        widget.update();
        done();
    };
});