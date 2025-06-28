FROM node:20 AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build -- --configuration=production

FROM nginx:stable-alpine
COPY --from=builder /app/dist/front-poc-spring/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
