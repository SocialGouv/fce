FROM node:14 as deps-server
WORKDIR /app/server
COPY ./server/package.json ./server/yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:14 as builder-server
WORKDIR /app
COPY --from=deps-server /app/server/node_modules ./node_modules
COPY ./server .
RUN yarn build

FROM node:14

WORKDIR /app/server

COPY --from=builder-server /app/package.json /app/yarn.lock ./

RUN yarn install --production --frozen-lockfile

COPY --from=builder-server /app/build .

COPY ./server/migrations ./migrations

COPY --chmod=755 ./server/start.sh .

USER 1000

CMD ./start.sh
