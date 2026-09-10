import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import TaskInput from "./TaskInput";

describe("TaskInput", () => {
  it("llama a onAddTask con el texto escrito por el usuario", async () => {
    // Arrange
    const onAddTask = vi.fn();
    render(<TaskInput onAddTask={onAddTask} />);
    const usuario = userEvent.setup();

    // Act
    const campo = screen.getByLabelText("Nueva tarea");
    await usuario.type(campo, "Comprar pan");
    await usuario.click(screen.getByLabelText("Agregar tarea"));

    // Assert
    expect(onAddTask).toHaveBeenCalledWith("Comprar pan", undefined, undefined);
  });

  it("no llama a onAddTask si el campo esta vacio", async () => {
    // Caso limite: el usuario aprieta el boton sin escribir nada.
    const onAddTask = vi.fn();
    render(<TaskInput onAddTask={onAddTask} />);
    const usuario = userEvent.setup();

    await usuario.click(screen.getByLabelText("Agregar tarea"));

    expect(onAddTask).not.toHaveBeenCalled();
  });

  it("recorta los espacios sobrantes del titulo antes de enviarlo", async () => {
    // Ticket de bug: el componente valida sobre el texto recortado,
    // pero entrega el original sin recortar.
    const onAddTask = vi.fn();
    render(<TaskInput onAddTask={onAddTask} />);
    const usuario = userEvent.setup();

    const campo = screen.getByLabelText("Nueva tarea");
    await usuario.type(campo, "  Comprar pan  ");
    await usuario.click(screen.getByLabelText("Agregar tarea"));

    expect(onAddTask).toHaveBeenCalledWith("Comprar pan", undefined, undefined);
  });

  it("limpia el campo despues de agregar una tarea", async () => {
    const onAddTask = vi.fn();
    render(<TaskInput onAddTask={onAddTask} />);
    const usuario = userEvent.setup();

    const campo = screen.getByLabelText("Nueva tarea");
    await usuario.type(campo, "Sacar la basura");
    await usuario.click(screen.getByLabelText("Agregar tarea"));

    expect(campo).toHaveValue("");
  });
});
