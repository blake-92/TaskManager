import request from "supertest";
import jwt from "jsonwebtoken";
import { describe, it, expect } from "vitest";
import app from "../src/index";

describe("API de autenticacion", () => {
  it("rechaza el registro si faltan datos", async () => {
    // Solo se envia el email: la validacion responde antes de tocar la base.
    const res = await request(app).post("/register").send({ email: "ana@ejemplo.com" });

    expect(res.status).toBe(400);
  });

  it("rechaza ver el perfil sin token", async () => {
    const res = await request(app).get("/profile");

    expect(res.status).toBe(401);
  });

  it("rechaza un token firmado con otro secreto", async () => {
    // Token falsificado: tiene el formato correcto, pero no lo firmo la app.
    const tokenFalso = jwt.sign({ email: "intruso@ejemplo.com" }, "otro-secreto");

    const res = await request(app).get("/profile").set("Authorization", `Bearer ${tokenFalso}`);

    expect(res.status).toBe(401);
  });

  it("devuelve el perfil cuando el token es valido", async () => {
    const token = jwt.sign({ email: "ana@ejemplo.com" }, process.env.JWT_SECRET as string);

    const res = await request(app).get("/profile").set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.user.email).toBe("ana@ejemplo.com");
  });
});
