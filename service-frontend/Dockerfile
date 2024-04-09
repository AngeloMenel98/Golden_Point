FROM node:16

ADD . /app
WORKDIR /app
COPY package.json .
COPY package-lock.json .
COPY vite.config.js .

RUN npm install --force

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]