ARG NODE_ENV=production
ARG NODE_VERSION=21.7.1-alpine

FROM node:${NODE_VERSION} as base

ARG VITE_API_URL

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . .

RUN npm run build

# Web server
FROM nginx:alpine as prod

COPY .nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=base /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]


