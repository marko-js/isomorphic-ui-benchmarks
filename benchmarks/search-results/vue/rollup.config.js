import commonjsPlugin from 'rollup-plugin-commonjs';
import nodeResolvePlugin from 'rollup-plugin-node-resolve';
import babelPlugin from 'rollup-plugin-babel';
import path from 'path';
import replace from 'rollup-plugin-replace';

export default {
  input: path.join(__dirname, 'client.jsx'),
  output: {
    name: 'vue',
    format: 'iife',
    file: path.join(process.env.BUNDLES_DIR, 'vue.js'),
    sourcemap: false
  },
  plugins: [
    babelPlugin({
      exclude: 'node_modules/**'
    }),
    nodeResolvePlugin({
      jsnext: false,  // Default: false
      main: true,  // Default: true
      browser: true,  // Default: false
      preferBuiltins: false,
      extensions: ['.js', '.jsx']
    }),
    // browserifyPlugin(envify),
    commonjsPlugin({
      include: ['node_modules/**', '**/*.js', '**/*.jsx'],
      extensions: ['.js', '.jsx']
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.VUE_ENV': JSON.stringify('browser')
    })
  ]
};