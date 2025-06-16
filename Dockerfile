# Build stage
FROM node:20-slim AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:20-slim

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/entities ./dist/entities

ENV NODE_ENV=production
ENV NODE_OPTIONS=--max_old_space_size=512

EXPOSE 8080

CMD npx typeorm-ts-node-commonjs migration:run -d dist/data-source.js && node dist/index.js