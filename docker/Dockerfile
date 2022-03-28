FROM node:alpine AS base

WORKDIR /maze
COPY package.json ./

FROM base AS builder
RUN yarn install
COPY .babelrc.js ./
COPY src/ ./src
RUN yarn build

FROM base AS release
COPY --from=builder /maze/.build/ ./
COPY maps/ ./maps
ENTRYPOINT node ./main.js
