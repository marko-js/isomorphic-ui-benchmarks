import commonjsPlugin from 'rollup-plugin-commonjs';
import browserifyPlugin from 'rollup-plugin-browserify-transform';
import nodeResolvePlugin from 'rollup-plugin-node-resolve';
import markoify from 'markoify';
import envify from 'envify';
import minpropsify from 'minprops/browserify';
import path from 'path';

export default {
    input: path.join(__dirname, 'client.js'),
    plugins: [
        browserifyPlugin(markoify),
        browserifyPlugin(envify),
        browserifyPlugin(minpropsify),
        nodeResolvePlugin({
             mainFields: ["browser", "module", "jsnext", "main"],
            preferBuiltins: false,
            extensions: [ '.js', '.marko' ]
        }),
        commonjsPlugin({
            include: [],
            extensions: [ '.js', '.marko' ]
        })
    ],
    output: {
        name: 'app',
        format: 'iife',
        file: path.join(process.env.BUNDLES_DIR, 'marko.js')
    }
};