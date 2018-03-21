FROM node:9.7.1

RUN curl -o- -L https://yarnpkg.com/install.sh | bash

ADD . /app/

WORKDIR /app/

RUN yarn install

RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5
RUN echo "deb http://repo.mongodb.org/apt/debian jessie/mongodb-org/3.6 main" | tee /etc/apt/sources.list.d/mongodb-org-3.6.list
RUN apt-get update
RUN apt-get install -y mongodb-org

COPY entrypoint.sh /entrypoint.sh
RUN chmod a+x /entrypoint.sh

ENV NODE_ENV=production
ENV HTTP_PROXY "http://proxyweb.intranet.social.gouv.fr:8080"
ENV HTTPS_PROXY "http://proxyweb.intranet.social.gouv.fr:8080"

EXPOSE 80
VOLUME [ "/var/lib/mongodb" ]

ENTRYPOINT [ "/entrypoint.sh" ]
CMD node server.js
