FROM docker

ENV SSH_AUTH_SOCK=/ssh-agent

WORKDIR /project
VOLUME [ "/project" ]

COPY ./warmup.sh /warmup.sh
RUN chmod a+x /warmup.sh

ENTRYPOINT [ "/warmup.sh" ]
