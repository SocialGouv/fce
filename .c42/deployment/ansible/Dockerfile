FROM python:3.7-alpine3.10

RUN mkdir /app
WORKDIR /app

RUN apk add --update gcc make musl-dev libffi-dev openssl-dev ca-certificates git rsync openssh-client docker mariadb-dev bash
RUN pip install --upgrade pip
RUN pip install mysqlclient
RUN pip install cryptography==3.3.2
RUN pip install ansible
RUN pip install pyyaml
RUN pip install docker-compose
RUN pip install jmespath
RUN ansible-galaxy install ansistrano.deploy ansistrano.rollback
