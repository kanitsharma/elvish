import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonJS from 'rollup-plugin-commonjs'
import { uglify } from "rollup-plugin-uglify";

export default {
  input: 'example/http/index.js',
  output: {
    name: 'main',
    file: 'example/http/dist/main.js',
    format: 'iife'
  },
  plugins: [
    resolve({
      jsnext: true,
      browser: true
    }),
    commonJS({
      include: 'node_modules/**'
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    uglify()
  ]
};