# El frontend vive en la raíz del repositorio, por eso este Dockerfile está acá
# y no dentro de una carpeta frontend/.

# Etapa 1: construir la aplicación
FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Etapa 2: servir solo los archivos estáticos, sin Node
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
