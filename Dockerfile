FROM node:latest

MAINTAINER Raphael Müßeler <raphael@muesseler.de>

# Create app directory
WORKDIR /usr/src/app

# Copy directory
COPY . .

RUN yarn install

EXPOSE 3000
CMD [ "yarn", "run", "start" ]