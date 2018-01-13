import commonjsPlugin from 'rollup-plugin-commonjs';
import browserifyPlugin from 'rollup-plugin-browserify-transform';
import nodeResolvePlugin from 'rollup-plugin-node-resolve';
import babelPlugin from 'rollup-plugin-babel';
import envify from 'envify';
import path from 'path';

export default {
  input: path.join(__dirname, 'client.jsx'),
  output: {
    name: 'react',
    format: 'iife',
    file: path.join(process.env.BUNDLES_DIR, 'react.js'),
    sourcemap: false
  },
  plugins: [
    babelPlugin({
      exclude: 'node_modules/**'
    }),
    browserifyPlugin(envify),
    nodeResolvePlugin({
      jsnext: true,  // Default: false
      main: true,  // Default: true
      browser: true,  // Default: false
      preferBuiltins: false,
      extensions: ['.js', '.jsx']
    }),
    commonjsPlugin({
      include: ['node_modules/**', '**/*.js', '**/*.jsx'],
      extensions: ['.js', '.jsx']
    })
  ]
};