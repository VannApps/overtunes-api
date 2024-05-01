FROM ghcr.io/hazmi35/node:21-alpine as build-stage

WORKDIR /tmp/build

RUN corepack enable && corepack prepare pnpm@latest

COPY package*.json .
COPY pnpm-lock.yaml .

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

RUN pnpm prune --production

FROM ghcr.io/hazmi35/node:21-alpine

RUN corepack enable && corepack prepare pnpm@latest

COPY --from=build-stage /tmp/build/package.json .
COPY --from=build-stage /tmp/build/pnpm-lock.yaml .
COPY --from=build-stage /tmp/build/node_modules ./node_modules
COPY --from=build-stage /tmp/build/dist ./dist

EXPOSE 3000

CMD ["pnpm", "run", "start"]