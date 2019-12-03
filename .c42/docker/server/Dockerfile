FROM node:10.14

RUN apt-get update
RUN apt-get -y install postgresql-client
RUN mkdir -p /root/.ssh

ENV SSH_AUTH_SOCK=/ssh-agent

WORKDIR /project
VOLUME ["/project"]

RUN yarn install

CMD ["yarn", "start"]

COPY "run.sh" "/run.sh"
RUN chmod a+x /run.sh

CMD [ "/run.sh" ]
