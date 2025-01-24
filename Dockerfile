# ---- STAGE 1: Build with Bun ----
FROM oven/bun:latest as builder

WORKDIR /app

# Copy files
COPY package.json .
COPY bun.lockb .
COPY tsconfig.json .
COPY src ./src
COPY database ./database

RUN bun install

RUN bun build

# ---- STAGE 2: Production with Node ----
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist

COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app/database ./database

# If you need static files or .env, copy them:
COPY .env .

EXPOSE 3000
CMD ["node", "dist/index.js"]
    