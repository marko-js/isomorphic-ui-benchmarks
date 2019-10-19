import commonjsPlugin from 'rollup-plugin-commonjs';
import nodeResolvePlugin from 'rollup-plugin-node-resolve';
import marko from '@marko/rollup';
import path from 'path';

export default {
  input: path.join(__dirname, 'client.js'),
  output: {
    name: 'app',
    format: 'iife',
    file: path.join(process.env.BUNDLES_DIR, 'marko.js')
  },
  plugins: [
    marko(),
    nodeResolvePlugin({
      mainFields: ['browser', 'module', 'jsnext', 'main'],
      preferBuiltins: false,
      extensions: ['.js', '.marko']
    }),
    commonjsPlugin({
      extensions: ['.js', '.marko']
    })
  ]
};
