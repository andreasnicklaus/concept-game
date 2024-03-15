FROM node:21 as build
WORKDIR /app

COPY package*.json ./
RUN NODE_ENV=production npm ci

COPY . .
RUN npm run build

FROM nginx:stable-alpine as server
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

COPY --from=build app/dist .

ENTRYPOINT ["nginx", "-g",  "daemon off;"]
