FROM n8nio/n8n

RUN mkdir /home/node/.n8n
RUN mkdir /home/node/custom

RUN apk add --no-cache make gcc g++ python

COPY ./certs/dev-db.cert /home/node/postgre.crt

ENV DB_POSTGRESDB_SSL_CA="/home/node/postgre.crt"
ENV DB_POSTGRESDB_SSL_REJECT_UNAUTHORIZED=false
ENV N8N_CUSTOM_EXTENSIONS="/home/node/custom"


COPY package.json /home/node/custom/package.json
RUN npm install --production --prefix --silent /home/node/custom

RUN apk del make gcc g++ python

COPY ./dist /home/node/custom
