import { defineConfig } from 'rollup'
import nodeResolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import del from 'rollup-plugin-delete'

export default defineConfig({
   input: './package/index.ts',
   treeshake: 'smallest',
   external: ['node:fs/promises', 'node:path'],
   output: [
      {
         format: 'es',
         dir: 'dist/es',
         entryFileNames: '[name].mjs',
      },
      {
         format: 'cjs',
         dir: 'dist/cjs',
         exports: 'default',
         entryFileNames: '[name].cjs',
      },
   ],
   plugins: [
      del({ targets: 'dist/*' }),
      nodeResolve({ extensions: ['.ts'] }),
      babel({
         extensions: ['.ts'],
         babelHelpers: 'bundled',
         presets: ['@babel/preset-typescript'],
         exclude: /node_modules\//,
      }),
   ],
})
