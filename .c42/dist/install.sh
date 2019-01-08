#!/bin/bash

mkdir data && \
docker build -t direccte . && \
(docker rm -f direccte; exit 0) && \
exec $(pwd)/run.sh
