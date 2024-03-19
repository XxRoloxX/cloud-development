ARG NODE_ENV=production
ARG NODE_VERSION=21

FROM node:${NODE_VERSION}-alpine as build

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . .

RUN npm run build

# Web server
FROM build as prod
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


