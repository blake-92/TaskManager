FROM node:24-alpine

# El cliente de Prisma usa OpenSSL, que la imagen alpine no trae por defecto.
RUN apk add --no-cache openssl

WORKDIR /app

# Primero solo las dependencias: esta capa se reutiliza mientras package.json no cambie.
COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

# Genera el cliente de Prisma para Linux. prisma.config.ts exige DATABASE_URL al
# cargarse, pero generate no se conecta a ninguna base: basta una URL de marcador.
RUN DATABASE_URL=postgresql://build:build@localhost:5432/build npx prisma generate

EXPOSE 3000

# Node 24 ejecuta TypeScript directamente, sin compilar.
CMD ["node", "src/index.ts"]
