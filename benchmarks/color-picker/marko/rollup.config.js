import commonjsPlugin from 'rollup-plugin-commonjs';
import browserifyPlugin from 'rollup-plugin-browserify-transform';
import nodeResolvePlugin from 'rollup-plugin-node-resolve';
import markoify from 'markoify';
import path from 'path';

export default {
  input: path.join(__dirname, 'client.js'),
  output: {
    name: 'app',
    format: 'iife',
    file: path.join(process.env.BUNDLES_DIR, 'marko.js')
  },
  plugins: [
    browserifyPlugin(markoify),
    nodeResolvePlugin({
      mainFields: ['browser', 'module', 'jsnext', 'main'],
      preferBuiltins: false,
      extensions: ['.js', '.marko']
    }),
    commonjsPlugin({
      include: [],
      extensions: ['.js', '.marko']
    })
  ]
};
