import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 9000,
    cors: true
  },
  build: {
    rollupOptions: {
      external: ['single-spa']
    }
  },
  resolve: {
    alias: {
      'react-native': 'react-native-web'
    }
  },
  define: {
    global: 'globalThis'
  }
})