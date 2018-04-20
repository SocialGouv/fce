#!/bin/sh
(docker stop direccte && docker start direccte) || \
docker run --name=direccte -d --network=host -v $PWD/data:/var/lib/mongodb -v $PWD/config:/app/config --restart=always direccte && \
docker logs --follow direccte
