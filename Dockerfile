FROM node:18.7.0-slim

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

CMD [ "npm", "start" ]