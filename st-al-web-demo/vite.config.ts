import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: '0.0.0.0', // Allow external access
    port: 5173,
    allowedHosts: ['demo.stoobit.com', 'stoobit.com'],
  },
  preview: {
    host: '0.0.0.0', // Allow external access
    port: 5173,
    allowedHosts: ['demo.stoobit.com', 'stoobit.com'],
  },
})
