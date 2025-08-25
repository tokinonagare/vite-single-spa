import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react()
  ],
  server: {
    port: 9001,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  build: {
    lib: {
      entry: './src/home.js',
      name: 'HomeApp',
      formats: ['es'],
      fileName: 'home'
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    },
    target: 'es2015',
    minify: false
  },
  resolve: {
    alias: {
      'react-native': 'react-native-web'
    }
  },
  define: {
    global: 'globalThis',
    'process.env.NODE_ENV': '"development"'
  }
})