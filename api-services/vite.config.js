import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 9101,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  build: {
    lib: {
      entry: './src/services.js',
      name: 'SharedServices',
      formats: ['es'],
      fileName: 'services'
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {}
      }
    },
    target: 'es2015',
    minify: false
  },
  define: {
    global: 'globalThis',
    'process.env.NODE_ENV': '"development"'
  }
})