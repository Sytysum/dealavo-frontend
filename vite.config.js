import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/product': 'http://localhost:8000',
      '/track': 'http://localhost:8000',
      '/tracked': 'http://localhost:8000'
    }
  }
})
