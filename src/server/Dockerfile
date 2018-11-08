FROM node:9.7.1 as builder

#
# As this package use internal links, this Dockerfile needs to be run at the
# root of the project.
#

COPY ./src/server /app/src/server
COPY ./src/frentreprise /app/src/frentreprise

WORKDIR /app/src/server

RUN yarn --frozen-lockfile

RUN yarn build

RUN rm -rf node_module

RUN yarn --frozen-lockfile --production

#

FROM node:9.7.1

COPY ./src/server/package.json /app/package.json
COPY ./src/server/config /app/config
COPY --from=builder /app/src/server/node_modules /app/node_modules
COPY --from=builder /app/src/server/build /app/build

WORKDIR /app

CMD yarn start
