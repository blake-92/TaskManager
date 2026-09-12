import { defineConfig } from 'vite'
import { configDefaults } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    // Las pruebas de e2e/ son de Playwright: Vitest no debe ejecutarlas.
    exclude: [...configDefaults.exclude, 'e2e/**'],
  },
})
