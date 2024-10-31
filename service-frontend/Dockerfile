FROM node:16

ADD . /app
WORKDIR /app
COPY package*.json .
COPY vite.config.js .

RUN npm install --force

COPY . .

EXPOSE 3001

CMD ["npm", "run", "dev"]
