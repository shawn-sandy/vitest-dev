/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import dts from "node:path"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // plugins: [react()],

  if (mode !== 'package') {
    return {
      plugins: [react()],
      test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/test/setup.ts'
      }
    }
  } else {
    return {
      plugins: [react(), dts()],
      test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/test/setup.ts'
      },
      esbuild: {
        logOverride: { 'this-is-undefined-in-esm': 'silent' }
      },
      build: {
        outDir: resolve(__dirname, '../lib'),
        sourcemap: true,
        lib: {
          entry: resolve(__dirname, 'src/component/index.ts'),
          name: 'Link',
          formats: ['es', 'umd'],
          fileName: (format) => `index.${format}.js`,
        },
        rollupOptions: {
          external: ['react', 'react-dom', 'styled-components'],
          output: {
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
            },
          },
        },
      },
    }
  }

})
