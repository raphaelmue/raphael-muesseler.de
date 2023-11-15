### 1. Step: Build OpenAPI Specification ###
FROM node:18 AS builder

MAINTAINER Raphael Müßeler <raphael@muesseler.de>

# Set working directory
WORKDIR /usr/src/app/

# Copy source files
COPY ./backend/src/extensions/documentation/documentation/1.0.0/ ./backend/src/extensions/documentation/documentation/1.0.0/
COPY ./frontend/ frontend/

# Set working directory to frontend
WORKDIR /usr/src/app/frontend/

# Install Java
RUN apt-get update
RUN apt-get -y install default-jre

# Build application
RUN yarn install
RUN yarn run generate:api
RUN yarn build

### 2. Step: Run Binaries ###
FROM nginx:alpine AS release

# Copy binaries into working directory
COPY --from=builder /usr/src/app/frontend/build /usr/share/nginx/html

# Expose port
EXPOSE 80

# Run React application
CMD ["nginx", "-g", "daemon off;"]
