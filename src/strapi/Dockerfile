FROM node:14-alpine

WORKDIR /app

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install

COPY . .

ENV NODE_ENV production

RUN yarn build

RUN yarn install --production

USER node

CMD ["yarn", "start"]