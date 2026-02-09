FROM node:20-bookworm-slim AS base
WORKDIR /repo
RUN corepack enable

FROM base AS deps
COPY package.json pnpm-workspace.yaml tsconfig.base.json ./
COPY apps/mcp-remote/package.json apps/mcp-remote/tsconfig.json ./apps/mcp-remote/
RUN pnpm install --filter @ragmap/mcp-remote...

FROM deps AS build
COPY apps/mcp-remote/src ./apps/mcp-remote/src
RUN pnpm --filter @ragmap/mcp-remote build

FROM base AS runtime
ENV NODE_ENV=production
COPY --from=build /repo/apps/mcp-remote/dist /repo/apps/mcp-remote/dist
COPY --from=build /repo/apps/mcp-remote/node_modules /repo/apps/mcp-remote/node_modules
COPY --from=build /repo/node_modules /repo/node_modules
COPY apps/mcp-remote/package.json /repo/apps/mcp-remote/package.json
WORKDIR /repo/apps/mcp-remote
EXPOSE 4000
CMD ["node", "dist/index.js"]

