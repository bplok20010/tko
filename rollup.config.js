
console.log("WHEREAMI", process.cwd())

import fs from 'fs'
import nodeResolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import rollupBabel from 'rollup-plugin-babel'
// const nodeDirect = require('rollup-plugin-node-direct')

const pkg = JSON.parse(fs.readFileSync("package.json"))

/**
 * Replace {{VERSION}} with pkg.json's `version`
 */
const REPLACE_CONFIG = {
  delimiters: ['{{', '}}'],
  VERSION: pkg.version
}

// const DIRECT_CONFIG = {
//   paths: [ 'work', '..' ],
//   verbose: process.argv.includes('--debug')
// }

const RESOLVE_CONFIG = {
  jsnext: true
}

const plugins = [
  replace(REPLACE_CONFIG),
  // nodeDirect(DIRECT_CONFIG),
  nodeResolve(RESOLVE_CONFIG),
]

if (process.env.TKO_BABEL) {
  plugins.push(rollupBabel())
}

console.log("ROLLING ", process.cwd())

export default {
  plugins,
  entry: 'index.js',
  format: 'umd',
  moduleName: pkg.name,
}