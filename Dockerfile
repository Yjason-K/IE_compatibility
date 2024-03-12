FROM node:20.11.1-alpine as build-stage

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn set version berry && yarn install
COPY . .

RUN yarn vite build

FROM nginx:alpine
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]