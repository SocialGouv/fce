FROM node:9.7.1

ENV NODE_ENV=production
ENV http_proxy=http://172.17.0.1:3128/
ENV https_proxy=https://172.17.0.1:3128/
ENV HTTP_PROXY=http://172.17.0.1:3128/
ENV HTTPS_PROXY=https://172.17.0.1:3128/

RUN curl -o- -L https://yarnpkg.com/install.sh | bash

ADD . /app/

WORKDIR /app/
VOLUME [ "/app/config" ]

RUN yarn config set proxy http://172.17.0.1:3128 
RUN npm config set proxy http://172.17.0.1:3128 
RUN http_proxy=http://172.17.0.1:3128 https_proxy=https://172.17.0.1:3128  yarn install

# RUN apt-key add ./mongodb.pgp
RUN echo "deb http://repo.mongodb.org/apt/debian jessie/mongodb-org/3.6 main" | tee /etc/apt/sources.list.d/mongodb-org-3.6.list
RUN apt-get update --allow-unauthenticated
RUN apt-get install --allow-unauthenticated -y mongodb-org

COPY entrypoint.sh /entrypoint.sh
RUN chmod a+x /entrypoint.sh

EXPOSE 80
VOLUME [ "/var/lib/mongodb" ]

ENTRYPOINT [ "/entrypoint.sh" ]
CMD node server.js
