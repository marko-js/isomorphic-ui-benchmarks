import commonjsPlugin from 'rollup-plugin-commonjs';
import browserifyPlugin from 'rollup-plugin-browserify-transform';
import nodeResolvePlugin from 'rollup-plugin-node-resolve';
import babelPlugin from 'rollup-plugin-babel';
import envify from 'envify';
import path from 'path';

export default {
    entry: path.join(__dirname, 'client.jsx'),
    format: 'iife',
    moduleName: 'app',
    plugins: [
        babelPlugin({
            exclude: 'node_modules/**'
        }),
        nodeResolvePlugin({
            jsnext: false,  // Default: false
            main: true,  // Default: true
            browser: true,  // Default: false
            preferBuiltins: false,
            extensions: [ '.js', '.jsx' ]
        }),
        // browserifyPlugin(envify),
        commonjsPlugin({
            include: [ 'node_modules/**', '**/*.js', '**/*.jsx'],
            extensions: [ '.js', '.jsx' ]
        })
    ],
    dest: path.join(process.env.BUNDLES_DIR, 'vue.js')
};