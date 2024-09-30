# Étape 1 : Build du frontend
FROM node:22.9.0-alpine3.20 AS frontend-builder
WORKDIR /app/paac-app
COPY paac-app/package.json ./
RUN npm install
COPY paac-app/ .
RUN npm run build

# Étape 2 : Build de l'API Go
FROM golang:1.22-alpine3.20 AS api-builder
WORKDIR /app
COPY paac-api/ .
RUN go mod tidy
RUN go build -o /go-api

# Étape 3 : Image finale avec Nginx pour servir le frontend et Go pour l'API
FROM alpine:3.20.3

# Setup du serveur Go
WORKDIR /app
COPY --from=api-builder /go-api .

# Setup Nginx pour servir le frontend
RUN apk add --no-cache nginx
COPY --from=frontend-builder /app/paac-app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf  

# Exposer le port 80 pour le serveur Nginx
EXPOSE 80

# Lancer les deux services
CMD ["sh", "-c", "./go-api & nginx -g 'daemon off;'"]
