const Vue = require('vue');
const renderToString = require('vue-server-renderer').createRenderer().renderToString;


var App = require('./components/App');

module.exports = function(getNextSearchResults) {
    return function benchFn(done) {

        const vm = new Vue({
            render(h) {
                return <App searchResultsData={getNextSearchResults()}/>
            }
        });

        renderToString(vm, function(err, html) {
            if (err) {
                throw err;
            }

            done();

            return html;
        });
    };
};
