FROM docker

ENV SSH_AUTH_SOCK=/ssh-agent

RUN apk add --no-cache --update alpine-sdk curl git openssh zip tar ruby ruby-dev zlib python python-dev py-pip
RUN pip install docker-compose

RUN echo "gem: --no-rdoc --no-ri" >> /etc/gemrc

RUN gem update --system > /dev/null

ENV BUNDLE_APP_CONFIG=/project/.bundle

VOLUME [ "/var/run/docker.sock" ]

VOLUME [ "/project" ]
WORKDIR /project
