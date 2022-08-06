FROM --platform=linux/amd64 node:16

WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]

RUN yarn install

COPY . .

CMD [ "yarn", "start" ]