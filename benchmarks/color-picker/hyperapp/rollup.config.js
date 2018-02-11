import commonjsPlugin from 'rollup-plugin-commonjs';
import browserifyPlugin from 'rollup-plugin-browserify-transform';
import nodeResolvePlugin from 'rollup-plugin-node-resolve';
import babelPlugin from 'rollup-plugin-babel';
import envify from 'envify';
import path from 'path';

process.env.NODE_ENV = 'production';

export default {
    input: path.resolve(__dirname, 'client.jsx'),
    output: {
        format: 'iife',
        file: path.join(process.env.BUNDLES_DIR, 'hyperapp.js')
    },
    mame: 'app',
    plugins: [
        babelPlugin({
            exclude: 'node_modules/**'
        }),
        browserifyPlugin(envify),
        nodeResolvePlugin(),
        commonjsPlugin()
    ],
};
