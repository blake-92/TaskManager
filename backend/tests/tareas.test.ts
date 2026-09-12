import request from "supertest";
import jwt from "jsonwebtoken";
import { describe, it, expect } from "vitest";
import app from "../src/index";

// Token firmado con el mismo secreto que usa la app durante las pruebas.
const token = jwt.sign({ email: "ana@ejemplo.com" }, process.env.JWT_SECRET as string);

describe("API de tareas", () => {
  it("responde en la raiz", async () => {
    // Arrange + Act
    const res = await request(app).get("/");

    // Assert
    expect(res.status).toBe(200);
    expect(res.text).toContain("Backend is working");
  });

  it("rechaza crear una tarea sin token", async () => {
    const res = await request(app).post("/tasks").send({ text: "Escribir informe" });

    expect(res.status).toBe(401);
  });

  it("rechaza crear una tarea con un token falsificado", async () => {
    // Un token firmado con otro secreto no debe abrir las rutas protegidas.
    const tokenFalso = jwt.sign({ email: "ana@ejemplo.com" }, "otro-secreto");

    const res = await request(app)
      .post("/tasks")
      .set("Authorization", `Bearer ${tokenFalso}`)
      .send({ text: "Escribir informe" });

    expect(res.status).toBe(401);
  });

  it("rechaza crear una tarea con titulo vacio", async () => {
    const res = await request(app)
      .post("/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({ text: "" });

    expect(res.status).toBe(400);
  });

  it("rechaza crear una tarea con titulo de solo espacios", async () => {
    // Caso limite: la cadena no esta vacia, pero no tiene contenido util.
    const res = await request(app)
      .post("/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({ text: "   " });

    expect(res.status).toBe(400);
  });
});
