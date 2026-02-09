FROM node:20-bookworm-slim AS base
WORKDIR /repo
RUN corepack enable

FROM base AS deps
COPY package.json pnpm-workspace.yaml tsconfig.base.json ./
COPY apps/api/package.json apps/api/tsconfig.json ./apps/api/
COPY packages/shared/package.json packages/shared/tsconfig.json ./packages/shared/
RUN pnpm install --filter @ragmap/api...

FROM deps AS build
COPY packages/shared/src ./packages/shared/src
COPY apps/api/src ./apps/api/src
RUN pnpm --filter @ragmap/shared build
RUN pnpm --filter @ragmap/api build

FROM base AS runtime
ENV NODE_ENV=production
COPY --from=build /repo/apps/api/dist /repo/apps/api/dist
COPY --from=build /repo/apps/api/node_modules /repo/apps/api/node_modules
COPY --from=build /repo/packages/shared /repo/packages/shared
COPY --from=build /repo/node_modules /repo/node_modules
COPY apps/api/package.json /repo/apps/api/package.json
WORKDIR /repo/apps/api
EXPOSE 3000
CMD ["node", "dist/index.js"]

