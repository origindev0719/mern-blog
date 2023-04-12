FROM node:16-alpine as base

# Create app directory

WORKDIR /app

# Copying all the files from your file system to container file system
COPY package.json .

# Install all dependencies
RUN yarn install

COPY ./ .

FROM base as production

# Expose the port
EXPOSE 3000

RUN yarn build
CMD [ "node", "dist/src/index.js" ]
