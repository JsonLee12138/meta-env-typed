import { defineConfig } from 'rolldown';
import { dts } from 'rolldown-plugin-dts';

const entries = {
  vite: './lib/vite.ts',
  rsbuild: './lib/rsbuild.ts',
};

const external = ['vite', 'node:path', 'node:fs', '@rsbuild/core', '@rspack/core', 'node:process', 'node:url'];

export default defineConfig([
  // ESM build
  {
    input: entries,
    output: {
      dir: 'dist/es',
      format: 'esm',
      entryFileNames: '[name].mjs',
      chunkFileNames: '[name].mjs',
      sourcemap: true,
      minify: true,
    },
    external,
  },
  // CJS build
  {
    input: entries,
    output: {
      dir: 'dist/cjs',
      format: 'cjs',
      entryFileNames: '[name].cjs',
      chunkFileNames: '[name].cjs',
      sourcemap: true,
      minify: true,
    },
    external,
  },
  // Types generation
  {
    input: entries,
    output: {
      dir: 'types',
      format: 'esm',
    },
    plugins: [
      dts({
        emitDtsOnly: true,
      }),
    ],
    external,
  },
]);
