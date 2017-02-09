var preact = require('preact');
var h = preact.h;
var render = preact.render;

var App = require('./components/App');

var mountNode = document.getElementById("searchResultsMount");

if (mountNode) {
    render(
        <App searchResultsData={window.searchResultsData}/>,
        mountNode,
        mountNode.firstChild);

    console.log('Re-rendering on client completed');
}

window.addBench('preact', function(el, getNextSearchResults) {
    render(
        <App searchResultsData={getNextSearchResults()} />,
        el);

    return function(done) {
        render(
            <App searchResultsData={getNextSearchResults()} />,
            el,
            el.firstChild);

        done();
    };
});