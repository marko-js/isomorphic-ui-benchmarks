const commonjsPlugin = require('rollup-plugin-commonjs');
const nodeResolvePlugin = require('rollup-plugin-node-resolve');
const babelPlugin = require('rollup-plugin-babel');
const path = require('path');
const replace = require('rollup-plugin-replace');
const alias = require('rollup-plugin-alias');

// see below for details on the options
export default {
  input: path.join(__dirname, 'client.jsx'),
  output: {
    name: 'Inferno',
    format: 'iife',
    file: path.join(process.env.BUNDLES_DIR, 'inferno.js'),
    sourcemap: false
  },
  plugins: [
    alias({
      keymirror: path.resolve(__dirname, 'src/js/utils/keymirror.js')
    }),
    nodeResolvePlugin({
      jsnext: true,  // Default: false
      main: true,  // Default: true
      browser: false,  // Default: false
      preferBuiltins: false,
      extensions: ['.js', '.jsx']
    }),
    babelPlugin({
      exclude: 'node_modules/**',
      babelrc: false,
      sourceMaps: false,
      plugins: [
        [require('babel-plugin-inferno'), {imports: false}],
        [require('babel-plugin-transform-es2015-template-literals'), { loose: true }],
        require('babel-plugin-transform-es2015-sticky-regex'),
        [require('babel-plugin-transform-es2015-spread'), { loose: true }],
        require('babel-plugin-transform-es2015-shorthand-properties'),
        require('babel-plugin-transform-es2015-parameters'),
        require('babel-plugin-transform-es2015-object-super'),
        require('babel-plugin-transform-es2015-block-scoping'),
        require('babel-plugin-transform-es2015-block-scoped-functions'),
        [require('babel-plugin-transform-es2015-destructuring'), { loose: true }],
        [require('babel-plugin-transform-es2015-computed-properties'), { loose: true }],
        require('babel-plugin-transform-es2015-arrow-functions'),
        [require('babel-plugin-transform-es2015-classes'), { loose: true }],
        [require('babel-plugin-transform-object-rest-spread'), { useBuiltIns: true }]
      ]
    }),
    commonjsPlugin({
      sourceMap: false,
      extensions: ['.js', '.jsx']
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
      sourcemap: false
    })
  ]
}
