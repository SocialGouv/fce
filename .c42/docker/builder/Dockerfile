FROM docker

ENV SSH_AUTH_SOCK=/ssh-agent

RUN apk add --no-cache --update alpine-sdk
RUN apk add --no-cache --update curl
RUN apk add --no-cache --update ruby

RUN echo "gem: --no-rdoc --no-ri" >> /etc/gemrc

RUN gem update --system

ENV BUNDLE_APP_CONFIG=/project/.bundle

VOLUME [ "/var/run/docker.sock" ]

VOLUME [ "/project" ]
WORKDIR /project
