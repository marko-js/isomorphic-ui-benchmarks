var React = require('react');
var ReactDOM = require('react-dom');

var App = require('./components/App');

var mountNode = document.getElementById("mount");

if (window.colors) {
    ReactDOM.render(
        <App colors={window.colors}/>,
        mountNode);

    console.log('Re-rendering on client completed');
}

window.addBench('react', function(el, colors) {
    var widget;

    function onMount(instance) {
        widget = instance;
    }

    ReactDOM.render(
        <App colors={colors} onMount={onMount}/>,
        el);


    var selectedColorIndex = 0;

    return function(done) {
        widget.setState({
                selectedColorIndex: (++selectedColorIndex) % colors.length
            }, done);
    };
});