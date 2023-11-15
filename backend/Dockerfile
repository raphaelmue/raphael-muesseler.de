### 1. Step: Build Strapi Application ###
FROM node:18-alpine AS builder

MAINTAINER Raphael Müßeler <raphael@muesseler.de>

# Set working directory
WORKDIR /usr/src/app/

# Install dependencies
COPY ./package.json ./
COPY ./yarn.lock ./
RUN yarn install --production=true --frozen-lockfile

# Copy source files
COPY . .

ENV NODE_ENV=production

# Build application
RUN yarn run build

### 2. Step: Run Strapi Application ###
FROM node:18-alpine as release

# Set working directory
WORKDIR /usr/src/app/

COPY --from=builder /usr/src/app/ .

# Expose port
EXPOSE 1337

ENV NODE_ENV=production
ENV STRAPI_LOG_LEVEL=debug

# Run Strapi application
CMD ["yarn", "start"]
