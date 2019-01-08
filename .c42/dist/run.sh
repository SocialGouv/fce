#!/bin/bash
(docker stop direccte && docker start direccte) || \
  docker run --name=direccte -d --network=host -v $(pwd)/data:/var/lib/mongodb -v $(pwd)/config:/app/config --restart=always direccte && \
docker logs --follow direccte
