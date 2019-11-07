FROM node:10-alpine

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY "run.sh" "/run.sh"
CMD [ "sh", "/run.sh" ]
