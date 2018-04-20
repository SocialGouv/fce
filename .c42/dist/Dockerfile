FROM node:9.7.1

ENV NODE_ENV=production

ENV HTTP_PROXY "http://intervenant.fce:Sh%40rk811@proxyweb.intranet.social.gouv.fr:8080"
ENV HTTPS_PROXY "http://intervenant.fce:Sh%40rk811@proxyweb.intranet.social.gouv.fr:8080"

RUN curl -o- -L https://yarnpkg.com/install.sh | bash

ADD . /app/

WORKDIR /app/
VOLUME [ "/app/config" ]

RUN yarn install

RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5
RUN echo "deb http://repo.mongodb.org/apt/debian jessie/mongodb-org/3.6 main" | tee /etc/apt/sources.list.d/mongodb-org-3.6.list
RUN apt-get update
RUN apt-get install -y mongodb-org

COPY entrypoint.sh /entrypoint.sh
RUN chmod a+x /entrypoint.sh

EXPOSE 80
VOLUME [ "/var/lib/mongodb" ]

ENTRYPOINT [ "/entrypoint.sh" ]
CMD node server.js
