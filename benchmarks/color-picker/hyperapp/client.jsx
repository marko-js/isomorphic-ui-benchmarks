const { app } = require('hyperapp');
const { state, actions, view } = require('./components/App');

const mountNode = document.getElementById('mount');

if (mountNode) {
    const initialState = Object.assign({}, state, { colors: window.colors });
    app(initialState, actions, view, mountNode);
    console.log('Re-rendering on client completed');
}

window.addBench('hyperapp', (el, colors) => {
    const initialState = Object.assign({}, state, { colors });

    let currentDone;
    const appActions = Object.assign({}, actions, {
        onUpdate() {
            currentDone();
        }
    });

    const widget = app(initialState, appActions, view, el);

    let selectedColorIndex = 0;
    return (done) => {
        widget.setColorIndex((++selectedColorIndex) % colors.length);
        currentDone = done;
    };
});
