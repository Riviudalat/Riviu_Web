# syntax=docker/dockerfile:1

FROM node:22-alpine AS base
RUN corepack enable

# ---- Prune: chỉ giữ phần cần cho app api ----
FROM base AS pruner
WORKDIR /app
RUN npm install -g turbo@2
COPY . .
RUN turbo prune api --docker

# ---- Install + build ----
FROM base AS installer
WORKDIR /app
COPY --from=pruner /app/out/json/ .
RUN printf 'shamefully-hoist=true\n' >> .npmrc
RUN pnpm install --frozen-lockfile
COPY --from=pruner /app/out/full/ .
RUN pnpm exec turbo run build --filter=api

# ---- Runner ----
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=installer /app .
EXPOSE 4000
ENV PORT=4000
# Chạy migration rồi khởi động API
CMD ["sh", "-c", "pnpm --filter api exec prisma migrate deploy && pnpm --filter api start:prod"]
