# Etapa 1: Construcción
FROM node:16 AS builder

# Configurar el directorio de trabajo
WORKDIR /app

# Copiar los archivos necesarios para instalar dependencias y construir
COPY package*.json .
#COPY vite.config.js .
#COPY tsconfig.json .  # Si tienes TypeScript

# Instalar dependencias
RUN npm install --force

# Copiar el resto de los archivos del proyecto
COPY . .

# Construir la aplicación para producción
RUN npm run build

# Etapa 2: Imagen final
FROM node:16

# Crear el directorio de trabajo
WORKDIR /app

# Copiar solo los archivos de la carpeta 'dist' desde la etapa de construcción
COPY --from=builder /app/dist ./dist

# Instalar las dependencias de producción si es necesario
COPY package*.json . 
RUN npm install --omit=dev

# Exponer el puerto de la aplicación
EXPOSE 3001

# Comando de inicio de la aplicación
CMD ["npm", "run", "serve"]

