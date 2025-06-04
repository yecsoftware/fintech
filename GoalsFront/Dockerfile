# Aşama 1: Angular build
FROM node:20 AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Aşama 2: Nginx ile yayınla
FROM nginx:alpine
COPY --from=build /app/dist/goals-front /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
