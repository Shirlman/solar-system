import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import typescript from 'rollup-plugin-typescript'
import pkg from './package.json'

export default [
  // UMD for browser-friendly build
  {
    input: 'src/build/bundle.ts',
    output: {
      name: 'SSSDK',
        file: pkg.browser,
        format: 'umd',
        sourcemap: true
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript()
    ]
  },
  // CommonJS for Node and ES module for bundlers build
  {
    input: 'src/build/bundle.ts',
    external: ['ms'],
    plugins: [
      typescript()
    ],
    output: [
      {  file: pkg.main, format: 'cjs' },
      {  file: pkg.module, format: 'es' }
    ]
  }
]
