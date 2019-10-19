import commonjsPlugin from 'rollup-plugin-commonjs';
import nodeResolvePlugin from 'rollup-plugin-node-resolve';
import replace from "rollup-plugin-replace";
import marko from '@marko/rollup';
import path from 'path';

export default {
    input: path.join(__dirname, 'client.js'),
    plugins: [
        marko(),
        replace({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) }),
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