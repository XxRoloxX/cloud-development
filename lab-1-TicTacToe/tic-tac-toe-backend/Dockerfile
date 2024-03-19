ARG NODE_VERSION=21.7.1-alpine

FROM node:${NODE_VERSION} as base

WORKDIR /app

COPY package-lock.json .
COPY package.json .

RUN --mount=type=cache,target=/root/.npm\
    npm ci

COPY . .

RUN npm run build

FROM base as final


ENV NODE_ENV production

COPY package.json .

COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/dist ./dist

EXPOSE 8080

CMD npm run start
