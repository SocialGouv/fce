FROM node:16 AS deps
WORKDIR /app
COPY ./package.json ./yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:16 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

FROM n8nio/n8n:0.136.0

WORKDIR /home/node

RUN mkdir ./.n8n
RUN mkdir ./custom

RUN apk add --no-cache make gcc g++ python

COPY ./certs/dev-db.cert /home/node/postgre.crt

ENV DB_POSTGRESDB_SSL_CA="/home/node/postgre.crt"
ENV DB_POSTGRESDB_SSL_REJECT_UNAUTHORIZED=false
ENV N8N_CUSTOM_EXTENSIONS="/home/node/custom"
ENV N8N_LOG_LEVEL="debug"

RUN apk del make gcc g++ python

RUN chown -R node /home/node

USER node
COPY --from=builder /app/package.json /app/yarn.lock ./

RUN yarn --frozen-lockfile --production --silent

COPY --from=builder /app/dist /home/node/custom

ENTRYPOINT ["tini", "--", "n8n"]
