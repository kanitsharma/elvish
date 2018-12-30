import babel from 'rollup-plugin-babel'

export default {
  input: 'src/index.js',
  output: {
    name: 'main',
    file: 'dist/main.js',
    format: 'esm'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ]
};