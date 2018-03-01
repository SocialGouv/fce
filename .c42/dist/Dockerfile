FROM node:9.5

WORKDIR /project
VOLUME ["/project"]

RUN curl -o- -L https://yarnpkg.com/install.sh | bash
RUN yarn install

CMD ["yarn start"]
