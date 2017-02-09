var preact = require('preact');
var h = preact.h;
var render = preact.render;

var App = require('./components/App');

var mountNode = document.getElementById("mount");

if (window.colors) {
    render(
        <App colors={window.colors}/>,
        mountNode,
        mountNode.firstChild);

    console.log('Re-rendering on client completed');
}

window.addBench('preact', function(el, colors) {
    var widget;
    var currentDone;
    var selectedColorIndex = 0;

    function onMount(instance) {
        widget = instance;
    }

    function onUpdate() {
        currentDone();
    }

    render(
        <App colors={colors} onMount={onMount} onUpdate={onUpdate} />,
        el);



    return function(done) {
        widget.setState({
                selectedColorIndex: (++selectedColorIndex) % colors.length
            });

        currentDone = done;

    };
});