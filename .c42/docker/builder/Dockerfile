FROM docker:19.03.10

RUN apk add --no-cache --update alpine-sdk curl git openssh zip tar ruby ruby-dev zlib python python-dev py-pip bash docker

RUN pip install docker-compose==1.23.2

RUN echo "gem: --no-rdoc --no-ri" >> /etc/gemrc
RUN gem update --system > /dev/null

ENV SSH_AUTH_SOCK=/ssh-agent
ENV BUNDLE_APP_CONFIG=/project/.bundle
ENV SSH_AUTH_SOCK=/ssh-agent

VOLUME [ "/project" ]
WORKDIR /project

COPY builder-entrypoint.sh /usr/local/bin/
RUN chmod a+x /usr/local/bin/builder-entrypoint.sh

ENTRYPOINT [ "builder-entrypoint.sh" ]
