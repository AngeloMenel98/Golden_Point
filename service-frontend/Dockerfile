FROM node:16 AS builder

WORKDIR /app

COPY package*.json .

RUN npm install --force

COPY . .

RUN npm run build

FROM node:16

WORKDIR /app

COPY --from=builder /app/dist ./dist

COPY package*.json . 
RUN npm install --omit=dev

EXPOSE 3000

CMD ["npm", "run", "serve"]

