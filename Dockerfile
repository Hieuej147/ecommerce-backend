# Multi-stage Dockerfile for NestJS Microservices monorepo
ARG NODE_VERSION=22-alpine
FROM node:${NODE_VERSION} AS base
RUN corepack enable && corepack prepare pnpm@9 --activate

# Step 1: Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Step 2: Build Stage
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma clients and build application
ARG APP_NAME=api-gateway
ENV APP_NAME=${APP_NAME}
ENV DATABASE_URL="postgresql://placeholder:placeholder@localhost:5432/ecommerce"


RUN pnpm run db:catalog:generate && \
    pnpm run db:order:generate && \
    pnpm run db:payment:generate && \
    pnpm run db:users:generate && \
    pnpm run db:agent:generate && \
    pnpm exec nest build ${APP_NAME}

# Step 3: Production Runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ARG APP_NAME=api-gateway
ENV APP_NAME=${APP_NAME}

# Copy needed dependencies and built artifacts
COPY package.json ./
COPY --from=builder /app/node_modules ./node_modules
RUN cp -r /app/node_modules/.pnpm/@prisma+client*/node_modules/.prisma /app/node_modules/.prisma && \
    chown -R node:node /app/node_modules/.prisma



COPY --from=builder /app/dist/apps/${APP_NAME} ./dist/apps/${APP_NAME}
COPY --from=builder /app/proto ./proto
COPY --from=builder /app/libs ./libs
COPY --from=builder /app/apps ./apps


USER node

CMD ["sh", "-c", "node dist/apps/${APP_NAME}/main.js"]
