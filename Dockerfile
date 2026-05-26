# ══════════════════════════════════════════════════════════
# ETAPA 1: Construcción (Build)
# Usamos una imagen de Node.js 20 basada en Alpine Linux (versión minimalista y liviana)
# "AS build" le da un alias a esta etapa para referenciarla después
# ══════════════════════════════════════════════════════════
FROM node:20-alpine AS build

# Establecemos /app como el directorio de trabajo dentro del contenedor
# Todos los comandos siguientes se ejecutan desde esta ruta
WORKDIR /app

# Copiamos SOLO los archivos de dependencias primero (antes del código fuente)
# Esto aprovecha la caché de Docker: si package.json no cambia, no reinstala dependencias
COPY package.json pnpm-lock.yaml ./

# Instalamos pnpm globalmente en la imagen y luego instalamos las dependencias del proyecto
# --frozen-lockfile: fuerza que las versiones sean EXACTAMENTE las del pnpm-lock.yaml (reproducibilidad)
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copiamos el resto del código fuente al contenedor (src/, public/, vite.config.js, etc.)
# Se hace después de instalar dependencias para maximizar el uso de caché de Docker
COPY . .

# Ejecutamos el build de producción con Vite (genera la carpeta /app/dist con archivos estáticos)
RUN pnpm build

# ══════════════════════════════════════════════════════════
# ETAPA 2: Servidor Web (Nginx)
# Usamos una imagen de Nginx basada en Alpine (muy liviana, ~20MB)
# Esta etapa descarta todo lo de la Etapa 1 (node_modules, código fuente, etc.)
# Solo nos quedamos con los archivos estáticos del build
# ══════════════════════════════════════════════════════════
FROM nginx:alpine

# Copiamos la carpeta /app/dist de la Etapa 1 (AS build) hacia la carpeta pública de Nginx
# /usr/share/nginx/html es la carpeta que Nginx sirve por defecto como raíz web
COPY --from=build /app/dist /usr/share/nginx/html

# Declaramos que el contenedor escucha en el puerto 80 (puerto HTTP estándar de Nginx)
# Esto es solo documentación; el mapeo real se hace en docker-compose.yml con `ports`
EXPOSE 80

# Comando que se ejecuta cuando arranca el contenedor
# "nginx -g 'daemon off;'" inicia Nginx en primer plano (sin daemonizar)
# Es necesario que el proceso sea en primer plano para que Docker mantenga el contenedor vivo
CMD ["nginx", "-g", "daemon off;"]