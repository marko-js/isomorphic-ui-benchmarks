var Inferno = require('inferno');
var render = Inferno.render;

var App = require('./components/App');

var mountNode = document.getElementById("mount");

if (window.colors) {
    render(
        <App colors={window.colors}/>,
        mountNode);

    console.log('Re-rendering on client completed');
}

window.addBench('inferno', function(el, colors) {
    var widget;
    var currentDone;
    var selectedColorIndex = 0;

    function onMount(instance) {
        widget = instance;
    }

    function onUpdate() {
        if (currentDone) {
            currentDone();
        }
    }

    render(
        <App colors={colors} onMount={onMount} onUpdate={onUpdate} />,
        el);


    return function(done) {
      currentDone = done;

        widget.setState({
                selectedColorIndex: (++selectedColorIndex) % colors.length
            });
    };
});