var Inferno = require('inferno');

var App = require('./components/App');

var mountNode = document.getElementById("searchResultsMount");

if (mountNode) {
    Inferno.render(
        <App searchResultsData={window.searchResultsData}/>,
        mountNode);

    console.log('Re-rendering on client completed');
}

window.addBench('inferno', function(el, getNextSearchResults) {
    Inferno.render(
        <App searchResultsData={getNextSearchResults()} />,
        el);

    return function(done) {
        Inferno.render(
            <App searchResultsData={getNextSearchResults()} />,
            el);

        done();
    };
});