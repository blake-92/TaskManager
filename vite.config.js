import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    // Dos proyectos con entornos distintos: el frontend corre en un DOM
    // simulado (jsdom) y la API en Node, cada uno con su propio setup.
    // Asi las pruebas del backend no dependen de que exista backend/.env.
    projects: [
      {
        extends: true,
        test: {
          name: 'frontend',
          globals: true,
          environment: 'jsdom',
          setupFiles: './src/test/setup.ts',
          // Solo src/: las pruebas de e2e/ son de Playwright.
          include: ['src/**/*.test.{ts,tsx}'],
        },
      },
      './backend',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      // Sin umbrales, Vitest solo informa el porcentaje; con ellos, el
      // comando falla si la cobertura queda por debajo de estos minimos.
      thresholds: {
        lines: 60,
        functions: 60,
        branches: 50,
        statements: 60,
      },
    },
  },
})
