#!/bin/sh

mkdir -p data/db && \
docker build -t direccte . && \
(docker rm -f direccte; exit 0) && \
docker run --name=direccte -d -p 80:80  -v data:/data --restart=always direccte && \
docker logs --follow direccte
