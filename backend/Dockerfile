### 1. Step: Build Strapi Application ###
FROM node:14-alpine AS builder

MAINTAINER Raphael Müßeler <raphael@muesseler.de>

# Set working directory
WORKDIR /usr/src/app/

# Install dependencies
COPY ./package.json ./
RUN yarn install --production=true

# Copy source files
COPY . .

ENV NODE_ENV production

# Build application
RUN yarn run build:production

### 2. Step: Run Strapi Application ###
FROM node:14-alpine as release

# Set working directory
WORKDIR /usr/src/app/

RUN apk add --no-cache --virtual .build-deps make gcc g++ python \
 && npm install --production --silent \
 && apk del .build-deps

COPY --from=builder /usr/src/app/ .

# Expose port
EXPOSE 1337

ENV NODE_ENV production
ENV STRAPI_LOG_LEVEL debug

# Run Strapi application
CMD ["yarn", "run", "start:production"]
