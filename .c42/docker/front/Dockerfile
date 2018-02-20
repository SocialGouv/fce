FROM node:6.12

RUN mkdir -p /root/.ssh
RUN ssh-keyscan -H github.com >> /root/.ssh/known_hosts

ENV SSH_AUTH_SOCK=/ssh-agent

WORKDIR /project
VOLUME ["/project"]

RUN npm install

COPY "run.sh" "/run.sh"
RUN chmod a+x /run.sh

CMD ["/run.sh"]
