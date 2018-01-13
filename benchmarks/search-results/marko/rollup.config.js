import commonjsPlugin from 'rollup-plugin-commonjs';
import browserifyPlugin from 'rollup-plugin-browserify-transform';
import nodeResolvePlugin from 'rollup-plugin-node-resolve';
import markoify from 'markoify';
import envify from 'envify';
import minpropsify from 'minprops/browserify';
import path from 'path';

export default {
    input: path.join(__dirname, 'client.js'),
    output: {
        format: 'iife',
        file: path.join(process.env.BUNDLES_DIR, 'marko.js'),
        sourcemap: false,
        name: 'marko'
    },
    plugins: [
        browserifyPlugin(markoify),
        browserifyPlugin(envify),
        browserifyPlugin(minpropsify),
        nodeResolvePlugin({
            jsnext: true,  // Default: false
            main: true,  // Default: true
            browser: true,  // Default: false
            preferBuiltins: false,
            extensions: [ '.js', '.marko' ]
        }),
        commonjsPlugin({
            sourceMap: false,
            include: [],
            extensions: [ '.js', '.marko' ]
        })
    ]
};