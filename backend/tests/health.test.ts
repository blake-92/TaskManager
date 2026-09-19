import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "../src/index";

describe("Healthcheck", () => {
  it("responde 200 con status ok", async () => {
    // Railway consulta esta ruta despues de cada despliegue: mientras no
    // reciba un 200, no le pasa el trafico a la version nueva.
    const res = await request(app).get("/health");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });
});
