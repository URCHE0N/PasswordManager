FROM node:latest AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:latest
COPY --from=build /app/dist/password-manager.client/browser /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf