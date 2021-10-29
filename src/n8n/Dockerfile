FROM n8nio/n8n:0.136.0

RUN mkdir /home/node/.n8n
RUN mkdir /home/node/custom

RUN apk add --no-cache make gcc g++ python

COPY ./certs/dev-db.cert /home/node/postgre.crt

ENV DB_POSTGRESDB_SSL_CA="/home/node/postgre.crt"
ENV DB_POSTGRESDB_SSL_REJECT_UNAUTHORIZED=false
ENV N8N_CUSTOM_EXTENSIONS="/home/node/custom"
ENV N8N_LOG_LEVEL="debug"

RUN apk del make gcc g++ python

RUN chown -R node /home/node

USER node
COPY --chown=node:node package.json /home/node/custom/package.json
RUN npm install --production --prefix /home/node/custom --silent

COPY --chown=node:node ./dist /home/node/custom

USER root

ENTRYPOINT ["tini", "--", "su-exec", "node", "n8n"]