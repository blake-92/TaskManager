import { test, expect } from "@playwright/test";

test("un usuario puede crear una tarea y verla en la lista", async ({ page }) => {
  // La base de datos conserva las tareas de corridas anteriores: un título
  // único evita confundir la tarea nueva con una vieja del mismo nombre.
  const titulo = `Comprar pan ${Date.now()}`;

  // 1. Entrar a la aplicación (primero pide iniciar sesión)
  await page.goto("/");
  await page.getByLabel("Email").fill("admin@test.com");
  await page.getByLabel("Contraseña").fill("123456");
  await page.getByRole("button", { name: "Entrar" }).click();

  // 2. Crear una tarea
  await page.getByLabel("Nueva tarea").fill(titulo);
  await page.getByRole("button", { name: "Agregar tarea" }).click();

  // 3. Verla en la lista
  await expect(page.getByText(titulo)).toBeVisible();
});
