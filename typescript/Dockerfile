FROM node:19-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile

WORKDIR /prod

COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile --production

FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN yarn tsc

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 expressjs

COPY --from=builder --chown=expressjs:nodejs /app/dist ./dist
COPY --from=deps /prod/node_modules ./node_modules
COPY package.json ./

USER expressjs

CMD ["yarn", "start"]
