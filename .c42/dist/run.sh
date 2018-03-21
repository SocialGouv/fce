#!/bin/sh

mkdir -p data && \
docker build -t direccte . && \
(docker rm -f direccte; exit 0) && \
docker run --name=direccte -d -p 80:80 --network=host -v data:/var/lib/mongodb --restart=always direccte && \
docker logs --follow direccte
