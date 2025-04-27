import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components')
    },
  },
  server: {
    host: true,
    hmr: {
      clientPort: 5173,
      protocol: 'ws',
      host: 'localhost'
    },
    watch: {
      usePolling: true
    }
  }
})
