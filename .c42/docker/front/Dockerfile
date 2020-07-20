FROM node:12.18

RUN mkdir -p /root/.ssh
RUN ssh-keyscan -H github.com >> /root/.ssh/known_hosts

ENV SSH_AUTH_SOCK=/ssh-agent

WORKDIR /project
VOLUME ["/project"]

RUN yarn install

CMD ["yarn", "start"]
