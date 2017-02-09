var app = require('./components/app');
require('marko/widgets').initWidgets();

window.addBench('marko', function(el, colors) {

    var widget = app.renderSync({ colors: colors })
        .appendTo(el)
        .getWidget();

    var selectedColorIndex = 0;

    return function(done) {
        widget.state.selectedColorIndex = (++selectedColorIndex) % colors.length;
        widget.update();
        done();
    };
});