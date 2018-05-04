#!/bin/sh

mkdir -p data && \
docker build -t direccte . && \
(docker rm -f direccte; exit 0) && \
exec $PWD/run.sh
