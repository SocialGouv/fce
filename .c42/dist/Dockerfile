FROM node:9.5

RUN curl -o- -L https://yarnpkg.com/install.sh | bash

ADD . /app/

WORKDIR /app/

RUN yarn install

EXPOSE 80

CMD node server.js
