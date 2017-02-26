var app = require('./components/app');
require('marko/components').init();

window.addBench('marko', function(el, colors) {

    var component = app.renderSync({ colors: colors })
        .appendTo(el)
        .getComponent();

    var selectedColorIndex = 0;

    return function(done) {
        component.state.selectedColorIndex = (++selectedColorIndex) % colors.length;
        component.update();
        done();
    };
});