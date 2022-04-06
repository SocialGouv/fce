FROM node:14-alpine as deps-frentreprise
WORKDIR /app
COPY ./frentreprise/package.json ./frentreprise/yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:14-alpine as builder-frentreprise
WORKDIR /app
COPY --from=deps-frentreprise /app/node_modules ./node_modules
COPY ./frentreprise .
RUN yarn build

FROM node:14-alpine as deps-server
WORKDIR /app/server
COPY ./server/package.json ./server/yarn.lock ./
COPY --from=builder-frentreprise /app /app/frentreprise
RUN yarn install --frozen-lockfile

FROM node:14-alpine as builder-server
WORKDIR /app
COPY --from=deps-server /app/server/node_modules ./node_modules
COPY ./server .
RUN yarn build

FROM node:14-alpine

WORKDIR /app/server

COPY --from=builder-server /app/package.json /app/yarn.lock ./
COPY --from=builder-frentreprise /app /app/frentreprise

RUN yarn install --production --frozen-lockfile

COPY --from=builder-server /app/build .

CMD node ./server.js
