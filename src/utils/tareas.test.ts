import { describe, it, expect } from "vitest";
import type { Task } from "../types";
import { esTituloValido, contarTareasPendientes, esCorreoValido } from "./tareas";

describe("esTituloValido", () => {
  it("acepta un titulo con texto", () => {
    // Arrange
    const titulo = "Comprar pan";

    // Act
    const resultado = esTituloValido(titulo);

    // Assert
    expect(resultado).toBe(true);
  });

  it("rechaza un titulo formado solo por espacios", () => {
    // Caso limite: el string no esta vacio, pero no tiene contenido util.
    expect(esTituloValido("   ")).toBe(false);
  });
});

describe("contarTareasPendientes", () => {
  const tarea = (id: number, status: Task["status"]): Task => ({
    id,
    text: `Tarea ${id}`,
    status,
  });

  it("cuenta solo las tareas que no estan en hecho", () => {
    // Arrange
    const tareas: Task[] = [
      tarea(1, "idea"),
      tarea(2, "pendiente"),
      tarea(3, "en-progreso"),
      tarea(4, "hecho"),
    ];

    // Act
    const resultado = contarTareasPendientes(tareas);

    // Assert
    expect(resultado).toBe(4);
  });

  it("devuelve 0 cuando la lista esta vacia", () => {
    // Caso limite: sin tareas no hay nada pendiente.
    expect(contarTareasPendientes([])).toBe(0);
  });
});

describe("esCorreoValido", () => {
  it("acepta un correo con formato valido", () => {
    expect(esCorreoValido("ana@ejemplo.com")).toBe(true);
  });

  it("rechaza un correo sin dominio", () => {
    // Caso limite: tiene arroba, pero le falta la extension.
    expect(esCorreoValido("ana@ejemplo")).toBe(false);
  });
});
