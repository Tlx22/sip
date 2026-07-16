import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    // Add this line to force everything to use exactly one copy of React
    dedupe: ['react', 'react-dom'], 
  },
})