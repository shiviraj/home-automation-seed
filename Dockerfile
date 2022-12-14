FROM node:16.15.0-slim as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN rm -rf dist
RUN npm run build

# STAGE 2
FROM node:16.15.0-slim
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY --from=builder /app/dist ./dist
COPY src/resource ./dist/resource
CMD [ "npm", "start" ]