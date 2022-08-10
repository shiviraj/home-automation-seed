FROM node:16.15.0-slim as builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM node:16.15.0-slim
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json .
CMD ["npm", "start"]