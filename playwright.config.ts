import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://localhost:5173",
    // Guarda una captura al final de cada prueba para verla en el reporte.
    screenshot: "on",
  },
  // La app necesita dos servidores: la API (backend + base de datos) y el
  // frontend de Vite. Playwright levanta los dos antes de correr las pruebas.
  webServer: [
    {
      // En local carga backend/.env; en CI ese archivo no existe y las
      // variables llegan desde el workflow.
      command: "node --env-file-if-exists=.env src/index.ts",
      cwd: "./backend",
      url: "http://localhost:3000",
      reuseExistingServer: true,
    },
    {
      command: "npm run dev",
      url: "http://localhost:5173",
      reuseExistingServer: true,
    },
  ],
});
