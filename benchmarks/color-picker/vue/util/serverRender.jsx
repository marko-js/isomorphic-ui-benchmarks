const Vue = require('Vue');
const renderToString = require('vue-server-renderer').createRenderer().renderToString;

module.exports = function serverRender(App, input, out) {
    const vm = new Vue({
        render(h) {
            return <App colors={input.colors}/>
        }
    });

    var asyncOut = out.beginAsync();

    return renderToString(vm, function(err, html) {
        if (err) {
            throw err;
        }

        asyncOut.end(html);
    });
};