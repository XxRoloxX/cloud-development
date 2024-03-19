ARG NODE_VERSION=21

FROM node:${NODE_VERSION}-alpine as base

WORKDIR /usr/src/app

FROM base as build

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci

COPY . .

RUN npm run build

FROM base as final

ENV NODE_ENV production

USER node

COPY package.json .

COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/target ./target

EXPOSE 8080

CMD npm run start
