var React = require('react');
var ReactDOM = require('react-dom');

var App = require('./components/App');

var mountNode = document.getElementById("searchResultsMount");

if (mountNode) {
    ReactDOM.hydrate(
        <App searchResultsData={window.searchResultsData}/>,
        mountNode);

    console.log('Re-rendering on client completed');
}

window.addBench('react', function(el, getNextSearchResults) {
    ReactDOM.render(
        <App searchResultsData={getNextSearchResults()} />,
        el);

    return function(done) {
        ReactDOM.render(
            <App searchResultsData={getNextSearchResults()} />,
            el,
        done);
    };
});