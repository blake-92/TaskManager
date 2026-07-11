import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const USERS = [
  {
    name: "Admin",
    email: "admin@test.com",
    password: "123456",
    tasks: [
      { text: "Leer un libro", status: "idea" },
      { text: "Hacer ejercicio", status: "pendiente" },
      { text: "Revisar mis apuntes", status: "en-progreso" },
      { text: "Pagar las cuentas", status: "hecho" },
    ],
  },
  {
    name: "Ana",
    email: "ana@test.com",
    password: "123456",
    tasks: [
      { text: "Comprar víveres", status: "idea" },
      { text: "Llamar a mamá", status: "pendiente" },
    ],
  },
  {
    name: "Luis",
    email: "luis@test.com",
    password: "123456",
    tasks: [
      { text: "Regar las plantas", status: "en-progreso" },
      { text: "Sacar al perro", status: "hecho" },
    ],
  },
];

async function main() {
  for (const u of USERS) {
    const hash = await bcrypt.hash(u.password, 10);
    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: { name: u.name, password: hash },
      create: { name: u.name, email: u.email, password: hash },
    });

    const count = await prisma.task.count({ where: { userId: user.id } });
    if (count === 0) {
      await prisma.task.createMany({
        data: u.tasks.map((t) => ({ ...t, userId: user.id })),
      });
    }

    console.log(`Usuario listo: ${user.email} (contraseña: ${u.password})`);
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
