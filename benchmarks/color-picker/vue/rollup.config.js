import commonjsPlugin from "rollup-plugin-commonjs";
import nodeResolvePlugin from "rollup-plugin-node-resolve";
import babelPlugin from "rollup-plugin-babel";
import path from "path";
import replace from "rollup-plugin-replace";

export default {
  input: path.join(__dirname, "client.jsx"),
  plugins: [
    babelPlugin({ runtimeHelpers: true }),
    nodeResolvePlugin({
      mainFields: ["browser", "module", "jsnext", "main"],
      preferBuiltins: false,
      extensions: [".js", ".jsx"]
    }),
    // replace({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) })
    commonjsPlugin({
      include: ["node_modules/**", "**/*.js", "**/*.jsx"],
      extensions: [".js", ".jsx"]
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.VUE_ENV": JSON.stringify("browser")
    })
  ],
  output: {
    name: "app",
    format: "iife",
    file: path.join(process.env.BUNDLES_DIR, "vue.js")
  }
};
