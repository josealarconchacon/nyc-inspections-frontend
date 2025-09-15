FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build --prod

FROM nginx:alpine
COPY --from=builder /app/dist/nyc-inspections-frontend /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
