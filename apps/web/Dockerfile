# syntax=docker/dockerfile:1

FROM node:22-alpine AS base
RUN corepack enable

# ---- Prune: chỉ giữ phần cần cho app web ----
FROM base AS pruner
WORKDIR /app
RUN npm install -g turbo@2
COPY . .
RUN turbo prune web --docker

# ---- Install + build ----
FROM base AS installer
WORKDIR /app
COPY --from=pruner /app/out/json/ .
RUN pnpm install --frozen-lockfile
COPY --from=pruner /app/out/full/ .
ENV NEXT_TELEMETRY_DISABLED=1
# NEXT_PUBLIC_* được nhúng lúc build — truyền qua --build-arg, không lấy từ runtime.
ARG NEXT_PUBLIC_SITE_URL=https://riviu.vn
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
# NEXT_PUBLIC_API_URL để trống -> trình duyệt gọi /api cùng origin (qua nginx)
RUN pnpm exec turbo run build --filter=web

# ---- Runner ----
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
USER nextjs
COPY --from=installer /app/apps/web/.next/standalone ./
COPY --from=installer /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=installer /app/apps/web/public ./apps/web/public
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
CMD ["node", "apps/web/server.js"]
