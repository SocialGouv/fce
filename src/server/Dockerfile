FROM node:14-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

USER node

COPY ./server/package*.json ./

RUN mkdir ./frentreprise

COPY --chown=node:node ./frentreprise ../frentreprise

RUN yarn install --frozen-lockfile

COPY --chown=node:node ./server/build ./

CMD node ./server.js
