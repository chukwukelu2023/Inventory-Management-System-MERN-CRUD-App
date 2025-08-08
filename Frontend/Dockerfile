# Stage 1: Build React app
FROM node:18.0.0-alpine AS build

WORKDIR /app

# Set environment variables (must start with REACT_APP_)
ARG REACT_APP_BACKEND_BASE_URL
ARG REACT_APP_BACKEND_PORT

ENV REACT_APP_BACKEND_BASE_URL=$REACT_APP_BACKEND_BASE_URL
ENV REACT_APP_BACKEND_PORT=$REACT_APP_BACKEND_PORT

# Install dependencies first
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build

# Stage 2: Serve app with Nginx
FROM nginx:stable-alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built React app
COPY --from=build /app/build /usr/share/nginx/html

# Optional: Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]