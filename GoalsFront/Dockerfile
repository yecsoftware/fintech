# GoalsFront - Angular 19 Standalone App
FROM node:20 AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:alpine
COPY --from=build /app/dist/GoalsFront /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
