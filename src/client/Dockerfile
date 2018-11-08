FROM node:9.7.1 as builder

COPY ./package.json /app/package.json
COPY ./yarn.lock /app/yarn.lock

WORKDIR /app

RUN yarn --frozen-lockfile

COPY ./gulpfile.js /app/gulpfile.js
COPY ./public /app/public
COPY ./src /app/src

ARG REACT_APP_API_ENDPOINT
ENV REACT_APP_API_ENDPOINT=${REACT_APP_API_ENDPOINT}

RUN yarn build

FROM nginx:alpine

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/build /usr/share/nginx/html
