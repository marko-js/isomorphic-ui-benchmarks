const { renderToString } = require('hyperapp-render');

module.exports = function infernoRender(App, colors) {
    const state = Object.assign({}, App.state, { colors });
    return renderToString(App.view(state, App.actions));
};
