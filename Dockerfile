FROM node:24-slim AS base
RUN npm install -g pnpm@10

WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json tsconfig.json ./
COPY artifacts/ ./artifacts/
COPY lib/ ./lib/
COPY scripts/ ./scripts/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build frontend
RUN PORT=3000 BASE_PATH=/ pnpm --filter @workspace/web run build

# Build API server
RUN pnpm --filter @workspace/api-server run build

# ---- runtime ----
FROM node:24-slim AS runtime
WORKDIR /app

# Copy built artifacts
COPY --from=base /app/artifacts/api-server/dist ./artifacts/api-server/dist
COPY --from=base /app/artifacts/web/dist/public ./artifacts/web/dist/public

# Leads CSV will persist on mounted volume at /data
ENV LEADS_DIR=/data
RUN mkdir -p /data

EXPOSE 3000
ENV PORT=3000
ENV NODE_ENV=production

CMD ["node", "artifacts/api-server/dist/index.cjs"]
