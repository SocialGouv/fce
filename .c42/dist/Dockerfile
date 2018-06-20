FROM node:9.7.1

ENV NODE_ENV=production

RUN curl -o- -L https://yarnpkg.com/install.sh | bash

RUN echo "deb http://repo.mongodb.org/apt/debian jessie/mongodb-org/3.6 main" | tee /etc/apt/sources.list.d/mongodb-org-3.6.list
RUN apt-get update --allow-unauthenticated
RUN apt-get install --allow-unauthenticated -y mongodb-org
VOLUME [ "/var/lib/mongodb" ]

COPY entrypoint.sh /entrypoint.sh
RUN chmod a+x /entrypoint.sh
ENTRYPOINT [ "/entrypoint.sh" ]

ADD . /app/
WORKDIR /app/
VOLUME [ "/app/config" ]

RUN yarn install

EXPOSE 80
CMD node server.js
