// Variables que la aplicacion exige al arrancar. Se definen aca para que
// las pruebas no dependan del archivo .env real ni de una base encendida.
process.env.NODE_ENV = "test";
process.env.JWT_SECRET = "secreto-solo-para-pruebas";

// URL de marcador: las pruebas de esta suite nunca llegan a consultar la base.
process.env.DATABASE_URL ??= "postgresql://test:test@localhost:5432/test";
