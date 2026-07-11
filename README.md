# Task Manager — Full Stack

Gestor de tareas tipo **Kanban** full stack: un frontend en **React + TypeScript** que consume una
API en **Node.js + Express**, con datos guardados de verdad en **PostgreSQL** (vía **Prisma**) y
autenticación real con **JWT** y **bcrypt**. Cada usuario ve y gestiona solo sus propias tareas.

## Tecnologías

- **Frontend:** React + Vite + TypeScript
- **Backend:** Node.js + Express + TypeScript
- **Base de datos:** PostgreSQL (en Docker)
- **ORM:** Prisma
- **Autenticación:** JWT (tokens) + bcrypt (hash de contraseñas)

## Estructura

```
.                 # frontend (React + Vite)
├── src/          # componentes, estado y estilos
├── index.html
└── backend/      # API (Express + Prisma)
    ├── src/index.ts
    ├── prisma/   # schema, migraciones y seed
    └── docker-compose.yml   # PostgreSQL
```

## Requisitos

- **Node.js 24+** (el backend ejecuta TypeScript directamente, sin compilar).
- **Docker** (para la base de datos PostgreSQL).

## Cómo levantarlo desde cero

### 1. Base de datos + Backend

```bash
cd backend

# Variables de entorno (crea el .env a partir del ejemplo y pon un JWT_SECRET propio)
cp .env.example .env

# Levantar PostgreSQL en Docker
docker compose up -d

# Instalar dependencias, crear las tablas y sembrar datos de prueba
npm install
npx prisma migrate deploy      # aplica las migraciones (crea las tablas)
npx prisma generate            # genera el cliente de Prisma
npm run seed                   # 3 usuarios de prueba + tareas de ejemplo

# Arrancar el backend  ->  http://localhost:3000
npm run dev
```

### 2. Frontend (en otra terminal, desde la raíz del proyecto)

```bash
npm install
npm run dev                    # http://localhost:5173
```

Abre **http://localhost:5173** e inicia sesión.

## Usuarios de prueba

Todos con contraseña **`123456`**:

| Email | Contraseña |
|---|---|
| `admin@test.com` | `123456` |
| `ana@test.com` | `123456` |
| `luis@test.com` | `123456` |

También puedes **registrar** un usuario nuevo desde la pantalla de registro.

## Puertos

| Servicio | URL |
|---|---|
| Frontend (Vite) | http://localhost:5173 |
| Backend (Express) | http://localhost:3000 |
| Prisma Studio (opcional: `npx prisma studio` en `backend/`) | http://localhost:5555 |

## Notas

- El archivo `backend/.env` (con el `JWT_SECRET`) **no se sube a git**; usa `backend/.env.example`
  como plantilla.
- Para desplegar en la nube, el backend ya respeta `process.env.PORT` y `FRONTEND_URL` (CORS), y el
  frontend usa `VITE_API_URL` si está definido (ver `.env.example`).
