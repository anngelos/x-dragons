import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setupTests.js",
    transformMode: {
      web: [/.[jt]sx$/]
    },
    coverage: {
      provider: "istanbul",
      reporter: ["text", "json", "html"],
      all: true,
      include: ["src/**/*.{js,jsx}"],
      exclude: ["src/main.jsx", "src/index.jsx", "src/setupTests.js"]
    }
  },
})
