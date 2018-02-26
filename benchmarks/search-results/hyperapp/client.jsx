const { app } = require('hyperapp');
const { state, actions, view } = require('./components/App');

const mountNode = document.getElementById('searchResultsMount');

if (mountNode) {
    const initialState = Object.assign({}, state, { colors: window.searchResultsData });
    app(initialState, actions, view, mountNode);
    console.log('Re-rendering on client completed');
}

window.addBench('hyperapp', (el, getNextSearchResults) => {
    const initialState = Object.assign({}, state, {
        getNextSearchResults: getNextSearchResults(),
    });

    let currentDone;
    const appActions = Object.assign({}, actions, {
        onUpdate() {
            currentDone();
        }
    });

    const widget = app(initialState, appActions, view, el);

    return (done) => {
        widget.setSearchResults(getNextSearchResults());
        currentDone = done;
    };
});
