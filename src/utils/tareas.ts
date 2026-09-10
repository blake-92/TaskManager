import type { Task } from "../types";

/**
 * Indica si una cadena sirve como titulo de tarea.
 * Un titulo formado solo por espacios no es valido.
 */
export function esTituloValido(titulo: string): boolean {
  return titulo.trim() !== "";
}

/**
 * Cuenta las tareas que todavia no estan terminadas,
 * es decir, todas las que no estan en la columna "hecho".
 */
export function contarTareasPendientes(tareas: Task[]): number {
  return tareas.filter((tarea) => tarea.status !== "hecho").length;
}

/**
 * Valida el formato de un correo electronico.
 * Exige texto antes de la arroba, un dominio y una extension.
 */
export function esCorreoValido(correo: string): boolean {
  const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return patron.test(correo);
}
