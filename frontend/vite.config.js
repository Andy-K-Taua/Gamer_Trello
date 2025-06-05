import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server: {
    hmr: true,
    proxy: {
      '/api': 'http://localhost:5001', // forward requests to your API server
    },
  },
})
