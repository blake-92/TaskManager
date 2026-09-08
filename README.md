# Task Manager — Full Stack

Gestor de tareas tipo **Kanban** full stack: un frontend en **React + TypeScript** que consume una
API en **Node.js + Express**, con datos guardados de verdad en **PostgreSQL** (vía **Prisma**) y
autenticación real con **JWT** y **bcrypt**. Cada usuario ve y gestiona solo sus propias tareas.

[![CI](https://github.com/blake-92/TaskManager/actions/workflows/ci.yml/badge.svg)](https://github.com/blake-92/TaskManager/actions/workflows/ci.yml)

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

## Variables de entorno

El backend lee su configuración desde `backend/.env`. Crea el archivo a partir de
`backend/.env.example` y completa cada clave con tus propios valores.

| Clave | Obligatoria | Para qué sirve |
|---|---|---|
| `DATABASE_URL` | Sí | Cadena de conexión a PostgreSQL |
| `JWT_SECRET` | Sí | Secreto con el que se firman los tokens de sesión |
| `PORT` | No | Puerto del backend (por defecto 3000) |
| `FRONTEND_URL` | No | Origen permitido por CORS al desplegar en la nube |
| `VITE_API_URL` | No | URL de la API que consume el frontend, si no es la local |

> Este archivo documenta únicamente los **nombres** de las variables. Los valores reales viven en
> `.env`, que está ignorado por git y nunca debe subirse al repositorio.

## Comandos disponibles

Desde la raíz del proyecto (frontend):

| Comando | Descripción |
|---|---|
| `npm run dev` | Levanta el entorno de desarrollo en http://localhost:5173 |
| `npm run build` | Genera el build de producción |
| `npm run preview` | Sirve localmente el build de producción |
| `npm run lint` | Ejecuta ESLint sobre el proyecto |
| `npm run typecheck` | Verifica los tipos de TypeScript sin compilar |
| `npm test` | Pendiente — las pruebas automatizadas se construyen en la Sesión 3 |

Desde `backend/` (API):

| Comando | Descripción |
|---|---|
| `npm run dev` | Levanta la API con recarga automática en http://localhost:3000 |
| `npm start` | Levanta la API sin recarga automática |
| `npm run seed` | Siembra usuarios y tareas de prueba en la base de datos |
| `npm run typecheck` | Verifica los tipos de TypeScript sin compilar |

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
